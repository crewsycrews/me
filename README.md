# Crewsycrews Nuxt site

Personal site built with Nuxt.

## Development

Run:

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:3000`.

## Build

```bash
npm run build
```

## Static generation

```bash
npm run generate
```

Generated static files are written to `.output/public`.

## Публикация в блог и Telegram

Основной текст — Markdown в `content/`. После push в `master` или `main`
GitHub Actions собирает и публикует сайт, затем отправляет новые отмеченные
статьи в `@casiq_the_dev`. Английские файлы из `content/en/` в Telegram не уходят.
Обычные статьи без блока `telegram` публикуются только на сайте.

### Однократная настройка

1. Создайте бота через [@BotFather](https://t.me/BotFather).
2. Добавьте его администратором в `@casiq_the_dev` с правом публикации сообщений.
   Для редактирования старых сообщений, опубликованных вручную, также дайте
   право редактирования сообщений канала.
3. В GitHub → Settings → Secrets and variables → Actions добавьте **secret**
   `TELEGRAM_BOT_TOKEN`. Токен не нужно записывать в статью или коммитить.
   Через GitHub CLI: `gh secret set TELEGRAM_BOT_TOKEN` — команда запросит токен.
4. Workflow использует уже выданное ему `contents: write` для журнала
   в отдельной ветке `telegram-state`. Правила репозитория должны разрешать
   GitHub Actions создавать и обновлять эту ветку.

Канал задан в `scripts/telegram/content.mjs`. Менять его при существующем журнале
нельзя без отдельной миграции: идентификаторы сообщений относятся к своему каналу.

### Новая короткая запись

Добавьте к обычным метаданным статьи:

```yaml
telegram:
  publish: true
  mode: full
```

В Telegram уйдут заголовок, полный текст и ссылка на русскую страницу блога.
Поддерживаются абзацы, заголовки, списки, цитаты, выделение, ссылки и код.
Фотографии в режиме `full` превращаются в ссылки на изображения сайта;
загрузки фотографий и альбомов в этой версии нет. Таблицы и компоненты MDC
требуют отдельного анонса. Автоматическое превью ссылок отключено.

### Длинная статья

```yaml
telegram:
  publish: true
  mode: teaser
  text: |
    Продолжаю приводить в порядок сеть гостиницы.

    На этот раз **меняем корневые свитчи** — с сюрпризами
    от провайдера и старым HPE в роли переходника.
```

`text` — заранее подготовленный Markdown-анонс. Заголовок и ссылку на статью
скрипт добавит сам. Итоговое сообщение должно укладываться в 4096 символов,
включая заголовок и ссылку. Проверка консервативная: emoji могут занимать
две UTF-16 позиции. Текст не обрезается и не делится на сообщения автоматически.

### Предпросмотр и выпуск

```bash
# Офлайн: текст, ссылки и длина одного сообщения.
npm run telegram -- preview 2026-09-10-vscode-documentary

# Офлайн: все записи с telegram.publish: true.
npm run telegram -- preview

# Полная проверка перед публикацией — запускайте самостоятельно.
npm run generate
npm run telegram -- prepare
```

Предпросмотр показывает текст без визуального выделения; в Telegram выделение
передаётся через `entities`. `prepare` проверяет сообщения и сохраняет хеши
исходников и сгенерированных страниц в `.output/telegram-manifest.json`.
Сам по себе `generate`, `prepare` или `preview` ничего не отправляет.

После проверки закоммитьте нужные файлы и сделайте push. Workflow повторит
сборку и подготовку, опубликует сайт, затем сравнит HTML каждой новой страницы
на домене с локальной сборкой. Старый ответ HTTP 200 не считается готовностью.
Если сайт ещё не обновился, отправка подождёт; при исчерпании ожидания workflow
завершится ошибкой. Его можно запустить повторно после обновления Pages.

Без токена сайт всё равно публикуется, но отправка новой записи завершится
ошибкой с инструкцией по настройке. Автоматизация просматривает все отмеченные
русские статьи, поэтому пропущенный запуск можно наверстать. `publish: true`
означает готовность к отправке при следующем запуске; поле `date` не является
планировщиком публикаций. `publish: false` отключает Telegram, но не скрывает
статью с сайта.

### Существующие сообщения и правки

Для статьи, уже опубликованной в канале, укажите ID из ссылки на сообщение:

```yaml
telegram:
  publish: true
  mode: full
  message_id: 34
```

Пост про VS Code уже связан с сообщением `34`: первый запуск только импортирует
эту связь в журнал, без отправки или редактирования сообщения.
Для новых статей `message_id` указывать не нужно — бот сохранит его сам.
Не переименовывайте slug опубликованной статьи без переноса записи в журнале.

Обычные правки обновляют только сайт. Чтобы также обновить Telegram, запустите
**Actions → Nuxt SSG Deploy → Run workflow** из `master`/`main` и заполните
`telegram_update` точным slug. Скрипт отредактирует существующее сообщение;
остальные новые посты в таком запуске не отправляются. Пустое поле означает
обычную публикацию новых записей.

Для ручной отправки после актуальной сборки и публикации сайта есть команды
`npm run telegram -- publish` и `npm run telegram -- update SLUG`.
Им нужны `TELEGRAM_BOT_TOKEN` в окружении и доступ Git к `origin` на запись.

### Журнал и восстановление после сбоя

Журнал — файл `state.json` в ветке `telegram-state`. В нём нет токена и текстов
статей; есть slug, ID сообщения, хеш текста и состояние отправки. В публичном
репозитории журнал также публичный. Он не попадает в `gh-pages` и не меняет
рабочую ветку или индекс. Не удаляйте его: это история уже отправленных постов.

Перед обращением к Telegram скрипт сохраняет в удалённом журнале `pending`.
После успешного ответа — `sent` и `message_id`. Конкурирующий Git push
отклоняется до отправки сообщения. Новые push не отменяют работающий workflow.
При явном отказе Telegram попытка снимается; при тайм-ауте или неоднозначном
ответе остаётся `pending`, и автоматический повтор блокируется.

Прочитать журнал:

```bash
npm run telegram -- status
```

Если отправка оборвалась, сначала проверьте сам канал. Если сообщение есть
(или обновление применилось), возьмите ID из его ссылки и выполните:

```bash
npm run telegram -- resolve SLUG --message-id 123
```

Только если убедились, что сообщения нет (или обновление не применилось):

```bash
npm run telegram -- resolve SLUG --not-sent
```

Эти команды исправляют удалённый журнал без обращений к Telegram, затем можно
повторить workflow. При редактировании `--not-sent` восстанавливает прежнюю
запись журнала. Не снимайте `pending` вслепую: Telegram не предоставляет
ключ идемпотентности для `sendMessage`.

Проверки без реальных отправок и без сборки: `npm run test:telegram`.
Они используют поддельные ответы API и временный локальный Git-репозиторий.
Формат и ограничения сообщений: [Telegram Bot API](https://core.telegram.org/bots/api#sendmessage).

## IndexNow (Yandex)

The verification key is stored in
`public/2c63cd824616b7dfa96d8c74a879dbb5.txt` and is copied to the site root
by Nuxt. Publish the site through the existing GitHub Pages workflow first
and wait for the new version to become available.

After publishing new or updated pages, submit their canonical URLs explicitly:

```bash
npm run indexnow -- /blog/post-slug /en/blog/post-slug /blog /en/blog
```

Replace `post-slug` with the actual article slug. Include both language versions
and listing pages when they changed. Deleted page URLs can be submitted the same
way, after their removal is published. Absolute `https://danilrodin.ru/...` URLs
also work. The host comes from `public/CNAME`; duplicate URLs are removed.

To inspect the request locally without network access:

```bash
npm run indexnow -- --dry-run /about /en/about
```

The command checks the published key before sending a single JSON request to
`https://yandex.com/indexnow`. HTTP 200 means the URLs were accepted; HTTP 202
means the key is awaiting verification. Other responses fail the command.
No notification is sent during development, build, or deployment: run the
command after the updated site is live. No Yandex OAuth token is required.

Only submit new, changed, or deleted pages, not the entire sitemap on every
deployment. IndexNow does not guarantee indexing; `/sitemap.xml` remains in use.
See the [Yandex IndexNow documentation](https://yandex.ru/support/webmaster/ru/indexing-options/index-now)
and [API reference](https://yandex.ru/support/webmaster/ru/indexnow/reference).

## RSS

- Russian: `https://danilrodin.ru/rss.xml`
- English: `https://danilrodin.ru/en/rss.xml`

Both RSS 2.0 feeds are generated from the same Nuxt Content collection as the
blog, with up to 50 posts per language, newest first. Each entry includes its
canonical URL, stable GUID, original publication date, description, and full
article text in `yandex:full-text`. Dates come from frontmatter `date`, never
from the filename or build time. A date without a time is interpreted as midnight
UTC, matching the site's existing article metadata; use an ISO timestamp with
a timezone when the exact publication time is known.

After adding or editing a Markdown article, run `npm run generate` and publish
`.output/public` as usual. The feeds are prerendered as static XML files, so they
also work on GitHub Pages. No separate feed server or manual XML edits are needed.

For Yandex Webmaster, after publishing, submit the Russian feed URL under
**Представление в поиске → Свежее и актуальное → Загрузить фид**.
The [Yandex requirements](https://yandex.ru/support/webmaster/ru/search-appearance/fresh-content)
restrict this feature to current informational content, exclude blog/forum posts,
request new material at least weekly, and consider publications from the last
8 days. A valid feed does not guarantee this personal blog will be accepted.
Keep using `/sitemap.xml` for normal site indexing; do not change old publication
dates just to make articles appear fresh.
