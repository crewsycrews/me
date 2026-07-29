<script setup lang="ts">
const route = useRoute();

const slugParam = route.params.slug;
const slug = Array.isArray(slugParam) ? slugParam.join("/") : String(slugParam || "");
const path = `/${slug}`;
const contentRef = ref<HTMLElement | null>(null);

const { data: post } = await useAsyncData(`blog-post:${path}`, () =>
  queryCollection("content").path(path).first(),
);

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Post not found",
  });
}

const postTitle = String(post.value.title || "Blog post");
const postDescription = String(post.value.description || "Blog post");
const publishedTime = post.value.meta?.date
  ? new Date(String(post.value.meta.date)).toISOString()
  : undefined;

usePageSeo({
  title: `${postTitle} | Danil Rodin`,
  description: postDescription,
  path: `/blog/${slug}`,
  schemaType: "BlogPosting",
  headline: postTitle,
  publishedTime,
  breadcrumbs: [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: postTitle, path: `/blog/${slug}` },
  ],
});

const enhanceCodeBlocks = () => {
  if (!import.meta.client || !contentRef.value) {
    return;
  }

  const blocks = Array.from(contentRef.value.querySelectorAll("pre"));

  for (const pre of blocks) {
    pre.classList.add("code-block-enhanced");

    if (pre.parentElement?.classList.contains("code-block-wrap")) {
      continue;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "code-block-wrap";
    pre.parentElement?.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "code-copy-btn";
    button.textContent = "Copy";
    button.setAttribute("aria-label", "Copy code to clipboard");

    button.addEventListener("click", async () => {
      const codeNode = pre.querySelector("code");
      const code = codeNode?.textContent || pre.textContent || "";
      if (!code.trim()) {
        return;
      }

      try {
        await navigator.clipboard.writeText(code);
        button.textContent = "Copied";
        window.setTimeout(() => {
          button.textContent = "Copy";
        }, 1400);
      } catch {
        button.textContent = "Failed";
        window.setTimeout(() => {
          button.textContent = "Copy";
        }, 1400);
      }
    });

    wrapper.appendChild(button);
  }
};

watch(
  () => post.value?.path,
  async () => {
    await nextTick();
    enhanceCodeBlocks();
  },
  { immediate: true },
);
</script>

<template>
  <div class="mt-4 flex justify-center">
    <article class="w-full md:w-9/12 lg:w-8/12">
      <h1 class="text-left text-xl font-bold">{{ post?.title }}</h1>
      <p v-if="post?.meta?.date" class="mt-2 text-left opacity-70">
        {{ new Date(post.meta.date).toLocaleDateString() }}
      </p>
      <div ref="contentRef" class="blog-content mt-6 text-left">
        <ContentRenderer v-if="post" :value="post" />
      </div>
    </article>
  </div>
</template>
