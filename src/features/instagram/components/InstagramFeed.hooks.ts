/**
 * Hook and helpers backing the {@link InstagramFeed} component: exposes the
 * feed's profile/posts and a compact number formatter.
 */

import type { InstagramFeedData } from "../services/behold";

/** Value at or above which counts are formatted with a "k" suffix. */
const THOUSANDS_THRESHOLD = 1000;

/**
 * Formats a count compactly, abbreviating thousands as "k" (e.g. 1500 -> "1.5k").
 *
 * @param value - The raw count to format.
 * @returns The formatted count string.
 */
function formatCompactCount(value: number): string {
  if (value >= THOUSANDS_THRESHOLD) {
    return `${(value / THOUSANDS_THRESHOLD).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return String(value);
}

/**
 * Provides the data and helpers needed to render the Instagram feed.
 *
 * @param feed - The normalized Instagram feed data.
 * @returns An object with:
 * - `profile`: the Instagram profile details.
 * - `posts`: the list of Instagram posts.
 * - `formatCount`: helper to format counts compactly.
 */
export function useInstagramFeed(feed: InstagramFeedData) {
  return {
    profile: feed.profile,
    posts: feed.posts,
    formatCount: formatCompactCount,
  };
}
