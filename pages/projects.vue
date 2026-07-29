<script setup lang="ts">
usePageSeo({
  title: "Projects | Danil Rodin",
  description:
    "Projects and experiments by Danil Rodin, including web development tools and interactive demos.",
  path: "/projects",
  schemaType: "CollectionPage",
  breadcrumbs: [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
  ],
});
</script>

<template>
  <section class="mx-auto w-full max-w-5xl px-4 pb-10">
    <div class="mt-4 flex justify-center">
      <h1 class="w-full text-center text-xl">My projects</h1>
    </div>

    <div class="mt-6 grid gap-6 md:grid-cols-2">
      <a
        href="https://casiq.itch.io/ctf"
        target="_blank"
        rel="noopener noreferrer"
        class="flex flex-col items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#d4ef99]/35 hover:bg-white/[0.05]"
      >
        <span>Small snake game prototype</span>
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
        <span>BundlePhobia VS Code extension on Visual Studio Marketplace</span>
        <img
          src="https://crewsycrews.gallerycdn.vsassets.io/extensions/crewsycrews/bundlephobia-support/0.5.1/1756746082783/Microsoft.VisualStudio.Services.Icons.Default"
          alt="BundlePhobia VS Code extension icon"
          class="icon"
        />
      </a>
    </div>

    <DicePlayground />
  </section>
</template>
