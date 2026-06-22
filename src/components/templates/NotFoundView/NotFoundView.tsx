import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { GlitchText } from "@/components/sections/GlitchText";
import { defaultLocale, getDictionary } from "@/i18n/config";
import { fontVariables } from "@/lib/fonts";
import { mergeClassNames } from "@/lib/utils";
import { AppProviders } from "@/providers/app-providers";
import primitives from "@/styles/primitives.module.css";
import styles from "./NotFoundView.module.css";

export function NotFoundView() {
  const t = getDictionary(defaultLocale);

  return (
    <html lang={defaultLocale} className={fontVariables}>
      <body>
        <AppProviders locale={defaultLocale}>
          <div className={styles.site}>
            <Header />
            <main className={styles.site__main}>
              <section className={styles.screen}>
                <div className={styles.screen__inner}>
                  <GlitchText as="p" className={styles.screen__code} continuous>
                    404
                  </GlitchText>
                  <p className={styles.screen__eyebrow}>// {t.notFound.eyebrow}</p>
                  <h1 className={styles.screen__title}>{t.notFound.title}</h1>
                  <p className={styles.screen__text}>{t.notFound.text}</p>
                  <div className={styles.screen__actions}>
                    <Link
                      href={`/${defaultLocale}`}
                      className={mergeClassNames(primitives.cta, primitives["cta--solid"])}
                    >
                      {t.notFound.home}
                    </Link>
                    <Link
                      href={`/${defaultLocale}/music`}
                      className={mergeClassNames(primitives.cta, primitives["cta--outline"])}
                    >
                      {t.notFound.music}
                    </Link>
                  </div>
                </div>
              </section>
            </main>
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
