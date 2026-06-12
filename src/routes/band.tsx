import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/i18n";
import { PageHero } from "@/components/site/SectionTitle";
import { Reveal } from "@/components/site/Reveal";
import uander from "@/assets/members/uander.jpg";
import gringo from "@/assets/members/gringo.jpg";
import humberto from "@/assets/members/humberto.jpg";

export const Route = createFileRoute("/band")({
  head: () => ({
    meta: [
      { title: "The Band — Napalm Cobras" },
      { name: "description", content: "History, bio and members of Napalm Cobras — Metal Punk / Speedrock trio from Belo Horizonte." },
      { property: "og:title", content: "The Band — Napalm Cobras" },
      { property: "og:description", content: "Uander Trajano, Luiz Gringo and Humberto Monteiro." },
      { property: "og:url", content: "/band" },
    ],
    links: [{ rel: "canonical", href: "/band" }],
  }),
  component: BandPage,
});

const PHOTOS = [uander, gringo, humberto];

function BandPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero eyebrow={t.meta.tagline} title={t.band.title} intro={t.band.intro} />

      <section className="border-b border-paper/10 bg-smoke">
        <div className="mx-auto max-w-4xl space-y-8 px-4 py-20 md:px-8 md:py-28">
          {[t.band.bio1, t.band.bio2, t.band.bio3].map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="text-lg leading-relaxed text-paper/85">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-blood">// {t.band.membersTitle}</p>
            <h2 className="mt-3 font-display text-5xl text-paper md:text-6xl">{t.band.membersTitle}</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {t.band.members.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.1}>
                <article className="group border-2 border-paper/15 bg-smoke transition-all hover:border-blood hard-shadow">
                  <div className="aspect-square overflow-hidden bg-ink">
                    <img
                      src={PHOTOS[i]}
                      alt={m.name}
                      width={832}
                      height={832}
                      loading="lazy"
                      className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                    />
                  </div>
                  <div className="border-t-2 border-paper/15 p-5">
                    <h3 className="font-display text-3xl text-paper">{m.name}</h3>
                    <p className="mt-1 font-mono text-xs uppercase tracking-widest text-blood">{m.role}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
