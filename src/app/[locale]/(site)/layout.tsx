/**
 * Localized site layout. Async Server Component that renders the HTML shell
 * (header, footer, providers, organization JSON-LD) for every page under a
 * given locale and validates the `locale` route param.
 */
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { isLocale, type Locale, locales } from "@/i18n/config";
import { siteSchemaGraph } from "@/lib/aeo-schema";
import { fontVariables } from "@/lib/fonts";
import { AppProviders } from "@/providers/app-providers";
import styles from "./layout.module.css";

/** Disables on-demand params: only locales from `generateStaticParams` render. */
export const dynamicParams = false;

/**
 * Pre-renders one route per supported locale at build time.
 *
 * @returns The list of `{ locale }` params to statically generate.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Localized root layout (async Server Component). Validates the locale, sets the
 * document language and fonts, injects organization JSON-LD, and wraps children
 * with global providers, header, and footer.
 *
 * @param props - Layout props.
 * @param props.children - Nested route content to render in the main area.
 * @param props.params - Promise resolving to the route params containing `locale`.
 * @returns The full localized HTML document shell.
 * @remarks Calls {@link notFound} when the resolved `locale` is not supported.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={fontVariables}>
      <head>
        <link
          rel="preload"
          href="/assets/fonts/Cattedrale-Demo-Regular.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs" />
        <link rel="alternate" type="application/json" href="/ai-index.json" title="AI Index" />
        <JsonLd data={siteSchemaGraph()} />
      </head>
      <body>
        <AppProviders locale={locale as Locale}>
          <div id="site-root" className={styles.site}>
            <Header />
            <main className={styles.site__main}>{children}</main>
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
