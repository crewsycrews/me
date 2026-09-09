<script setup lang="ts">
definePageMeta({ alias: ["/en/about"] });

const { locale, isRussian } = useSiteLocale();

usePageSeo({
  title: isRussian.value ? "Обо мне | Данил Родин" : "About | Danil Rodin",
  description: isRussian.value
    ? "О Даниле Родине: опыт и технологии fullstack-разработчика."
    : "About Danil Rodin: fullstack developer background and experience.",
  locale: locale.value,
  path: "/about",
  schemaType: "AboutPage",
  breadcrumbs: [
    { name: isRussian.value ? "Главная" : "Home", path: "/" },
    { name: isRussian.value ? "Обо мне" : "About", path: "/about" },
  ],
});
</script>

<template>
  <div class="mt-4 flex justify-center">
    <h1 class="w-full text-center font-bold text-xl">
      {{ isRussian ? "Обо мне" : "About me" }}
      <img
        class="profile-photo"
        src="/assets/images/avatar-small.jpg"
        alt="Danil Rodin"
        role="img"
        :aria-label="isRussian ? 'Фотография Данила Родина' : 'Profile photo of Danil Rodin'"
      />
    </h1>
  </div>

  <div class="mt-3 flex justify-center">
    <div v-if="isRussian" class="about-card w-full md:w-9/12 lg:w-8/12 space-y-2">
      <h2 class="text-lg">Приятно познакомиться!</h2>
      <p>
        Я <b>Данил Родин</b> — fullstack-разработчик, отец двоих детей и энтузиаст GameDev. Ценю семью,
        работу, учёбу и дружбу. Если хотите связаться со мной, напишите в Telegram: <NuxtLink to="https://t.me/casiq">@casiq</NuxtLink>.
      </p>

      <h2 class="text-lg">Мой стек:</h2>
      <p><b>Бэкенд:</b> Laravel от версии 5 до актуальной, Symfony 5, Phalcon, NestJS, Spring Boot.</p>
      <p>
        <b>Фронтенд:</b> ES6, Vue.js, Vuex, Pinia, Vue Router, vuex-reststate, React, Svelte, Angular, Nuxt, React
        Native.
      </p>
      <p><b>Базы данных:</b> MySQL, PostgreSQL, MongoDB, Elasticsearch, Redis.</p>
      <p><b>Инфраструктура:</b> Linux, Docker, Docker Compose, Traefik, Kubernetes (k3s), Terraform.</p>
      <p><b>Методологии:</b> Agile, Scrum, Kanban.</p>

      <p>Вегетарианец. Веду здоровый образ жизни. Иногда поднимаю тяжёлые веса в зале.</p>

    </div>
    <div v-else class="about-card w-full md:w-9/12 lg:w-8/12 space-y-2">
      <h2 class="text-lg">Nice to meet you!</h2>
      <p>
        I'm <b>Danil Rodin</b>, a fullstack developer, father of two, and GameDev enthusiast. Passionate about family,
        work, study, and friendship. If you want to get in touch, feel free to reach out on Telegram <NuxtLink to="https://t.me/casiq">@casiq</NuxtLink>.
      </p>

      <h2 class="text-lg">My tech stack:</h2>
      <p><b>Backend:</b> Laravel from v5 to latest, Symfony v5, Phalcon, NestJS, Spring Boot.</p>
      <p>
        <b>Frontend:</b> ES6, Vue.js, Vuex, Pinia, Vue Router, vuex-reststate, React, Svelte, Angular, Nuxt, React
        Native.
      </p>
      <p><b>DB:</b> MySQL, PostgreSQL, MongoDB, Elasticsearch, Redis.</p>
      <p><b>ENV:</b> Linux, Docker, Docker Compose, Traefik, Kubernetes (k3s), Terraform.</p>
      <p><b>Methodologies:</b> Agile, Scrum, Kanban.</p>

      <p>Vegetarian. Healthy lifestyle. Sometimes I lift heavy weights in the gym.</p>
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
