/**
 * Internationalization (i18n) configuration for the Napalm Cobras website.
 *
 * @remarks
 * Declares the supported locales, the default locale, and the helpers used to
 * resolve a locale's translation dictionary and to validate locale strings.
 */
import { en } from "./en";
import { es } from "./es";
import { type Lang, pt } from "./pt";

/** Tuple of all supported locale codes, in priority order. */
export const locales = ["pt", "en", "es"] as const;

/** Union of supported locale codes derived from {@link locales}. */
export type Locale = (typeof locales)[number];

/** Re-export of the translation dictionary shape. */
export type { Lang } from "./pt";

/** Locale used when none can be resolved from the request. */
export const defaultLocale: Locale = "pt";

/** Lookup table mapping each locale to its translation dictionary. */
const dictionaries: Record<Locale, Lang> = { pt, en, es };

/**
 * Returns the translation dictionary for a locale.
 *
 * @param locale - Locale to load the dictionary for.
 * @returns The translation dictionary associated with the locale.
 */
export function getDictionary(locale: Locale): Lang {
  return dictionaries[locale];
}

/**
 * Type guard that checks whether a string is a supported locale.
 *
 * @param value - Arbitrary string to validate.
 * @returns `true` (narrowing to {@link Locale}) when the value is supported.
 */
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
