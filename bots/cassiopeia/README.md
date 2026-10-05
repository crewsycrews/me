# Кассеопея в MAX

[Бот `id143410863614_1_bot`](https://max.ru/id143410863614_1_bot) принимает заявки
для Данила Родина: контакт → описание задачи → уведомление
владельцу в MAX. Node.js 24, стандартные `fetch`, HTTP и `node:sqlite`, без npm-зависимостей.
Имя берётся из профиля MAX. `/start` начинает или продолжает анкету, `/cancel`
отменяет её, `/help` описывает команды, `/whoami` показывает MAX user ID.
Запрос — одним текстовым сообщением до 4000 символов.

Контакт принимается через кнопку `request_contact`: проверяется HMAC-SHA256
поля `vcf_info` с токеном бота и совпадение `max_info.user_id`, если оно есть.
Контакты без подписи, с изменённой подписью или пересланные сообщения отклоняются.
Данные контакта нужны для обратной связи по заявке — это объясняется до запроса номера.
Групповые сообщения и сообщения ботов не запускают анкету.

## Создание бота

Создайте отдельного бота на [платформе MAX для бизнеса](https://business.max.ru).
По [документации MAX](https://dev.max.ru/docs/chatbots/bots-coding/prepare)
нужен верифицированный профиль организации, ИП или самозанятого — резидента РФ.
Для доступа пользователей бот должен пройти модерацию.
Задайте имя «Кассеопея» и [аватарку](assets/cassiopeia-avatar.png).
Username `id143410863614_1_bot` уже задан в `.env.example`. Возьмите его токен
в MAX для бизнеса; Telegram username и токен не подходят.

## Подготовка сервера и запуск

На crews-main-msk репозиторий расположен в `/opt/me`. Нужны Docker, Compose v2
с `up --wait` и HTTPS reverse proxy. Долгую сборку запускайте вручную:

```bash
cd /opt/me/bots/cassiopeia
cp .env.example .env
chmod 600 .env
openssl rand -hex 32
```

Заполните `.env`: `MAX_BOT_TOKEN`, `MAX_BOT_USERNAME` (без @),
`MAX_WEBHOOK_SECRET` (результат последней команды), `MAX_WEBHOOK_URL`.
Токен и секрет остаются на сервере; не отправляйте их в чат и не коммитьте.
`OWNER_USER_ID` сначала оставьте пустым — это режим настройки: `/whoami` работает,
приём заявок закрыт, `/go` возвращает 503.

При переходе с Telegram сохраните копию старого `.env` и замените конфигурацию
шаблоном MAX. Уберите `NODE_USE_ENV_PROXY`, `HTTPS_PROXY`, `HTTP_PROXY`, `ALL_PROXY`:
старый Telegram-only прокси блокирует MAX API. Файлы `deploy/telegram-vpn.*`
и `deploy/configure-telegram-vpn.py` оставлены для прежнего сервиса; MAX их не использует.
Работающий отдельный Xray-контейнер этим изменением не останавливается.

```bash
docker compose up -d --build
docker compose logs --tail=50 cassiopeia
curl -fsS http://127.0.0.1:3088/healthz
```

Сервис обращается к `https://platform-api2.max.ru` с токеном в заголовке
`Authorization`. Если цепочка API требует дополнительный доверенный CA,
смонтируйте проверенный сертификат read-only и задайте `NODE_EXTRA_CA_CERTS`.
Проверку TLS не отключайте.

## HTTPS webhook

MAX рекомендует webhook для рабочего окружения; long polling здесь не используется.
Создайте DNS A-запись `cassey.danilrodin.ru` на сервер и подключите
[deploy/Caddyfile](deploy/Caddyfile) к существующему Caddy, сохранив другие сайты.
Входящие 80/443 должны быть доступны. Caddy публикует `/go` и `/webhook`,
проксируя в `127.0.0.1:3088`; порт контейнера остаётся на loopback.
Не записывайте query string `/go` в access logs: она содержит атрибуцию.

Webhook должен быть доступен по HTTPS на порту 443 с доверенным сертификатом.
Сначала проверьте маршрут: запрос без секретного заголовка должен вернуть 403:

```bash
curl -i -X POST https://cassey.danilrodin.ru/webhook
```

Затем явно зарегистрируйте подписку (при запуске сервиса она не изменяется):

```bash
docker compose exec cassiopeia node src/subscribe.mjs
```

Скрипт использует `MAX_WEBHOOK_URL` и `MAX_WEBHOOK_SECRET` из окружения контейнера,
подписывает на `message_created` и `bot_started`. Локальный вариант на Node.js 24:
`npm run subscribe` из каталога бота. Другие подписки не удаляются.
При каждом входящем запросе проверяется `X-Max-Bot-Api-Secret`, размер тела
ограничен 64 КиБ. Ответ 200 отправляется только после транзакционного сохранения
состояния, ключа события и очереди; при ошибке хранения возвращается 503 для повтора MAX.
Повторные сообщения дедуплицируются по `mid`, события запуска — по их полям.
Уникальные события обрабатываются в порядке доставки; общий offset не используется.

Откройте [бота в MAX](https://max.ru/id143410863614_1_bot) **из своего аккаунта**,
нажмите «Начать» и отправьте `/whoami`.
Впишите полученный user ID в `OWNER_USER_ID`, затем:

```bash
docker compose up -d --force-recreate --wait
docker compose ps
curl -fsS http://127.0.0.1:3088/healthz
```

Владелец должен начать диалог, чтобы бот мог отправлять ему уведомления.
В меню MAX задайте команды `start`, `cancel`, `help`, `whoami`.

## Автодеплой при push в master

В `.github/workflows/cassiopeia.yml` задача `deploy-cassiopeia` запускается при push
в `master`, затрагивающем `bots/cassiopeia/**`, `public/lead-attribution.js`,
`package.json` или сам workflow. Посты и остальные страницы сайта не запускают
деплой бота. Задача выполняется на self-hosted runner с метками `self-hosted`, `linux`, `x64`,
`crews-main-msk`. Runner установлен в `/opt/actions-runner` и работает под
пользователем `github-runner`. Checkout и тесты выполняются в рабочем каталоге
runner; [deploy/deploy.sh](deploy/deploy.sh) обновляет отдельный checkout `/opt/me`.
Задача не зависит от публикации сайта и постов в Telegram, которые по-прежнему
выполняются на GitHub-hosted runner. У бота отдельная очередь `cassiopeia-deployment`.
Для ручного повторного деплоя используйте **Actions → Cassiopeia Deploy → Run workflow**
с веткой `master` или Re-run jobs у соответствующего запуска. Из `main` бот не деплоится.

SSH secrets для деплоя не нужны. Для `git fetch` используется временный
`GITHUB_TOKEN` задачи с `contents: read`: SSH-адрес origin преобразуется в HTTPS
только на время этой команды, авторизация передаётся через окружение Git.
Токен не сохраняется в `.git/config`, а ключи root не копируются пользователю runner.
`.env` с токеном бота и владельцем остаётся только в `/opt/me/bots/cassiopeia/.env`.

### Runner как systemd-служба

Runner должен быть зарегистрирован для `https://github.com/crewsycrews/me`
с именем и дополнительной меткой `crews-main-msk`, от пользователя `github-runner`.
Токен регистрации вводится один раз в `config.sh`; unit его не содержит.
Для новой регистрации после распаковки официального Linux x64 runner:

```bash
sudo -iu github-runner
cd /opt/actions-runner
read -r -s -p 'Runner registration token: ' RUNNER_REGISTRATION_TOKEN
./config.sh --unattended --url https://github.com/crewsycrews/me \
  --token "$RUNNER_REGISTRATION_TOKEN" --name crews-main-msk \
  --labels crews-main-msk --work _work
unset RUNNER_REGISTRATION_TOKEN
exit
```

Установка службы выполняется штатным `svc.sh` с нашим
[шаблоном systemd](deploy/runner.service.template). Он использует `runsvc.sh`,
включает автозапуск при загрузке и перезапуск после завершения процесса.
После регистрации, если служба ещё не установлена:

```bash
sudo bash /opt/me/bots/cassiopeia/deploy/install-runner-service.sh
```

Служба для указанного имени runner:

```bash
systemctl status actions.runner.crewsycrews-me.crews-main-msk.service
journalctl -u actions.runner.crewsycrews-me.crews-main-msk.service -n 50 --no-pager
```

Ожидается `active (running)`, в логах — `Listening for Jobs`, в GitHub → Settings →
Actions → Runners — `Idle`. Пользователю `github-runner` нужны права записи в
`/opt/me` и доступ к Docker. Добавление в группу `docker` даёт фактически
root-доступ к хосту; runner предназначен для доверенных push в `master`.

Порядок деплоя: блокировка от параллельного запуска → проверка ветки/локальных
правок → `git fetch origin master` → fast-forward до последнего полученного
коммита → проверка Compose → сборка образа → пересоздание `cassiopeia` → ожидание
`healthy` до 180 секунд. Поскольку подтягивается актуальный `master`, он может
быть новее SHA запустившего workflow push; фактический SHA выводится в лог.
`flock` должен быть установлен на сервере (пакет `util-linux`).

Локальные изменения отслеживаемых файлов и отдельные серверные коммиты останавливают
деплой; `reset --hard` не используется. `.env` и Docker volume с SQLite сохраняются.
Ошибка сборки оставляет прежний контейнер работающим. Ошибка запуска/healthcheck
завершает задачу с ошибкой и выводит состояние/последние логи; автоматического
отката контейнера нет. Доступность домена и Caddy проверяется отдельно.

Для ручного запуска того же сценария на сервере нужен доступ к origin по SSH
у запускающего пользователя либо временный `DEPLOY_GITHUB_TOKEN`:

```bash
bash /opt/me/bots/cassiopeia/deploy/deploy.sh
```

## Сайт и UTM

Главная, `/consulting` и английские версии используют
`https://cassey.danilrodin.ru/go`. Кнопки обозначены MAX.
`public/lead-attribution.js` сохраняет первое и последнее касания в `sessionStorage`:
пути страниц, реферер без query/fragment, все `utm_*`, включая повторяющиеся значения.
Сервис сохраняет переход и перенаправляет в
`https://max.ru/<MAX_BOT_USERNAME>?start=web_<случайный токен>`.
Событие `bot_started` переносит атрибуцию в анкету и заявку.
Срок жизни перехода и анкеты — 30 дней; неизвестный токен явно отмечается без UTM.
Атрибуция предоставляется браузером и не используется для авторизации.

Публичные настройки сайта:

```dotenv
NUXT_PUBLIC_LEAD_BOT_URL=https://cassey.danilrodin.ru/go
```

Для прямой ссылки без UTM можно задать `NUXT_PUBLIC_LEAD_BOT_URL` как
`https://max.ru/id143410863614_1_bot?start=website`.
После настройки рабочего бота пересоберите сайт обычным процессом:

```bash
npm run generate
```

## Хранение и проверка

MAX использует отдельный файл `/app/data/cassiopeia-max.sqlite` в прежнем Docker volume.
Старый `cassiopeia.sqlite` с Telegram-заявками остаётся на месте и не читается MAX-ботом.
Не задавайте `DATABASE_PATH` на старую БД: ID двух платформ и очереди несовместимы.
Принятые заявки и ключи обработанных событий сохраняются; отправленная очередь
очищается через 7 дней. Сделайте резервную копию volume перед переходом.
Уведомления владельцу и клиенту отправляются из SQLite outbox с повторными попытками
и сохранением порядка для каждого получателя. Подтверждение клиенту означает
сохранение заявки, а не гарантированную доставку владельцу. Если MAX принял сообщение,
но ответ потерялся, повторная отправка может продублировать уведомление.

`/healthz` проверяет работу цикла доставки и возраст очереди; он не доказывает
наличие подписки MAX, доступность публичного HTTPS или успешную модерацию.
После запуска проверьте переход с сайта, собственный контакт, запрос, уведомление
владельцу, отмену и возобновление анкеты на реальном аккаунте MAX.

Быстрые локальные тесты на Node.js 24 без запросов в MAX:

```bash
npm run test:leads
```

Telegram-публикация постов (`scripts/telegram.mjs` и workflow сайта) независима
от бота заявок и продолжает работать по прежнему сценарию.

Документация: [webhook](https://dev.max.ru/docs-api/methods/POST/subscriptions),
[отправка сообщений](https://dev.max.ru/docs-api/methods/POST/messages),
[контакты и подпись](https://dev.max.ru/docs-api/use-cases/sending-messages/keyboard).
