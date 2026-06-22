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

type SocialKey = keyof typeof SITE.socials;

const DeezerIcon: IconType = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.81 4.16v3.03H24V4.16h-5.19zM0 9.59v3.03h5.19V9.59H0zm6.27 0v3.03h5.19V9.59H6.27zm6.27 0v3.03h5.19V9.59h-5.19zm6.27 0v3.03H24V9.59h-5.19zM0 15.02v3.03h5.19v-3.03H0zm6.27 0v3.03h5.19v-3.03H6.27zm6.27 0v3.03h5.19v-3.03h-5.19zm6.27 0v3.03H24v-3.03h-5.19z" />
  </svg>
);

const QobuzIcon: IconType = ({ size = 16, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2a10 10 0 1 0 6.36 17.71l2.22 2.22 1.42-1.42-2.22-2.22A10 10 0 0 0 12 2Zm0 3a7 7 0 1 1 0 14 7 7 0 0 1 0-14Z"
    />
  </svg>
);

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

export interface SocialLinkDef {
  name: string;
  key: SocialKey;
}

export function socialItems(defs: SocialLinkDef[]): LinkGridItem[] {
  return defs.map((def) => ({
    name: def.name,
    href: SITE.socials[def.key],
    icon: SOCIAL_ICONS[def.key],
  }));
}

export function streamingItems(list: readonly { name: string; url: string }[]): LinkGridItem[] {
  return list.map((item) => ({
    name: item.name,
    href: item.url,
    icon: STREAMING_ICONS[item.name] ?? SiSpotify,
  }));
}
