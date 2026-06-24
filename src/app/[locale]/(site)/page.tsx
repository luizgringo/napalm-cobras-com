/**
 * Localized home page. Async Server Component that aggregates discography,
 * upcoming shows, and the Instagram feed, then renders the home template.
 */
import type { Metadata } from "next";
import { PageSchema } from "@/components/seo/PageSchema";
import { HomeView } from "@/components/templates/HomeView";
import { getInstagramFeed } from "@/features/instagram";
import { getDiscography } from "@/features/music/services/spotify";
import { getUpcomingShows } from "@/features/shows";
import { getDictionary, type Locale } from "@/i18n/config";
import { buildMetadata } from "@/lib/seo";

/** Props for the home route, carrying the async `locale` route param. */
type Props = { params: Promise<{ locale: string }> };

/**
 * Builds localized metadata for the home page.
 *
 * @param props - Route props.
 * @param props.params - Promise resolving to the route params containing `locale`.
 * @returns The localized {@link Metadata} for the home page.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale as Locale);
  return buildMetadata({
    locale: locale as Locale,
    path: "",
    title: t.meta.homeTitle,
    description: t.meta.homeDesc,
    absoluteTitle: true,
  });
}

/**
 * Home page (async Server Component). Fetches discography, upcoming shows, and
 * the Instagram feed in parallel and passes them to the home view.
 *
 * @returns The rendered home view.
 * @remarks Data is fetched concurrently with `Promise.all`; a missing shows
 * result falls back to an empty array.
 */
export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const [releases, events, instagram] = await Promise.all([
    getDiscography(),
    getUpcomingShows(),
    getInstagramFeed(6),
  ]);
  return (
    <>
      <link
        rel="preload"
        href="/assets/images/band-hero.webp"
        as="image"
        type="image/webp"
        fetchPriority="high"
      />
      <PageSchema pathname={`/${locale}`} />
      <HomeView releases={releases} events={events ?? []} instagram={instagram} />
    </>
  );
}
