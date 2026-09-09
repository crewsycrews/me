type YandexMetrika = (
  counterId: number,
  method: "hit",
  url: string,
  options?: {
    title?: string;
    referer?: string;
  },
) => void;

export default defineNuxtPlugin((nuxtApp) => {
  const { yandexMetrikaId } = useRuntimeConfig().public;
  let previousUrl = window.location.href;

  nuxtApp.hook("page:finish", () => {
    const currentUrl = window.location.href;

    if (currentUrl === previousUrl) {
      return;
    }

    const ym = (window as typeof window & { ym?: YandexMetrika }).ym;

    ym?.(yandexMetrikaId, "hit", currentUrl, {
      title: document.title,
      referer: previousUrl,
    });

    previousUrl = currentUrl;
  });
});
