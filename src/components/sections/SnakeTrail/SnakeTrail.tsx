"use client";

import { motion } from "framer-motion";
import { TRAIL_PATH, useSnakeTrail } from "./SnakeTrail.hooks";
import styles from "./SnakeTrail.module.css";

/**
 * Cobra that slithers down the entire home page as the user scrolls. The body
 * is drawn as a layered SVG (tube + scale bands + sheen) revealed top-to-bottom,
 * and a naja head follows the reveal front, facing the direction of travel.
 * Pure decoration — pointer-events disabled, aria-hidden.
 */
export function SnakeTrail() {
  const { containerRef, pathRef, revealHeight, headLeft, headTop, headAngle } = useSnakeTrail();

  return (
    <div ref={containerRef} aria-hidden className={styles["snake-trail"]}>
      <svg className={styles["snake-trail__svg"]} viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <clipPath id="snake-reveal" clipPathUnits="userSpaceOnUse">
            <motion.rect x={-20} y={-6} width={140} height={revealHeight} fill="#fff" />
          </clipPath>
        </defs>

        <g clipPath="url(#snake-reveal)">
          <path
            d={TRAIL_PATH}
            ref={pathRef}
            fill="none"
            stroke="var(--blood)"
            strokeWidth="15"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={TRAIL_PATH}
            fill="none"
            stroke="var(--bone)"
            strokeWidth="15"
            strokeDasharray="13 17"
            strokeLinecap="butt"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={TRAIL_PATH}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="15"
            strokeDasharray="7 23"
            strokeDashoffset="-3"
            strokeLinecap="butt"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>

      <motion.div
        className={styles["snake-trail__head"]}
        style={{
          left: headLeft,
          top: headTop,
          rotate: headAngle,
          translateX: "-82%",
          translateY: "-50%",
        }}
      >
        <CobraHead />
      </motion.div>
    </div>
  );
}

function CobraHead() {
  return (
    <svg
      className={styles["snake-trail__cobra"]}
      viewBox="0 0 120 80"
      width="70"
      height="47"
      fill="none"
    >
      <title>Cobra coral</title>
      <g className={styles["snake-trail__tongue"]}>
        <path d="M96 40 L 110 40" stroke="var(--blood)" strokeWidth="2.4" strokeLinecap="round" />
        <path
          d="M110 40 L 119 33 M110 40 L 119 47"
          stroke="var(--blood)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </g>
      <path
        d="M4 40 C 4 14, 48 10, 78 25 C 92 32, 99 36, 99 40 C 99 44, 92 48, 78 55 C 48 70, 4 66, 4 40 Z"
        fill="var(--ink)"
        stroke="var(--blood)"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M10 26 Q 13 40 10 54"
        fill="none"
        stroke="var(--bone)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="60" cy="29" r="6" fill="var(--paper)" />
      <circle cx="60" cy="51" r="6" fill="var(--paper)" />
      <circle cx="61" cy="29" r="2.6" fill="var(--ink)" />
      <circle cx="61" cy="51" r="2.6" fill="var(--ink)" />
      <circle cx="86" cy="36" r="1.3" fill="var(--blood)" fillOpacity="0.8" />
      <circle cx="86" cy="44" r="1.3" fill="var(--blood)" fillOpacity="0.8" />
    </svg>
  );
}
