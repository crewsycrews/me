const appBaseURL = "/me/";

export default defineNuxtConfig({
  compatibilityDate: "2026-03-16",
  modules: ["@nuxtjs/tailwindcss", "@nuxt/content"],
  runtimeConfig: {
    public: {
      siteUrl: "https://crewsycrews.github.io",
    },
  },
  app: {
    baseURL: appBaseURL,
    head: {
      title: "Welcome to Crewsy Crews(Danil Rodin) personal web-page.",
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, shrink-to-fit=no",
        },
      ],
      link: [
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
      crawlLinks: true,
      routes: ["/", "/projects", "/about", "/blog"],
    },
  },
});
