import type { Metadata } from "next";
import { SITE } from "@/config/site";
import { defaultLocale, type Locale, locales } from "@/i18n/config";

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? SITE.url;

export type PagePath = "" | "band" | "music" | "shows" | "videos" | "gallery" | "press" | "contact";

export function localizedPath(locale: Locale, path: PagePath): string {
  return path ? `/${locale}/${path}` : `/${locale}`;
}

interface PageMetaInput {
  locale: Locale;
  path: PagePath;
  title: string;
  description: string;
  image?: string;
  absoluteTitle?: boolean;
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
  image = "/og/cover.jpg",
  absoluteTitle = false,
}: PageMetaInput): Metadata {
  const canonical = localizedPath(locale, path);

  const languages: Record<string, string> = { "x-default": localizedPath(defaultLocale, path) };
  for (const code of locales) {
    languages[code] = localizedPath(code, path);
  }

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      url: canonical,
      locale,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: SITE.name,
    genre: ["Speed Rock", "Metal Punk", "Hardcore Punk"],
    foundingDate: SITE.foundedYear,
    foundingLocation: {
      "@type": "Place",
      name: `${SITE.city}, ${SITE.region}, Brazil`,
    },
    url: BASE_URL,
    sameAs: [
      SITE.socials.instagram,
      SITE.socials.bandcamp,
      SITE.socials.youtube,
      SITE.socials.spotify,
      SITE.socials.bandsintown,
    ],
    member: [
      { "@type": "Person", name: "Uander Trajano", roleName: "Vocals & Bass" },
      { "@type": "Person", name: "Luiz Gringo", roleName: "Guitar & Vocals" },
      { "@type": "Person", name: "Humberto Monteiro", roleName: "Drums" },
    ],
  };
}

export function albumJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MusicAlbum",
    name: SITE.album.title,
    image: `${BASE_URL}/assets/images/album-cover.jpg`,
    byArtist: { "@type": "MusicGroup", name: SITE.name },
    datePublished: SITE.album.releaseDate,
    genre: ["Speed Rock", "Metal Punk"],
    numTracks: SITE.album.tracks.length,
    track: SITE.album.tracks.map((track, index) => ({
      "@type": "MusicRecording",
      position: index + 1,
      name: track.title,
      duration: track.duration,
    })),
  };
}

export function liveVideoJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Napalm Cobras — ao Vivo no Metalpunk Overkill 2024 (Goblin TV)",
    description: "Set ao vivo completo filmado pela Goblin TV em 2024.",
    thumbnailUrl: `https://i.ytimg.com/vi/${SITE.liveVideoId}/maxresdefault.jpg`,
    uploadDate: "2024-01-01",
    contentUrl: `https://www.youtube.com/watch?v=${SITE.liveVideoId}`,
    embedUrl: `https://www.youtube.com/embed/${SITE.liveVideoId}`,
  };
}
