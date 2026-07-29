const staticRoutes = ["/", "/about", "/projects", "/blog"];

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

export default defineEventHandler((event) => {
  const runtimeConfig = useRuntimeConfig(event);
  const baseUrl = new URL(
    runtimeConfig.app.baseURL,
    runtimeConfig.public.siteUrl,
  );

  const postRoutes = (
    runtimeConfig.seoBlogPosts as Array<{
      slug: string;
      updated?: string;
    }>
  )
    .map(({ slug, updated }) => ({
      path: `/blog/${slug}`,
      lastmod: updated,
    }))
    .sort((a, b) => a.path.localeCompare(b.path));

  const urls = [
    ...staticRoutes.map((path) => ({ path, lastmod: undefined })),
    ...postRoutes,
  ]
    .map(({ path, lastmod }) => {
      const location = new URL(path.replace(/^\/+/, ""), baseUrl).toString();
      const lastModified = lastmod
        ? `\n    <lastmod>${escapeXml(lastmod)}</lastmod>`
        : "";

      return `  <url>\n    <loc>${escapeXml(location)}</loc>${lastModified}\n  </url>`;
    })
    .join("\n");

  setHeader(event, "content-type", "application/xml; charset=UTF-8");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
});
