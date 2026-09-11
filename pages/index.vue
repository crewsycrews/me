<script setup lang="ts">
definePageMeta({ alias: ["/en"] });

const { locale, isRussian, localePath } = useSiteLocale();
const rotatingTexts = computed(() =>
  isRussian.value
    ? ["Разработчик", "Семьянин", "Здоровый образ жизни"]
    : ["Software dev", "Family guy", "Healthy lifestyle"],
);

usePageSeo({
  title: isRussian.value
    ? "Данил Родин | Fullstack-разработчик"
    : "Danil Rodin | Fullstack Developer",
  description: isRussian.value
    ? "Личный сайт Данила Родина: fullstack-разработка, проекты, публикации и опыт."
    : "Personal website of Danil Rodin: fullstack developer, projects, links and background.",
  locale: locale.value,
  path: "/",
  schemaType: "ProfilePage",
});

useHead({
  link: [
    {
      rel: "preload",
      href: "/assets/fonts/anonymous-pro-latin-400.woff2",
      as: "font",
      type: "font/woff2",
      crossorigin: "anonymous",
    },
    {
      rel: "preload",
      href: "/assets/fonts/anonymous-pro-cyrillic-400.woff2",
      as: "font",
      type: "font/woff2",
      crossorigin: "anonymous",
    },
    {
      rel: "preload",
      href: "/assets/fonts/chakra-petch-latin-600.woff2",
      as: "font",
      type: "font/woff2",
      crossorigin: "anonymous",
    },
    {
      rel: "preload",
      href: "/assets/fonts/source-code-pro-cyrillic-400.woff2",
      as: "font",
      type: "font/woff2",
      crossorigin: "anonymous",
    },
  ],
});
</script>

<template>
  <div class="flex flex-1 flex-col">
    <div class="flex flex-1 flex-col justify-center py-8">
      <h1 class="logo">Danil Rodin</h1>
      <div class="zsh mt-2 hidden items-center md:flex">
        <span class="w-1/12" />
        <span class="w-10/12">
          <span class="shell-color">[</span>~/Crewsy/Crews<span
            class="shell-color"
            >] [</span
          >main<span class="shell-color">]<br /></span>
        </span>
        <span class="w-1/12" />
      </div>
      <div class="zsh hidden items-center md:flex">
        <span class="w-1/12" />
        <span class="w-10/12">
          <span class="text-rotator text-left">
            <span
              v-for="(text, index) in rotatingTexts"
              :key="text"
              class="text"
              :style="{ '--characters': text.length, '--delay': `${index * 8}s` }"
            >{{ text }}</span>
          </span>
        </span>
        <span class="w-1/12" />
      </div>
      <div class="mt-4 flex justify-center text-center">
        <a
          href="https://github.com/crewsycrews"
          :title="isRussian ? 'Данил Родин в GitHub' : 'Danil Rodin GitHub'"
          :aria-label="isRussian ? 'Данил Родин в GitHub' : 'Danil Rodin on GitHub'"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/assets/images/git_logo.webp"
            :alt="isRussian ? 'GitHub Данила Родина' : 'Danil Rodin GitHub'"
            class="icon"
            width="48"
            height="48"
        /></a>
        <a
          href="https://t.me/casiq"
          :title="isRussian ? 'Данил Родин в Telegram' : 'Danil Rodin Telegram'"
          :aria-label="isRussian ? 'Данил Родин в Telegram' : 'Danil Rodin on Telegram'"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/assets/images/telegram_logo.webp"
            :alt="isRussian ? 'Telegram Данила Родина' : 'Danil Rodin Telegram'"
            class="icon"
            width="48"
            height="48"
        /></a>
        <a
          href="https://itch.io/profile/casiq"
          :title="isRussian ? 'Профиль на itch.io' : 'itch.io profile'"
          :aria-label="isRussian ? 'Данил Родин на itch.io' : 'Danil Rodin on itch.io'"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/assets/images/itchio_logo.svg"
            alt="itch.io"
            class="icon"
            width="48"
            height="48"
        /></a>
        <a
          href="https://dev.to/crewsycrews"
          :title="isRussian ? 'Данил Родин на Dev.to' : 'Danil Rodin on Dev.to'"
          :aria-label="isRussian ? 'Данил Родин на Dev.to' : 'Danil Rodin on Dev.to'"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/assets/images/dev_logo.svg"
            :alt="isRussian ? 'Профиль Данила Родина на DEV' : 'Danil Rodin\'s DEV Profile'"
            class="icon devto"
            width="48"
            height="48"
          />
        </a>
        <a
          href="https://twitter.com/naniyak"
          :title="isRussian ? 'Данил Родин в Twitter' : 'Danil Rodin Twitter'"
          :aria-label="isRussian ? 'Данил Родин в Twitter' : 'Danil Rodin on Twitter'"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/assets/images/twitter_logo.webp"
            :alt="isRussian ? 'Twitter Данила Родина' : 'Danil Rodin Twitter'"
            class="icon"
            width="48"
            height="48"
        /></a>
      </div>
    </div>
    <div class="mx-auto mt-8 max-w-xl shrink-0 px-4 pb-8 text-base leading-relaxed">
      <p class="text-white/70">
        {{ isRussian ? "Помогаю бизнесу с ИТ:" : "I help businesses with IT:" }}<br />
        {{ isRussian ? "от серверов и сетей до разработки сервисов." : "from servers and networks to software development." }}
      </p>
      <a :href="localePath('/consulting')" class="mt-3 inline-block rounded border border-[#d4ef99]/40 px-4 py-2 transition-colors hover:bg-[#d4ef99]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4ef99]">
        {{ isRussian ? "Чем могу помочь вашему бизнесу →" : "How I can help your business →" }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.logo {
  font-family: "Chakra Petch", sans-serif;
  color: #d4ef99;
  font-size: 6rem;
  text-align: center;
  text-shadow: 0 0 25px rgba(40, 210, 40, 0.9);
}

@media (max-width: 576px) {
  .logo {
    font-size: 3.2rem;
  }
}

.zsh {
  font-size: 1.5rem;
  line-height: 1.2;
  font-family: "Source Code Pro", monospace;
}

.shell-color {
  animation: shell-color 50s step-end infinite;
}

.text-rotator {
  position: relative;
  display: inline-block;
  width: 20ch;
  height: 1.5em;
  margin-left: 0.5rem;
}

.text {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  box-sizing: content-box;
  overflow: hidden;
  white-space: nowrap;
  border-right: 4px solid rgb(39, 92, 23);
  font-size: 1.5rem;
  width: 0;
  opacity: 0.65;
  visibility: hidden;
  animation:
    printed-text 24s steps(var(--characters), end) var(--delay) infinite,
    flashin-border 1s step-start infinite;
}

@keyframes flashin-border {
  0% {
    border-color: rgb(39, 92, 23);
  }

  50% {
    border-color: transparent;
  }

  100% {
    border-color: rgb(39, 92, 23);
  }
}

/* Each phrase gets 8 seconds: 4 seconds to type, then 4 to read. */
@keyframes printed-text {
  0% {
    visibility: visible;
    width: 0;
  }

  16.666667% {
    visibility: visible;
    width: calc(var(--characters) * 1ch);
    animation-timing-function: step-end;
  }

  33.333333%,
  100% {
    visibility: hidden;
    width: calc(var(--characters) * 1ch);
  }
}

@keyframes shell-color {
  0% {
    color: rgb(34 197 94);
  }

  20% {
    color: rgb(255 255 255);
  }

  40% {
    color: rgb(239 68 68);
  }

  60% {
    color: rgb(59 130 246);
  }

  80% {
    color: rgb(253 224 71);
  }
}

.icon {
  width: 3rem;
  height: 3rem;
  margin: 0 5px 0;
  opacity: 0.3;
  transition: transform 0.15s;
}

.devto {
  filter: invert(1);
}

@media (hover: hover) and (pointer: fine) {
  .icon:hover {
    transform: scale(1.25, 1.25);
    opacity: 0.7;
    transition: transform 0.15s;
  }
}
</style>
