<script setup lang="ts">
usePageSeo({
  title: "Danil Rodin | Fullstack Developer",
  description:
    "Personal website of Danil Rodin: fullstack developer, projects, links and background.",
  path: "/",
  schemaType: "ProfilePage",
});

useHead({
  link: [
    {
      rel: "preload",
      href: "/me/assets/fonts/anonymous-pro-latin-400.woff2",
      as: "font",
      type: "font/woff2",
      crossorigin: "anonymous",
    },
    {
      rel: "preload",
      href: "/me/assets/fonts/chakra-petch-latin-600.woff2",
      as: "font",
      type: "font/woff2",
      crossorigin: "anonymous",
    },
  ],
});
</script>

<template>
  <div class="flex min-h-[calc(100vh-8.5rem)] flex-col justify-center">
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
          <span class="text textBlock0">Software dev</span>
          <span class="text textBlock1">Family guy</span>
          <span class="text textBlock2">Healthy lifestyle</span>
        </span>
      </span>
      <span class="w-1/12" />
    </div>
    <div class="mt-4 flex justify-center text-center">
      <a
        href="https://github.com/crewsycrews"
        title="Danil Rodin GitHub"
        aria-label="Danil Rodin on GitHub"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/assets/images/git_logo.webp"
          alt="Danil Rodin GitHub"
          class="icon"
          width="48"
          height="48"
      /></a>
      <a
        href="https://ru.hexlet.io/u/casiq"
        title="Hexlet profile"
        aria-label="Danil Rodin on Hexlet"
        target="_blank"
        rel="noopener noreferrer"
        ><img
          src="/assets/images/hexlet_logo.webp"
          alt="Hexlet"
          class="icon icon--portrait"
          width="33"
          height="48"
      /></a>
      <a
        href="https://t.me/casiq"
        title="Danil Rodin Telegram"
        aria-label="Danil Rodin on Telegram"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/assets/images/telegram_logo.webp"
          alt="Danil Rodin Telegram"
          class="icon"
          width="48"
          height="48"
      /></a>
      <a
        href="https://www.codewars.com/users/crewsycrews/"
        title="CodeWars profile"
        aria-label="Danil Rodin on CodeWars"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/assets/images/codewars_logo.webp"
          alt="CodeWars"
          class="icon"
          width="48"
          height="48"
      /></a>
      <a
        href="https://dev.to/crewsycrews"
        title="Danil Rodin on Dev.to"
        aria-label="Danil Rodin on Dev.to"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/assets/images/dev_logo.svg"
          alt="Danil Rodin's DEV Profile"
          class="icon devto"
          width="48"
          height="48"
        />
      </a>
      <a
        href="https://twitter.com/naniyak"
        title="Danil Rodin Twitter"
        aria-label="Danil Rodin on Twitter"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/assets/images/twitter_logo.webp"
          alt="Danil Rodin Twitter"
          class="icon"
          width="48"
          height="48"
      /></a>
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
  width: 18ch;
  height: 1.5em;
  margin-left: 0.5rem;
}

.text {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  border-right: 4px solid rgb(39, 92, 23);
  font-size: 1.5rem;
  width: 0;
  opacity: 0;
}

.textBlock0 {
  animation:
    printed-text-13 12s steps(13) infinite,
    flashin-border 0.75s step-start infinite;
}

.textBlock1 {
  animation:
    printed-text-11 12s steps(11) 4s infinite,
    flashin-border 0.75s step-start 4s infinite;
}

.textBlock2 {
  animation:
    printed-text-18 12s steps(18) 8s infinite,
    flashin-border 0.75s step-start 8s infinite;
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

@keyframes printed-text-13 {
  0% {
    opacity: 0.65;
    width: 0%;
  }

  31% {
    opacity: 0.65;
    width: 13ch;
  }

  32%,
  100% {
    opacity: 0;
    width: 13ch;
  }
}

@keyframes printed-text-11 {
  0% {
    opacity: 0.65;
    width: 0%;
  }

  31% {
    opacity: 0.65;
    width: 11ch;
  }

  32%,
  100% {
    opacity: 0;
    width: 11ch;
  }
}

@keyframes printed-text-18 {
  0% {
    opacity: 0.65;
    width: 0%;
  }

  31% {
    opacity: 0.65;
    width: 18ch;
  }

  32%,
  100% {
    opacity: 0;
    width: 18ch;
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

.icon--portrait {
  width: 2.0625rem;
}

.devto {
  filter: invert(1);
}

.icon:hover {
  transform: scale(1.25, 1.25);
  opacity: 0.7;
  transition: transform 0.15s;
}
</style>
