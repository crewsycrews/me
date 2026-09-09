type ContentNode = string | [string, Record<string, unknown>, ...ContentNode[]];

type FeedPost = {
  path: string;
  title: string;
  description?: string;
  meta: Record<string, unknown>;
  body: { value: ContentNode[] };
};

const escapeXml = (value: string) =>
  value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

// Nuxt Content stores rendered Markdown as a MiniMark tree. Read its text,
// preserving paragraph boundaries and the original code instead of highlighting.
const nodeText = (node: ContentNode): string => {
  if (typeof node === "string") return node;

  const [tag, props, ...children] = node;
  if (["img", "script", "style"].includes(tag)) return "";
  if (tag === "br" || tag === "hr") return "\n";
  if (tag === "pre" && typeof props.code === "string") {
    return `\n${props.code}\n\n`;
  }

  const text = children.map(nodeText).join("");
  if (tag === "td" || tag === "th") return `${text}\t`;
  if (/^(p|h[1-6]|li|ul|ol|blockquote|pre|tr|table|div)$/.test(tag)) {
    return `${text}\n\n`;
  }
  return text;
};

export const renderBlogFeed = (
  posts: FeedPost[],
  baseUrl: URL,
  locale: "ru" | "en",
) => {
  const isRussian = locale === "ru";
  const blogPath = isRussian ? "blog" : "en/blog";
  const feedUrl = new URL(isRussian ? "rss.xml" : "en/rss.xml", baseUrl);
  const title = isRussian ? "Блог | Данил Родин" : "Blog | Danil Rodin";
  const description = isRussian
    ? "Заметки о разработке, инструментах и работе."
    : "Notes on engineering, tools, and work.";

  const entries = posts
    .filter((post) =>
      isRussian ? !post.path.startsWith("/en/") : post.path.startsWith("/en/"),
    )
    .map((post) => {
      const published = new Date(String(post.meta.date));
      if (!post.title || !Number.isFinite(published.getTime())) {
        throw new Error(`RSS: missing title or invalid date in ${post.path}`);
      }
      return { post, published };
    })
    .sort((a, b) => b.published.getTime() - a.published.getTime())
    .slice(0, 50)
    .map(({ post, published }) => {
      const slug = post.path.replace(/^\/en\//, "").replace(/^\//, "");
      const url = escapeXml(new URL(`${blogPath}/${slug}`, baseUrl).toString());
      const fullText = post.body.value.map(nodeText).join("").trim();
      if (!fullText) throw new Error(`RSS: empty article body in ${post.path}`);

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${published.toUTCString()}</pubDate>
      <description>${escapeXml(post.description || "")}</description>
      <yandex:full-text>${escapeXml(fullText)}</yandex:full-text>
    </item>`;
    });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:yandex="http://news.yandex.ru">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${escapeXml(new URL(blogPath, baseUrl).toString())}</link>
    <description>${escapeXml(description)}</description>
    <language>${locale}</language>
    <atom:link href="${escapeXml(feedUrl.toString())}" rel="self" type="application/rss+xml" />
${entries.join("\n")}
  </channel>
</rss>
`;
  if (new TextEncoder().encode(xml).byteLength > 10 * 1024 * 1024) {
    throw new Error("RSS: feed exceeds the Yandex 10 MB limit");
  }
  return xml;
};
