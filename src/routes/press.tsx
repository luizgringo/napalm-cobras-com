import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download, FolderOpen } from "lucide-react";
import { useI18n } from "@/i18n";
import { PageHero } from "@/components/site/SectionTitle";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/press")({
  head: () => ({
    meta: [
      { title: "Press & Booking — Napalm Cobras" },
      { name: "description", content: "Press release, technical rider and stage plot for booking Napalm Cobras." },
      { property: "og:title", content: "Press & Booking — Napalm Cobras" },
      { property: "og:description", content: "Press materials and technical specs." },
      { property: "og:url", content: "/press" },
    ],
    links: [{ rel: "canonical", href: "/press" }],
  }),
  component: PressPage,
});

function PressPage() {
  const { t } = useI18n();

  const items = [
    { icon: FileText, title: t.press.pressReleaseTitle, desc: t.press.pressReleaseDesc, url: SITE.press.pressRelease, cta: t.press.download },
    { icon: Download, title: t.press.riderTitle, desc: t.press.riderDesc, url: SITE.press.rider, cta: t.press.download },
    { icon: FolderOpen, title: t.press.stageMapTitle, desc: t.press.stageMapDesc, url: SITE.press.stageMap, cta: t.press.open },
  ];

  return (
    <>
      <PageHero eyebrow="EPK" title={t.press.title} intro={t.press.intro} />

      <section className="border-b border-paper/10 bg-smoke">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
          <div className="grid gap-6 md:grid-cols-3">
            {items.map((it, i) => (
              <Reveal key={it.title} delay={i * 0.1}>
                <a
                  href={it.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col justify-between border-2 border-paper/15 bg-ink p-6 transition-all hover:border-blood hard-shadow"
                >
                  <div>
                    <it.icon size={32} className="text-blood" />
                    <h3 className="mt-4 font-display text-3xl text-paper">{it.title}</h3>
                    <p className="mt-2 text-sm text-paper/70">{it.desc}</p>
                  </div>
                  <span className="mt-6 inline-block border-b-2 border-blood pb-1 font-mono text-xs uppercase tracking-widest text-paper transition-colors group-hover:text-blood">
                    {it.cta} →
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <div className="mt-12 border-2 border-paper/15 bg-ink p-6 md:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-blood">// Media kit</p>
              <a
                href={SITE.press.mediaFolder}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block font-display text-3xl text-paper hover:text-blood md:text-4xl"
              >
                Press photos, flyers, clipping →
              </a>
              <p className="mt-2 font-mono text-xs text-paper/60">Google Drive</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
