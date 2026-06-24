"use client";

/**
 * Client wrapper that fades and slides its children into view once they enter
 * the viewport during scrolling.
 *
 * @remarks Animation is driven by Framer Motion's `whileInView`.
 */

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/** Framer Motion variants for the hidden and revealed states of the wrapper. */
const revealVariants: Variants = {
  hidden: { y: 16 },
  show: { y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/**
 * Animates its children into view (fade + upward slide) the first time they
 * scroll into the viewport.
 *
 * @param props - Component props.
 * @param props.children - Content to reveal.
 * @param props.className - Optional class applied to the motion wrapper.
 * @param props.delay - Delay in seconds before the reveal animation starts. Defaults to `0`.
 * @returns The animated wrapper element.
 * @remarks Client component (`"use client"`). The reveal runs only once per element.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={revealVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
