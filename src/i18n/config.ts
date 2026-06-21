import { en } from "./en";
import { es } from "./es";
import { type Lang, pt } from "./pt";

export const locales = ["pt", "en", "es"] as const;

export type Locale = (typeof locales)[number];

export type { Lang } from "./pt";

export const defaultLocale: Locale = "pt";

const dictionaries: Record<Locale, Lang> = { pt, en, es };

export function getDictionary(locale: Locale): Lang {
  return dictionaries[locale];
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
