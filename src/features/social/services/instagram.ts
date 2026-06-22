/**
 * Service for fetching a lightweight Instagram post list via the Behold.so
 * feeds API.
 *
 * @remarks Data source: Behold.so (https://feeds.behold.so/{feedId}).
 */

import { fetchJson } from "@/lib/api/http";

/** A minimal Instagram post used by the social feed grid. */
export interface InstagramPost {
  /** Unique post identifier. */
  id: string;
  /** Full-size media URL. */
  mediaUrl: string;
  /** Thumbnail URL, when available. */
  thumbnailUrl?: string;
  /** Public permalink to the post. */
  permalink: string;
  /** Post caption, when available. */
  caption?: string;
}

/** Raw response payload from the Behold.so feed. */
interface BeholdResponse {
  /** The posts in the feed, when present. */
  posts?: InstagramPost[];
}

/**
 * Fetches recent Instagram posts from Behold.so.
 *
 * @returns The posts, or `null` when not configured or empty.
 * @remarks
 * Requires the `BEHOLD_FEED_ID` environment variable. The response is
 * cached/revalidated every 3600 seconds (1 hour).
 */
export async function getInstagramFeed(): Promise<InstagramPost[] | null> {
  const feedId = process.env.BEHOLD_FEED_ID;
  if (!feedId) {
    return null;
  }

  const data = await fetchJson<BeholdResponse>(`https://feeds.behold.so/${feedId}`, {
    revalidate: 3600,
  });
  return data?.posts ?? null;
}
