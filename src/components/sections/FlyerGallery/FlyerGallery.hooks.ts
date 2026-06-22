/**
 * Logic layer for the `FlyerGallery` component: manages lightbox open/close
 * state, wrap-around navigation and keyboard/scroll-lock side effects.
 */

import { useCallback, useEffect, useState } from "react";
import type { Flyer } from "@/config/flyers";

/**
 * Encapsulates the flyer lightbox behavior: tracks the active flyer index,
 * exposes open/close/navigate actions, locks body scroll while open and wires
 * up Escape/Arrow keyboard controls.
 *
 * @param flyers - The flyers being browsed; its length bounds navigation.
 * @returns An object with:
 * - `activeFlyer`: the currently opened flyer, or `null` when closed;
 * - `openLightbox`: opens the lightbox at the given flyer index;
 * - `closeLightbox`: closes the lightbox;
 * - `navigate`: moves by a signed offset with wrap-around (e.g. `-1`/`1`).
 * @remarks While open, body scrolling is disabled and a `keydown` listener
 * handles Escape (close) and ArrowLeft/ArrowRight (navigate).
 */
export function useFlyerLightbox(flyers: Flyer[]) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => setActiveIndex(index), []);
  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const navigate = useCallback(
    (direction: number) => {
      setActiveIndex((current) => {
        if (current === null) {
          return current;
        }
        return (current + direction + flyers.length) % flyers.length;
      });
    },
    [flyers.length],
  );

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      } else if (event.key === "ArrowRight") {
        navigate(1);
      } else if (event.key === "ArrowLeft") {
        navigate(-1);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, closeLightbox, navigate]);

  const activeFlyer = activeIndex === null ? null : flyers[activeIndex];

  return { activeFlyer, openLightbox, closeLightbox, navigate };
}
