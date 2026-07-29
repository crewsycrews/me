<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

usePageSeo({
  title: "Danil Rodin | Fullstack Developer",
  description:
    "Personal website of Danil Rodin: fullstack developer, projects, links and background.",
  path: "/",
  schemaType: "ProfilePage",
});

const textBlocks = ["Software dev", "Family guy", "Healthy lifestyle"];
const shellColors = [
  "text-green-500",
  "text-white",
  "text-red-500",
  "text-blue-500",
  "text-yellow-300",
];
const logoColors = [
  "lightGreen",
  "lightWhite",
  "lightRed",
  "lightBlue",
  "lightYellow",
];

const logoColorIndex = ref(0);
const shellColorIndex = ref(0);
const textIndex = ref(0);
const logoAnimKey = ref(0);
const pendingLogoColorIndex = ref<number | null>(null);

const classForText = computed(() => `textBlock${textIndex.value}`);
const textyText = computed(() => textBlocks[textIndex.value]);
const logoClass = computed(() => logoColors[logoColorIndex.value]);
const shellColorClass = computed(() => shellColors[shellColorIndex.value]);

const timers: Array<
  ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>
> = [];

onMounted(() => {
  timers.push(
    setTimeout(() => {
      logoColorIndex.value = 0;
      logoAnimKey.value += 1;
    }, 1),
  );

  timers.push(
    setInterval(() => {
      pendingLogoColorIndex.value =
        (logoColorIndex.value + 1) % logoColors.length;
      logoAnimKey.value += 1;
    }, 10000),
  );

  timers.push(
    setTimeout(() => {
      shellColorIndex.value = (shellColorIndex.value + 1) % shellColors.length;
      timers.push(
        setInterval(() => {
          shellColorIndex.value =
            (shellColorIndex.value + 1) % shellColors.length;
        }, 10000),
      );
    }, 11800),
  );

  timers.push(
    setInterval(() => {
      textIndex.value = (textIndex.value + 1) % textBlocks.length;
    }, 4000),
  );
});

onBeforeUnmount(() => {
  timers.forEach((timer) => {
    clearInterval(timer as ReturnType<typeof setInterval>);
    clearTimeout(timer as ReturnType<typeof setTimeout>);
  });
});

const handleLogoAnimationEnd = () => {
  if (pendingLogoColorIndex.value === null) {
    return;
  }

  logoColorIndex.value = pendingLogoColorIndex.value;
  pendingLogoColorIndex.value = null;
};
</script>

<template>
  <div class="flex min-h-[calc(100vh-8.5rem)] flex-col justify-center">
    <h1
      :key="logoAnimKey"
      :class="['logo', logoClass]"
      @animationend="handleLogoAnimationEnd"
    >
      Danil Rodin
    </h1>
    <div class="zsh mt-2 hidden items-center md:flex">
      <span class="w-1/12" />
      <span class="w-10/12">
        <span :class="shellColorClass">[</span>~/Crewsy/Crews<span
          :class="shellColorClass"
          >] [</span
        >main<span :class="shellColorClass">]<br /></span>
      </span>
      <span class="w-1/12" />
    </div>
    <div class="zsh hidden items-center md:flex">
      <span class="w-1/12" />
      <span class="w-10/12">
        <span class="text-left">
          <span :class="[classForText, 'text']">
            {{ textyText }}
          </span>
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
          src="/assets/images/git_logo.png"
          alt="Danil Rodin GitHub"
          class="icon"
      /></a>
      <a
        href="https://ru.hexlet.io/u/casiq"
        title="Hexlet profile"
        aria-label="Danil Rodin on Hexlet"
        target="_blank"
        rel="noopener noreferrer"
        ><img src="/assets/images/hexlet_logo.png" alt="Hexlet" class="icon"
      /></a>
      <a
        href="https://t.me/casiq"
        title="Danil Rodin Telegram"
        aria-label="Danil Rodin on Telegram"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/assets/images/telegram_logo.png"
          alt="Danil Rodin Telegram"
          class="icon"
      /></a>
      <a
        href="https://www.codewars.com/users/crewsycrews/"
        title="CodeWars profile"
        aria-label="Danil Rodin on CodeWars"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/assets/images/codewars_logo.png" alt="CodeWars" class="icon"
      /></a>
      <a
        href="https://dev.to/crewsycrews"
        title="Danil Rodin on Dev.to"
        aria-label="Danil Rodin on Dev.to"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://d2fltix0v2e0sb.cloudfront.net/dev-badge.svg"
          alt="Danil Rodin's DEV Profile"
          class="icon devto"
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
          src="/assets/images/twitter_logo.png"
          alt="Danil Rodin Twitter"
          class="icon"
      /></a>
    </div>
  </div>
</template>

<style scoped>
.logo {
  font-family: "Chakra Petch", sans-serif;
  color: rgb(0, 0, 0);
  font-size: 6rem;
  text-align: center;
  animation: logo-flicker 1.8s;
}

@media (max-width: 576px) {
  .logo {
    font-size: 3.2rem;
  }
}

.lightGreen {
  text-shadow: 0 0 25px rgba(40, 210, 40, 0.9);
}

.lightRed {
  text-shadow: 0 0 25px rgba(210, 40, 40, 0.9);
}

.lightYellow {
  text-shadow: 0 0 25px rgba(210, 210, 40, 0.9);
}

.lightBlue {
  text-shadow: 0 0 25px rgba(40, 40, 210, 0.9);
}

.lightWhite {
  text-shadow: 0 0 25px rgba(200, 200, 200, 0.9);
}

.zsh {
  font-size: 1.5rem;
  line-height: 1.2;
  font-family: "Source Code Pro", monospace;
}

.text {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  border-right: 4px solid rgb(39, 92, 23);
  font-size: 1.5rem;
  opacity: 0.65;
  margin-left: 0.5rem;
}

.textBlock0 {
  width: 13ch;
  animation: printed-text 4s steps(13) infinite, flashin-border 0.75s step-start infinite;
}

.textBlock1 {
  width: 11ch;
  animation: printed-text1 5s steps(11) infinite, flashin-border 0.75s step-start infinite;
}

.textBlock2 {
  width: 18ch;
  animation: printed-text2 4s steps(18) infinite, flashin-border 0.75s step-start infinite;
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

@keyframes printed-text {
  from {
    width: 0%;
  }

  37% {
    width: 13ch;
  }
}

@keyframes printed-text1 {
  from {
    width: 0%;
  }

  37% {
    width: 11ch;
  }
}

@keyframes printed-text2 {
  from {
    width: 0%;
  }

  37% {
    width: 18ch;
  }
}

@keyframes logo-flicker {
  5% {
    opacity: 0.9;
  }

  30% {
    opacity: 0.25;
  }

  35% {
    opacity: 0.9;
  }

  50% {
    opacity: 0.3;
  }

  55% {
    opacity: 0.95;
  }

  75% {
    opacity: 0.4;
  }

  95% {
    opacity: 0.92;
  }

  100% {
    opacity: 1;
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

.icon:hover {
  transform: scale(1.25, 1.25);
  opacity: 0.7;
  transition: transform 0.15s;
}
</style>
