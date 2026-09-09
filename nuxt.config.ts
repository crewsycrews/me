import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const appBaseURL = "/";
const yandexMetrikaId = 112425727;
const yandexMetrikaScript = `
(function(m,e,t,r,i,k,a){
  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
ym(${yandexMetrikaId},"init",{defer:true,clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});
ym(${yandexMetrikaId},"hit",window.location.href);
`;
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
    /<link rel="stylesheet" href="\/_nuxt\/([^"]+)" crossorigin>/g,
    (_, fileName: string) =>
      `<style>${readFileSync(join(clientAssetsDir, fileName), "utf8")}</style>`,
  );

export default defineNuxtConfig({
  compatibilityDate: "2026-03-16",
  modules: ["@nuxtjs/tailwindcss", "@nuxt/content"],
  runtimeConfig: {
    seoBlogPosts: blogPosts,
    public: {
      siteUrl: "https://danilrodin.ru",
      yandexMetrikaId,
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
      script: [
        {
          key: "yandex-metrika",
          innerHTML: yandexMetrikaScript,
        },
      ],
      noscript: [
        {
          key: "yandex-metrika-noscript",
          innerHTML: `<div><img src="https://mc.yandex.ru/watch/${yandexMetrikaId}" style="position:absolute;left:-9999px" alt="" /></div>`,
          tagPosition: "bodyClose",
        },
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
