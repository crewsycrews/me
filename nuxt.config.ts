import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

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

const stripHomepageHydration = (html: string) =>
  html
    .replace(/<link rel="preload" as="fetch"[^>]*>/g, "")
    .replace(/<link rel="modulepreload"[^>]*>/g, "")
    .replace(/<script type="module"[^>]*><\/script>/g, "")
    .replace(
      /<script type="application\/json" data-nuxt-data=[\s\S]*?<\/script>/g,
      "",
    )
    .replace(/<script>window\.__NUXT__=[\s\S]*?<\/script>/g, "");

const inlineHomepageStyles = (html: string, clientAssetsDir: string) =>
  html.replace(
    /<link rel="stylesheet" href="\/me\/_nuxt\/([^"]+)" crossorigin>/g,
    (_, fileName: string) =>
      `<style>${readFileSync(join(clientAssetsDir, fileName), "utf8")}</style>`,
  );

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
    hooks: {
      "prerender:generate": (route, nitro) => {
        if (route.route === "/" && route.contents) {
          const clientAssetsDir = nitro.options.publicAssets.find(
            ({ dir }) => dir.endsWith("/_nuxt"),
          )?.dir;

          route.contents = stripHomepageHydration(
            clientAssetsDir
              ? inlineHomepageStyles(route.contents, clientAssetsDir)
              : route.contents,
          );
        }
      },
    },
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
