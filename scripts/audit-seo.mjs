import { readFile, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";

const root = new URL("../", import.meta.url);
const output = resolve(process.argv[2] || ".output/public");
const origin = `https://${(await readFile(new URL("public/CNAME", root), "utf8")).trim()}`;
const errors = [];
const fail = (path, message) => errors.push(`${path}: ${message}`);

// Check the sitemap against the source inventory, so a missing page cannot pass.
async function sourcePaths(directory, extension, prefix = "") {
  const paths = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const name = `${prefix}${entry.name}`;
    if (entry.isDirectory()) {
      paths.push(...await sourcePaths(new URL(`${entry.name}/`, directory), extension, `${name}/`));
    } else if (name.endsWith(extension) && !name.includes("[")) {
      paths.push(name.slice(0, -extension.length));
    }
  }
  return paths;
}

const pagePaths = (await sourcePaths(new URL("pages/", root), ".vue"))
  .map((path) => `/${path.replace(/(^|\/)index$/, "")}`.replace(/\/+$/, "") || "/");
const expectedPaths = new Set([
  ...pagePaths.flatMap((path) => [path === "/" ? "/" : `${path}/`, path === "/" ? "/en/" : `/en${path}/`]),
  ...(await sourcePaths(new URL("content/", root), ".md"))
    .map((path) => path.startsWith("en/") ? `/en/blog/${path.slice(3)}/` : `/blog/${path}/`),
]);

const decodeXml = (value) => value.replace(/&(amp|lt|gt|quot|apos);/g,
  (_, entity) => ({ amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" })[entity]);
const sitemap = await readFile(join(output, "sitemap.xml"), "utf8");
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decodeXml(match[1]));
const seenPaths = new Set();
const seenTitles = new Map();

// Nuxt emits quoted attributes; allow either quote style and any attribute order.
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))]
  .map(([tag]) => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)]
    .map(([, key, double, single]) => [key.toLowerCase(), decodeXml(double ?? single)])));

for (const location of locations) {
  const url = new URL(location);
  const path = url.pathname;
  if (url.origin !== origin || url.search || url.hash || !expectedPaths.has(path)) {
    fail(location, "Unexpected sitemap URL");
    continue;
  }
  if (seenPaths.has(path)) fail(path, "Duplicate sitemap URL");
  seenPaths.add(path);

  let html;
  try {
    html = await readFile(join(output, path.slice(1), "index.html"), "utf8");
  } catch {
    fail(path, "Generated HTML is missing");
    continue;
  }
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] || "";
  const titles = [...head.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];
  const title = decodeXml(titles[0]?.[1] || "").trim();
  if (titles.length !== 1 || !title) fail(path, "Expected exactly one nonempty <title>");
  if (title && seenTitles.has(title)) fail(path, `Title duplicates ${seenTitles.get(title)}`);
  if (title) seenTitles.set(title, path);

  const meta = tags(head, "meta");
  for (const name of ["description", "og:title", "twitter:title"]) {
    const matches = meta.filter((tag) => (tag.name || tag.property) === name);
    if (matches.length !== 1 || !matches[0].content?.trim()) fail(path, `Missing or duplicate ${name}`);
  }
  const canonicals = tags(head, "link").filter((tag) => tag.rel === "canonical");
  if (canonicals.length !== 1 || canonicals[0].href !== location) {
    fail(path, "Canonical must match the sitemap URL exactly");
  }
}

for (const path of expectedPaths) {
  if (!seenPaths.has(path)) fail(path, "Source page is missing from the sitemap");
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`SEO audit passed: ${seenPaths.size} pages have unique titles, descriptions, social titles and matching canonicals.`);
}
