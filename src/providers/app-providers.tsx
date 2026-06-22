"use client";

/**
 * Top-level client providers for the Napalm Cobras app.
 *
 * @remarks
 * Wraps the app with the i18n provider and mounts Vercel Analytics and Speed
 * Insights so they run on every page.
 */

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { ReactNode } from "react";
import { I18nProvider } from "@/contexts/i18n-context";
import type { Locale } from "@/i18n/config";

/**
 * Composes the global client-side providers around the application tree.
 *
 * @param props - Component props.
 * @param props.locale - Active locale forwarded to the i18n provider.
 * @param props.children - Application subtree to wrap.
 * @returns The provider tree wrapping `children`.
 */
export function AppProviders({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <I18nProvider locale={locale}>
      {children}
      <Analytics />
      <SpeedInsights />
    </I18nProvider>
  );
}
