import { fetchJson } from "@/lib/api/http";

export type InstagramMediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";

export interface InstagramPost {
  id: string;
  permalink: string;
  caption: string;
  timestamp: string;
  mediaType: InstagramMediaType;
  imageUrl: string;
  width: number;
  height: number;
  likeCount: number;
  commentsCount: number;
  isReel: boolean;
}

export interface InstagramProfile {
  username: string;
  biography: string;
  profilePictureUrl: string;
  website: string;
  followersCount: number;
}

export interface InstagramFeedData {
  profile: InstagramProfile;
  posts: InstagramPost[];
}

interface BeholdSize {
  width: number;
  height: number;
  mediaUrl: string;
}

interface BeholdPost {
  id: string;
  permalink: string;
  prunedCaption?: string;
  caption?: string;
  timestamp: string;
  likeCount?: number;
  commentsCount?: number;
  mediaType: InstagramMediaType;
  isReel?: boolean;
  sizes?: {
    small?: BeholdSize;
    medium?: BeholdSize;
    large?: BeholdSize;
  };
}

interface BeholdFeed {
  username: string;
  biography: string;
  profilePictureUrl: string;
  website: string;
  followersCount: number;
  posts: BeholdPost[];
}

function feedUrl(feedId: string): string {
  return `https://feeds.behold.so/${feedId}`;
}

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
