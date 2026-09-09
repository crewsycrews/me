---
title: Запуск cron-задач Laravel в Docker с FrankenPHP
date: 2025-10-12
description: Как запускать cron-задачи Laravel в Docker с FrankenPHP
---

Вчера сидел и разбирался с запуском cron-задач в Laravel. Есть там две бесхитростные команды:

```bash
php artisan schedule:run
php artisan schedule:work
```

Подразумевается, что первую мы добавим в настоящий `crontab` в окружении, где крутится бэкенд, или в любом другом месте, где есть нужные переменные окружения и возможность подключиться к БД.

В `crontab` должно быть что-то такое:

```bash
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```

Это означает запуск каждую минуту.

Идея в том, чтобы сам график выполнения команд передать под управление PHP — и Laravel в частности. При запуске этой команды скрипт смотрит в `app/Console/Kernel.php` и проверяет зарегистрированные графики выполнения. Они выглядят примерно так:

```php
$schedule->command('emails:send Taylor --force')->daily();
```

`->daily()` в данном случае означает, что команда будет выполняться ежедневно.

## Что делает schedule:work?

Вторую команду, согласно документации, нужно запускать только локально. Всё, что она делает, — запускает `schedule:run` каждую минуту средствами PHP, используя бесконечный цикл.

[Первый pull request с реализацией](https://github.com/laravel/framework/pull/34618/files) даёт исчерпывающее понимание того, как это работает. В современной версии Laravel код выглядит намного сложнее.

## Мой случай: Docker и FrankenPHP

Я запускаю бэкенд-приложение в Docker с помощью Docker Compose. Базовый образ — `dunglas/frankenphp`.

Вот как сервис объявлен в `docker-compose.yml`:

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

Каждую минуту я получал одну и ту же ошибку:

```text
backend-cron-1  | 2025-12-09T14:54:00.043306279Z sh: 1: : Permission denied
backend-cron-1  | 2025-12-09T14:55:00.041940906Z sh: 1: : Permission denied
```

По старой памяти я ожидал, что скрипт просто не может писать в файловую систему. Это частая проблема Laravel и его папок `storage` и `bootstrap/cache`, когда приложение крутится в Docker.

Но не тут-то было.

## В чём оказалась проблема

Как оказалось, FrankenPHP по какой-то причине не может создавать подпроцессы. Я немного поиграл с `setcap` в Docker-образе и плюнул — сделал простой shell-скрипт, который делает то же самое, что и `schedule:work`:

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

До этого момента я не испытывал никаких проблем с FrankenPHP. Он действительно сработал как drop-in replacement для образов, которые я использовал раньше.

[Worker mode](https://frankenphp.dev/docs/worker/) пока не пробовал: ожидаю, что придётся основательно дорабатывать само приложение, чтобы всё это завелось.
