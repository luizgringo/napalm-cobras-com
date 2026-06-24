import { SITE } from "@/config/site";
import { extractFaqsFromContent, getAeoPage } from "@/lib/aeo-content";
import { BASE_URL, organizationJsonLd } from "@/lib/seo";
import { aeoConfig } from "../../aeo.config.mjs";

const ORG_LOGO = `${BASE_URL}/icon.svg`;

const ORG_SAME_AS = [
  SITE.socials.instagram,
  SITE.socials.bandcamp,
  SITE.socials.youtube,
  SITE.socials.spotifyArtist,
  SITE.socials.bandsintown,
];

export function siteSchemaGraph(): Record<string, unknown>[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE.name,
      description: aeoConfig.description,
      url: BASE_URL,
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE.name,
      url: BASE_URL,
      logo: ORG_LOGO,
      sameAs: ORG_SAME_AS,
    },
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
