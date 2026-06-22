/**
 * Service for fetching the Instagram feed via the Behold.so feeds API and
 * normalizing the raw response into the shape consumed by the UI.
 *
 * @remarks Data source: Behold.so (https://feeds.behold.so/{feedId}).
 */

import { fetchJson } from "@/lib/api/http";

/** Supported Instagram media types. */
type InstagramMediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";

/** A normalized Instagram post consumed by the UI. */
interface InstagramPost {
  /** Unique post identifier. */
  id: string;
  /** Public permalink to the post on Instagram. */
  permalink: string;
  /** Post caption text (empty string when none). */
  caption: string;
  /** ISO timestamp of when the post was published. */
  timestamp: string;
  /** Media type of the post. */
  mediaType: InstagramMediaType;
  /** Resolved image/thumbnail URL for display. */
  imageUrl: string;
  /** Image width in pixels. */
  width: number;
  /** Image height in pixels. */
  height: number;
  /** Number of likes on the post. */
  likeCount: number;
  /** Number of comments on the post. */
  commentsCount: number;
  /** Whether the post is an Instagram Reel. */
  isReel: boolean;
}

/** A normalized Instagram profile consumed by the UI. */
interface InstagramProfile {
  /** Account handle (without leading "@"). */
  username: string;
  /** Profile biography text. */
  biography: string;
  /** URL of the profile picture. */
  profilePictureUrl: string;
  /** Profile website URL. */
  website: string;
  /** Total follower count. */
  followersCount: number;
}

/** Normalized Instagram feed: profile metadata plus its posts. */
export interface InstagramFeedData {
  /** The Instagram profile details. */
  profile: InstagramProfile;
  /** The list of normalized posts. */
  posts: InstagramPost[];
}

/** A single rendition (size variant) of a Behold media item. */
interface BeholdSize {
  /** Width in pixels. */
  width: number;
  /** Height in pixels. */
  height: number;
  /** Media URL for this size. */
  mediaUrl: string;
}

/** Raw post entry as returned by the Behold.so feed. */
interface BeholdPost {
  /** Unique post identifier. */
  id: string;
  /** Public permalink to the post. */
  permalink: string;
  /** Caption with truncated/cleaned text, when available. */
  prunedCaption?: string;
  /** Full caption text, when available. */
  caption?: string;
  /** ISO timestamp of when the post was published. */
  timestamp: string;
  /** Number of likes, when available. */
  likeCount?: number;
  /** Number of comments, when available. */
  commentsCount?: number;
  /** Media type of the post. */
  mediaType: InstagramMediaType;
  /** Whether the post is a Reel, when available. */
  isReel?: boolean;
  /** Available media renditions keyed by size. */
  sizes?: {
    /** Small rendition. */
    small?: BeholdSize;
    /** Medium rendition. */
    medium?: BeholdSize;
    /** Large rendition. */
    large?: BeholdSize;
  };
}

/** Raw feed payload as returned by the Behold.so API. */
interface BeholdFeed {
  /** Account handle. */
  username: string;
  /** Profile biography text. */
  biography: string;
  /** Profile picture URL. */
  profilePictureUrl: string;
  /** Profile website URL. */
  website: string;
  /** Total follower count. */
  followersCount: number;
  /** Raw posts in the feed. */
  posts: BeholdPost[];
}

/**
 * Builds the Behold.so feed endpoint URL for a given feed id.
 *
 * @param feedId - The Behold feed identifier.
 * @returns The fully-qualified feed URL.
 */
function feedUrl(feedId: string): string {
  return `https://feeds.behold.so/${feedId}`;
}

/**
 * Maps a raw Behold post to a normalized {@link InstagramPost}, selecting the
 * best available size (medium, then large, then small) and applying fallbacks.
 *
 * @param post - The raw Behold post.
 * @returns The normalized post.
 */
function toPost(post: BeholdPost): InstagramPost {
  const size = post.sizes?.medium ?? post.sizes?.large ?? post.sizes?.small;
  return {
    id: post.id,
    permalink: post.permalink,
    caption: post.prunedCaption ?? post.caption ?? "",
    timestamp: post.timestamp,
    mediaType: post.mediaType,
    imageUrl: size?.mediaUrl ?? "",
    width: size?.width ?? 700,
    height: size?.height ?? 700,
    likeCount: post.likeCount ?? 0,
    commentsCount: post.commentsCount ?? 0,
    isReel: post.isReel ?? false,
  };
}

/**
 * Fetches and normalizes the Instagram feed from Behold.so.
 *
 * @param limit - Maximum number of posts to return (defaults to 6).
 * @returns The normalized feed, or `null` when not configured or empty.
 * @remarks
 * Requires the `BEHOLD_FEED_ID` environment variable; returns `null` if unset.
 * Responses are cached/revalidated every 3600 seconds (1 hour).
 * Only posts that include size renditions are kept.
 */
export async function getInstagramFeed(limit = 6): Promise<InstagramFeedData | null> {
  const feedId = process.env.BEHOLD_FEED_ID;
  if (!feedId) {
    return null;
  }

  const data = await fetchJson<BeholdFeed>(feedUrl(feedId), { revalidate: 3600 });
  if (!data?.posts) {
    return null;
  }

  return {
    profile: {
      username: data.username,
      biography: data.biography,
      profilePictureUrl: data.profilePictureUrl,
      website: data.website,
      followersCount: data.followersCount,
    },
    posts: data.posts
      .filter((post) => post.sizes)
      .slice(0, limit)
      .map(toPost),
  };
}
