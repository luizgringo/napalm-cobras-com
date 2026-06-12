import type { ReactNode } from "react";

export function SectionTitle({ eyebrow, children }: { eyebrow?: string; children: ReactNode }) {
  return (
    <div className="mb-10">
      {eyebrow && (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-blood">// {eyebrow}</p>
      )}
      <h2 className="font-display text-5xl text-paper md:text-7xl">{children}</h2>
      <div className="mt-4 h-1 w-24 bg-blood" />
    </div>
  );
}

export function PageHero({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return (
    <section className="noise border-b border-paper/10 bg-gradient-to-b from-smoke to-ink">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        {eyebrow && (
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-blood">// {eyebrow}</p>
        )}
        <h1 className="font-display text-6xl text-paper md:text-8xl">{title}</h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/80">{intro}</p>
        )}
        <div className="mt-6 h-1 w-32 bg-blood" />
      </div>
    </section>
  );
}
