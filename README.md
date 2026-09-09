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
