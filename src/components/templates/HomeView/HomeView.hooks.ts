/**
 * HomeView hooks — encapsulate the data shaping and stateful logic for the
 * `HomeView` template: discography fallback, upcoming shows formatting, hero
 * scroll parallax and the persisted "snake trail" toggle.
 */

import { useEffect, useRef, useState } from "react";
import { getReleaseCredits, SITE } from "@/config/site";
import type { SpotifyRelease } from "@/features/music/services/spotify";
import type { BandsintownEvent } from "@/features/shows";
import type { Locale } from "@/i18n/config";

/** localStorage key persisting the snake-trail toggle preference. */
const SNAKE_STORAGE_KEY = "napalm-snake-trail";

/** Maps each app locale to its BCP 47 tag for date formatting. */
const DATE_LOCALES: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en-US",
  es: "es-ES",
};

/** Maximum number of upcoming shows surfaced on the homepage. */
const MAX_UPCOMING_SHOWS = 3;

/** Default release shown when no Spotify data is available, built from `SITE` config. */
const fallbackRelease: SpotifyRelease = {
  id: SITE.spotify.albumId,
  name: SITE.album.title,
  type: SITE.album.type.toLowerCase(),
  year: SITE.album.year,
  totalTracks: SITE.album.tracks.length,
  image: "",
  embedUrl: SITE.album.spotifyEmbed,
  spotifyUrl: SITE.socials.spotify,
};

/**
 * Formats an event datetime as a zero-padded `DD.MM` day label.
 *
 * @param datetime - An ISO datetime string.
 * @returns The day and month as `DD.MM`.
 */
function formatEventDay(datetime: string): string {
  const date = new Date(datetime);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}.${month}`;
}

/**
 * Formats an event datetime as an uppercase short weekday in the given locale.
 *
 * @param datetime - An ISO datetime string.
 * @param locale - The app locale used to localize the weekday.
 * @returns The uppercased short weekday (e.g. `"SEX"`, `"FRI"`).
 */
function formatEventWeekday(datetime: string, locale: Locale): string {
  return new Intl.DateTimeFormat(DATE_LOCALES[locale], { weekday: "short" })
    .format(new Date(datetime))
    .toUpperCase();
}

/** A formatted, display-ready upcoming show for the homepage tour section. */
export interface UpcomingShow {
  /** Unique event identifier. */
  id: string;
  /** External URL to the event/ticket page. */
  url: string;
  /** Localized, uppercased short weekday label. */
  weekday: string;
  /** Day/month label formatted as `DD.MM`. */
  day: string;
  /** Display name of the venue. */
  venueName: string;
  /** Human-readable location (city · region · country). */
  location: string;
}

/**
 * Maps a raw Bandsintown event into a display-ready {@link UpcomingShow}.
 *
 * @param event - The raw Bandsintown event.
 * @param locale - The app locale used to format dates and weekdays.
 * @returns The formatted upcoming show.
 */
function toUpcomingShow(event: BandsintownEvent, locale: Locale): UpcomingShow {
  return {
    id: event.id,
    url: event.url,
    weekday: formatEventWeekday(event.datetime, locale),
    day: formatEventDay(event.datetime),
    venueName: event.venue.name,
    location: [event.venue.city, event.venue.region, event.venue.country]
      .filter(Boolean)
      .join(" · "),
  };
}

/** Input parameters for the {@link useHomeView} hook. */
interface UseHomeViewParams {
  /** Spotify releases used to build the discography. */
  releases: SpotifyRelease[];
  /** Bandsintown events used to build the upcoming shows list. */
  events: BandsintownEvent[];
  /** Active locale used for formatting and localized paths. */
  locale: Locale;
}

/**
 * Encapsulates the `HomeView` logic: derives the discography (with fallback) and
 * upcoming shows, tracks the selected release and its credits, computes the hero
 * scroll-parallax style, and manages the persisted snake-trail toggle/portal.
 *
 * @param params - See {@link UseHomeViewParams}.
 * @returns View state and helpers:
 * - `discography`: releases to display, falling back to the configured album.
 * - `upcomingShows`: up to {@link MAX_UPCOMING_SHOWS} formatted shows.
 * - `selectedReleaseId`: id of the currently selected release.
 * - `setSelectedReleaseId`: selects a release by id.
 * - `selectedCredits`: localized credits for the selected release.
 * - `heroRef`: ref attached to the hero section for scroll tracking.
 * - `heroStyle`: motion style (y/scale/opacity) for the hero parallax.
 * - `isSnakeEnabled`: whether the snake-trail effect is enabled.
 * - `snakePortalTarget`: DOM node used to portal the snake trail, or `null`.
 * - `toggleSnake`: toggles and persists the snake-trail preference.
 * - `localizePath`: prefixes a path with the active locale.
 *
 * @remarks The snake-trail preference is read from `localStorage` and the portal
 * target resolved on mount, so both are `null`/`false` during SSR.
 */
export function useHomeView({ releases, events, locale }: UseHomeViewParams) {
  const discography = releases.length > 0 ? releases : [fallbackRelease];
  const upcomingShows = events
    .slice(0, MAX_UPCOMING_SHOWS)
    .map((event) => toUpcomingShow(event, locale));

  const [selectedReleaseId, setSelectedReleaseId] = useState(discography[0].id);
  const selectedCredits = getReleaseCredits(selectedReleaseId, locale);

  const heroRef = useRef<HTMLElement | null>(null);

  const [isSnakeEnabled, setSnakeEnabled] = useState(false);
  const [snakePortalTarget, setSnakePortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setSnakeEnabled(window.localStorage.getItem(SNAKE_STORAGE_KEY) === "on");
    setSnakePortalTarget(document.getElementById("site-root"));
  }, []);

  const toggleSnake = () => {
    setSnakeEnabled((isEnabled) => {
      const nextState = !isEnabled;
      window.localStorage.setItem(SNAKE_STORAGE_KEY, nextState ? "on" : "off");
      return nextState;
    });
  };

  const localizePath = (path: string) => `/${locale}${path}`;

  return {
    discography,
    upcomingShows,
    selectedReleaseId,
    setSelectedReleaseId,
    selectedCredits,
    heroRef,
    isSnakeEnabled,
    snakePortalTarget,
    toggleSnake,
    localizePath,
  };
}
