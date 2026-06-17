import type { ReactNode } from "react";

function IronCross({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="currentColor" aria-hidden="true">
      <path d="M26 4h12v20l4-4h16v12l-4 4h-16v12l4 4h-16v-12l-4 4H6V32l4-4h16V4z" opacity="0.9" />
      <circle cx="32" cy="32" r="3" fill="#b51820" />
    </svg>
  );
}

export function SectionTitle({ eyebrow, children }: { eyebrow?: string; children: ReactNode }) {
  return (
    <div className="mb-10">
      {eyebrow && <span className="ribbon mb-4">{eyebrow}</span>}
      <h2 className="font-display chrome-text text-5xl md:text-7xl">{children}</h2>
      <div className="iron-cross-divider mt-5 text-paper/70">
        <IronCross className="h-5 w-5 text-paper" />
      </div>
    </div>
  );
}

export function PageHero({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return (
    <section className="noise relative border-b-2 border-paper/20 bg-gradient-to-b from-smoke to-ink">
      {/* Heraldic corner ornaments */}
      <IronCross className="pointer-events-none absolute left-4 top-4 h-8 w-8 text-paper/40" />
      <IronCross className="pointer-events-none absolute right-4 top-4 h-8 w-8 text-paper/40" />
      <div className="mx-auto max-w-7xl px-4 py-20 text-center md:px-8 md:py-28">
        {eyebrow && <span className="ribbon mb-6">{eyebrow}</span>}
        <h1 className="font-display chrome-text text-6xl leading-none md:text-8xl">{title}</h1>
        <div className="iron-cross-divider mt-6 text-paper/70">
          <IronCross className="h-6 w-6 text-paper" />
        </div>
        {intro && (
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-paper/80">{intro}</p>
        )}
      </div>
    </section>
  );
}
