import { SITE } from "@/config/site";
import { extractFaqsFromContent, getAeoPage } from "@/lib/aeo-content";
import { BASE_URL, organizationJsonLd } from "@/lib/seo";
import { aeoConfig } from "../../aeo.config.mjs";

const ORG_LOGO = `${BASE_URL}/assets/svgs/logo.svg`;

const ORG_SAME_AS = [
  SITE.socials.instagram,
  SITE.socials.bandcamp,
  SITE.socials.youtube,
  SITE.socials.spotifyArtist,
  SITE.socials.bandsintown,
  SITE.socials.soundcloud,
  SITE.socials.tiktok,
  SITE.socials.linktree,
];

function organizationEntity(): Record<string, unknown> {
  return {
    "@type": "Organization",
    name: SITE.name,
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: ORG_LOGO,
    },
    image: ORG_LOGO,
    sameAs: ORG_SAME_AS,
  };
}

function organizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    ...organizationEntity(),
  };
}

export function siteSchemaGraph(): Record<string, unknown>[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE.name,
      description: aeoConfig.description,
      url: BASE_URL,
      publisher: organizationEntity(),
    },
    organizationSchema(),
    organizationJsonLd(),
  ];
}

export function pageSchemaGraph(pathname: string): Record<string, unknown>[] {
  const page = getAeoPage(pathname);
  if (!page) {
    return [];
  }

  const pageUrl = `${BASE_URL}${pathname}`;
  const schemas: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.title,
      description: page.description,
      url: pageUrl,
      isPartOf: {
        "@type": "WebSite",
        name: SITE.name,
        url: BASE_URL,
      },
      publisher: organizationEntity(),
    },
  ];

  const faqs = extractFaqsFromContent(page.content ?? "");
  if (faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    });
  }

  return schemas;
}
