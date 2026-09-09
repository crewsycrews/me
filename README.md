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
