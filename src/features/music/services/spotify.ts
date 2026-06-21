import { SITE } from "@/config/site";
import { fetchJson } from "@/lib/api/http";

export interface SpotifyRelease {
  id: string;
  name: string;
  type: string;
  year: string;
  totalTracks: number;
  image: string;
  embedUrl: string;
  spotifyUrl: string;
}

interface SpotifyImage {
  url: string;
  width: number;
  height: number;
}

interface SpotifyAlbumItem {
  id: string;
  name: string;
  album_type: string;
  release_date: string;
  total_tracks: number;
  images: SpotifyImage[];
  external_urls: { spotify: string };
}

interface SpotifyAlbumsResponse {
  items: SpotifyAlbumItem[];
}

interface SpotifyTokenResponse {
  access_token: string;
}

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const API_BASE = "https://api.spotify.com/v1";

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return null;
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const token = await fetchJson<SpotifyTokenResponse>(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    revalidate: 3600,
  });

  return token?.access_token ?? null;
}

function toEmbedUrl(albumId: string): string {
  return `https://open.spotify.com/embed/album/${albumId}?utm_source=generator&theme=0`;
}

function toRelease(item: SpotifyAlbumItem): SpotifyRelease {
  return {
    id: item.id,
    name: item.name,
    type: item.album_type,
    year: (item.release_date ?? "").slice(0, 4),
    totalTracks: item.total_tracks,
    image: item.images?.[1]?.url ?? item.images?.[0]?.url ?? "",
    embedUrl: toEmbedUrl(item.id),
    spotifyUrl: item.external_urls?.spotify ?? `https://open.spotify.com/album/${item.id}`,
  };
}

const CURATED_RELEASES: SpotifyRelease[] = [
  {
    id: "1oON2uCjZrnaHiNhClDijT",
    name: "Longo Caminho Para Casa",
    type: "single",
    year: "2024",
    totalTracks: 1,
    image: "",
    embedUrl: toEmbedUrl("1oON2uCjZrnaHiNhClDijT"),
    spotifyUrl: "https://open.spotify.com/album/1oON2uCjZrnaHiNhClDijT",
  },
  {
    id: SITE.spotify.albumId,
    name: SITE.album.title,
    type: SITE.album.type.toLowerCase(),
    year: SITE.album.year,
    totalTracks: SITE.album.tracks.length,
    image: "",
    embedUrl: toEmbedUrl(SITE.spotify.albumId),
    spotifyUrl: SITE.socials.spotify,
  },
];

function dedupeByName(releases: SpotifyRelease[]): SpotifyRelease[] {
  const seen = new Set<string>();
  return releases.filter((release) => {
    const key = release.name.toLowerCase();
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function mergeWithCurated(apiReleases: SpotifyRelease[]): SpotifyRelease[] {
  const seen = new Set(apiReleases.map((release) => release.name.toLowerCase()));
  const merged = [...apiReleases];
  for (const release of CURATED_RELEASES) {
    if (!seen.has(release.name.toLowerCase())) {
      merged.push(release);
      seen.add(release.name.toLowerCase());
    }
  }
  return merged.sort((first, second) => second.year.localeCompare(first.year));
}

function byNewest(first: SpotifyAlbumItem, second: SpotifyAlbumItem): number {
  return (second.release_date ?? "").localeCompare(first.release_date ?? "");
}

export async function getDiscography(): Promise<SpotifyRelease[]> {
  const token = await getAccessToken();
  if (!token) {
    return mergeWithCurated([]);
  }

  const url = `${API_BASE}/artists/${SITE.spotify.artistId}/albums?include_groups=album,single&market=BR&limit=50`;
  const data = await fetchJson<SpotifyAlbumsResponse>(url, {
    headers: { Authorization: `Bearer ${token}` },
    revalidate: 86400,
  });

  const apiReleases = data?.items
    ? dedupeByName([...data.items].sort(byNewest).map(toRelease))
    : [];
  return mergeWithCurated(apiReleases);
}
