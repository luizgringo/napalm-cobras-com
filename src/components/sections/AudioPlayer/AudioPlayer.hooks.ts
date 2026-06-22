/**
 * Logic layer for the `AudioPlayer` component: resolves the selected release
 * and builds localized human-readable metadata strings.
 */

import type { SpotifyRelease } from "@/features/music/services/spotify";
import type { Locale } from "@/i18n/config";

/** Localized labels for each Spotify release type, keyed by locale. */
const TYPE_LABELS: Record<
  Locale,
  { single: string; ep: string; album: string; compilation: string }
> = {
  pt: { single: "Single", ep: "EP", album: "Álbum", compilation: "Coletânea" },
  en: { single: "Single", ep: "EP", album: "Album", compilation: "Compilation" },
  es: { single: "Sencillo", ep: "EP", album: "Álbum", compilation: "Recopilación" },
};

/** Localized singular/plural track nouns, keyed by locale. */
const TRACK_LABELS: Record<Locale, { one: string; many: string }> = {
  pt: { one: "faixa", many: "faixas" },
  en: { one: "track", many: "tracks" },
  es: { one: "pista", many: "pistas" },
};

/**
 * Maps a raw Spotify release type to its localized label.
 *
 * @param type - Raw Spotify release type (e.g. `"single"`, `"album"`).
 * @param totalTracks - Number of tracks, used to promote multi-track singles to "EP".
 * @param locale - Active locale for the returned label.
 * @returns The localized release-type label, or the uppercased raw type when unknown.
 */
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

/**
 * Builds a localized track-count string (e.g. `"3 tracks"`).
 *
 * @param totalTracks - Number of tracks in the release.
 * @param locale - Active locale for the noun.
 * @returns The count followed by the localized singular/plural track noun.
 */
function formatTrackCount(totalTracks: number, locale: Locale): string {
  const labels = TRACK_LABELS[locale];
  return `${totalTracks} ${totalTracks === 1 ? labels.one : labels.many}`;
}

/** Parameters for the {@link useAudioPlayer} hook. */
interface UseAudioPlayerParams {
  /** Releases to select from. */
  releases: SpotifyRelease[];
  /** Identifier of the desired release. */
  selectedId: string;
  /** Active locale for formatted metadata. */
  locale: Locale;
}

/**
 * Encapsulates the `AudioPlayer` logic: resolves the active release from the
 * selected id (falling back to the first release) and derives localized
 * metadata strings.
 *
 * @param params - See {@link UseAudioPlayerParams}.
 * @returns An object with:
 * - `selectedRelease`: the resolved release (or `undefined` when the list is empty);
 * - `selectedMeta`: localized "type · tracks · year" string for the selected release;
 * - `describeRelease`: helper producing a short "type · year" label for any release.
 */
export function useAudioPlayer({ releases, selectedId, locale }: UseAudioPlayerParams) {
  const selectedRelease = releases.find((release) => release.id === selectedId) ?? releases[0];

  const selectedMeta = selectedRelease
    ? `${formatReleaseType(selectedRelease.type, selectedRelease.totalTracks, locale)} · ${formatTrackCount(selectedRelease.totalTracks, locale)} · ${selectedRelease.year}`
    : "";

  const describeRelease = (release: SpotifyRelease) =>
    `${formatReleaseType(release.type, release.totalTracks, locale)} · ${release.year}`;

  return { selectedRelease, selectedMeta, describeRelease };
}
