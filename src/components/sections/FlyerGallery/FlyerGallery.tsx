"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Reveal } from "@/components/sections/Reveal";
import type { Flyer } from "@/config/flyers";
import styles from "./FlyerGallery.module.css";

const ROTATIONS = [-2, 1.5, -1, 2, -1.5, 1, -2, 1.5, -1];

interface FlyerGalleryProps {
  flyers: Flyer[];
  placeholder: string;
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
}

export function FlyerGallery({
  flyers,
  placeholder,
  closeLabel,
  prevLabel,
  nextLabel,
}: FlyerGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  const goTo = useCallback(
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
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      } else if (event.key === "ArrowRight") {
        goTo(1);
      } else if (event.key === "ArrowLeft") {
        goTo(-1);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, close, goTo]);

  if (flyers.length === 0) {
    return (
      <div className={styles["flyer-grid"]}>
        {ROTATIONS.map((rotation, index) => (
          <Reveal key={rotation + index} delay={index * 0.05}>
            <div style={{ transform: `rotate(${rotation}deg)` }} className={styles.flyer}>
              <div className={styles.flyer__placeholder}>
                <div className={styles["flyer__placeholder-inner"]}>
                  <p className={styles["flyer__placeholder-mark"]}>NC</p>
                  <p className={styles["flyer__placeholder-label"]}>{placeholder}</p>
                  <p className={styles["flyer__placeholder-index"]}>
                    #{String(index + 1).padStart(2, "0")}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    );
  }

  const active = activeIndex === null ? null : flyers[activeIndex];

  return (
    <>
      <div className={styles["flyer-grid"]}>
        {flyers.map((flyer, index) => (
          <Reveal key={flyer.src} delay={index * 0.05}>
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              style={{ transform: `rotate(${ROTATIONS[index % ROTATIONS.length]}deg)` }}
              className={styles.flyer}
            >
              <Image
                src={flyer.src}
                alt={flyer.title}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className={styles.flyer__img}
              />
              <span className={styles.flyer__caption}>
                {flyer.title}
                {flyer.year ? ` · ${flyer.year}` : ""}
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          >
            <button
              type="button"
              aria-label={closeLabel}
              className={styles.lightbox__close}
              onClick={close}
            >
              <X size={28} />
            </button>

            <button
              type="button"
              aria-label={prevLabel}
              className={`${styles.lightbox__nav} ${styles["lightbox__nav--prev"]}`}
              onClick={(event) => {
                event.stopPropagation();
                goTo(-1);
              }}
            >
              <ChevronLeft size={32} />
            </button>

            <motion.figure
              key={active.src}
              className={styles.lightbox__figure}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className={styles.lightbox__frame}>
                <Image
                  src={active.src}
                  alt={active.title}
                  fill
                  sizes="92vw"
                  className={styles.lightbox__img}
                  priority
                />
              </div>
              <figcaption className={styles.lightbox__caption}>
                <span className={styles["lightbox__caption-title"]}>
                  {active.title}
                  {active.year ? ` · ${active.year}` : ""}
                </span>
                {active.venue ? (
                  <span className={styles["lightbox__caption-meta"]}>{active.venue}</span>
                ) : null}
                {active.lineup ? (
                  <span className={styles["lightbox__caption-meta"]}>{active.lineup}</span>
                ) : null}
              </figcaption>
            </motion.figure>

            <button
              type="button"
              aria-label={nextLabel}
              className={`${styles.lightbox__nav} ${styles["lightbox__nav--next"]}`}
              onClick={(event) => {
                event.stopPropagation();
                goTo(1);
              }}
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
