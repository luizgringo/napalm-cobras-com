import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { isLocale, type Locale, locales } from "@/i18n/config";
import { fontVariables } from "@/lib/fonts";
import { organizationJsonLd } from "@/lib/seo";
import { AppProviders } from "@/providers/app-providers";
import styles from "./layout.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

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
      <body>
        <JsonLd data={organizationJsonLd()} />
        <AppProviders locale={locale as Locale}>
          <div className={styles.site}>
            <Header />
            <main className={styles.site__main}>{children}</main>
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
