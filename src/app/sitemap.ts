import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { BASE_URL, localizedPath, type PagePath } from "@/lib/seo";

const paths: PagePath[] = ["", "band", "music", "shows", "videos", "gallery", "press", "contact"];

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
