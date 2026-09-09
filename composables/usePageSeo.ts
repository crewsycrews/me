type SchemaType =
  | "WebPage"
  | "ProfilePage"
  | "AboutPage"
  | "CollectionPage"
  | "Blog";

type Breadcrumb = {
  name: string;
  path: string;
};

type PageSeoOptions = {
  title: string;
  description: string;
  locale?: "en" | "ru";
  path?: string;
  schemaType?: SchemaType | "BlogPosting";
  headline?: string;
  publishedTime?: string;
  breadcrumbs?: Breadcrumb[];
};

const SITE_NAME = "Danil Rodin";
const DEFAULT_IMAGE_PATH = "assets/images/og-image.png";
const AVATAR_PATH = "assets/images/avatar-small.jpg";

export const usePageSeo = (options: PageSeoOptions) => {
  const runtimeConfig = useRuntimeConfig();
  const route = useRoute();
  const baseUrl = new URL(
    runtimeConfig.app.baseURL,
    runtimeConfig.public.siteUrl,
  );
  const locale = options.locale ?? "ru";
  const isRussian = locale === "ru";
  const rawPagePath = options.path ?? route.path;
  const pagePath = rawPagePath === "/en"
    ? "/"
    : rawPagePath.replace(/^\/en\//, "/");
  const russianUrl = new URL(pagePath.replace(/^\/+/, ""), baseUrl).toString();
  const englishPath = pagePath === "/" ? "/en" : `/en${pagePath}`;
  const englishUrl = new URL(englishPath.replace(/^\/+/, ""), baseUrl).toString();
  const canonicalUrl = isRussian ? russianUrl : englishUrl;
  const imageUrl = new URL(DEFAULT_IMAGE_PATH, baseUrl).toString();
  const avatarUrl = new URL(AVATAR_PATH, baseUrl).toString();
  const personId = `${baseUrl.toString()}#person`;
  const websiteId = `${baseUrl.toString()}#website`;
  const webpageId = `${canonicalUrl}#webpage`;

  useSeoMeta({
    title: options.title,
    description: options.description,
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    ogTitle: options.title,
    ogDescription: options.description,
    ogType: options.schemaType === "BlogPosting" ? "article" : "website",
    ogUrl: canonicalUrl,
    ogSiteName: SITE_NAME,
    ogLocale: isRussian ? "ru_RU" : "en_US",
    ogImage: imageUrl,
    ogImageAlt: isRussian
      ? `${SITE_NAME} — Fullstack-разработчик`
      : `${SITE_NAME} — Fullstack Developer`,
    ogImageType: "image/png",
    ogImageWidth: 671,
    ogImageHeight: 267,
    twitterCard: "summary_large_image",
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: imageUrl,
    twitterImageAlt: isRussian
      ? `${SITE_NAME} — Fullstack-разработчик`
      : `${SITE_NAME} — Fullstack Developer`,
    twitterCreator: "@naniyak",
  });

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: baseUrl.toString(),
      name: SITE_NAME,
      description: isRussian
        ? "Личный сайт Данила Родина, fullstack-разработчика."
        : "Personal website of Danil Rodin, a fullstack developer.",
      inLanguage: locale,
      publisher: { "@id": personId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: "Danil Rodin",
      url: baseUrl.toString(),
      image: avatarUrl,
      jobTitle: isRussian ? "Fullstack-разработчик" : "Fullstack Developer",
      sameAs: [
        "https://github.com/crewsycrews",
        "https://dev.to/crewsycrews",
        "https://twitter.com/naniyak",
        "https://t.me/casiq",
      ],
    },
  ];

  if (options.schemaType === "BlogPosting") {
    const articleId = `${canonicalUrl}#article`;

    graph.push(
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: canonicalUrl,
        name: options.title,
        description: options.description,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        primaryImageOfPage: imageUrl,
        inLanguage: locale,
        mainEntity: { "@id": articleId },
      },
      {
        "@type": "BlogPosting",
        "@id": articleId,
        headline: options.headline ?? options.title,
        description: options.description,
        url: canonicalUrl,
        mainEntityOfPage: { "@id": webpageId },
        image: imageUrl,
        datePublished: options.publishedTime,
        dateModified: options.publishedTime,
        author: { "@id": personId },
        publisher: { "@id": personId },
        inLanguage: locale,
      },
    );
  } else {
    graph.push({
      "@type": options.schemaType ?? "WebPage",
      "@id": webpageId,
      url: canonicalUrl,
      name: options.title,
      description: options.description,
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
      primaryImageOfPage: imageUrl,
      inLanguage: locale,
      ...(["ProfilePage", "AboutPage"].includes(options.schemaType ?? "")
        ? { mainEntity: { "@id": personId } }
        : {}),
      ...(options.schemaType === "Blog"
        ? { author: { "@id": personId }, publisher: { "@id": personId } }
        : {}),
    });
  }

  if (options.breadcrumbs?.length) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      itemListElement: options.breadcrumbs.map((breadcrumb, index) => {
        const breadcrumbPath = locale === "en"
          ? breadcrumb.path === "/" ? "/en" : `/en${breadcrumb.path}`
          : breadcrumb.path;

        return {
          "@type": "ListItem",
          position: index + 1,
          name: breadcrumb.name,
          item: new URL(
            breadcrumbPath.replace(/^\/+/, ""),
            baseUrl,
          ).toString(),
        };
      }),
    });
  }

  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  }).replace(/</g, "\\u003c");

  useHead({
    htmlAttrs: { lang: locale },
    link: [
      { rel: "canonical", href: canonicalUrl },
      { rel: "alternate", hreflang: "ru", href: russianUrl },
      { rel: "alternate", hreflang: "en", href: englishUrl },
      { rel: "alternate", hreflang: "x-default", href: russianUrl },
    ],
    meta: options.publishedTime
      ? [
          {
            property: "article:published_time",
            content: options.publishedTime,
          },
          {
            property: "article:modified_time",
            content: options.publishedTime,
          },
          { property: "article:author", content: "Danil Rodin" },
        ]
      : [],
    script: [
      {
        type: "application/ld+json",
        innerHTML: structuredData,
      },
    ],
  });
};
