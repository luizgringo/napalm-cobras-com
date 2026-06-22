import { SITE } from "@/config/site";
import { fetchJson } from "@/lib/api/http";

interface BandsintownVenue {
  name: string;
  city: string;
  region?: string;
  country: string;
}

export interface BandsintownEvent {
  id: string;
  url: string;
  datetime: string;
  title?: string;
  venue: BandsintownVenue;
}

export async function getUpcomingShows(): Promise<BandsintownEvent[] | null> {
  const appId = process.env.NEXT_PUBLIC_BANDSINTOWN_APP_ID;
  if (!appId) {
    return null;
  }

  const url = `https://rest.bandsintown.com/artists/id_${SITE.bandsintown.artistId}/events?app_id=${appId}&date=upcoming`;
  return fetchJson<BandsintownEvent[]>(url, { revalidate: 3600 });
}

export function showsJsonLd(events: BandsintownEvent[]) {
  return events.map((event) => ({
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: event.title || `${SITE.name} — ${event.venue.city}`,
    startDate: event.datetime,
    url: event.url,
    performer: { "@type": "MusicGroup", name: SITE.name },
    location: {
      "@type": "Place",
      name: event.venue.name,
      address: [event.venue.city, event.venue.region, event.venue.country]
        .filter(Boolean)
        .join(", "),
    },
  }));
}
