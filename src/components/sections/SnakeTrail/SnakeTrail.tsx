"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import styles from "./SnakeTrail.module.css";

const TRAIL_PATH =
  "M50 0 C 12 7, 88 15, 50 23 C 12 31, 88 39, 50 47 C 12 55, 88 63, 50 71 C 12 79, 88 87, 50 96 C 38 99, 56 100, 50 100";

/**
 * Cobra that slithers down the entire home page as the user scrolls. The body
 * is drawn as a layered SVG (tube + scale bands + sheen) revealed top-to-bottom,
 * and a naja head follows the reveal front, facing the direction of travel.
 * Pure decoration — pointer-events disabled, aria-hidden.
 */
export function SnakeTrail() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 26, mass: 0.5 });
  const revealHeight = useTransform(smooth, (value) => value * 100 + 6);

  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const size = useRef({ width: 1, height: 1 });

  const headX = useMotionValue(50);
  const headY = useMotionValue(0);
  const headAngle = useMotionValue(90);

  const left = useTransform(headX, (value) => `${value}%`);
  const top = useTransform(headY, (value) => `${value}%`);

  const updateHead = (progress: number) => {
    const path = pathRef.current;
    if (!path) {
      return;
    }
    const length = path.getTotalLength();
    const targetY = progress * 100 + 0.5;
    let low = 0;
    let high = length;
    for (let i = 0; i < 18; i += 1) {
      const mid = (low + high) / 2;
      if (path.getPointAtLength(mid).y < targetY) {
        low = mid;
      } else {
        high = mid;
      }
    }
    const at = (low + high) / 2;
    const point = path.getPointAtLength(at);
    const lead = path.getPointAtLength(Math.min(length, at + 0.6));
    const angle =
      Math.atan2(
        (lead.y - point.y) * size.current.height,
        (lead.x - point.x) * size.current.width,
      ) *
      (180 / Math.PI);
    headX.set(point.x);
    headY.set(point.y);
    headAngle.set(angle);
  };

  useMotionValueEvent(smooth, "change", updateHead);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      size.current = {
        width: rect?.width || window.innerWidth,
        height: rect?.height || 1,
      };
      updateHead(smooth.get());
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  });

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
        style={{ left, top, rotate: headAngle, translateX: "-82%", translateY: "-50%" }}
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
