/**
 * Service for fetching the band's discography from the Spotify Web API,
 * authenticating via the Client Credentials flow and merging API results
 * with a curated fallback list.
 *
 * @remarks Data source: Spotify Web API (https://api.spotify.com/v1).
 */

import { SITE } from "@/config/site";
import { fetchJson } from "@/lib/api/http";

/** A normalized Spotify release (album or single) consumed by the UI. */
export interface SpotifyRelease {
  /** Spotify album/release id. */
  id: string;
  /** Release title. */
  name: string;
  /** Release type (e.g. "album", "single"). */
  type: string;
  /** Release year (4-digit string). */
  year: string;
  /** Total number of tracks. */
  totalTracks: number;
  /** Cover image URL. */
  image: string;
  /** Spotify embed URL for the release. */
  embedUrl: string;
  /** Public Spotify URL for the release. */
  spotifyUrl: string;
}

/** Raw Spotify image object. */
interface SpotifyImage {
  /** Image URL. */
  url: string;
  /** Image width in pixels. */
  width: number;
  /** Image height in pixels. */
  height: number;
}

/** Raw album item as returned by the Spotify albums endpoint. */
interface SpotifyAlbumItem {
  /** Spotify album id. */
  id: string;
  /** Album title. */
  name: string;
  /** Album type (e.g. "album", "single"). */
  album_type: string;
  /** Release date string. */
  release_date: string;
  /** Total number of tracks. */
  total_tracks: number;
  /** Available cover images. */
  images: SpotifyImage[];
  /** External links, including the public Spotify URL. */
  external_urls: { spotify: string };
}

/** Raw response from the Spotify artist albums endpoint. */
interface SpotifyAlbumsResponse {
  /** The list of album items. */
  items: SpotifyAlbumItem[];
}

/** Raw response from the Spotify token endpoint. */
interface SpotifyTokenResponse {
  /** OAuth access token. */
  access_token: string;
}

/** Spotify OAuth token endpoint. */
const TOKEN_URL = "https://accounts.spotify.com/api/token";
/** Base URL of the Spotify Web API. */
const API_BASE = "https://api.spotify.com/v1";

/**
 * Obtains a Spotify access token using the Client Credentials flow.
 *
 * @returns The access token, or `null` when credentials are not configured.
 * @remarks
 * Requires the `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` environment
 * variables. The token request is cached/revalidated every 3600 seconds.
 */
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

/**
 * Builds a Spotify embed URL for an album id.
 *
 * @param albumId - The Spotify album id.
 * @returns The embed URL.
 */
function toEmbedUrl(albumId: string): string {
  return `https://open.spotify.com/embed/album/${albumId}?utm_source=generator&theme=0`;
}

/**
 * Maps a raw Spotify album item to a normalized {@link SpotifyRelease},
 * preferring the medium cover image and applying URL fallbacks.
 *
 * @param item - The raw album item.
 * @returns The normalized release.
 */
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

/** Hand-picked releases used as a fallback and to guarantee key releases appear. */
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

/**
 * Removes releases with duplicate names (case-insensitive), keeping the first.
 *
 * @param releases - The releases to deduplicate.
 * @returns The deduplicated releases.
 */
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

/**
 * Merges API releases with the curated list (avoiding name duplicates) and
 * sorts the result by year, newest first.
 *
 * @param apiReleases - Releases fetched from the Spotify API.
 * @returns The merged, sorted releases.
 */
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

/**
 * Comparator that orders album items by release date, newest first.
 *
 * @param first - The first album item.
 * @param second - The second album item.
 * @returns A negative, zero, or positive number per `Array.prototype.sort`.
 */
function byNewest(first: SpotifyAlbumItem, second: SpotifyAlbumItem): number {
  return (second.release_date ?? "").localeCompare(first.release_date ?? "");
}

/**
 * Fetches the band's discography from the Spotify Web API and merges it with
 * the curated release list.
 *
 * @returns The list of releases; falls back to the curated list when the API
 * is unavailable or unauthenticated.
 * @remarks
 * Authenticates via {@link getAccessToken} (Client Credentials flow). The
 * albums request is cached/revalidated every 86400 seconds (24 hours).
 */
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
