import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/sections/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/templates/SectionTitle";
import { SITE } from "@/config/site";
import { getUpcomingShows, ShowsList, ShowsWidget, showsJsonLd } from "@/features/shows";
import { getDictionary, type Locale } from "@/i18n/config";
import { buildMetadata } from "@/lib/seo";
import { mergeClassNames } from "@/lib/utils";
import primitives from "@/styles/primitives.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale as Locale);
  return buildMetadata({
    locale: locale as Locale,
    path: "shows",
    title: t.shows.title,
    description: t.shows.intro,
  });
}

export default async function ShowsPage({ params }: Props) {
  const { locale } = await params;
  const t = getDictionary(locale as Locale);
  const events = await getUpcomingShows();

  return (
    <>
      <PageHero eyebrow="Live" title={t.shows.title} intro={t.shows.intro} />

      <section className={mergeClassNames(primitives.section, primitives["section--smoke"])}>
        <div
          className={mergeClassNames(
            primitives.container,
            primitives["container--mid"],
            primitives["container--snug"],
          )}
        >
          <Reveal>
            {events && events.length > 0 ? (
              <>
                <JsonLd data={{ "@graph": showsJsonLd(events) }} />
                <ShowsList events={events} ticketsLabel="Tickets" />
              </>
            ) : (
              <ShowsWidget fallback={t.shows.fallback} />
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <div className={primitives.actions}>
              <a
                href={SITE.socials.bandsintown}
                target="_blank"
                rel="noreferrer"
                className={mergeClassNames(
                  primitives.cta,
                  primitives["cta--sm"],
                  primitives["cta--outline"],
                )}
              >
                {t.shows.openBandsintown} <ExternalLink size={14} />
              </a>
              <Link
                href={`/${locale}/contact`}
                className={mergeClassNames(
                  primitives.cta,
                  primitives["cta--sm"],
                  primitives["cta--solid"],
                )}
              >
                {t.shows.booking}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
