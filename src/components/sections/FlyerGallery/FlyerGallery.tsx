"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/sections/Reveal";
import type { Flyer } from "@/config/flyers";
import { useFlyerLightbox } from "./FlyerGallery.hooks";
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
  const { activeFlyer, openLightbox, closeLightbox, navigate } = useFlyerLightbox(flyers);

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

  return (
    <>
      <div className={styles["flyer-grid"]}>
        {flyers.map((flyer, index) => (
          <Reveal key={flyer.src} delay={index * 0.05}>
            <button
              type="button"
              onClick={() => openLightbox(index)}
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
        {activeFlyer && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
          >
            <button
              type="button"
              aria-label={closeLabel}
              className={styles.lightbox__close}
              onClick={closeLightbox}
            >
              <X size={28} />
            </button>

            <button
              type="button"
              aria-label={prevLabel}
              className={`${styles.lightbox__nav} ${styles["lightbox__nav--prev"]}`}
              onClick={(event) => {
                event.stopPropagation();
                navigate(-1);
              }}
            >
              <ChevronLeft size={32} />
            </button>

            <motion.figure
              key={activeFlyer.src}
              className={styles.lightbox__figure}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className={styles.lightbox__frame}>
                <Image
                  src={activeFlyer.src}
                  alt={activeFlyer.title}
                  fill
                  sizes="92vw"
                  className={styles.lightbox__img}
                  priority
                />
              </div>
              <figcaption className={styles.lightbox__caption}>
                <span className={styles["lightbox__caption-title"]}>
                  {activeFlyer.title}
                  {activeFlyer.year ? ` · ${activeFlyer.year}` : ""}
                </span>
                {activeFlyer.venue ? (
                  <span className={styles["lightbox__caption-meta"]}>{activeFlyer.venue}</span>
                ) : null}
                {activeFlyer.lineup ? (
                  <span className={styles["lightbox__caption-meta"]}>{activeFlyer.lineup}</span>
                ) : null}
              </figcaption>
            </motion.figure>

            <button
              type="button"
              aria-label={nextLabel}
              className={`${styles.lightbox__nav} ${styles["lightbox__nav--next"]}`}
              onClick={(event) => {
                event.stopPropagation();
                navigate(1);
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
