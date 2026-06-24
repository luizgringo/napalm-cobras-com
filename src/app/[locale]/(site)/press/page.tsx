/**
 * Localized press/EPK page. Async Server Component that renders press clipping,
 * downloadable assets (press release, rider, stage map), and a media kit link.
 */
import { Download, FileText, FolderOpen, Newspaper } from "lucide-react";
import type { Metadata } from "next";
import { Reveal } from "@/components/sections/Reveal";
import { PageSchema } from "@/components/seo/PageSchema";
import { PageHero } from "@/components/templates/SectionTitle";
import { CLIPPING, clippingHref } from "@/config/clipping";
import { SITE } from "@/config/site";
import { getDictionary, type Locale } from "@/i18n/config";
import { buildMetadata } from "@/lib/seo";
import { mergeClassNames } from "@/lib/utils";
import primitives from "@/styles/primitives.module.css";
import styles from "./page.module.css";

/** Props for the press route, carrying the async `locale` route param. */
type Props = { params: Promise<{ locale: string }> };

/**
 * Builds localized metadata for the press page.
 *
 * @param props - Route props.
 * @param props.params - Promise resolving to the route params containing `locale`.
 * @returns The localized {@link Metadata} for the press page.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale as Locale);
  return buildMetadata({
    locale: locale as Locale,
    path: "press",
    title: t.press.title,
    description: t.press.intro,
  });
}

/**
 * Press page (async Server Component). Renders the press clipping grid, the
 * downloadable EPK assets, and the media kit link using localized content.
 *
 * @param props - Route props.
 * @param props.params - Promise resolving to the route params containing `locale`.
 * @returns The rendered press page.
 */
export default async function PressPage({ params }: Props) {
  const { locale } = await params;
  const t = getDictionary(locale as Locale);

  const pressItems = [
    {
      icon: FileText,
      title: t.press.pressReleaseTitle,
      description: t.press.pressReleaseDesc,
      url: SITE.press.pressRelease,
      cta: t.press.download,
    },
    {
      icon: Download,
      title: t.press.riderTitle,
      description: t.press.riderDesc,
      url: SITE.press.rider,
      cta: t.press.download,
    },
    {
      icon: FolderOpen,
      title: t.press.stageMapTitle,
      description: t.press.stageMapDesc,
      url: SITE.press.stageMap,
      cta: t.press.open,
    },
  ];

  return (
    <>
      <PageSchema pathname={`/${locale}/press`} />
      <PageHero eyebrow="EPK" title={t.press.title} intro={t.press.intro} />

      <section className={primitives.section}>
        <div
          className={mergeClassNames(
            primitives.container,
            primitives["container--wide"],
            primitives["container--cozy"],
          )}
        >
          <Reveal>
            <p className={primitives.eyebrow}>// {t.press.clippingTitle}</p>
            <h2 className={primitives["section-heading"]}>{t.press.clippingTitle}</h2>
            <p className={styles.clipping__intro}>{t.press.clippingIntro}</p>
          </Reveal>

          <ul className={styles["clipping-grid"]}>
            {CLIPPING.map((item, index) => (
              <li key={item.id} className={styles["clipping-item"]}>
                <Reveal delay={index * 0.05} className={styles["clipping-item"]}>
                  <a
                    href={clippingHref(item.id)}
                    target="_blank"
                    rel="noreferrer"
                    className={styles["clipping-card"]}
                  >
                    <div className={styles["clipping-card__head"]}>
                      <Newspaper size={18} className={primitives["icon-blood"]} />
                      <span className={styles["clipping-card__outlet"]}>{item.outlet}</span>
                      {item.year ? (
                        <span className={styles["clipping-card__year"]}>{item.year}</span>
                      ) : null}
                    </div>
                    <h3 className={styles["clipping-card__title"]}>{item.title}</h3>
                    <span className={styles["clipping-card__cta"]}>{t.press.read} →</span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={mergeClassNames(primitives.section, primitives["section--smoke"])}>
        <div
          className={mergeClassNames(
            primitives.container,
            primitives["container--wide"],
            primitives["container--cozy"],
          )}
        >
          <div className={styles["press-grid"]}>
            {pressItems.map((pressItem, index) => {
              const Icon = pressItem.icon;
              return (
                <Reveal key={pressItem.title} delay={index * 0.1}>
                  <a
                    href={pressItem.url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles["press-card"]}
                  >
                    <div>
                      <Icon size={32} className={primitives["icon-blood"]} />
                      <h3 className={styles["press-card__title"]}>{pressItem.title}</h3>
                      <p className={styles["press-card__desc"]}>{pressItem.description}</p>
                    </div>
                    <span className={styles["press-card__cta"]}>{pressItem.cta} →</span>
                  </a>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.4}>
            <div className={styles["media-kit"]}>
              <p className={primitives.eyebrow}>// Media kit</p>
              <a
                href={SITE.press.mediaFolder}
                target="_blank"
                rel="noreferrer"
                className={styles["media-kit__link"]}
              >
                Press photos, flyers, clipping →
              </a>
              <p className={styles["media-kit__note"]}>Google Drive</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
