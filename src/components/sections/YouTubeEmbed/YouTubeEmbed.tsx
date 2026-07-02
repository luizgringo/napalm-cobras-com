"use client";

import { EmbedFacade } from "@/components/sections/EmbedFacade";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  playLabel: string;
}

export function YouTubeEmbed({ videoId, title, playLabel }: YouTubeEmbedProps) {
  return (
    <EmbedFacade
      title={title}
      src={`https://www.youtube.com/embed/${videoId}`}
      playLabel={playLabel}
      variant="video"
      poster={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
      fillParent
    />
  );
}
