import { fetchJson } from "@/lib/api/http";

export interface InstagramPost {
  id: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  caption?: string;
}

interface BeholdResponse {
  posts?: InstagramPost[];
}

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
