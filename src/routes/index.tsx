import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useI18n } from "@/i18n";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/site/Reveal";
import { Marquee } from "@/components/site/Marquee";
import heroImg from "@/assets/band-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Napalm Cobras — Metal Punk / Speedrock from Belo Horizonte" },
      { name: "description", content: "Brazilian Metal Punk and Speedrock trio from Belo Horizonte. Listen to \"Homens Brancos de Terno\" and catch us live." },
      { property: "og:title", content: "Napalm Cobras — Metal Punk / Speedrock" },
      { property: "og:description", content: "Fast riffs, bigger attitude. Trio from Belo Horizonte, Brazil." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const { t } = useI18n();

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt="Napalm Cobras"
            className="h-full w-full object-cover opacity-50"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/70 to-ink" />
        </div>

        <div className="noise mx-auto max-w-7xl px-4 pt-20 pb-24 md:px-8 md:pt-32 md:pb-40">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-blood"
          >
            // {t.home.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-4 font-display text-[20vw] leading-[0.85] tracking-tight text-paper md:text-[14rem]"
          >
            {t.home.heroLine1}
            <br />
            <span className="text-blood">{t.home.heroLine2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 max-w-xl font-mono text-sm uppercase tracking-widest text-paper/70"
          >
            {t.home.heroSub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href={SITE.socials.bandcamp}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 bg-blood px-6 py-4 font-mono text-xs uppercase tracking-widest text-paper transition-transform hover:-translate-y-0.5 hard-shadow"
            >
              <Play size={14} /> {t.home.listenNow}
            </a>
            <Link
              to="/shows"
              className="inline-flex items-center gap-2 border-2 border-paper px-6 py-4 font-mono text-xs uppercase tracking-widest text-paper hover:bg-paper hover:text-ink"
            >
              {t.home.nextShows} <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Marquee words={["Metal Punk", "Speedrock", "Belo Horizonte", "1349 BPM", "Homens Brancos de Terno", "Napalm Cobras"]} />

      {/* LATEST RELEASE */}
      <section className="border-b border-paper/10 bg-smoke">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-2 md:px-8 md:py-28">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-blood">// {t.home.latestRelease}</p>
            <h2 className="mt-3 font-display text-6xl text-paper md:text-7xl">{t.home.epTitle}</h2>
            <p className="mt-2 font-mono text-sm uppercase tracking-widest text-paper/60">{t.home.epYear}</p>
            <p className="mt-6 max-w-md text-paper/70">
              {t.band.bio2}
            </p>
            <Link to="/music" className="mt-8 inline-flex items-center gap-2 border-b-2 border-blood pb-1 font-mono text-xs uppercase tracking-widest text-paper hover:text-blood">
              {t.music.title} <ArrowRight size={14} />
            </Link>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="border-2 border-paper/20 bg-ink p-2 hard-shadow">
              <iframe
                title="Napalm Cobras — Bandcamp"
                style={{ border: 0, width: "100%", height: 420 }}
                src={SITE.bandcampAlbumEmbed}
                seamless
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* MEMBERS TEASER */}
      <section className="border-b border-paper/10">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-blood">// {t.home.membersTitle}</p>
            <h2 className="mt-3 font-display text-6xl text-paper md:text-7xl">{t.home.meetBand}</h2>
          </Reveal>
          <div className="mt-10">
            <Link to="/band" className="inline-flex items-center gap-2 bg-paper px-6 py-4 font-mono text-xs uppercase tracking-widest text-ink hover:bg-blood hover:text-paper">
              {t.band.title} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* WATCH LIVE */}
      <section className="border-b border-paper/10 bg-smoke">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-blood">// {t.home.watchLive}</p>
            <h2 className="mt-3 font-display text-5xl text-paper md:text-6xl">Metalpunk Overkill</h2>
            <p className="mt-3 max-w-xl text-paper/70">{t.home.liveCaption}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 aspect-video border-2 border-paper/20 hard-shadow">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${SITE.liveVideoId}`}
                title="Metalpunk Overkill - Napalm Cobras"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
