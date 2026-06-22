/**
 * Renders the Spotify album embed iframe for the band's featured release.
 */

import { SITE } from "@/config/site";

/** Props for {@link SpotifyEmbed}. */
interface SpotifyEmbedProps {
  /** Spotify embed URL; defaults to the site's featured album embed. */
  src?: string;
  /** Accessible iframe title; defaults to the featured album title. */
  title?: string;
}

/**
 * Renders a lazy-loaded Spotify player as an iframe.
 *
 * @param props - See {@link SpotifyEmbedProps}; both fields are optional.
 * @remarks Server component (renders a static iframe).
 */
export function SpotifyEmbed({
  src = SITE.album.spotifyEmbed,
  title = "Spotify — Homens Brancos de Terno",
}: SpotifyEmbedProps = {}) {
  return (
    <iframe
      title={title}
      src={src}
      width="100%"
      height={352}
      loading="lazy"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      style={{ border: 0, borderRadius: 12 }}
    />
  );
}
