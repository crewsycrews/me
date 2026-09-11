<script setup lang="ts">
const route = useRoute();
const { isRussian, localePath, switchLocalePath } = useSiteLocale();

const navLinks = computed(() => [
  { label: isRussian.value ? "Главная" : "Home", to: localePath("/") },
  { label: isRussian.value ? "Для бизнеса" : "For business", to: localePath("/consulting") },
  { label: isRussian.value ? "Проекты" : "Projects", to: localePath("/projects") },
  { label: isRussian.value ? "Блог" : "Blog", to: localePath("/blog") },
  { label: isRussian.value ? "Обо мне" : "About", to: localePath("/about") },
]);

const isLinkActive = (linkPath: string) => {
  if (linkPath === "/") {
    return route.path === "/";
  }

  return route.path === linkPath || route.path.startsWith(`${linkPath}/`);
};
</script>

<template>
  <div
    class="mx-auto flex min-h-screen w-full flex-col bg-[#0f0f0f] p-3 text-center text-white [text-shadow:0_0.05rem_0.1rem_rgba(0,0,0,0.5)] [&_a]:text-[#d4ef99]"
  >
    <header class="sticky top-0 z-10 mb-6 border-b border-white/10 bg-[#0f0f0f]/95 py-3 backdrop-blur">
      <nav
        :aria-label="isRussian ? 'Основная навигация' : 'Main navigation'"
        class="flex flex-wrap items-center justify-center gap-2 font-['Anonymous_Pro','Fira_Mono',monospace] sm:gap-4"
      >
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="rounded px-2 py-1 text-sm transition-colors sm:text-base"
          :class="
            isLinkActive(link.to)
              ? 'bg-[#d4ef99]/15 text-[#d4ef99]'
              : 'opacity-80 hover:bg-white/10 hover:opacity-100'
          "
        >
          {{ link.label }}
        </NuxtLink>
        <span class="opacity-30" aria-hidden="true">|</span>
        <a
          :href="switchLocalePath"
          class="rounded border border-white/15 px-2 py-1 text-sm uppercase opacity-80 transition-colors hover:border-[#d4ef99]/40 hover:bg-white/10 hover:opacity-100 sm:text-base"
          :hreflang="isRussian ? 'en' : 'ru'"
          :lang="isRussian ? 'en' : 'ru'"
          :title="isRussian ? 'Switch to English' : 'Переключиться на русский'"
        >
          {{ isRussian ? "EN" : "RU" }}
        </a>
      </nav>
    </header>

    <main
      role="main"
      class="flex flex-1 flex-col bg-[#0f0f0f] font-['Anonymous_Pro','Fira_Mono',monospace] text-[whitesmoke] [perspective:100%] [perspective-origin:50%_400px]"
    >
      <div class="flex flex-1 flex-col [transform-style:preserve-3d]">
        <slot />
      </div>
    </main>
  </div>
</template>
