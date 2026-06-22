/**
 * Logic layer for the `CaveRoom` component: derives scroll-driven motion values
 * for the parallax background label.
 */

import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Encapsulates the `CaveRoom` parallax: tracks the section's scroll progress and
 * maps it to vertical offset and opacity for the background label.
 *
 * @returns An object with:
 * - `sectionRef`: ref to attach to the room `<section>` element;
 * - `backgroundY`: motion value driving the background vertical parallax;
 * - `backgroundOpacity`: motion value fading the background in and out as it scrolls through view.
 */
export function useCaveRoomParallax() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.06, 0]);

  return { sectionRef, backgroundY, backgroundOpacity };
}
