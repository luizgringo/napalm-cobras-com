import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Play } from "lucide-react";
import { useI18n } from "@/i18n";
import { SITE } from "@/lib/site";
import { Marquee } from "@/components/site/Marquee";
import { AudioPlayer } from "@/components/site/AudioPlayer";
import { Flyer } from "@/components/site/Flyer";
import heroImg from "@/assets/band-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Napalm Cobras — Metal Punk / Speedrock from Belo Horizonte" },
      { name: "description", content: "Brazilian Metal Punk and Speedrock trio from Belo Horizonte. Listen to the EP \"Homens Brancos de Terno\" and catch us live." },
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
    <div className="wall">
      {/* ============ HERO FLYER ============ */}
      <section className="relative isolate overflow-hidden px-4 pb-20 pt-16 md:px-8 md:pt-24">
        <div className="scanlines pointer-events-none absolute inset-0 opacity-60" />

        {/* Smaller torn handbills behind the main flyer */}
        <Flyer
          className="absolute right-6 top-10 hidden w-56 px-4 py-3 md:block"
          rotate={4}
          staples={false}
        >
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-blood">★ ALL AGES ★</p>
          <p className="mt-1 font-display text-2xl leading-none">MATINEE<br/>SHOW</p>
          <hr className="dotted-rule my-2" />
          <p className="font-mono text-[10px] uppercase">$5 / no ego</p>
        </Flyer>
        <Flyer
          className="absolute -left-4 top-28 hidden w-48 px-3 py-2 md:block"
          rotate={-7}
          staples={false}
          redShadow
        >
          <p className="font-mono text-[9px] uppercase tracking-widest">DEMO TAPE</p>
          <p className="font-display text-xl leading-tight">HOMENS BRANCOS<br/>DE TERNO</p>
        </Flyer>

        {/* MAIN FLYER */}
        <Flyer className="mx-auto max-w-3xl" rotate={-1} redShadow>
          {/* Top stripe / label */}
          <div className="flex items-center justify-between border-b-4 border-ink bg-ink px-4 py-2 text-paper">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em]">
              NAPALM COBRAS REPRODUCTION ◆ BH/BRAZIL
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-blood hidden sm:inline">
              SST-NC-84
            </span>
          </div>

          {/* Wordmark */}
          <div className="bg-ink px-4 pb-5 pt-3 text-paper">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-blood">
              // {t.home.eyebrow}
            </p>
            <h1 className="mt-2 font-display text-[22vw] leading-[0.82] tracking-tighter sm:text-[14rem]">
              <span className="block">{t.home.heroLine1}</span>
              <span className="block text-blood">{t.home.heroLine2}</span>
            </h1>
          </div>

          {/* Halftone band photo block */}
          <div className="relative border-b-4 border-ink">
            <img
              src={heroImg}
              alt="Napalm Cobras live"
              className="h-56 w-full object-cover grayscale contrast-[2] brightness-[0.85] mix-blend-multiply md:h-72"
            />
            <div className="halftone absolute inset-0 mix-blend-screen opacity-50" />
            <span className="stamp absolute bottom-3 right-3 bg-paper">ALL AGES</span>
            <span className="absolute left-3 top-3 border-2 border-paper bg-ink px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-paper">
              LIVE / NO ECHO
            </span>
          </div>

          {/* Info block — typewriter */}
          <div className="space-y-4 p-5 md:p-6">
            <div className="border-2 border-ink p-3">
              <div className="flex items-start justify-between gap-3">
                <p className="font-mono text-[11px] font-bold uppercase leading-tight">
                  {t.home.heroSub}
                </p>
                <span className="bg-blood px-1 py-0.5 font-mono text-[9px] font-bold uppercase text-paper rotate-[-3deg] shrink-0">
                  BH/MG
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#studio"
                className="inline-flex items-center gap-2 border-2 border-ink bg-ink px-5 py-3 font-display text-2xl uppercase tracking-wider text-paper transition-all hover:bg-blood hover:-translate-y-0.5"
                style={{ boxShadow: "5px 5px 0 0 var(--blood)" }}
              >
                <Play size={14} fill="currentColor" /> {t.home.listenNow}
              </a>
              <Link
                to="/shows"
                className="inline-flex items-center gap-2 border-2 border-ink bg-paper px-5 py-3 font-display text-2xl uppercase tracking-wider text-ink transition-all hover:bg-ink hover:text-paper hover:-translate-y-0.5"
                style={{ boxShadow: "5px 5px 0 0 var(--ink)" }}
              >
                {t.home.nextShows} <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Footer artifacts */}
          <div className="flex items-center justify-between border-t-2 border-ink bg-paper px-3 py-1.5 font-mono text-[9px] font-bold uppercase opacity-80">
            <span>PRODUCED BY SST REPRODUCTION</span>
            <span className="tracking-[0.3em]">XEROX · XEROX · XEROX</span>
          </div>
        </Flyer>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 flex flex-col items-center"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-paper/50">
            {t.home.scrollHint}
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="mt-2 text-blood"
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      <Marquee words={["Metal Punk", "Speedrock", "Belo Horizonte", "Homens Brancos de Terno", "Napalm Cobras", "1349 BPM"]} />

      {/* ============ ROOM 01 — STUDIO ============ */}
      <RoomSection id="studio" index="01" label={t.home.rooms.studio.label}>
        <div className="grid gap-10 lg:grid-cols-5">
          <Flyer className="lg:col-span-3" rotate={-0.6}>
            <div className="border-b-4 border-ink bg-ink px-4 py-2">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-blood">
                ROOM 01 / STUDIO TAPE
              </p>
              <h2 className="font-display text-4xl uppercase leading-none text-paper">
                {t.home.rooms.studio.title}
              </h2>
            </div>
            <div className="p-4 md:p-5">
              <AudioPlayer
                src={SITE.previewMp3 || undefined}
                trackTitle={SITE.featuredTrackTitle}
                trackMeta={SITE.featuredTrackMeta}
                bandcampHref={SITE.socials.bandcamp}
                cta={t.home.rooms.studio.cta}
              />
              <p className="mt-4 font-mono text-[11px] uppercase leading-tight">
                {t.home.rooms.studio.subtitle}
              </p>
            </div>
          </Flyer>

          <Flyer className="lg:col-span-2" rotate={1.2} redShadow>
            <div className="p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-blood">
                // {t.music.creditsTitle}
              </p>
              <ul className="mt-3 space-y-2 font-mono text-[11px] font-bold uppercase leading-tight">
                {t.music.credits.map((c) => (
                  <li key={c} className="border-l-4 border-blood pl-3">{c}</li>
                ))}
              </ul>
              <hr className="dotted-rule my-4" />
              <Link
                to="/music"
                className="inline-flex items-center gap-2 border-2 border-ink bg-ink px-3 py-2 font-display text-xl uppercase text-paper hover:bg-blood"
              >
                {t.music.title} <ArrowRight size={14} />
              </Link>
            </div>
          </Flyer>
        </div>
      </RoomSection>

      {/* ============ ROOM 02 — STAGE ============ */}
      <RoomSection index="02" label={t.home.rooms.stage.label} smoke>
        <Flyer className="mx-auto max-w-4xl" rotate={-0.5}>
          <div className="border-b-4 border-ink bg-ink px-4 py-2 text-paper">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-blood">
              ROOM 02 / LIVE BOOTLEG
            </p>
            <h2 className="font-display text-4xl uppercase leading-none">{t.home.rooms.stage.title}</h2>
          </div>
          <div className="relative aspect-video border-b-4 border-ink bg-ink">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${SITE.liveVideoId}`}
              title="Metalpunk Overkill - Napalm Cobras"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <span className="stamp absolute -top-3 left-4 bg-paper">FILMED BY GOBLIN TV</span>
          </div>
          <p className="p-4 font-mono text-[11px] font-bold uppercase leading-tight md:p-5">
            {t.home.rooms.stage.subtitle}
          </p>
        </Flyer>
      </RoomSection>

      {/* ============ ROOM 03 — TOUR ============ */}
      <RoomSection index="03" label={t.home.rooms.tour.label}>
        <Flyer className="mx-auto max-w-4xl" rotate={0.4} redShadow>
          <div className="border-b-4 border-ink bg-ink px-4 py-2 text-paper">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-blood">
              ROOM 03 / TOUR DATES
            </p>
            <h2 className="font-display text-4xl uppercase leading-none">{t.home.rooms.tour.title}</h2>
          </div>
          <div className="space-y-2 p-4 md:p-5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between gap-3 border-b-2 border-dashed border-ink pb-2">
                <div className="flex items-center gap-3">
                  <span className={`px-1.5 py-0.5 font-mono text-[10px] font-bold ${i === 1 ? "bg-blood text-paper" : "bg-ink text-paper"}`}>
                    TBA
                  </span>
                  <span className="font-display text-2xl uppercase">??.??.??</span>
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-60">
                  STAY TUNED
                </span>
              </div>
            ))}
            <div className="pt-3">
              <Link
                to="/shows"
                className="inline-flex w-full items-center justify-center gap-2 bg-ink px-5 py-3 font-display text-3xl uppercase tracking-wider text-paper hover:bg-blood"
                style={{ boxShadow: "5px 5px 0 0 var(--blood)" }}
              >
                {t.home.rooms.tour.cta} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Flyer>
      </RoomSection>

      {/* ============ ROOM 04 — ARCHIVE ============ */}
      <RoomSection index="04" label={t.home.rooms.archive.label} smoke>
        <div className="grid gap-6 md:grid-cols-3">
          {t.band.members.map((m, i) => (
            <Flyer key={m.name} rotate={i === 0 ? -1.5 : i === 1 ? 0.8 : -0.4}>
              <div className="border-b-4 border-ink bg-ink px-3 py-2">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-blood">
                  // 0{i + 1} / NAPALM CREW
                </p>
              </div>
              <div className="halftone-dense h-32 border-b-4 border-ink bg-paper" />
              <div className="p-4">
                <p className="font-display text-3xl uppercase leading-none">{m.name}</p>
                <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-widest text-blood">
                  {m.role}
                </p>
              </div>
            </Flyer>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/band"
            className="inline-flex items-center gap-2 border-4 border-paper bg-ink px-6 py-4 font-display text-3xl uppercase tracking-wider text-paper hover:bg-blood hover:border-blood"
            style={{ boxShadow: "6px 6px 0 0 var(--blood)" }}
          >
            {t.band.title} <ArrowRight size={16} />
          </Link>
        </div>
      </RoomSection>
    </div>
  );
}

function RoomSection({
  id,
  index,
  label,
  smoke,
  children,
}: {
  id?: string;
  index: string;
  label: string;
  smoke?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`relative isolate border-b-2 border-paper/10 ${smoke ? "bg-smoke" : "wall"}`}
    >
      <div aria-hidden className="scanlines pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <div className="mb-10 flex items-end gap-4">
          <span className="border-2 border-blood bg-ink px-2 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-blood">
            ROOM {index}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-paper/50">
            // {label}
          </span>
        </div>
        {children}
      </div>
    </section>
  );
}
