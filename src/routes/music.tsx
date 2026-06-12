import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { useI18n } from "@/i18n";
import { PageHero } from "@/components/site/SectionTitle";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/music")({
  head: () => ({
    meta: [
      { title: "Music — Napalm Cobras" },
      { name: "description", content: "Stream Napalm Cobras' EP \"Homens Brancos de Terno\" on Bandcamp, Spotify, Apple Music, YouTube Music, Deezer and Amazon Music." },
      { property: "og:title", content: "Music — Napalm Cobras" },
      { property: "og:description", content: "EP \"Homens Brancos de Terno\" — out now." },
      { property: "og:url", content: "/music" },
    ],
    links: [{ rel: "canonical", href: "/music" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MusicAlbum",
        name: "Homens Brancos de Terno",
        byArtist: { "@type": "MusicGroup", name: "Napalm Cobras" },
        datePublished: "2022",
        genre: ["Metal Punk", "Speedrock"],
      }),
    }],
  }),
  component: MusicPage,
});

function MusicPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero eyebrow="Discography" title={t.music.title} intro={t.music.intro} />

      <section className="border-b border-paper/10 bg-smoke">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-5 md:px-8 md:py-28">
          <Reveal className="md:col-span-3">
            <div className="border-2 border-paper/20 bg-ink p-2 hard-shadow">
              <iframe
                title="Napalm Cobras Bandcamp player"
                style={{ border: 0, width: "100%", height: 540 }}
                src={SITE.bandcampAlbumEmbed}
                seamless
              />
            </div>
          </Reveal>
          <Reveal className="md:col-span-2" delay={0.15}>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-blood">// {t.music.listenOn}</p>
            <ul className="mt-4 divide-y divide-paper/15 border-y border-paper/15">
              {SITE.streaming.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-4 py-4 font-display text-2xl uppercase text-paper transition-colors hover:text-blood"
                  >
                    <span>{s.name}</span>
                    <ExternalLink size={18} className="opacity-50 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-4 py-20 md:px-8 md:py-28">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-blood">// {t.music.creditsTitle}</p>
            <h2 className="mt-3 font-display text-4xl text-paper md:text-5xl">{t.music.creditsTitle}</h2>
            <ul className="mt-6 space-y-2 font-mono text-sm text-paper/80">
              {t.music.credits.map((c, i) => <li key={i}>— {c}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
