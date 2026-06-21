"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { ReactNode } from "react";
import { I18nProvider } from "@/contexts/i18n-context";
import type { Locale } from "@/i18n/config";

export function AppProviders({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <I18nProvider locale={locale}>
      {children}
      <Analytics />
      <SpeedInsights />
    </I18nProvider>
  );
}
