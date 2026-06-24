"use client";

import type { ReactNode } from "react";
import { I18nProvider } from "@/contexts/i18n-context";
import type { Locale } from "@/i18n/config";
import { DeferredMonitoring } from "./deferred-analytics";

export function AppProviders({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <I18nProvider locale={locale}>
      {children}
      <DeferredMonitoring />
    </I18nProvider>
  );
}
