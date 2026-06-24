"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { mergeClassNames } from "@/lib/utils";
import styles from "./EmbedFacade.module.css";

interface EmbedFacadeProps {
  title: string;
  src: string;
  playLabel: string;
  variant: "video" | "player";
  poster?: string;
}

export function EmbedFacade({ title, src, playLabel, variant, poster }: EmbedFacadeProps) {
  const [isActive, setIsActive] = useState(false);

  if (isActive) {
    return (
      <div
        className={mergeClassNames(
          styles["embed-facade"],
          variant === "video" ? styles["embed-facade--video"] : styles["embed-facade--player"],
        )}
      >
        <iframe
          title={title}
          src={src}
          className={styles["embed-facade__embed"]}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div
      className={mergeClassNames(
        styles["embed-facade"],
        variant === "video" ? styles["embed-facade--video"] : styles["embed-facade--player"],
      )}
    >
      {poster ? (
        <>
          <Image
            src={poster}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 70vw"
            className={styles["embed-facade__poster"]}
          />
          <div className={styles["embed-facade__veil"]} aria-hidden />
        </>
      ) : null}
      <button
        type="button"
        className={styles["embed-facade__trigger"]}
        onClick={() => setIsActive(true)}
      >
        <Play size={14} fill="currentColor" aria-hidden />
        {playLabel}
      </button>
    </div>
  );
}
