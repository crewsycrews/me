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
  const pagePath = options.path ?? route.path;
  const canonicalUrl = new URL(pagePath.replace(/^\/+/, ""), baseUrl).toString();
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
    ogLocale: "en_US",
    ogImage: imageUrl,
    ogImageAlt: `${SITE_NAME} — Fullstack Developer`,
    ogImageType: "image/png",
    ogImageWidth: 671,
    ogImageHeight: 267,
    twitterCard: "summary_large_image",
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: imageUrl,
    twitterImageAlt: `${SITE_NAME} — Fullstack Developer`,
    twitterCreator: "@naniyak",
  });

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: baseUrl.toString(),
      name: SITE_NAME,
      description:
        "Personal website of Danil Rodin, a fullstack developer.",
      inLanguage: "en",
      publisher: { "@id": personId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: "Danil Rodin",
      url: baseUrl.toString(),
      image: avatarUrl,
      jobTitle: "Fullstack Developer",
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
        inLanguage: "en",
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
        inLanguage: "en",
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
      inLanguage: "en",
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
      itemListElement: options.breadcrumbs.map((breadcrumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: breadcrumb.name,
        item: new URL(
          breadcrumb.path.replace(/^\/+/, ""),
          baseUrl,
        ).toString(),
      })),
    });
  }

  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  }).replace(/</g, "\\u003c");

  useHead({
    link: [{ rel: "canonical", href: canonicalUrl }],
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
