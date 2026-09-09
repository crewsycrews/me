<script setup lang="ts">
definePageMeta({ alias: ["/en/projects"] });

const { locale, isRussian } = useSiteLocale();

usePageSeo({
  title: isRussian.value ? "Проекты | Данил Родин" : "Projects | Danil Rodin",
  description: isRussian.value
    ? "Проекты и эксперименты Данила Родина: веб-разработка, инструменты и интерактивные демо."
    : "Projects and experiments by Danil Rodin, including web development tools and interactive demos.",
  locale: locale.value,
  path: "/projects",
  schemaType: "CollectionPage",
  breadcrumbs: [
    { name: isRussian.value ? "Главная" : "Home", path: "/" },
    { name: isRussian.value ? "Проекты" : "Projects", path: "/projects" },
  ],
});
</script>

<template>
  <section class="mx-auto w-full max-w-5xl px-4 pb-10">
    <div class="mt-4 flex justify-center">
      <h1 class="w-full text-center text-xl">{{ isRussian ? "Мои проекты" : "My projects" }}</h1>
    </div>

    <div class="mt-6 grid gap-6 md:grid-cols-2">
      <a
        href="https://elementarydice.fun"
        target="_blank"
        rel="noopener noreferrer"
        class="flex flex-col items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#d4ef99]/35 hover:bg-white/[0.05]"
      >
        <span>{{ isRussian ? "Elementary Dice — браузерный автобаттлер с игральными костями" : "Elementary Dice — browser-based dice autobattler" }}</span>
        <img
          src="/assets/images/elementary-dice.webp"
          :alt="isRussian ? 'Логотип Elementary Dice' : 'Elementary Dice logo'"
          class="w-full max-w-xs rounded-2xl"
          width="512"
          height="512"
        />
      </a>

      <a
        href="https://casiq.itch.io/snowmans-home"
        target="_blank"
        rel="noopener noreferrer"
        class="flex flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#d4ef99]/35 hover:bg-white/[0.05]"
      >
        <span>{{ isRussian ? "Snowman’s Home — игра на выживание" : "Snowman’s Home — survival game" }}</span>
        <img
          src="/assets/images/snowmans-home.jpeg"
          :alt="isRussian ? 'Логотип Snowman’s Home' : 'Snowman’s Home logo'"
          class="w-full rounded-2xl"
          width="1196"
          height="378"
        />
      </a>

      <a
        href="https://casiq.itch.io/ctf"
        target="_blank"
        rel="noopener noreferrer"
        class="flex flex-col items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#d4ef99]/35 hover:bg-white/[0.05]"
      >
        <span>{{ isRussian ? "Небольшой прототип игры «Змейка»" : "Small snake game prototype" }}</span>
        <video class="w-full max-w-xs rounded-2xl" autoplay muted loop playsinline>
          <source src="/assets/images/ctf-gameplay.mp4" type="video/mp4" />
        </video>
      </a>

      <a
        href="https://marketplace.visualstudio.com/items?itemName=crewsycrews.bundlephobia-support"
        target="_blank"
        rel="noopener noreferrer"
        class="flex flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#d4ef99]/35 hover:bg-white/[0.05]"
      >
        <span>{{ isRussian ? "Расширение BundlePhobia для VS Code в Visual Studio Marketplace" : "BundlePhobia VS Code extension on Visual Studio Marketplace" }}</span>
        <img
          src="https://crewsycrews.gallerycdn.vsassets.io/extensions/crewsycrews/bundlephobia-support/0.5.1/1756746082783/Microsoft.VisualStudio.Services.Icons.Default"
          :alt="isRussian ? 'Иконка расширения BundlePhobia для VS Code' : 'BundlePhobia VS Code extension icon'"
          class="icon"
        />
      </a>
    </div>

    <DicePlayground />
  </section>
</template>
