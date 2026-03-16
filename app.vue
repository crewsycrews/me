<template>
  <div
    class="mx-auto flex min-h-screen w-full max-w-[52em] flex-col bg-[#0f0f0f] p-3 text-center text-white [text-shadow:0_0.05rem_0.1rem_rgba(0,0,0,0.5)] [&_a]:text-[#d4ef99]"
  >
    <header class="mb-auto" />
    <main
      role="main"
      class="bg-[#0f0f0f] font-['Anonymous_Pro','Fira_Mono',monospace] text-[whitesmoke] [perspective:100%] [perspective-origin:50%_400px]"
    >
      <div class="[transform-style:preserve-3d]">
        <NuxtPage />
      </div>
    </main>
    <footer class="mt-auto" />
  </div>
</template>
