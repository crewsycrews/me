---
title: Migrating a Large MySQL Database to PostgreSQL on AWS RDS
date: 2025-09-11
description: Experience I gained while migrating a large MySQL database to PostgreSQL on AWS RDS.
---

## Preconditions

Before starting the migration, here was the situation:

* The new PostgreSQL database had to run on **AWS RDS** (so **no access to the database host filesystem**).
* Some tables contained **millions of rows** (~1.5 GB per table).
* The schema included **JSON columns with virtual columns derived from JSON** (used for indexing).
* The database used **ENUM types**.
* The backend is written in **Laravel**, with heavy use of **database migrations**.

## Where to start?

The first step was researching standard migration tools.

The most popular option is **pgloader**. I also found a couple of Node.js-based tools. I ended up discarding both approaches because:

* Many column types were not mapped correctly (for example, `json` not becoming `jsonb`).
* The migration process itself was **too slow**, which is unacceptable when dealing with production data.

## Schema-first approach

I eventually concluded that the **PostgreSQL schema should be created manually before migrating the data**.

This decision was driven by several factors:

* Type mismatches mentioned earlier
* The need to **modify the schema during migration**
* Adding **table partitioning**
* Removing **deprecated tables**

To achieve this, I generated a Laravel-compatible migration for the entire existing database using [laravel-migrations-generator](https://github.com/kitloong/laravel-migrations-generator)

I used the `--squash` flag to produce **one large migration file** and removed all previous migrations. This allowed new environments to start with the **current schema from scratch**.

Naturally, the generated migration required some adjustments.

## Handling ENUM types

Laravel handles enums in PostgreSQL as **check constraints**, not as real database types. I wanted proper PostgreSQL enum types.

To make that work, I extended Laravel’s schema grammar so migrations could reference custom types.

Example:

```php
Grammar::macro('typeCountry', function () {
    return 'country';
});

DB::statement("CREATE TYPE country AS ENUM('russia', 'china', 'germany');");

Schema::create('users', function (Blueprint $table) {
    ...
    $table->addColumn('country', 'country');
});
```

Without the `Grammar::macro`, Laravel would not recognize the `country` column type.

## Replacing virtual JSON columns

MySQL supported **virtual columns derived from JSON fields**. PostgreSQL does not support virtual columns in the same way.

ChatGPT actually suggested a simple alternative: **use an index on the JSON expression instead**.

For example, if `settings` is a JSON column in the `users` table:

```sql
CREATE INDEX ON users((settings->>'setting1'));
```

The only thing to remember is to update the application code to access the value directly from the JSON field rather than the former virtual column.

## Preparing tables for partitioning

One of the tables needed to be **partitioned by date**.

In PostgreSQL, tables must be created **with partitioning defined from the start**.

Example:

```sql
CREATE TABLE actions (
    id SERIAL,
    ...
    created_at TIMESTAMP NOT NULL,
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);
```

## Enabling required extensions

One of the main motivations for moving to PostgreSQL was the ability to use **vector data types**, so I added the `vector` extension during migration:

```php
DB::statement("CREATE EXTENSION IF NOT EXISTS vector;");
```

This command must be executed **for every new database** where the extension is required.

We also relied on **geospatial queries**, so we enabled **PostGIS** as well:

```php
DB::statement("CREATE EXTENSION IF NOT EXISTS postgis;");
```

## Local development environment

Speaking of extensions, they must first be installed in the database environment.

AWS RDS comes with many extensions pre-installed. However, for **local development** we usually rely on Docker images.

Finding images with **Postgres + pgvector** or **Postgres + PostGIS** separately is easy.

Finding an image that contains **both extensions and works on ARM64** is not.

So I had to build one myself:

```dockerfile
FROM pgvector/pgvector:0.8.0-pg16

ENV POSTGIS_VERSION=3.5.0

RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    git \
    wget \
    pkg-config \
    postgresql-server-dev-16 \
    libxml2-dev \
    libgeos-dev \
    libproj-dev \
    libgdal-dev \
    libjson-c-dev \
    libprotobuf-c-dev \
    protobuf-c-compiler \
    libssl-dev \
    libcurl4-openssl-dev \
    libtiff-dev \
    libsqlite3-dev \
    sqlite3 \
    && rm -rf /var/lib/apt/lists/*

RUN cd /tmp && \
    wget https://download.osgeo.org/postgis/source/postgis-${POSTGIS_VERSION}.tar.gz && \
    tar -xzf postgis-${POSTGIS_VERSION}.tar.gz && \
    cd postgis-${POSTGIS_VERSION} && \
    ./configure \
    --with-pgconfig=/usr/bin/pg_config \
    --with-geosconfig=/usr/bin/geos-config \
    --with-projdir=/usr \
    --with-gdalconfig=/usr/bin/gdal-config \
    --with-jsondir=/usr \
    --with-protobufdir=/usr && \
    make && \
    make install && \
    cd / && \
    rm -rf /tmp/postgis-*
```

## Migration process

After testing the process locally, I ran it in **staging** and **production**.

The migration flow looked like this:

1. Create a new **AWS RDS instance**
2. Connect using `psql`
3. Enable the required extensions:

   * `aws_commons`
   * `aws_s3`

These allow importing CSV files from **S3**, since RDS does not provide filesystem access.

4. Create a **VPC Endpoint** so the database can access S3.
5. Update the Laravel database configuration (`config/database.php`)
6. Deploy the code with the new migration and apply the schema.
7. Stop the application to prevent writes during migration:

```bash
php artisan down
```

8. Export data from MySQL to CSV:

```bash
mysqldump --port=3308 -u root -psecret db-name \
  --no-create-info \
  --fields-terminated-by=, \
  --tab=/var/lib/mysql-files \
  --fields-enclosed-by='\"' \
  --lines-terminated-by='\n'
```

This generates files for each table:

```
actions.sql  actions.txt
users.sql    users.txt
```

Key flags:

* `--no-create-info` → skip schema generation
* `--fields-terminated-by=,` → comma separator
* `--tab=/var/lib/mysql-files` → required export directory
* `--fields-enclosed-by='"'` → format expected by PostgreSQL COPY
* `--lines-terminated-by='\n'` → newline rows

9. Upload the `.txt` files to an **S3 bucket**.
   If you generated the files inside a container, `docker cp` helps extract them.

10. Import each table using:

```sql
SELECT aws_s3.table_import_from_s3(
  'users',
  '',
  '(format csv, header false, null ''\N'', escape ''\'')',
  'db-name',
  '/dumps/users.txt',
  'your-aws-region',
  'AWS_ACCESS_KEY',
  'AWS_SECRET_KEY',
  ''
);
```

Repeat this command for each table.

11. Restart the application:

```bash
php artisan up
```

## One more important detail

When creating the PostgreSQL schema, there are two approaches:

### Option 1 — No foreign keys initially

Create tables **without foreign keys** so the import order doesn't matter.
Then apply a second migration to add constraints afterward.

### Option 2 — Foreign keys from the start

Create tables with foreign keys immediately.
In this case, the **table import order becomes important**.

## Final thoughts

For large production databases, a **schema-first approach with CSV bulk import** turned out to be much more reliable and faster than using automated migration tools.

It also gave us full control over:

* data types
* indexing strategy
* partitioning
* extensions
* schema cleanup
