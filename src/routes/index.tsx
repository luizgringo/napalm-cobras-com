import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Play } from "lucide-react";
import { useRef } from "react";
import { useI18n } from "@/i18n";
import { SITE } from "@/lib/site";
import { Reveal } from "@/components/site/Reveal";
import { Marquee } from "@/components/site/Marquee";
import { SnakeTrail } from "@/components/site/SnakeTrail";
import { GlitchText } from "@/components/site/GlitchText";
import { CaveRoom } from "@/components/site/CaveRoom";
import { AudioPlayer } from "@/components/site/AudioPlayer";
import heroImg from "@/assets/band-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Napalm Cobras — Metal Punk / Speedrock from Belo Horizonte" },
      { name: "description", content: "Brazilian Metal Punk and Speedrock trio from Belo Horizonte. Enter the sonic cave, hit play and survive the EP \"Homens Brancos de Terno\"." },
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
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.15]);

  return (
    <>
      <SnakeTrail />

      {/* ======== HERO ======== */}
      <section ref={heroRef} className="relative isolate min-h-[100svh] overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt=""
            aria-hidden
            className="h-full w-full object-cover opacity-40 grayscale contrast-125"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/70 to-ink" />
        </motion.div>

        {/* Cave doorframe corners */}
        <CornerFrame />
        <div aria-hidden className="scanlines pointer-events-none absolute inset-0 -z-10" />

        <div className="noise relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pb-24 pt-28 md:px-8 md:pt-36">
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
            className="mt-4 font-display text-[18vw] leading-[0.85] tracking-tight text-paper md:text-[13rem]"
          >
            <GlitchText as="span" className="block">{t.home.heroLine1}</GlitchText>
            <GlitchText as="span" className="block text-blood">{t.home.heroLine2}</GlitchText>
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
              href="#studio"
              className="pulse-cta group inline-flex items-center gap-2 bg-blood px-6 py-4 font-mono text-xs uppercase tracking-widest text-paper transition-transform hover:-translate-y-0.5 hard-shadow"
            >
              <Play size={14} fill="currentColor" /> {t.home.listenNow}
            </a>
            <Link
              to="/shows"
              className="pulse-cta inline-flex items-center gap-2 border-2 border-paper px-6 py-4 font-mono text-xs uppercase tracking-widest text-paper hover:bg-paper hover:text-ink"
            >
              {t.home.nextShows} <ArrowRight size={14} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-paper/50">{t.home.scrollHint}</p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="mt-2 flex justify-center text-blood"
            >
              <ChevronDown size={20} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Marquee words={["Metal Punk", "Speedrock", "Belo Horizonte", "Homens Brancos de Terno", "Napalm Cobras", "1349 BPM"]} />

      {/* ======== ROOM 01 — STUDIO ======== */}
      <div id="studio">
        <CaveRoom
          index="01"
          label={t.home.rooms.studio.label}
          title={<GlitchText>{t.home.rooms.studio.title}</GlitchText>}
          subtitle={t.home.rooms.studio.subtitle}
          tint="smoke"
        >
          <div className="grid gap-10 lg:grid-cols-5">
            <Reveal className="lg:col-span-3">
              <AudioPlayer
                src={SITE.previewMp3 || undefined}
                trackTitle={SITE.featuredTrackTitle}
                trackMeta={SITE.featuredTrackMeta}
                bandcampHref={SITE.socials.bandcamp}
                cta={t.home.rooms.studio.cta}
              />
            </Reveal>
            <Reveal delay={0.15} className="lg:col-span-2">
              <div className="flex h-full flex-col justify-between border-2 border-paper/15 bg-ink p-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-blood">// {t.music.creditsTitle}</p>
                  <ul className="mt-4 space-y-3 text-sm text-paper/80">
                    {t.music.credits.map((c) => (
                      <li key={c} className="border-l-2 border-blood pl-3">{c}</li>
                    ))}
                  </ul>
                </div>
                <Link
                  to="/music"
                  className="mt-8 inline-flex items-center gap-2 border-b-2 border-blood pb-1 font-mono text-xs uppercase tracking-widest text-paper hover:text-blood"
                >
                  {t.music.title} <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>
          </div>
        </CaveRoom>
      </div>

      {/* ======== ROOM 02 — STAGE ======== */}
      <CaveRoom
        index="02"
        label={t.home.rooms.stage.label}
        title={<GlitchText>{t.home.rooms.stage.title}</GlitchText>}
        subtitle={t.home.rooms.stage.subtitle}
      >
        <Reveal>
          <div className="relative aspect-video border-2 border-paper/20 hard-shadow">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${SITE.liveVideoId}`}
              title="Metalpunk Overkill - Napalm Cobras"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <span className="absolute -top-4 left-4 tape">{t.home.liveCaption}</span>
          </div>
        </Reveal>
      </CaveRoom>

      {/* ======== ROOM 03 — TOUR ======== */}
      <CaveRoom
        index="03"
        label={t.home.rooms.tour.label}
        title={<GlitchText>{t.home.rooms.tour.title}</GlitchText>}
        subtitle={t.home.rooms.tour.subtitle}
        tint="smoke"
      >
        <Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="group relative overflow-hidden border-2 border-paper/15 bg-ink p-6 transition-all hover:-translate-y-1 hover:border-blood"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-blood">// TBA</p>
                <p className="mt-6 font-display text-5xl text-paper">??.??</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-paper/60">Stay tuned</p>
                <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-blood transition-transform group-hover:scale-x-100" />
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              to="/shows"
              className="pulse-cta inline-flex items-center gap-2 bg-paper px-6 py-4 font-mono text-xs uppercase tracking-widest text-ink hover:bg-blood hover:text-paper"
            >
              {t.home.rooms.tour.cta} <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </CaveRoom>

      {/* ======== ROOM 04 — ARCHIVE ======== */}
      <CaveRoom
        index="04"
        label={t.home.rooms.archive.label}
        title={<GlitchText>{t.home.rooms.archive.title}</GlitchText>}
        subtitle={t.home.rooms.archive.subtitle}
      >
        <Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {t.band.members.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ rotate: i % 2 === 0 ? -1 : 1 }}
                className="border-2 border-paper/15 bg-smoke p-6"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-blood">// 0{i + 1}</p>
                <p className="mt-4 font-display text-3xl uppercase text-paper">{m.name}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-paper/60">{m.role}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              to="/band"
              className="pulse-cta inline-flex items-center gap-2 border-2 border-paper px-6 py-4 font-mono text-xs uppercase tracking-widest text-paper hover:bg-blood hover:border-blood"
            >
              {t.band.title} <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </CaveRoom>
    </>
  );
}

function CornerFrame() {
  const C = "absolute h-10 w-10 border-blood";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-6 -z-10 md:inset-10">
      <span className={`${C} left-0 top-0 border-l-2 border-t-2`} />
      <span className={`${C} right-0 top-0 border-r-2 border-t-2`} />
      <span className={`${C} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${C} bottom-0 right-0 border-b-2 border-r-2`} />
    </div>
  );
}
