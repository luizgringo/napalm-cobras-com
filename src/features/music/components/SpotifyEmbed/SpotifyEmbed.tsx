"use client";

import { LazyIframe } from "@/components/sections/LazyIframe";
import { SITE } from "@/config/site";
import styles from "./SpotifyEmbed.module.css";

interface SpotifyEmbedProps {
  src?: string;
  title?: string;
}

export function SpotifyEmbed({
  src = SITE.album.spotifyEmbed,
  title = "Spotify — Homens Brancos de Terno",
}: SpotifyEmbedProps) {
  return (
    <div className={styles["spotify-embed"]}>
      <LazyIframe
        title={title}
        src={src}
        minHeight={420}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
