/**
 * Shared application-wide TypeScript types for the Napalm Cobras website.
 */
import type { Lang } from "@/i18n/config";

/**
 * A primary navigation entry linking a route to a localized label.
 */
export interface NavItem {
  /** Destination route path. */
  href: string;
  /** Key into the `nav` section of the translation dictionary for the label. */
  key: keyof Lang["nav"];
}
