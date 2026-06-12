import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { useI18n } from "@/i18n";
import { PageHero } from "@/components/site/SectionTitle";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Videos — Napalm Cobras" },
      { name: "description", content: "Live videos and tour footage of Napalm Cobras, including the full \"Metalpunk Overkill\" set by Goblin TV." },
      { property: "og:title", content: "Videos — Napalm Cobras" },
      { property: "og:description", content: "Live set Metalpunk Overkill by Goblin TV." },
      { property: "og:url", content: "/videos" },
    ],
    links: [{ rel: "canonical", href: "/videos" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: "Metalpunk Overkill — Napalm Cobras (Live)",
        description: "Full live set filmed by Goblin TV, 2023.",
        thumbnailUrl: `https://i.ytimg.com/vi/${SITE.liveVideoId}/maxresdefault.jpg`,
        uploadDate: "2023-01-01",
        contentUrl: `https://www.youtube.com/watch?v=${SITE.liveVideoId}`,
        embedUrl: `https://www.youtube.com/embed/${SITE.liveVideoId}`,
      }),
    }],
  }),
  component: VideosPage,
});

function VideosPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero eyebrow="Live & Visuals" title={t.videos.title} intro={t.videos.intro} />

      <section className="border-b border-paper/10 bg-smoke">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-blood">// {t.videos.featured}</p>
            <h2 className="mt-3 font-display text-5xl text-paper md:text-7xl">Metalpunk Overkill</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 aspect-video border-2 border-paper/20 hard-shadow">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${SITE.liveVideoId}`}
                title="Metalpunk Overkill"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="mt-5 max-w-2xl text-paper/70">{t.videos.featuredCaption}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href={SITE.socials.youtube}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 border-2 border-paper px-5 py-3 font-mono text-xs uppercase tracking-widest text-paper hover:bg-paper hover:text-ink"
            >
              {t.videos.moreOnYoutube} <ExternalLink size={14} />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
