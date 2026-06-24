/**
 * Localized shows page. Async Server Component that lists upcoming shows (with
 * event JSON-LD) or a fallback widget, plus booking and Bandsintown links.
 */
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/sections/Reveal";
import { PageSchema } from "@/components/seo/PageSchema";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/templates/SectionTitle";
import { SITE } from "@/config/site";
import { getUpcomingShows, ShowsList, ShowsWidget, showsJsonLd } from "@/features/shows";
import { getDictionary, type Locale } from "@/i18n/config";
import { buildMetadata } from "@/lib/seo";
import { mergeClassNames } from "@/lib/utils";
import primitives from "@/styles/primitives.module.css";

/** Props for the shows route, carrying the async `locale` route param. */
type Props = { params: Promise<{ locale: string }> };

/**
 * Builds localized metadata for the shows page.
 *
 * @param props - Route props.
 * @param props.params - Promise resolving to the route params containing `locale`.
 * @returns The localized {@link Metadata} for the shows page.
 */
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

/**
 * Shows page (async Server Component). Fetches upcoming shows and renders the
 * event list with JSON-LD, or a fallback widget when none are available.
 *
 * @param props - Route props.
 * @param props.params - Promise resolving to the route params containing `locale`.
 * @returns The rendered shows page.
 * @remarks When no events are returned, the Bandsintown {@link ShowsWidget}
 * fallback is shown instead of the list.
 */
export default async function ShowsPage({ params }: Props) {
  const { locale } = await params;
  const t = getDictionary(locale as Locale);
  const events = await getUpcomingShows();

  return (
    <>
      <PageSchema pathname={`/${locale}/shows`} />
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
