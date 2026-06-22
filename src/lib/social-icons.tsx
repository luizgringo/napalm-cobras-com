import type { IconType } from "react-icons";
import {
  SiAmazonmusic,
  SiApplemusic,
  SiBandcamp,
  SiBandsintown,
  SiInstagram,
  SiLinktree,
  SiSoundcloud,
  SiSpotify,
  SiTiktok,
  SiX,
  SiYoutube,
  SiYoutubemusic,
} from "react-icons/si";
import type { LinkGridItem } from "@/components/sections/LinkGrid";
import { SITE } from "@/config/site";

/**
 * Social and streaming icon registry plus link-grid item builders.
 *
 * @remarks
 * Maps each social/streaming platform to a `react-icons` component (with custom
 * SVG icons for Deezer and Qobuz, which are not provided by the icon set) and
 * exposes helpers that turn config definitions into {@link LinkGridItem}s.
 */

/** Union of social platform keys defined under `SITE.socials`. */
type SocialKey = keyof typeof SITE.socials;

/** Custom inline Deezer icon (not available in `react-icons`). */
const DeezerIcon: IconType = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.81 4.16v3.03H24V4.16h-5.19zM0 9.59v3.03h5.19V9.59H0zm6.27 0v3.03h5.19V9.59H6.27zm6.27 0v3.03h5.19V9.59h-5.19zm6.27 0v3.03H24V9.59h-5.19zM0 15.02v3.03h5.19v-3.03H0zm6.27 0v3.03h5.19v-3.03H6.27zm6.27 0v3.03h5.19v-3.03h-5.19zm6.27 0v3.03H24v-3.03h-5.19z" />
  </svg>
);

/** Custom inline Qobuz icon (not available in `react-icons`). */
const QobuzIcon: IconType = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2a10 10 0 1 0 6.36 17.71l2.22 2.22 1.42-1.42-2.22-2.22A10 10 0 0 0 12 2Zm0 3a7 7 0 1 1 0 14 7 7 0 0 1 0-14Z"
    />
  </svg>
);

/** Icon component for each social/streaming key in `SITE.socials`. */
export const SOCIAL_ICONS: Record<SocialKey, IconType> = {
  instagram: SiInstagram,
  bandcamp: SiBandcamp,
  youtube: SiYoutube,
  spotify: SiSpotify,
  spotifyArtist: SiSpotify,
  bandsintown: SiBandsintown,
  soundcloud: SiSoundcloud,
  tiktok: SiTiktok,
  twitter: SiX,
  youtubeMusic: SiYoutubemusic,
  deezer: DeezerIcon,
  appleMusic: SiApplemusic,
  amazonMusic: SiAmazonmusic,
  qobuz: QobuzIcon,
  linktree: SiLinktree,
};

/** Icon component keyed by streaming service display name. */
const STREAMING_ICONS: Record<string, IconType> = {
  Spotify: SiSpotify,
  Bandcamp: SiBandcamp,
  "YouTube Music": SiYoutubemusic,
  YouTube: SiYoutube,
  "Apple Music": SiApplemusic,
  "Amazon Music": SiAmazonmusic,
  Deezer: DeezerIcon,
  Qobuz: QobuzIcon,
  SoundCloud: SiSoundcloud,
};

/**
 * Definition of a social link to be resolved against `SITE.socials`.
 */
export interface SocialLinkDef {
  /** Display name shown for the link. */
  name: string;
  /** Social key used to look up the URL and icon. */
  key: SocialKey;
}

/**
 * Maps social link definitions to renderable link-grid items.
 *
 * @param defs - Social link definitions to resolve.
 * @returns Link-grid items with name, resolved href and icon.
 */
export function socialItems(defs: SocialLinkDef[]): LinkGridItem[] {
  return defs.map((def) => ({
    name: def.name,
    href: SITE.socials[def.key],
    icon: SOCIAL_ICONS[def.key],
  }));
}

/**
 * Maps streaming entries to renderable link-grid items.
 *
 * @param list - Streaming entries with display name and URL.
 * @returns Link-grid items, falling back to the Spotify icon for unknown names.
 */
export function streamingItems(list: readonly { name: string; url: string }[]): LinkGridItem[] {
  return list.map((item) => ({
    name: item.name,
    href: item.url,
    icon: STREAMING_ICONS[item.name] ?? SiSpotify,
  }));
}
