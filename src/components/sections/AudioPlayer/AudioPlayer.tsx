"use client";

/**
 * Client component that renders the Spotify release player: a "now playing"
 * header, an optional discography tab selector and an embedded Spotify iframe.
 *
 * @remarks
 * Structure lives here, styling in `AudioPlayer.module.css`, and the
 * presentation logic (selected release resolution and metadata formatting) is
 * encapsulated in the {@link useAudioPlayer} hook.
 */

import { Volume2 } from "lucide-react";
import type { SpotifyRelease } from "@/features/music/services/spotify";
import type { Locale } from "@/i18n/config";
import { mergeClassNames } from "@/lib/utils";
import { useAudioPlayer } from "./AudioPlayer.hooks";
import styles from "./AudioPlayer.module.css";

/** Props accepted by the {@link AudioPlayer} component. */
interface AudioPlayerProps {
  /** Spotify releases available for playback and selection. */
  releases: SpotifyRelease[];
  /** Identifier of the release currently selected. */
  selectedId: string;
  /** Callback invoked with the release id when a tab is chosen. */
  onSelect: (releaseId: string) => void;
  /** Active locale used to localize release metadata. */
  locale: Locale;
  /** External Bandcamp URL opened by the footer call-to-action. */
  bandcampHref: string;
  /** Localized label for the Bandcamp call-to-action link. */
  cta: string;
}

/**
 * Renders the now-playing header, optional discography selector and the
 * embedded Spotify player for the selected release.
 *
 * @param props - See {@link AudioPlayerProps}.
 * @returns The player markup, or `null` when no release can be resolved.
 * @remarks Client component (`"use client"`).
 */
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
