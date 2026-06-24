import { buildAeoPages } from "./scripts/aeo-pages-content.mjs";

/** @type {import('aeo.js').AeoConfig} */
export const aeoConfig = {
  title: "Napalm Cobras",
  description:
    'Banda de Metalpunk formada em Belo Horizonte em 2021. Ouça o EP "Homens Brancos de Terno" e veja os próximos shows.',
  url: "https://www.napalmcobras.com",
  pages: buildAeoPages(),
  generators: {
    robotsTxt: true,
    llmsTxt: true,
    llmsFullTxt: true,
    rawMarkdown: true,
    manifest: true,
    sitemap: true,
    aiIndex: true,
    schema: true,
  },
  robots: {
    allow: ["/"],
    sitemap: "https://www.napalmcobras.com/sitemap.xml",
  },
  schema: {
    enabled: true,
    organization: {
      name: "Napalm Cobras",
      url: "https://www.napalmcobras.com",
      logo: "https://www.napalmcobras.com/icon.svg",
      sameAs: [
        "https://www.instagram.com/napalmcobras",
        "https://napalmcobras.bandcamp.com",
        "https://www.youtube.com/@napalmcobras",
        "https://open.spotify.com/intl-pt/artist/2VhEadXjwX0PoXKdbLpCs4",
        "https://www.bandsintown.com/a/15520612-napalm-cobras",
      ],
    },
    defaultType: "WebPage",
  },
  og: {
    enabled: true,
    image: "https://www.napalmcobras.com/og/cover.jpg",
    type: "website",
  },
  widget: {
    enabled: false,
  },
};
