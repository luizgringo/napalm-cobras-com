import { SITE } from "@/config/site";

interface SpotifyEmbedProps {
  src?: string;
  title?: string;
}

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
