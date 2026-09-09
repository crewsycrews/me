export type SiteLocale = "en" | "ru";

export const useSiteLocale = () => {
  const route = useRoute();

  const locale = computed<SiteLocale>(() =>
    route.path === "/en" || route.path.startsWith("/en/") ? "en" : "ru",
  );
  const isRussian = computed(() => locale.value === "ru");

  const localePath = (path: string, targetLocale = locale.value) => {
    const basePath = path === "/en" ? "/" : path.replace(/^\/en\//, "/");

    if (targetLocale === "en") {
      return basePath === "/" ? "/en" : `/en${basePath}`;
    }

    return basePath;
  };

  const switchLocalePath = computed(() => {
    const targetLocale: SiteLocale = isRussian.value ? "en" : "ru";
    const suffix = route.fullPath.slice(route.path.length);
    return `${localePath(route.path, targetLocale)}${suffix}`;
  });

  return {
    locale,
    isRussian,
    localePath,
    switchLocalePath,
    dateLocale: computed(() => (isRussian.value ? "ru-RU" : "en-US")),
  };
};
