/**
 * Primary navigation configuration for the Napalm Cobras website.
 *
 * @remarks
 * Defines the ordered list of top-level routes; each entry's `key` maps to a
 * label in the i18n dictionaries so menu items stay localized.
 */
import type { NavItem } from "@/types";

/**
 * Ordered list of primary navigation links rendered in the header.
 */
export const NAV: NavItem[] = [
  { href: "/band", key: "band" },
  { href: "/music", key: "music" },
  { href: "/shows", key: "shows" },
  { href: "/videos", key: "videos" },
  { href: "/gallery", key: "gallery" },
  { href: "/press", key: "press" },
  { href: "/contact", key: "contact" },
];
