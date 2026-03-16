---
title: Running Laravel Cron Jobs in Docker with FrankenPHP
date: 2025-10-12
description: How to run Laravel cron jobs in Docker using FrankenPHP
---

Yesterday I spent some time digging into how cron jobs work in Laravel. There are two fairly straightforward commands involved:

```bash
php artisan schedule:run
php artisan schedule:work
```

The idea is that the first command should be placed into the **actual system crontab** in whatever environment runs your backend (or any environment that has the required environment variables and access to the database).

Your crontab entry usually looks something like this:

```bash
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```

This means the command runs **every minute**.

The idea behind this approach is to delegate the scheduling logic to **PHP and Laravel**. When this command runs, Laravel checks `app/Console/Kernel.php` for registered scheduled tasks. They typically look something like this:

```php
$schedule->command('emails:send Taylor --force')->daily();
```

In this case, `->daily()` means the command is expected to run **once per day**.

---

## What does `schedule:work` do?

According to the documentation, the second command (`schedule:work`) is intended **only for local development**.

All it really does is run `schedule:run` every minute, but implemented in PHP using an **infinite loop**.

You can see the original implementation here:

https://github.com/laravel/framework/pull/34618/files

Modern Laravel versions have a much more complex implementation, but that initial pull request still gives a very clear understanding of how the mechanism works.

---

## My setup: Docker + FrankenPHP

I run my backend application in Docker using **docker-compose**.
The base image is `dunglas/frankenphp`.

Here’s how the service is defined in `docker-compose.yml`:

```yaml
backend-cron:
  restart: unless-stopped
  build:
    target: dev
  volumes:
    - .:/app
  command: "frankenphp php-cli artisan schedule:work"
  healthcheck:
    disable: true
  env_file:
    .env
```

Every minute I was getting the same error:

```bash
backend-cron-1  | 2025-12-09T14:54:00.043306279Z sh: 1: : Permission denied
backend-cron-1  | 2025-12-09T14:55:00.041940906Z sh: 1: : Permission denied
```

At first, based on past experience, I assumed the script simply **didn't have permission to write to the filesystem**. This is a common Laravel issue when running inside Docker, usually related to the `storage` and `bootstrap/cache` directories.

But that wasn’t the case here.

---

## The actual problem

It turned out that **FrankenPHP cannot spawn subprocesses** in this setup for some reason.

I tried playing around with `setcap` in the Docker image, but eventually gave up and just wrote a simple **bash script** that replicates what `schedule:work` does:

```sh
#!/bin/sh
set -e

echo "Starting schedule loop..."

while true; do
    # Wait until the start of the next minute
    sleep $((60 - $(date +%S)))

    # Run the scheduler
    frankenphp php-cli artisan schedule:run
done
```

---

## Thoughts on FrankenPHP

Up until this point, I hadn't experienced any issues with FrankenPHP. It really worked as a **drop-in replacement** for the images I used before.

I haven't tried [worker mode](https://frankenphp.dev/docs/worker/) yet mostly because I expect it will require quite a bit of tweaking in the application itself to get everything running properly.
