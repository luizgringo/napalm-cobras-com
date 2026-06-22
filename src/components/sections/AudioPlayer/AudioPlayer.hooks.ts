import type { SpotifyRelease } from "@/features/music/services/spotify";
import type { Locale } from "@/i18n/config";

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

interface UseAudioPlayerParams {
  releases: SpotifyRelease[];
  selectedId: string;
  locale: Locale;
}

export function useAudioPlayer({ releases, selectedId, locale }: UseAudioPlayerParams) {
  const selectedRelease = releases.find((release) => release.id === selectedId) ?? releases[0];

  const selectedMeta = selectedRelease
    ? `${formatReleaseType(selectedRelease.type, selectedRelease.totalTracks, locale)} · ${formatTrackCount(selectedRelease.totalTracks, locale)} · ${selectedRelease.year}`
    : "";

  const describeRelease = (release: SpotifyRelease) =>
    `${formatReleaseType(release.type, release.totalTracks, locale)} · ${release.year}`;

  return { selectedRelease, selectedMeta, describeRelease };
}
