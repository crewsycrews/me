<script setup lang="ts">
const route = useRoute();

const { data: posts } = await useAsyncData("blog-posts", () =>
  queryCollection("content").order("path", "DESC").all(),
);

const POSTS_PER_PAGE = 6;

const currentPage = computed(() => {
  const rawPage = Number(route.query.page || 1);
  if (!Number.isFinite(rawPage) || rawPage < 1) {
    return 1;
  }

  return Math.floor(rawPage);
});

const totalPages = computed(() => {
  const total = posts.value?.length || 0;
  return Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
});

const safePage = computed(() => Math.min(currentPage.value, totalPages.value));

const paginatedPosts = computed(() => {
  const start = (safePage.value - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  return posts.value?.slice(start, end) || [];
});

const pageNumbers = computed(() => {
  const maxVisible = 5;
  const start = Math.max(1, safePage.value - Math.floor(maxVisible / 2));
  const end = Math.min(totalPages.value, start + maxVisible - 1);
  const adjustedStart = Math.max(1, end - maxVisible + 1);

  return Array.from(
    { length: end - adjustedStart + 1 },
    (_, idx) => adjustedStart + idx,
  );
});

const pageLink = (page: number) => ({
  path: "/blog",
  query: page > 1 ? { page: String(page) } : {},
});

usePageSeo({
  title: "Blog | Danil Rodin",
  description:
    "Engineering notes by Danil Rodin about backend development, infrastructure, databases and developer tools.",
  path: "/blog",
  schemaType: "Blog",
  breadcrumbs: [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ],
});
</script>

<template>
  <section class="mx-auto mt-6 w-full md:w-10/12 lg:w-8/12">
    <header class="mb-6 text-left">
      <h1 class="text-3xl font-bold tracking-tight">Blog</h1>
      <p class="mt-2 text-sm opacity-75">Notes on engineering, tools, and work.</p>
    </header>

    <ul v-if="paginatedPosts.length" class="space-y-4 text-left">
      <li
        v-for="post in paginatedPosts"
        :key="post.path"
        class="rounded-lg border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/[0.08]"
      >
        <NuxtLink :to="`/blog/${post.stem}`" class="text-xl font-bold hover:underline">
          {{ post.title }}
        </NuxtLink>
        <p v-if="post.description" class="mt-2 text-sm opacity-80">{{ post.description }}</p>
        <p v-if="post.meta?.date" class="mt-3 text-xs uppercase tracking-wide opacity-70">
          {{ new Date(post.meta.date).toLocaleDateString() }}
        </p>
      </li>
    </ul>
    <p v-else class="rounded-lg border border-white/10 bg-white/5 p-6 text-center opacity-80">
      No posts yet.
    </p>

    <nav
      v-if="totalPages > 1"
      class="mt-6 flex flex-wrap items-center justify-center gap-2"
      aria-label="Pagination"
    >
      <NuxtLink
        v-if="safePage > 1"
        :to="pageLink(safePage - 1)"
        class="rounded border border-white/20 px-3 py-1.5 text-sm hover:bg-white/10"
      >
        Prev
      </NuxtLink>
      <span
        v-else
        class="rounded border border-white/10 px-3 py-1.5 text-sm opacity-40"
        aria-hidden="true"
      >
        Prev
      </span>

      <NuxtLink
        v-for="page in pageNumbers"
        :key="page"
        :to="pageLink(page)"
        class="rounded px-3 py-1.5 text-sm"
        :class="
          page === safePage
            ? 'border border-[#d4ef99] bg-[#d4ef99]/15 text-[#d4ef99]'
            : 'border border-white/20 hover:bg-white/10'
        "
      >
        {{ page }}
      </NuxtLink>

      <NuxtLink
        v-if="safePage < totalPages"
        :to="pageLink(safePage + 1)"
        class="rounded border border-white/20 px-3 py-1.5 text-sm hover:bg-white/10"
      >
        Next
      </NuxtLink>
      <span
        v-else
        class="rounded border border-white/10 px-3 py-1.5 text-sm opacity-40"
        aria-hidden="true"
      >
        Next
      </span>
    </nav>
  </section>
</template>
