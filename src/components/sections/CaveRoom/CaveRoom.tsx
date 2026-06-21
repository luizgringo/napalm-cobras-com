"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { type ReactNode, useRef } from "react";
import { mergeClassNames } from "@/lib/utils";
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
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.06, 0]);

  return (
    <section
      ref={sectionRef}
      className={mergeClassNames(
        styles["cave-room"],
        tint === "smoke" && styles["cave-room--smoke"],
      )}
    >
      {/* Huge parallax label in the background */}
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
