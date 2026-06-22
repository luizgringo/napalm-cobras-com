/**
 * Generates the site's `robots.txt` via the Next.js Metadata Files API.
 */
import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/seo";

/**
 * Builds the robots rules, allowing all crawlers and pointing them to the
 * sitemap and canonical host.
 *
 * @returns The robots metadata consumed by Next.js to emit `robots.txt`.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
