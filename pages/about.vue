<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const baseUrl = new URL(runtimeConfig.app.baseURL, runtimeConfig.public.siteUrl);
const pageUrl = new URL(route.path.replace(/^\/+/, ""), baseUrl).toString();
const ogImageUrl = new URL("assets/images/og-image.png", baseUrl).toString();
const ogLogoUrl = new URL("assets/images/avatar-small.jpg", baseUrl).toString();

useSeoMeta({
  title: "About | Danil Rodin",
  description: "About Danil Rodin: fullstack developer background and experience.",
  ogTitle: "About | Danil Rodin",
  ogDescription: "About Danil Rodin: fullstack developer background and experience.",
  ogImage: ogImageUrl,
  ogImageAlt: "Danil Rodin",
  twitterCard: "summary_large_image",
  twitterImage: ogImageUrl,
});

useHead({
  meta: [
    { property: "og:locale", content: "en_US" },
    { property: "og:url", content: pageUrl },
    { property: "og:type", content: "website" },
    { property: "og:logo", content: ogLogoUrl },
  ],
});
</script>

<template>
  <div class="mt-4 flex justify-center">
    <h1 class="w-full text-center font-bold text-xl">
      About me
      <img
        class="profile-photo"
        src="/assets/images/avatar-small.jpg"
        alt="Danil Rodin"
        role="img"
        aria-label="Profile photo of Danil Rodin"
      />
    </h1>
  </div>

  <div class="mt-3 flex justify-center">
    <div class="about-card w-full md:w-9/12 lg:w-8/12 space-y-2">
      <h2 class="text-lg">Nice to meet you!</h2>
      <p>
        I'm, <b>Danil Rodin</b>, the fullstack developer, father of two, GameDev enthusiast. Passionate at family,
        work, study and friendship. If you want to get in touch, feel free to reach out on telegram <NuxtLink to="https://t.me/casiq">@casiq</NuxtLink>.
      </p>

      <h2 class="text-lg">My tech stack:</h2>
      <p><b>Backend:</b> laravel from v5 to latest, symfony v5, phalcon, NestJS</p>
      <p>
        <b>Frontend:</b> ES6, VueJS, vuex, pinia, vue-router, vuex-reststate, react, Svelte, Angular, Nuxt, React
        Native.
      </p>
      <p><b>DB:</b> MySQL, PostgreSQL, MongoDB, elasticsearch, redis.</p>
      <p><b>ENV:</b> linux based, docker, docker-compose, traefik, kuberenetes(k3s), terraform</p>
      <p><b>Methodologies:</b> agile, scrum, kanban</p>

      <p>Vegetarian. Healthy lifestyle. Sometimes I lift heavy weights in gym.</p>

    </div>
  </div>
</template>

<style scoped>
.about-card {
  color: #f4f4f4;
  line-height: 1.5;
  text-align: left;
}

.profile-photo {
  width: 220px;
  max-width: 100%;
  height: auto;
  border: 2px solid #d4ef99;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 auto 1.5rem auto;
  opacity: 0.7;
}
</style>
