/**
 * Service for fetching the band's upcoming shows from the Bandsintown API and
 * generating schema.org `MusicEvent` JSON-LD for SEO.
 *
 * @remarks Data source: Bandsintown REST API (https://rest.bandsintown.com).
 */

import { SITE } from "@/config/site";
import { fetchJson } from "@/lib/api/http";

/** Venue details for a Bandsintown event. */
interface BandsintownVenue {
  /** Venue name. */
  name: string;
  /** City where the venue is located. */
  city: string;
  /** State/region, when available. */
  region?: string;
  /** Country where the venue is located. */
  country: string;
}

/** A Bandsintown event consumed by the UI. */
export interface BandsintownEvent {
  /** Unique event identifier. */
  id: string;
  /** URL to the event/tickets page. */
  url: string;
  /** ISO datetime of the event. */
  datetime: string;
  /** Optional event title. */
  title?: string;
  /** Venue where the event takes place. */
  venue: BandsintownVenue;
}

/**
 * Fetches the band's upcoming shows from the Bandsintown API.
 *
 * @returns The upcoming events, or `null` when the app id is not configured.
 * @remarks
 * Requires the `NEXT_PUBLIC_BANDSINTOWN_APP_ID` environment variable. The
 * response is cached/revalidated every 3600 seconds (1 hour).
 */
export async function getUpcomingShows(): Promise<BandsintownEvent[] | null> {
  const appId = process.env.NEXT_PUBLIC_BANDSINTOWN_APP_ID;
  if (!appId) {
    return null;
  }

  const url = `https://rest.bandsintown.com/artists/id_${SITE.bandsintown.artistId}/events?app_id=${appId}&date=upcoming`;
  return fetchJson<BandsintownEvent[]>(url, { revalidate: 3600 });
}

/**
 * Builds schema.org `MusicEvent` JSON-LD objects for the given events.
 *
 * @param events - The events to serialize.
 * @returns An array of JSON-LD objects suitable for embedding in a page.
 */
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
