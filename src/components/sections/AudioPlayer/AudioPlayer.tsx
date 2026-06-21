"use client";

import { Volume2 } from "lucide-react";
import type { SpotifyRelease } from "@/features/music/services/spotify";
import type { Locale } from "@/i18n/config";
import { mergeClassNames } from "@/lib/utils";
import styles from "./AudioPlayer.module.css";

interface AudioPlayerProps {
  releases: SpotifyRelease[];
  selectedId: string;
  onSelect: (releaseId: string) => void;
  locale: Locale;
  bandcampHref: string;
  cta: string;
}

const TYPE_LABELS: Record<
  Locale,
  { single: string; ep: string; album: string; compilation: string }
> = {
  pt: { single: "Single", ep: "EP", album: "Álbum", compilation: "Coletânea" },
  en: { single: "Single", ep: "EP", album: "Album", compilation: "Compilation" },
  es: { single: "Sencillo", ep: "EP", album: "Álbum", compilation: "Recopilación" },
};

const TRACK_LABELS: Record<Locale, { one: string; many: string }> = {
  pt: { one: "faixa", many: "faixas" },
  en: { one: "track", many: "tracks" },
  es: { one: "pista", many: "pistas" },
};

function formatReleaseType(type: string, totalTracks: number, locale: Locale): string {
  const labels = TYPE_LABELS[locale];
  if (type === "single" && totalTracks > 1) {
    return labels.ep;
  }
  if (type === "single") {
    return labels.single;
  }
  if (type === "compilation") {
    return labels.compilation;
  }
  if (type === "album") {
    return labels.album;
  }
  return type.toUpperCase();
}

function formatTrackCount(totalTracks: number, locale: Locale): string {
  const labels = TRACK_LABELS[locale];
  return `${totalTracks} ${totalTracks === 1 ? labels.one : labels.many}`;
}

export function AudioPlayer({
  releases,
  selectedId,
  onSelect,
  locale,
  bandcampHref,
  cta,
}: AudioPlayerProps) {
  const selected = releases.find((release) => release.id === selectedId) ?? releases[0];

  if (!selected) {
    return null;
  }

  const selectedType = formatReleaseType(selected.type, selected.totalTracks, locale);
  const meta = `${selectedType} · ${formatTrackCount(selected.totalTracks, locale)} · ${selected.year}`;

  return (
    <div className={styles["audio-player"]}>
      <div className={styles["audio-player__head"]}>
        <div className={styles["audio-player__info"]}>
          <p className={styles["audio-player__eyebrow"]}>// NOW PLAYING</p>
          <p className={styles["audio-player__title"]}>{selected.name}</p>
          <p className={styles["audio-player__meta"]}>{meta}</p>
        </div>
        <span className={styles["audio-player__badge"]} aria-hidden>
          SPOTIFY
        </span>
      </div>

      {releases.length > 1 ? (
        <div className={styles["audio-player__selector"]} role="tablist" aria-label="Discografia">
          {releases.map((release) => {
            const active = release.id === selected.id;
            return (
              <button
                key={release.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onSelect(release.id)}
                className={mergeClassNames(
                  styles["audio-player__tab"],
                  active && styles["audio-player__tab--active"],
                )}
              >
                <span className={styles["audio-player__tab-name"]}>{release.name}</span>
                <span className={styles["audio-player__tab-meta"]}>
                  {formatReleaseType(release.type, release.totalTracks, locale)} · {release.year}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}

      <div className={styles["audio-player__embed"]}>
        <iframe
          key={selected.id}
          title={`${selected.name} — Spotify`}
          src={selected.embedUrl}
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
