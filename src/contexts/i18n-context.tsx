"use client";

/**
 * React context that exposes the active locale and its translation dictionary.
 *
 * @remarks
 * Client-only module. {@link I18nProvider} supplies the value derived from a
 * locale, and {@link useI18n} reads it from any descendant component.
 */

import { createContext, type ReactNode, useContext } from "react";
import { getDictionary, type Lang, type Locale } from "@/i18n/config";

/**
 * Value provided by the i18n context.
 */
interface I18nContextValue {
  /** Currently active locale. */
  lang: Locale;
  /** Translation dictionary for the active locale. */
  t: Lang;
}

/** Underlying React context; `null` until provided by {@link I18nProvider}. */
const I18nContext = createContext<I18nContextValue | null>(null);

/**
 * Provides the i18n context to its subtree for a given locale.
 *
 * @param props - Component props.
 * @param props.locale - Locale whose dictionary is exposed to consumers.
 * @param props.children - Subtree that can access the i18n context.
 * @returns The provider element wrapping `children`.
 */
export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <I18nContext.Provider value={{ lang: locale, t: getDictionary(locale) }}>
      {children}
    </I18nContext.Provider>
  );
}

/**
 * Hook to read the active locale and translation dictionary.
 *
 * @returns The current i18n context value.
 * @throws Error When used outside of an {@link I18nProvider}.
 */
export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n deve ser usado dentro de um I18nProvider");
  }
  return context;
}
