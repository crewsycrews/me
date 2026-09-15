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
const blogRoutes = blogPosts.flatMap(({ slug }) => [
  `/blog/${slug}`,
  `/en/blog/${slug}`,
]);

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
      leadBotUrl:
        process.env.NUXT_PUBLIC_LEAD_BOT_URL || "https://cassey.danilrodin.ru/go",
      leadBotUsername: "casiq_cassiopeia_bot",
      yandexMetrikaId,
    },
  },
  app: {
    baseURL: appBaseURL,
    head: {
      htmlAttrs: {
        lang: "ru",
      },
      title: "Данил Родин | Fullstack-разработчик",
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
        {
          rel: "icon",
          type: "image/svg+xml",
          sizes: "any",
          href: `${appBaseURL}favicon.svg`,
        },
      ],
      script: [
        {
          src: `${appBaseURL}lead-attribution.js`,
          defer: true,
        },
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

          // Keep hydration: NameWordmark starts its animations in onMounted.
          if (clientAssetsDir) {
            route.contents = inlineHomepageStyles(route.contents, clientAssetsDir);
          }
        }
      },
    },
    prerender: {
      crawlLinks: false,
      routes: [
        "/",
        "/projects",
        "/about",
        "/consulting",
        "/experience",
        "/blog",
        "/en",
        "/en/projects",
        "/en/about",
        "/en/consulting",
        "/en/experience",
        "/en/blog",
        "/sitemap.xml",
        "/rss.xml",
        "/en/rss.xml",
        ...blogRoutes,
      ],
    },
  },
});
