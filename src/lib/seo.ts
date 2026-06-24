/**
 * SEO helpers for the Napalm Cobras website.
 *
 * @remarks
 * Centralizes canonical URL resolution, per-page metadata generation
 * (Open Graph + Twitter), and the JSON-LD structured data builders for the
 * band, album and featured live video.
 */
import type { Metadata } from "next";
import { SITE } from "@/config/site";
import { defaultLocale, type Locale, locales } from "@/i18n/config";

/** Canonical site base URL, from env override or the configured site URL. */
export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? SITE.url;

/** Known top-level page slugs (empty string represents the home page). */
export type PagePath = "" | "band" | "music" | "shows" | "videos" | "gallery" | "press" | "contact";

/**
 * Builds a locale-prefixed path for a known page.
 *
 * @param locale - Target locale prefix.
 * @param path - Page slug (empty string for home).
 * @returns The localized path, e.g. `/pt` or `/en/band`.
 */
export function localizedPath(locale: Locale, path: PagePath): string {
  return path ? `/${locale}/${path}` : `/${locale}`;
}

/**
 * Input describing a page for {@link buildMetadata}.
 */
interface PageMetaInput {
  /** Locale the metadata is generated for. */
  locale: Locale;
  /** Page slug used to build canonical and alternate URLs. */
  path: PagePath;
  /** Page title. */
  title: string;
  /** Page description used for meta and social cards. */
  description: string;
  /** Optional social share image path (defaults to the OG cover). */
  image?: string;
  /** When `true`, the title is used verbatim instead of being templated. */
  absoluteTitle?: boolean;
}

/**
 * Builds a Next.js {@link Metadata} object for a page, including canonical and
 * `hreflang` alternates plus Open Graph and Twitter cards.
 *
 * @param input - Page metadata input.
 * @returns A fully populated Next.js `Metadata` object.
 */
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

/**
 * Builds schema.org `MusicGroup` JSON-LD describing the band.
 *
 * @returns A JSON-LD object suitable for a `<script type="application/ld+json">` tag.
 */
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
      SITE.socials.spotifyArtist,
      SITE.socials.bandsintown,
    ],
    member: [
      { "@type": "Person", name: "Uander Trajano", roleName: "Vocals & Bass" },
      { "@type": "Person", name: "Luiz Gringo", roleName: "Guitar & Vocals" },
      { "@type": "Person", name: "Humberto Monteiro", roleName: "Drums" },
    ],
  };
}

/**
 * Builds schema.org `MusicAlbum` JSON-LD for the featured EP, including tracks.
 *
 * @returns A JSON-LD object suitable for a `<script type="application/ld+json">` tag.
 */
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

/**
 * Builds schema.org `VideoObject` JSON-LD for the featured live video.
 *
 * @returns A JSON-LD object suitable for a `<script type="application/ld+json">` tag.
 */
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
