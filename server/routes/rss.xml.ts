import { renderBlogFeed } from "../utils/blog-feed";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const posts = await queryCollection(event, "content").all();
  const xml = renderBlogFeed(
    posts,
    new URL(config.app.baseURL, config.public.siteUrl),
    "ru",
  );
  setHeader(event, "content-type", "application/rss+xml; charset=UTF-8");
  return xml;
});
