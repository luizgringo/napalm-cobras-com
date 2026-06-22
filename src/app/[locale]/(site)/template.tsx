"use client";

/**
 * Per-route transition template. Client Component that re-mounts on every
 * navigation to play a fade-and-slide entrance animation around page content.
 */
import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Wraps route content in an animated container that fades and slides in on
 * each navigation.
 *
 * @param props - Template props.
 * @param props.children - The route content to animate.
 * @returns The children wrapped in an animated motion container.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
