import type { Metadata } from "next";
import { HomeView } from "@/components/templates/HomeView";
import { getInstagramFeed } from "@/features/instagram";
import { getDiscography } from "@/features/music/services/spotify";
import { getUpcomingShows } from "@/features/shows";
import { getDictionary, type Locale } from "@/i18n/config";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

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

export default async function HomePage() {
  const [releases, events, instagram] = await Promise.all([
    getDiscography(),
    getUpcomingShows(),
    getInstagramFeed(),
  ]);
  return <HomeView releases={releases} events={events ?? []} instagram={instagram} />;
}
