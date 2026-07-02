/**
 * Localized music page. Async Server Component that renders featured releases
 * with Spotify embeds, per-release credits, the discography, and streaming
 * links, plus album JSON-LD.
 */
import type { Metadata } from "next";
import { LinkedText } from "@/components/sections/LinkedText";
import { LinkGrid } from "@/components/sections/LinkGrid";
import { Reveal } from "@/components/sections/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageSchema } from "@/components/seo/PageSchema";
import { PageHero } from "@/components/templates/SectionTitle";
import { getReleaseCredits, SITE } from "@/config/site";
import { SpotifyEmbed } from "@/features/music";
import { getDictionary, type Locale } from "@/i18n/config";
import { albumJsonLd, buildMetadata } from "@/lib/seo";
import { type SocialLinkDef, socialItems, streamingItems } from "@/lib/social-icons";
import { mergeClassNames } from "@/lib/utils";
import primitives from "@/styles/primitives.module.css";
import styles from "./page.module.css";

/** Props for the music route, carrying the async `locale` route param. */
type Props = { params: Promise<{ locale: string }> };

/** Streaming platforms listed in the "listen everywhere" section. */
const LISTEN_LINKS: SocialLinkDef[] = [
  { name: "Spotify", key: "spotifyArtist" },
  { name: "Bandcamp", key: "bandcamp" },
  { name: "YouTube Music", key: "youtubeMusic" },
  { name: "YouTube", key: "youtube" },
  { name: "SoundCloud", key: "soundcloud" },
  { name: "Deezer", key: "deezer" },
  { name: "Apple Music", key: "appleMusic" },
  { name: "Amazon Music", key: "amazonMusic" },
  { name: "Tidal", key: "tidal" },
  { name: "Qobuz", key: "qobuz" },
];

/** A highlighted release rendered with a Spotify embed and streaming links. */
interface FeaturedRelease {
  /** Spotify album/track id, also used to look up localized credits. */
  id: string;
  /** Display title of the release. */
  title: string;
  /** Short meta line (e.g. format and year). */
  meta: string;
  /** Spotify embed URL for the player iframe. */
  spotifyEmbed: string;
  /** Streaming destinations with their display name and URL. */
  streaming: readonly { name: string; url: string }[];
}

/** Manually curated list of featured releases shown at the top of the page. */
const FEATURED_RELEASES: FeaturedRelease[] = [
  {
    id: "3L3xyru2MIclkXCaDCkflf",
    title: "Ao Vivo No Metalpunk Overkill",
    meta: "Álbum · 2024",
    spotifyEmbed:
      "https://open.spotify.com/embed/album/3L3xyru2MIclkXCaDCkflf?utm_source=generator&theme=0",
    streaming: [
      {
        name: "Spotify",
        url: "https://open.spotify.com/intl-pt/album/3L3xyru2MIclkXCaDCkflf",
      },
      { name: "Deezer", url: "https://www.deezer.com/br/album/993106241" },
      {
        name: "Apple Music",
        url: "https://music.apple.com/br/album/ao-vivo-no-metalpunk-overkill-ao-vivo/1755909103",
      },
      { name: "Tidal", url: "https://listen.tidal.com/album/528680900" },
      { name: "Qobuz", url: "https://play.qobuz.com/album/jzhffbt406e2s" },
      {
        name: "YouTube Music",
        url: "https://music.youtube.com/playlist?list=OLAK5uy_m0OXRIU9-IKgP8ZOvNs04MY_xW682LIOM",
      },
    ],
  },
  {
    id: "1oON2uCjZrnaHiNhClDijT",
    title: "Longo Caminho Para Casa",
    meta: "Single · 2024",
    spotifyEmbed:
      "https://open.spotify.com/embed/album/1oON2uCjZrnaHiNhClDijT?utm_source=generator&theme=0",
    streaming: [
      { name: "Spotify", url: "https://open.spotify.com/intl-pt/album/1oON2uCjZrnaHiNhClDijT" },
      { name: "Deezer", url: "https://www.deezer.com/track/2961068711" },
      {
        name: "Amazon Music",
        url: "https://music.amazon.com/albums/B0DDZPCY3K?trackAsin=B0DDZCH8RF",
      },
      { name: "Qobuz", url: "https://play.qobuz.com/album/awix4lhgu0kwb" },
      { name: "YouTube", url: "https://www.youtube.com/watch?v=LOOdxSr237M" },
    ],
  },
  {
    id: SITE.spotify.albumId,
    title: SITE.album.title,
    meta: `${SITE.album.type} · ${SITE.album.year}`,
    spotifyEmbed: SITE.album.spotifyEmbed,
    streaming: SITE.streaming,
  },
];

/**
 * Builds localized metadata for the music page.
 *
 * @param props - Route props.
 * @param props.params - Promise resolving to the route params containing `locale`.
 * @returns The localized {@link Metadata} for the music page.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale as Locale);
  return buildMetadata({
    locale: locale as Locale,
    path: "music",
    title: t.music.title,
    description: t.music.intro,
  });
}

/**
 * Music page (async Server Component). Renders album JSON-LD, featured releases
 * with embeds and credits, the discography grid, and a streaming link grid.
 *
 * @param props - Route props.
 * @param props.params - Promise resolving to the route params containing `locale`.
 * @returns The rendered music page.
 * @remarks Featured release credits are resolved per locale; the section
 * background alternates ("smoke") for odd-indexed releases.
 */
export default async function MusicPage({ params }: Props) {
  const { locale } = await params;
  const t = getDictionary(locale as Locale);

  return (
    <>
      <PageSchema pathname={`/${locale}/music`} />
      <JsonLd data={albumJsonLd()} />
      <PageHero eyebrow={t.music.discographyTitle} title={t.music.title} intro={t.music.intro} />

      {FEATURED_RELEASES.map((release, index) => {
        const credits = getReleaseCredits(release.id, locale as Locale);
        const smoke = index % 2 === 1;
        return (
          <section
            key={release.id}
            className={mergeClassNames(
              primitives.section,
              smoke ? primitives["section--smoke"] : "",
            )}
          >
            <div className={primitives.container}>
              <Reveal className={styles["release-split"]}>
                <div className={styles["release-col"]}>
                  <p className={styles["release-meta"]}>{release.meta}</p>
                  <h2 className={styles["release-title"]}>{release.title}</h2>
                  {credits ? (
                    <p className={styles["release-desc"]}>
                      <LinkedText
                        text={credits.description}
                        links={credits.links}
                        linkClassName={styles.linked}
                      />
                    </p>
                  ) : null}
                </div>

                {credits ? (
                  <div className={styles["release-col"]}>
                    <p className={primitives.eyebrow}>// {t.music.creditsTitle}</p>
                    <ul className={styles["credits-list"]}>
                      {credits.facts.map((fact) => (
                        <li key={fact}>
                          —{" "}
                          <LinkedText
                            text={fact}
                            links={credits.links}
                            linkClassName={styles.linked}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </Reveal>

              <Reveal className={styles["release-split"]} delay={0.15}>
                <div className={styles["release-col"]}>
                  <SpotifyEmbed src={release.spotifyEmbed} title={`Spotify — ${release.title}`} />
                </div>

                <div className={styles["release-col"]}>
                  <p className={primitives.eyebrow}>// {t.music.listenOn}</p>
                  <LinkGrid items={streamingItems(release.streaming)} />
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}

      <section className={primitives.section}>
        <div className={primitives.container}>
          <Reveal>
            <p className={primitives.eyebrow}>// {t.music.discographyTitle}</p>
            <h2
              className={mergeClassNames(
                primitives["section-heading"],
                primitives["section-heading--sm"],
              )}
            >
              {t.music.discographyTitle}
            </h2>
          </Reveal>
          <div className={styles["release-grid"]}>
            {t.music.discography.map((release, index) => (
              <Reveal key={release.title} delay={index * 0.1}>
                <div className={styles["release-card"]}>
                  <p className={styles["release-card__meta"]}>{release.meta}</p>
                  <p className={styles["release-card__title"]}>{release.title}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={mergeClassNames(primitives.section, primitives["section--smoke"])}>
        <div className={primitives.container}>
          <Reveal>
            <p className={primitives.eyebrow}>// {t.music.listenAllTitle}</p>
            <h2
              className={mergeClassNames(
                primitives["section-heading"],
                primitives["section-heading--sm"],
              )}
            >
              {t.music.listenAllTitle}
            </h2>
            <p className={styles["release-desc"]}>{t.music.listenAllSubtitle}</p>
            <LinkGrid items={socialItems(LISTEN_LINKS)} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
