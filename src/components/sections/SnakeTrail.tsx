import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Fixed full-viewport SVG snake that "draws" itself as the user scrolls.
 * Pure decoration — pointer-events disabled, aria-hidden.
 */
export function SnakeTrail() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });
  const dash = useTransform(smooth, [0, 1], [1, 0]);

  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden h-screen w-screen md:block"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {/* Sinuous path crossing the viewport */}
      <motion.path
        d="M -5 8 Q 25 22, 45 14 T 90 28 Q 60 42, 80 56 T 20 70 Q 50 82, 95 92"
        fill="none"
        stroke="var(--blood)"
        strokeWidth="0.18"
        strokeLinecap="round"
        strokeDasharray="1"
        style={{ pathLength: smooth, opacity: 0.55, strokeDashoffset: dash }}
      />
      {/* fang/head marker that follows the head of the trail */}
      <motion.circle
        r="0.6"
        fill="var(--blood)"
        style={{
          offsetPath: "path('M -5 8 Q 25 22, 45 14 T 90 28 Q 60 42, 80 56 T 20 70 Q 50 82, 95 92')" as never,
          offsetDistance: useTransform(smooth, (v) => `${v * 100}%`),
        }}
      />
    </svg>
  );
}
