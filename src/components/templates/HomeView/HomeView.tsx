"use client";

/**
 * HomeView module — top-level template for the homepage. Composes the hero,
 * marquee and the themed "cave room" sections (studio, Instagram feed, live
 * video and tour). Structure lives here, styling in `HomeView.module.css` and
 * data/state logic in `HomeView.hooks.ts`.
 */

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Play } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { createPortal } from "react-dom";
import { AudioPlayer } from "@/components/sections/AudioPlayer";
import { CaveRoom } from "@/components/sections/CaveRoom";
import { EmbedFacade } from "@/components/sections/EmbedFacade";
import { GlitchText } from "@/components/sections/GlitchText";
import { LinkedText } from "@/components/sections/LinkedText";
import { Marquee } from "@/components/sections/Marquee";
import { Reveal } from "@/components/sections/Reveal";
import { SnakeToggle } from "@/components/sections/SnakeToggle";
import { SnakeTrail } from "@/components/sections/SnakeTrail";
import { SITE } from "@/config/site";
import { useI18n } from "@/contexts/i18n-context";
import type { InstagramFeedData } from "@/features/instagram";
import type { SpotifyRelease } from "@/features/music/services/spotify";
import type { BandsintownEvent } from "@/features/shows";
import { mergeClassNames } from "@/lib/utils";
import primitives from "@/styles/primitives.module.css";
import { useHomeView } from "./HomeView.hooks";
import styles from "./HomeView.module.css";

const InstagramFeed = dynamic(
  () => import("@/features/instagram").then((module) => module.InstagramFeed),
  { ssr: false },
);

/** Scrolling marquee phrases describing the band's genres and origin. */
const MARQUEE_WORDS = [
  "Sometimes Metal",
  "Sometimes Punk",
  "Always Antifascist",
  "From Belo Horizonte",
  "Minas Gerais",
  "Brasil",
  "Speed Metal",
  "Crust",
  "Punk",
  "Hard Rock",
  "Napalm Cobras",
];

/**
 * Homepage template composing the hero, marquee and themed cave-room sections
 * (studio player & credits, Instagram feed, live video and upcoming tour).
 *
 * Client Component: uses i18n context, framer-motion and the `useHomeView` hook.
 *
 * @param props - Component props.
 * @param props.releases - Spotify releases used to build the discography player.
 * @param props.events - Bandsintown events used to build the upcoming shows list.
 * @param props.instagram - Instagram feed data, or `null` when unavailable (feed section is hidden).
 * @returns The full homepage layout.
 */
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
  const {
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
  } = useHomeView({ releases, events, locale: lang });

  return (
    <>
      {isSnakeEnabled && snakePortalTarget && createPortal(<SnakeTrail />, snakePortalTarget)}
      <SnakeToggle
        active={isSnakeEnabled}
        onToggle={toggleSnake}
        labelEnable={t.home.snake.enable}
        labelDisable={t.home.snake.disable}
      />

      <section ref={heroRef} className={styles.hero}>
        <div className={styles.hero__bg} aria-hidden>
          <div className={styles.hero__veil} />
        </div>

        <CornerFrame />
        <div aria-hidden className={styles.hero__scanlines} />

        <div className={styles.hero__content}>
          <p className={styles.hero__eyebrow}>// {t.home.eyebrow}</p>

          <h1 className={styles.hero__title}>
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
          </h1>

          <p className={styles.hero__sub}>{t.home.heroSub}</p>

          <div className={styles.hero__actions}>
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
              href={localizePath("/shows")}
              className={mergeClassNames(
                primitives.cta,
                primitives["cta--outline"],
                primitives["cta--pulse"],
              )}
            >
              {t.home.nextShows} <ArrowRight size={14} />
            </Link>
          </div>

          <div className={styles.hero__scroll}>
            <p className={styles["hero__scroll-text"]}>{t.home.scrollHint}</p>
            <div className={styles["hero__scroll-icon"]}>
              <ChevronDown size={20} />
            </div>
          </div>
        </div>
      </section>

      <Marquee words={MARQUEE_WORDS} />

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
                  href={localizePath("/music")}
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
            <EmbedFacade
              title="Metalpunk Overkill - Napalm Cobras"
              src={`https://www.youtube.com/embed/${SITE.liveVideoId}`}
              playLabel={t.home.watchVideo}
              variant="video"
              poster={`https://i.ytimg.com/vi/${SITE.liveVideoId}/hqdefault.jpg`}
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
                {upcomingShows.map((show) => (
                  <a
                    key={show.id}
                    href={show.url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.tour__card}
                  >
                    <p className={mergeClassNames(primitives.eyebrow, primitives["eyebrow--sm"])}>
                      // {show.weekday}
                    </p>
                    <p className={styles.tour__date}>{show.day}</p>
                    <p className={styles.tour__venue}>{show.venueName}</p>
                    <p className={primitives.label}>{show.location}</p>
                    <span className={styles.tour__tickets}>
                      {t.home.rooms.tour.tickets} <ArrowRight size={14} />
                    </span>
                    <div className={styles.tour__bar} />
                  </a>
                ))}
              </div>
              <div className={styles.tour__cta}>
                <Link
                  href={localizePath("/shows")}
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
                  href={localizePath("/shows")}
                  className={mergeClassNames(
                    primitives.cta,
                    primitives["cta--paper"],
                    primitives["cta--pulse"],
                  )}
                >
                  {t.home.rooms.tour.cta} <ArrowRight size={14} />
                </Link>
                <Link
                  href={localizePath("/gallery")}
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

/**
 * Decorative corner brackets framing the hero section.
 *
 * @returns Four absolutely-positioned, aria-hidden corner markers.
 */
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
