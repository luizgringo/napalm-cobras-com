/**
 * Localized videos page. Async Server Component that renders a featured video,
 * a grid of YouTube embeds, and a link to the band's YouTube channel, plus
 * live-video JSON-LD.
 */
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { Reveal } from "@/components/sections/Reveal";
import { PageSchema } from "@/components/seo/PageSchema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/templates/SectionTitle";
import { SITE } from "@/config/site";
import { getDictionary, type Locale } from "@/i18n/config";
import { buildMetadata, liveVideoJsonLd } from "@/lib/seo";
import { mergeClassNames } from "@/lib/utils";
import primitives from "@/styles/primitives.module.css";
import styles from "./page.module.css";

/** Props for the videos route, carrying the async `locale` route param. */
type Props = { params: Promise<{ locale: string }> };

/**
 * Builds localized metadata for the videos page.
 *
 * @param props - Route props.
 * @param props.params - Promise resolving to the route params containing `locale`.
 * @returns The localized {@link Metadata} for the videos page.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale as Locale);
  return buildMetadata({
    locale: locale as Locale,
    path: "videos",
    title: t.videos.title,
    description: t.videos.intro,
  });
}

/**
 * Videos page (async Server Component). Renders live-video JSON-LD, the featured
 * video embed, the full video grid, and a YouTube channel link.
 *
 * @param props - Route props.
 * @param props.params - Promise resolving to the route params containing `locale`.
 * @returns The rendered videos page.
 */
export default async function VideosPage({ params }: Props) {
  const { locale } = await params;
  const t = getDictionary(locale as Locale);

  return (
    <>
      <PageSchema pathname={`/${locale}/videos`} />
      <JsonLd data={liveVideoJsonLd()} />
      <PageHero eyebrow="Live & Visuals" title={t.videos.title} intro={t.videos.intro} />

      <section className={mergeClassNames(primitives.section, primitives["section--smoke"])}>
        <div
          className={mergeClassNames(
            primitives.container,
            primitives["container--wide"],
            primitives["container--cozy"],
          )}
        >
          <Reveal>
            <p className={primitives.eyebrow}>// {t.videos.featured}</p>
            <h2
              className={mergeClassNames(
                primitives["section-heading"],
                primitives["section-heading--xl"],
              )}
            >
              Metalpunk Overkill
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className={styles["video-frame"]}>
              <iframe
                className={styles["video-frame__embed"]}
                src={`https://www.youtube.com/embed/${SITE.liveVideoId}`}
                title="Metalpunk Overkill"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className={styles["video-frame__caption"]}>{t.videos.featuredCaption}</p>
          </Reveal>
        </div>
      </section>

      <section className={primitives.section}>
        <div
          className={mergeClassNames(
            primitives.container,
            primitives["container--wide"],
            primitives["container--cozy"],
          )}
        >
          <Reveal>
            <p className={primitives.eyebrow}>// {t.videos.allTitle}</p>
            <h2 className={primitives["section-heading"]}>{t.videos.allTitle}</h2>
          </Reveal>

          <div className={styles["video-grid"]}>
            {SITE.videos.map((video, index) => (
              <Reveal key={video.id} delay={index * 0.05}>
                <article className={styles["video-card"]}>
                  <div className={styles["video-card__frame"]}>
                    <iframe
                      className={styles["video-card__embed"]}
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className={styles["video-card__tag"]}>{t.videos.kinds[video.kind]}</p>
                  <h3 className={styles["video-card__title"]}>{video.title}</h3>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <a
              href={SITE.socials.youtube}
              target="_blank"
              rel="noreferrer"
              className={mergeClassNames(
                primitives.cta,
                primitives["cta--sm"],
                primitives["cta--outline"],
                primitives["cta--standalone"],
              )}
            >
              {t.videos.moreOnYoutube} <ExternalLink size={14} />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
