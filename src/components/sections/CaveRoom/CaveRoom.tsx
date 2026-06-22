"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { mergeClassNames } from "@/lib/utils";
import { useCaveRoomParallax } from "./CaveRoom.hooks";
import styles from "./CaveRoom.module.css";

interface CaveRoomProps {
  index: string; // "01"
  label: string; // "STUDIO"
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  tint?: "ink" | "smoke";
}

/**
 * One "room" in the imagined studio/cave the visitor walks through.
 * Provides a parallax background label, a numbered chapter chip and
 * a corner doorframe drawn in the brutalist border style.
 */
export function CaveRoom({ index, label, title, subtitle, children, tint = "ink" }: CaveRoomProps) {
  const { sectionRef, backgroundY, backgroundOpacity } = useCaveRoomParallax();

  return (
    <section
      ref={sectionRef}
      className={mergeClassNames(
        styles["cave-room"],
        tint === "smoke" && styles["cave-room--smoke"],
      )}
    >
      <motion.div
        aria-hidden
        style={{ y: backgroundY, opacity: backgroundOpacity }}
        className={styles["cave-room__bg"]}
      >
        <span className={styles["cave-room__bg-label"]}>{label}</span>
      </motion.div>

      <div aria-hidden className={styles["cave-room__scanlines"]} />

      <div className={styles["cave-room__inner"]}>
        <div className={styles["cave-room__header"]}>
          <div>
            <div className={styles["cave-room__tags"]}>
              <span className={styles["cave-room__chip"]}>Room {index}</span>
              <span className={styles["cave-room__label"]}>// {label}</span>
            </div>
            <h2 className={styles["cave-room__title"]}>{title}</h2>
            {subtitle ? <p className={styles["cave-room__subtitle"]}>{subtitle}</p> : null}
          </div>
        </div>

        <div className={styles["cave-room__content"]}>{children}</div>
      </div>
    </section>
  );
}
