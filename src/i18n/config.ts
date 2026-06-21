import { en } from "./en";
import { es } from "./es";
import { pt } from "./pt";

export const locales = ["pt", "en", "es"] as const;

export type Locale = (typeof locales)[number];

export type Dict = typeof pt;

export const defaultLocale: Locale = "pt";

const dictionaries: Record<Locale, Dict> = { pt, en, es };

export function getDictionary(locale: Locale): Dict {
  return dictionaries[locale];
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
