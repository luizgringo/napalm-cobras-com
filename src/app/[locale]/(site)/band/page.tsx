import type { Metadata } from "next";
import Image from "next/image";
import { LinkedText } from "@/components/sections/LinkedText";
import { Reveal } from "@/components/sections/Reveal";
import { PageHero } from "@/components/templates/SectionTitle";
import { BAND_LINKS, SITE } from "@/config/site";
import { getDictionary, type Locale } from "@/i18n/config";
import { buildMetadata } from "@/lib/seo";
import { mergeClassNames } from "@/lib/utils";
import primitives from "@/styles/primitives.module.css";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale as Locale);
  return buildMetadata({
    locale: locale as Locale,
    path: "band",
    title: t.band.title,
    description: t.band.intro,
  });
}

export default async function BandPage({ params }: Props) {
  const { locale } = await params;
  const t = getDictionary(locale as Locale);

  return (
    <>
      <PageHero eyebrow={t.meta.tagline} title={t.band.title} intro={t.band.intro} />

      <section className={mergeClassNames(primitives.section, primitives["section--smoke"])}>
        <div className={primitives.container}>
          <Reveal>
            <p className={primitives.eyebrow}>// {t.band.membersTitle}</p>
            <h2 className={primitives["section-heading"]}>{t.band.membersTitle}</h2>
          </Reveal>
          <div className={styles["member-grid"]}>
            {t.band.members.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.1}>
                <article className={styles["member-card"]}>
                  <div className={styles["member-card__media"]}>
                    <Image
                      src={SITE.members[index].photo}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className={styles["member-card__img"]}
                    />
                  </div>
                  <div className={styles["member-card__body"]}>
                    <h3 className={styles["member-card__name"]}>{member.name}</h3>
                    <p className={styles["member-card__role"]}>{member.role}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={primitives.section}>
        <div
          className={mergeClassNames(
            primitives.container,
            primitives["container--narrow"],
            primitives["container--flow"],
          )}
        >
          {t.band.bio.map((paragraph, index) => (
            <Reveal key={paragraph} delay={index * 0.1}>
              <p className={primitives["prose-lg"]}>
                <LinkedText
                  text={paragraph}
                  links={BAND_LINKS}
                  linkClassName={styles["bio-link"]}
                />
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={primitives["section--smoke"]}>
        <div className={mergeClassNames(primitives.container, primitives["container--narrow"])}>
          <Reveal>
            <p className={primitives.eyebrow}>// {t.band.historyTitle}</p>
            <h2 className={primitives["section-heading"]}>{t.band.historyTitle}</h2>
          </Reveal>
          <ol className={styles.timeline}>
            {t.band.timeline.map((entry, index) => (
              <Reveal key={entry.year} delay={index * 0.05}>
                <li className={styles.timeline__item}>
                  <span className={styles.timeline__dot} />
                  <p className={styles.timeline__year}>{entry.year}</p>
                  <p className={styles.timeline__text}>
                    <LinkedText
                      text={entry.text}
                      links={BAND_LINKS}
                      linkClassName={styles["bio-link"]}
                    />
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
