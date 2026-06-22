/**
 * Logic layer for the `SnakeTrail` component: maps scroll progress to the body
 * reveal height and computes the head's position and heading along the path.
 */

import {
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useRef } from "react";

/** SVG path (in the 0–100 viewBox) describing the serpentine trail the cobra follows. */
export const TRAIL_PATH =
  "M50 0 C 12 7, 88 15, 50 23 C 12 31, 88 39, 50 47 C 12 55, 88 63, 50 71 C 12 79, 88 87, 50 96 C 38 99, 56 100, 50 100";

/** Number of binary-search iterations used to locate the head's point on the path. */
const HEAD_PROBE_ITERATIONS = 18;
/** Lookahead distance (in path length units) used to orient the head toward its travel direction. */
const HEAD_LEAD_DISTANCE = 0.6;

/**
 * Encapsulates the `SnakeTrail` animation: smooths scroll progress, drives the
 * clip-path reveal height, and continuously positions and rotates the cobra head
 * along {@link TRAIL_PATH}.
 *
 * @returns An object with:
 * - `containerRef`: ref for the overlay container (used to measure viewport size);
 * - `pathRef`: ref to the SVG `<path>` sampled for head placement;
 * - `revealHeight`: motion value driving the clip-path reveal rectangle height;
 * - `headLeft`/`headTop`: motion values for the head's CSS position (as percentages);
 * - `headAngle`: motion value for the head's rotation, aligned to its direction of travel.
 * @remarks Re-measures on window resize and body size changes via a `ResizeObserver`.
 */
export function useSnakeTrail() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 70, damping: 26, mass: 0.5 });
  const revealHeight = useTransform(smoothProgress, (value) => value * 100 + 6);

  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const viewportSize = useRef({ width: 1, height: 1 });

  const headX = useMotionValue(50);
  const headY = useMotionValue(0);
  const headAngle = useMotionValue(90);
  const headLeft = useTransform(headX, (value) => `${value}%`);
  const headTop = useTransform(headY, (value) => `${value}%`);

  /**
   * Places and orients the head for a given scroll progress by binary-searching
   * the path for the point at the matching vertical position and looking ahead
   * to derive the travel angle.
   *
   * @param progress - Normalized scroll progress in the `[0, 1]` range.
   */
  const moveHeadToProgress = useCallback(
    (progress: number) => {
      const path = pathRef.current;
      if (!path) {
        return;
      }
      const totalLength = path.getTotalLength();
      const targetY = progress * 100 + 0.5;
      let low = 0;
      let high = totalLength;
      for (let iteration = 0; iteration < HEAD_PROBE_ITERATIONS; iteration += 1) {
        const mid = (low + high) / 2;
        if (path.getPointAtLength(mid).y < targetY) {
          low = mid;
        } else {
          high = mid;
        }
      }
      const currentLength = (low + high) / 2;
      const currentPoint = path.getPointAtLength(currentLength);
      const leadPoint = path.getPointAtLength(
        Math.min(totalLength, currentLength + HEAD_LEAD_DISTANCE),
      );
      const angle =
        Math.atan2(
          (leadPoint.y - currentPoint.y) * viewportSize.current.height,
          (leadPoint.x - currentPoint.x) * viewportSize.current.width,
        ) *
        (180 / Math.PI);
      headX.set(currentPoint.x);
      headY.set(currentPoint.y);
      headAngle.set(angle);
    },
    [headX, headY, headAngle],
  );

  useMotionValueEvent(smoothProgress, "change", moveHeadToProgress);

  useEffect(() => {
    let animationFrame = 0;
    const measure = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      viewportSize.current = {
        width: rect?.width || window.innerWidth,
        height: rect?.height || 1,
      };
      moveHeadToProgress(smoothProgress.get());
    };
    const scheduleMeasure = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("resize", scheduleMeasure);
    const observer = new ResizeObserver(scheduleMeasure);
    observer.observe(document.body);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", scheduleMeasure);
      observer.disconnect();
    };
  }, [moveHeadToProgress, smoothProgress]);

  return { containerRef, pathRef, revealHeight, headLeft, headTop, headAngle };
}
