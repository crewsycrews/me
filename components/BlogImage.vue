<script setup lang="ts">
defineOptions({ inheritAttrs: false });

defineProps<{ src: string; alt?: string }>();

const { isRussian } = useSiteLocale();
const viewer = ref<HTMLDialogElement | null>(null);
const zoomed = ref(false);
let previousOverflow: string | undefined;

const restoreScroll = () => {
  if (previousOverflow !== undefined) {
    document.body.style.overflow = previousOverflow;
    previousOverflow = undefined;
  }
  zoomed.value = false;
};

const openViewer = () => {
  if (!viewer.value || viewer.value.open) return;
  zoomed.value = false;
  viewer.value.showModal();
  previousOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
};

onBeforeUnmount(restoreScroll);
</script>

<template>
  <span class="blog-image">
    <button
      type="button"
      class="blog-image-preview"
      aria-haspopup="dialog"
      :aria-label="isRussian ? `Увеличить изображение: ${alt || ''}` : `Enlarge image: ${alt || ''}`"
      @click="openViewer"
    >
      <img v-bind="$attrs" :src="src" :alt="alt || ''" />
    </button>
    <ClientOnly>
      <Teleport to="body">
        <dialog
          ref="viewer"
          class="blog-image-viewer"
          :aria-label="alt || (isRussian ? 'Просмотр изображения' : 'Image viewer')"
          @close="restoreScroll"
          @click.self="viewer?.close()"
        >
          <div class="blog-image-toolbar">
            <button type="button" :aria-pressed="zoomed" @click="zoomed = !zoomed">
              {{ zoomed ? (isRussian ? 'Вписать в экран' : 'Fit to screen') : (isRussian ? 'Масштаб 1:1' : 'Actual size') }}
            </button>
            <a :href="src" target="_blank" rel="noopener noreferrer">
              {{ isRussian ? 'Открыть оригинал' : 'Open original' }}
            </a>
            <button type="button" autofocus @click="viewer?.close()">
              {{ isRussian ? 'Закрыть' : 'Close' }} ×
            </button>
          </div>
          <div class="blog-image-stage" @click.self="viewer?.close()">
            <img
              :src="src"
              :alt="alt || ''"
              :class="{ 'is-zoomed': zoomed }"
            />
          </div>
        </dialog>
      </Teleport>
    </ClientOnly>
  </span>
</template>

<style scoped>
.blog-image {
  display: block;
}

.blog-image-preview {
  display: block;
  max-width: 100%;
  margin: 0 auto;
  cursor: zoom-in;
}

.blog-image-preview:focus-visible {
  outline: 2px solid #d4ef99;
  outline-offset: 4px;
  border-radius: 0.5rem;
}

.blog-image-viewer {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100dvh;
  max-width: none;
  max-height: none;
  margin: 0;
  padding: 1rem;
  border: 0;
  background: rgba(0, 0, 0, 0.94);
  color: white;
}

.blog-image-viewer[open] {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 1rem;
}

.blog-image-viewer::backdrop {
  background: rgba(0, 0, 0, 0.8);
}

.blog-image-toolbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.blog-image-toolbar button,
.blog-image-toolbar a {
  padding: 0.5rem 0.75rem;
  border: 1px solid #666;
  border-radius: 0.5rem;
  font-size: 0.9rem;
}

.blog-image-toolbar :focus-visible {
  outline: 2px solid #d4ef99;
  outline-offset: 2px;
}

.blog-image-stage {
  min-height: 0;
  overflow: auto;
  overscroll-behavior: contain;
}

.blog-image-stage img {
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin: 0 auto;
}

.blog-image-stage img.is-zoomed {
  max-width: none;
  max-height: none;
}
</style>
