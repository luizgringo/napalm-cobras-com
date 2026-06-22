"use client";

import { Volume2 } from "lucide-react";
import type { SpotifyRelease } from "@/features/music/services/spotify";
import type { Locale } from "@/i18n/config";
import { mergeClassNames } from "@/lib/utils";
import { useAudioPlayer } from "./AudioPlayer.hooks";
import styles from "./AudioPlayer.module.css";

interface AudioPlayerProps {
  releases: SpotifyRelease[];
  selectedId: string;
  onSelect: (releaseId: string) => void;
  locale: Locale;
  bandcampHref: string;
  cta: string;
}

export function AudioPlayer({
  releases,
  selectedId,
  onSelect,
  locale,
  bandcampHref,
  cta,
}: AudioPlayerProps) {
  const { selectedRelease, selectedMeta, describeRelease } = useAudioPlayer({
    releases,
    selectedId,
    locale,
  });

  if (!selectedRelease) {
    return null;
  }

  return (
    <div className={styles["audio-player"]}>
      <div className={styles["audio-player__head"]}>
        <div className={styles["audio-player__info"]}>
          <p className={styles["audio-player__eyebrow"]}>// NOW PLAYING</p>
          <p className={styles["audio-player__title"]}>{selectedRelease.name}</p>
          <p className={styles["audio-player__meta"]}>{selectedMeta}</p>
        </div>
        <span className={styles["audio-player__badge"]} aria-hidden>
          SPOTIFY
        </span>
      </div>

      {releases.length > 1 ? (
        <div className={styles["audio-player__selector"]} role="tablist" aria-label="Discografia">
          {releases.map((release) => {
            const isActive = release.id === selectedRelease.id;
            return (
              <button
                key={release.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelect(release.id)}
                className={mergeClassNames(
                  styles["audio-player__tab"],
                  isActive && styles["audio-player__tab--active"],
                )}
              >
                <span className={styles["audio-player__tab-name"]}>{release.name}</span>
                <span className={styles["audio-player__tab-meta"]}>{describeRelease(release)}</span>
              </button>
            );
          })}
        </div>
      ) : null}

      <div className={styles["audio-player__embed"]}>
        <iframe
          key={selectedRelease.id}
          title={`${selectedRelease.name} — Spotify`}
          src={selectedRelease.embedUrl}
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className={styles["audio-player__footer"]}>
        <div className={styles["audio-player__status"]}>
          <Volume2 size={12} /> STREAMING · SPOTIFY
        </div>
        <a
          href={bandcampHref}
          target="_blank"
          rel="noreferrer"
          className={styles["audio-player__link"]}
        >
          {cta} →
        </a>
      </div>
    </div>
  );
}
