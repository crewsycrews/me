---
title: Миграция большой базы данных из MySQL в PostgreSQL на AWS RDS
date: 2025-09-11
description: Опыт миграции большой базы данных из MySQL в PostgreSQL на AWS RDS
---

## Предусловия

* Новая база PostgreSQL должна крутиться в **AWS RDS**, то есть доступа к файловой системе хоста БД нет.
* Есть таблицы с миллионами записей — около 1,5 ГБ на одну таблицу.
* Есть колонки типа **JSON** и созданные на основе этого JSON виртуальные колонки для возможности индексирования.
* Есть типы **ENUM**.
* Бэкенд написан на **Laravel**, активно используются миграции БД.

## С чего начать?

Гуглим стандартные инструменты для переноса данных. Самый популярный — **pgloader**. Я находил ещё что-то написанное на Node.js.

Оба варианта отмёл, потому что в итоге многие типы в таблицах оказываются не теми, что нужно: например, `json` не превращается в `jsonb`. Да и сама миграция занимает очень много времени, что является непозволительной роскошью при миграции продакшена.

## Schema-first

Мои рассуждения привели меня к тому, что схему в PostgreSQL нужно создавать самому до миграции данных.

Это обусловлено проблемами, упомянутыми выше, а также тем, что нам требовалось изменить схему данных при миграции: например, добавить партиционирование и избавиться от устаревших таблиц.

Поэтому сначала я сгенерировал совместимую с Laravel миграцию на основе всей БД с помощью [laravel-migrations-generator](https://github.com/kitloong/laravel-migrations-generator). Используем флаг `--squash`, чтобы сгенерировать одну огромную миграцию, и удаляем все прошлые миграции. Тогда при создании новой БД мы начнём с чистого листа и сразу создадим актуальную схему.

Естественно, мне пришлось дорабатывать сгенерированную миграцию.

## Типы ENUM

Enum'ы с Laravel в PostgreSQL становятся обычными ограничениями, а не полноценными типами БД. Кроме того, Grammar для написания миграций нужно расширить, чтобы при определении колонок таблиц можно было указывать пользовательские типы БД.

Выглядит это примерно так:

```php
Grammar::macro('typeCountry', function () {
    return 'country';
});

DB::statement("CREATE TYPE country AS ENUM('russia', 'china', 'germany');");

Schema::create('users', function (Blueprint $table) {
    // ...
    $table->addColumn('country', 'country');
});
```

Если не использовать `Grammar::macro`, метод `addColumn` ничего не будет знать о типе с названием `country`.

## Виртуальные колонки на основе JSON

Кроме enum'ов, нужно было что-то сделать с виртуальными колонками, созданными на основе JSON. В PostgreSQL нет виртуальных колонок как таковых.

Тут мне помог ChatGPT, предложив вместо виртуальной колонки использовать обычный индекс. Представим, что `settings` — это JSON-колонка таблицы `users`. Тогда индекс выглядит так:

```sql
CREATE INDEX ON users((settings->>'setting1'));
```

Главное — не забыть в коде приложения заменить обращение к виртуальной колонке, если оно было, на доступ по ключу в JSON-объекте.

## Подготовка к партиционированию

Следующей задачей было подготовить одну из таблиц к партиционированию. В PostgreSQL таблица должна быть создана сразу с указанием того, что её собираются партиционировать.

В моём случае это выглядело так:

```sql
CREATE TABLE actions (
    id SERIAL,
    -- ... другие колонки
    created_at TIMESTAMP NOT NULL,
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);
```

## Необходимые расширения

Основной мотивацией переезда на PostgreSQL было использование векторных типов данных, поэтому тут же в миграции я добавил:

```php
DB::statement("CREATE EXTENSION IF NOT EXISTS vector;");
```

Этот запрос нужно выполнять на каждой вновь созданной базе PostgreSQL для каждого расширения, которое мы собираемся использовать в рамках этой БД.

Также мы использовали геопространственные функции для определения расстояний, поэтому не обошлось без:

```php
DB::statement("CREATE EXTENSION IF NOT EXISTS postgis;");
```

## Локальное окружение

Упомянув активацию расширений в БД, нельзя не сказать, что сначала эти расширения должны быть установлены.

В AWS RDS они установлены по умолчанию, а для локальной разработки мы, как правило, используем готовые Docker-образы. Найти собранный под любую архитектуру образ PostgreSQL с pgvector или PostgreSQL с PostGIS по отдельности достаточно просто. А вот комбинации, где всё вместе работает на ARM64, нет.

Пришлось собирать самому:

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

## Процесс переноса

Предварительно обкатав процесс в локальном окружении, я приступил к переносу на стендовых инстансах — stage и production.

Процесс выглядел так:

1. Создаём инстанс RDS в облаке.
2. Подключаемся клиентом `psql`.
3. Включаем расширения `aws_commons` и `aws_s3`. Они нужны, чтобы использовать файлы из S3 для импорта CSV. Напомню: в RDS у нас нет доступа к файловой системе хоста БД.
4. Создаём [VPC Endpoint](https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html) для доступа базы данных к S3.
5. Изменяем конфигурацию подключения к БД в Laravel — `config/database.php`.
6. Деплоим код с новой миграцией и применяем созданную нами схему к базе PostgreSQL.
7. Останавливаем приложение, чтобы исключить новые записи в БД:

```bash
php artisan down
```

Эта команда включает maintenance mode.

8. Делаем дамп CSV-файлов:

```bash
mysqldump --port=3308 -u root -psecret db-name \
  --no-create-info \
  --fields-terminated-by=, \
  --tab=/var/lib/mysql-files \
  --fields-enclosed-by='\"' \
  --lines-terminated-by='\n'
```

Это создаст отдельный файл для каждой существующей таблицы в БД. Например:

```text
actions.sql  actions.txt
users.sql    users.txt
```

Параметры команды:

* `--no-create-info` — отключаем генерацию схемы;
* `--fields-terminated-by=,` — разделитель-запятая;
* `--tab=/var/lib/mysql-files` — сохраняем файлы в `/var/lib/mysql-files`. По умолчанию MySQL может экспортировать только в эту папку. Если её нет, нужно заранее создать вручную;
* `--fields-enclosed-by='\"'` — оборачиваем каждое значение в `\"`. Именно такой формат ожидает `COPY` в PostgreSQL;
* `--lines-terminated-by='\n'` — устанавливаем символ перевода строки.

9. Переносим `.txt`-файлы в S3-бакет. Если вы, как и я, генерировали файлы внутри контейнера, вам поможет [`docker cp`](https://docs.docker.com/reference/cli/docker/container/cp/).
10. Затем импортируем каждый файл в `psql` следующей командой — по одной на каждую таблицу:

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

11. Запускаем приложение:

```bash
php artisan up
```

## Что ещё нужно учесть?

При создании схемы для PostgreSQL можно выбрать два пути:

1. Создать схему без внешних ключей, чтобы при импорте был неважен порядок загрузки таблиц. В таком случае понадобится ещё одна миграция для добавления внешних ключей.
2. Создать схему сразу с ключами. Тогда порядок импорта таблиц из файлов будет важен.
