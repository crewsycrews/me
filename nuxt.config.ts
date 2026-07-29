import { readdirSync, readFileSync } from "node:fs";

const appBaseURL = "/me/";
const blogPosts = readdirSync(new URL("./content/", import.meta.url), {
  withFileTypes: true,
})
  .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
  .map((entry) => {
    const content = readFileSync(
      new URL(`./content/${entry.name}`, import.meta.url),
      "utf8",
    );
    const frontmatter = content.match(/^---\s*([\s\S]*?)\s*---/);

    return {
      slug: entry.name.replace(/\.md$/, ""),
      updated: frontmatter?.[1].match(/^updated:\s*(.+)$/m)?.[1]?.trim(),
    };
  });
const blogRoutes = blogPosts.map(({ slug }) => `/blog/${slug}`);

export default defineNuxtConfig({
  compatibilityDate: "2026-03-16",
  modules: ["@nuxtjs/tailwindcss", "@nuxt/content"],
  runtimeConfig: {
    seoBlogPosts: blogPosts,
    public: {
      siteUrl: "https://crewsycrews.github.io",
    },
  },
  app: {
    baseURL: appBaseURL,
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "Danil Rodin | Fullstack Developer",
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, shrink-to-fit=no",
        },
        { name: "author", content: "Danil Rodin" },
        { name: "theme-color", content: "#0f0f0f" },
      ],
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Chakra+Petch:600",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Anonymous+Pro|Source+Code+Pro",
        },
        { rel: "icon", type: "image/x-icon", href: `${appBaseURL}favicon.ico` },
      ],
    },
  },
  css: ["~/assets/css/tailwind.css"],
  content: {
    build: {
      markdown: {
        highlight: {
          langs: ["sql", "php", "dockerfile", "yaml"],
        },
      },
    },
  },
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: [
        "/",
        "/projects",
        "/about",
        "/blog",
        "/sitemap.xml",
        ...blogRoutes,
      ],
    },
  },
});
