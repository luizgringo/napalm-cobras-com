import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/i18n";
import { PageHero } from "@/components/site/SectionTitle";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Napalm Cobras" },
      { name: "description", content: "Show flyers and stage shots of Napalm Cobras across the Brazilian underground." },
      { property: "og:title", content: "Gallery — Napalm Cobras" },
      { property: "og:description", content: "Flyers and live shots archive." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

const ROTATIONS = [-2, 1.5, -1, 2, -1.5, 1, -2, 1.5, -1];

function GalleryPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero eyebrow="Visual Archive" title={t.gallery.title} intro={t.gallery.intro} />

      <section>
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {ROTATIONS.map((rot, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div
                  style={{ transform: `rotate(${rot}deg)` }}
                  className="group relative aspect-[3/4] overflow-hidden border-2 border-paper/20 bg-smoke transition-transform hover:scale-105 hover:border-blood hard-shadow"
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-smoke to-ink">
                    <div className="text-center">
                      <p className="font-display text-7xl text-blood/40">NC</p>
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-paper/40">
                        {t.gallery.placeholder}
                      </p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-paper/30">
                        #{String(i + 1).padStart(2, "0")}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
