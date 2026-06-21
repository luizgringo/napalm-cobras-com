"use client";

import { createContext, type ReactNode, useContext } from "react";
import { type Dict, getDictionary, type Locale } from "@/i18n/config";

interface I18nContextValue {
  lang: Locale;
  t: Dict;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <I18nContext.Provider value={{ lang: locale, t: getDictionary(locale) }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n deve ser usado dentro de um I18nProvider");
  }
  return context;
}
