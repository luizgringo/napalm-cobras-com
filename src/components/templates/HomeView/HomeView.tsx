"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AudioPlayer } from "@/components/sections/AudioPlayer";
import { CaveRoom } from "@/components/sections/CaveRoom";
import { GlitchText } from "@/components/sections/GlitchText";
import { LinkedText } from "@/components/sections/LinkedText";
import { Marquee } from "@/components/sections/Marquee";
import { Reveal } from "@/components/sections/Reveal";
import { SnakeToggle } from "@/components/sections/SnakeToggle";
import { SnakeTrail } from "@/components/sections/SnakeTrail";
import { getReleaseCredits, SITE } from "@/config/site";
import { useI18n } from "@/contexts/i18n-context";
import { InstagramFeed, type InstagramFeedData } from "@/features/instagram";
import type { SpotifyRelease } from "@/features/music/services/spotify";
import type { BandsintownEvent } from "@/features/shows";
import type { Locale } from "@/i18n/config";
import { mergeClassNames } from "@/lib/utils";
import primitives from "@/styles/primitives.module.css";
import styles from "./HomeView.module.css";

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

const SNAKE_STORAGE_KEY = "napalm-snake-trail";

const DATE_LOCALES: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en-US",
  es: "es-ES",
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

export function HomeView({
  releases,
  events,
  instagram,
}: {
  releases: SpotifyRelease[];
  events: BandsintownEvent[];
  instagram: InstagramFeedData | null;
}) {
  const { t, lang } = useI18n();
  const discography = releases.length > 0 ? releases : [fallbackRelease];
  const upcomingShows = events.slice(0, 3);
  const [selectedReleaseId, setSelectedReleaseId] = useState(discography[0].id);
  const selectedCredits = getReleaseCredits(selectedReleaseId, lang);
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.15]);

  const localize = (path: string) => `/${lang}${path}`;

  const [snakeEnabled, setSnakeEnabled] = useState(true);

  useEffect(() => {
    setSnakeEnabled(window.localStorage.getItem(SNAKE_STORAGE_KEY) !== "off");
  }, []);

  const toggleSnake = () => {
    setSnakeEnabled((enabled) => {
      const next = !enabled;
      window.localStorage.setItem(SNAKE_STORAGE_KEY, next ? "on" : "off");
      return next;
    });
  };

  return (
    <>
      {snakeEnabled && <SnakeTrail />}
      <SnakeToggle
        active={snakeEnabled}
        onToggle={toggleSnake}
        labelEnable={t.home.snake.enable}
        labelDisable={t.home.snake.disable}
      />

      <section ref={heroRef} className={styles.hero}>
        <motion.div
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
          className={styles.hero__bg}
        >
          <Image
            src="/assets/images/band-hero.png"
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className={styles.hero__img}
          />
          <div className={styles.hero__veil} />
        </motion.div>

        <CornerFrame />
        <div aria-hidden className={styles.hero__scanlines} />

        <div className={styles.hero__content}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={styles.hero__eyebrow}
          >
            // {t.home.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={styles.hero__title}
          >
            <GlitchText as="span" className={styles["hero__title-line"]}>
              {t.home.heroLine1}
            </GlitchText>
            <GlitchText
              as="span"
              className={mergeClassNames(
                styles["hero__title-line"],
                styles["hero__title-line--blood"],
              )}
            >
              {t.home.heroLine2}
            </GlitchText>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={styles.hero__sub}
          >
            {t.home.heroSub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={styles.hero__actions}
          >
            <a
              href="#studio"
              className={mergeClassNames(
                primitives.cta,
                primitives["cta--solid"],
                primitives["cta--lift"],
                primitives["cta--shadow"],
                primitives["cta--pulse"],
              )}
            >
              <Play size={14} fill="currentColor" /> {t.home.listenNow}
            </a>
            <Link
              href={localize("/shows")}
              className={mergeClassNames(
                primitives.cta,
                primitives["cta--outline"],
                primitives["cta--pulse"],
              )}
            >
              {t.home.nextShows} <ArrowRight size={14} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className={styles.hero__scroll}
          >
            <p className={styles["hero__scroll-text"]}>{t.home.scrollHint}</p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className={styles["hero__scroll-icon"]}
            >
              <ChevronDown size={20} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Marquee
        words={[
          "Speed Rock",
          "Metal Punk",
          "Belo Horizonte",
          "Homens Brancos de Terno",
          "Napalm Cobras",
          "1349 BPM",
        ]}
      />

      <div id="studio">
        <CaveRoom
          index="01"
          label={t.home.rooms.studio.label}
          title={<GlitchText>{t.home.rooms.studio.title}</GlitchText>}
          subtitle={t.home.rooms.studio.subtitle}
          tint="smoke"
        >
          <div className={styles.studio}>
            <Reveal className={styles.studio__player}>
              <AudioPlayer
                releases={discography}
                selectedId={selectedReleaseId}
                onSelect={setSelectedReleaseId}
                locale={lang}
                bandcampHref={SITE.socials.bandcamp}
                cta={t.home.rooms.studio.cta}
              />
            </Reveal>
            <Reveal delay={0.15} className={styles.studio__credits}>
              <div className={styles["credits-card"]}>
                <div>
                  <p className={primitives.eyebrow}>// {t.music.creditsTitle}</p>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedReleaseId}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      {selectedCredits ? (
                        <>
                          <p className={styles["credits-card__text"]}>
                            <LinkedText
                              text={selectedCredits.description}
                              links={selectedCredits.links}
                              linkClassName={styles["credits-card__inline-link"]}
                            />
                          </p>
                          <ul className={styles["credits-card__list"]}>
                            {selectedCredits.facts.map((fact) => (
                              <li key={fact} className={styles["credits-card__item"]}>
                                {fact}
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <p className={styles["credits-card__text"]}>{t.music.creditsEmpty}</p>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <Link
                  href={localize("/music")}
                  className={mergeClassNames(
                    primitives["link-inline"],
                    styles["credits-card__link"],
                  )}
                >
                  {t.music.title} <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>
          </div>
        </CaveRoom>
      </div>

      {instagram && instagram.posts.length > 0 ? (
        <CaveRoom
          index="02"
          label={t.home.rooms.feed.label}
          title={<GlitchText>{t.home.rooms.feed.title}</GlitchText>}
          subtitle={t.home.rooms.feed.subtitle}
        >
          <InstagramFeed
            feed={instagram}
            followLabel={t.home.rooms.feed.follow}
            followersLabel={t.home.rooms.feed.followers}
            profileHref={SITE.socials.instagram}
          />
        </CaveRoom>
      ) : null}

      <CaveRoom
        index="03"
        label={t.home.rooms.stage.label}
        title={<GlitchText>{t.home.rooms.stage.title}</GlitchText>}
        subtitle={t.home.rooms.stage.subtitle}
        tint="smoke"
      >
        <Reveal>
          <div className={styles["video-frame"]}>
            <iframe
              className={styles["video-frame__embed"]}
              src={`https://www.youtube.com/embed/${SITE.liveVideoId}`}
              title="Metalpunk Overkill - Napalm Cobras"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <span className={styles["video-frame__tag"]}>{t.home.liveCaption}</span>
          </div>
        </Reveal>
      </CaveRoom>

      <CaveRoom
        index="04"
        label={t.home.rooms.tour.label}
        title={<GlitchText>{t.home.rooms.tour.title}</GlitchText>}
        subtitle={t.home.rooms.tour.subtitle}
      >
        <Reveal>
          {upcomingShows.length > 0 ? (
            <>
              <div className={styles.tour}>
                {upcomingShows.map((event) => (
                  <a
                    key={event.id}
                    href={event.url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.tour__card}
                  >
                    <p className={mergeClassNames(primitives.eyebrow, primitives["eyebrow--sm"])}>
                      // {formatEventWeekday(event.datetime, lang)}
                    </p>
                    <p className={styles.tour__date}>{formatEventDay(event.datetime)}</p>
                    <p className={styles.tour__venue}>{event.venue.name}</p>
                    <p className={primitives.label}>
                      {[event.venue.city, event.venue.region, event.venue.country]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                    <span className={styles.tour__tickets}>
                      {t.home.rooms.tour.tickets} <ArrowRight size={14} />
                    </span>
                    <div className={styles.tour__bar} />
                  </a>
                ))}
              </div>
              <div className={styles.tour__cta}>
                <Link
                  href={localize("/shows")}
                  className={mergeClassNames(
                    primitives.cta,
                    primitives["cta--paper"],
                    primitives["cta--pulse"],
                  )}
                >
                  {t.home.rooms.tour.cta} <ArrowRight size={14} />
                </Link>
              </div>
            </>
          ) : (
            <div className={styles["tour-empty"]}>
              <p className={mergeClassNames(primitives.eyebrow, primitives["eyebrow--sm"])}>
                // {t.home.rooms.tour.emptyTitle}
              </p>
              <p className={styles["tour-empty__text"]}>{t.home.rooms.tour.emptyText}</p>
              <div className={styles["tour-empty__actions"]}>
                <Link
                  href={localize("/shows")}
                  className={mergeClassNames(
                    primitives.cta,
                    primitives["cta--paper"],
                    primitives["cta--pulse"],
                  )}
                >
                  {t.home.rooms.tour.cta} <ArrowRight size={14} />
                </Link>
                <Link
                  href={localize("/gallery")}
                  className={mergeClassNames(primitives.cta, primitives["cta--outline"])}
                >
                  {t.home.rooms.tour.pastFlyers} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </Reveal>
      </CaveRoom>
    </>
  );
}

function CornerFrame() {
  return (
    <div aria-hidden className={styles.hero__frame}>
      <span className={mergeClassNames(styles.hero__corner, styles["hero__corner--tl"])} />
      <span className={mergeClassNames(styles.hero__corner, styles["hero__corner--tr"])} />
      <span className={mergeClassNames(styles.hero__corner, styles["hero__corner--bl"])} />
      <span className={mergeClassNames(styles.hero__corner, styles["hero__corner--br"])} />
    </div>
  );
}
