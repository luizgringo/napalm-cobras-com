/**
 * Renders the Spotify album embed iframe for the band's featured release.
 */

import { SITE } from "@/config/site";
import styles from "./SpotifyEmbed.module.css";

/** Props for {@link SpotifyEmbed}. */
interface SpotifyEmbedProps {
  /** Spotify embed URL; defaults to the site's featured album embed. */
  src?: string;
  /** Accessible iframe title; defaults to the featured album title. */
  title?: string;
}

/**
 * Renders an embedded Spotify player iframe.
 *
 * @param props - See {@link SpotifyEmbedProps}.
 */
export function SpotifyEmbed({
  src = SITE.album.spotifyEmbed,
  title = "Spotify — Homens Brancos de Terno",
}: SpotifyEmbedProps) {
  return (
    <div className={styles["spotify-embed"]}>
      <iframe
        title={title}
        src={src}
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
