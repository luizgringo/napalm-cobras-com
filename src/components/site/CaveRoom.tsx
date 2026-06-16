import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface CaveRoomProps {
  index: string; // "01"
  label: string; // "STUDIO"
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  tint?: "ink" | "smoke";
}

/**
 * One "room" in the imagined studio/cave the visitor walks through.
 * Provides a parallax background label, a numbered chapter chip and
 * a corner doorframe drawn in the brutalist border style.
 */
export function CaveRoom({ index, label, title, subtitle, children, tint = "ink" }: CaveRoomProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.06, 0]);

  return (
    <section
      ref={ref}
      className={`relative isolate overflow-hidden border-b border-paper/10 ${
        tint === "smoke" ? "bg-smoke" : "bg-ink"
      }`}
    >
      {/* Huge parallax label in the background */}
      <motion.div
        aria-hidden
        style={{ y: bgY, opacity: bgOpacity }}
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
      >
        <span className="font-display text-[28vw] leading-none tracking-tighter text-paper">
          {label}
        </span>
      </motion.div>

      {/* Scanlines */}
      <div aria-hidden className="scanlines pointer-events-none absolute inset-0 -z-10" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-36">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="border-2 border-blood bg-ink px-2 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-blood">
                Room {index}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-paper/50">
                // {label}
              </span>
            </div>
            <h2 className="mt-5 font-display text-5xl uppercase leading-[0.9] text-paper md:text-7xl">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-4 max-w-xl text-paper/70">{subtitle}</p>
            ) : null}
          </div>
        </div>

        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
