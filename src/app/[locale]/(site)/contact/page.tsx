import { Mail } from "lucide-react";
import type { Metadata } from "next";
import { LinkGrid } from "@/components/sections/LinkGrid";
import { Reveal } from "@/components/sections/Reveal";
import { PageHero } from "@/components/templates/SectionTitle";
import { SITE } from "@/config/site";
import { InstagramFeed } from "@/features/social";
import { getDictionary, type Locale } from "@/i18n/config";
import { buildMetadata } from "@/lib/seo";
import { type SocialLinkDef, socialItems } from "@/lib/social-icons";
import { mergeClassNames } from "@/lib/utils";
import primitives from "@/styles/primitives.module.css";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };

const CONTACT_LINKS: SocialLinkDef[] = [
  { name: "Instagram", key: "instagram" },
  { name: "TikTok", key: "tiktok" },
  { name: "X (Twitter)", key: "twitter" },
  { name: "Spotify", key: "spotifyArtist" },
  { name: "Bandcamp", key: "bandcamp" },
  { name: "SoundCloud", key: "soundcloud" },
  { name: "YouTube", key: "youtube" },
  { name: "YouTube Music", key: "youtubeMusic" },
  { name: "Deezer", key: "deezer" },
  { name: "Apple Music", key: "appleMusic" },
  { name: "Amazon Music", key: "amazonMusic" },
  { name: "Qobuz", key: "qobuz" },
  { name: "Bandsintown", key: "bandsintown" },
  { name: "Linktree", key: "linktree" },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale as Locale);
  return buildMetadata({
    locale: locale as Locale,
    path: "contact",
    title: t.contact.title,
    description: t.contact.intro,
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = getDictionary(locale as Locale);

  return (
    <>
      <PageHero eyebrow="Get in touch" title={t.contact.title} intro={t.contact.intro} />

      <section className={primitives.section}>
        <div
          className={mergeClassNames(
            primitives.container,
            primitives["container--wide"],
            primitives["container--cozy"],
          )}
        >
          <Reveal>
            <div className={styles.booking}>
              <p className={primitives.eyebrow}>// {t.contact.booking}</p>
              <a href={`mailto:${SITE.email}`} className={styles["contact-email"]}>
                <Mail className={primitives["icon-blood"]} /> {SITE.email}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p
              className={mergeClassNames(
                primitives.eyebrow,
                primitives["eyebrow--block"],
                styles.follow__title,
              )}
            >
              // {t.contact.follow}
            </p>
            <LinkGrid items={socialItems(CONTACT_LINKS)} />
          </Reveal>
        </div>
      </section>

      <section className={primitives["section--smoke"]}>
        <div
          className={mergeClassNames(
            primitives.container,
            primitives["container--wide"],
            primitives["container--cozy"],
          )}
        >
          <Reveal>
            <p className={mergeClassNames(primitives.eyebrow, primitives["eyebrow--block"])}>
              // Instagram
            </p>
            <InstagramFeed followLabel={t.contact.follow} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
