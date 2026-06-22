/**
 * Generates the site's XML sitemap via the Next.js Metadata Files API, emitting
 * one entry per page for every supported locale with hreflang alternates.
 */
import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { BASE_URL, localizedPath, type PagePath } from "@/lib/seo";

/** Page paths included in the sitemap (empty string is the home page). */
const paths: PagePath[] = ["", "band", "music", "shows", "videos", "gallery", "press", "contact"];

/**
 * Builds the sitemap entries, expanding each path across all locales and adding
 * language alternates for hreflang.
 *
 * @returns The sitemap entries consumed by Next.js to emit `sitemap.xml`.
 * @remarks The home page (`""`) gets priority 1; other pages get 0.7. All
 * entries use a `weekly` change frequency and share the current timestamp.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return paths.flatMap((path) => {
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      languages[locale] = `${BASE_URL}${localizedPath(locale, path)}`;
    }

    return locales.map((locale) => ({
      url: `${BASE_URL}${localizedPath(locale, path)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: { languages },
    }));
  });
}
