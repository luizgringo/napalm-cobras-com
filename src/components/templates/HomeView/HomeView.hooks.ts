import { useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { getReleaseCredits, SITE } from "@/config/site";
import type { SpotifyRelease } from "@/features/music/services/spotify";
import type { BandsintownEvent } from "@/features/shows";
import type { Locale } from "@/i18n/config";

const SNAKE_STORAGE_KEY = "napalm-snake-trail";

const DATE_LOCALES: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en-US",
  es: "es-ES",
};

const MAX_UPCOMING_SHOWS = 3;

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

function formatEventDay(datetime: string): string {
  const date = new Date(datetime);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}.${month}`;
}

function formatEventWeekday(datetime: string, locale: Locale): string {
  return new Intl.DateTimeFormat(DATE_LOCALES[locale], { weekday: "short" })
    .format(new Date(datetime))
    .toUpperCase();
}

export interface UpcomingShow {
  id: string;
  url: string;
  weekday: string;
  day: string;
  venueName: string;
  location: string;
}

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

interface UseHomeViewParams {
  releases: SpotifyRelease[];
  events: BandsintownEvent[];
  locale: Locale;
}

export function useHomeView({ releases, events, locale }: UseHomeViewParams) {
  const discography = releases.length > 0 ? releases : [fallbackRelease];
  const upcomingShows = events
    .slice(0, MAX_UPCOMING_SHOWS)
    .map((event) => toUpcomingShow(event, locale));

  const [selectedReleaseId, setSelectedReleaseId] = useState(discography[0].id);
  const selectedCredits = getReleaseCredits(selectedReleaseId, locale);

  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.15]);

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
    heroStyle: { y: heroY, scale: heroScale, opacity: heroOpacity },
    isSnakeEnabled,
    snakePortalTarget,
    toggleSnake,
    localizePath,
  };
}
