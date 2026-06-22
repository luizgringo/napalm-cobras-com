import type { InstagramFeedData } from "../services/behold";

const THOUSANDS_THRESHOLD = 1000;

function formatCompactCount(value: number): string {
  if (value >= THOUSANDS_THRESHOLD) {
    return `${(value / THOUSANDS_THRESHOLD).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return String(value);
}

export function useInstagramFeed(feed: InstagramFeedData) {
  return {
    profile: feed.profile,
    posts: feed.posts,
    formatCount: formatCompactCount,
  };
}
