import { useCallback, useEffect, useState } from "react";
import type { Flyer } from "@/config/flyers";

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
