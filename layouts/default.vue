<script setup lang="ts">
const route = useRoute();

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Blog", to: "/blog" },
  { label: "About", to: "/about" },
];

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
        aria-label="Main navigation"
        class="flex items-center justify-center gap-2 font-['Anonymous_Pro','Fira_Mono',monospace] sm:gap-4"
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
      </nav>
    </header>

    <main
      role="main"
      class="bg-[#0f0f0f] font-['Anonymous_Pro','Fira_Mono',monospace] text-[whitesmoke] [perspective:100%] [perspective-origin:50%_400px]"
    >
      <div class="[transform-style:preserve-3d]">
        <slot />
      </div>
    </main>
  </div>
</template>
