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
  fillParent?: boolean;
  className?: string;
}

export function EmbedFacade({
  title,
  src,
  playLabel,
  variant,
  poster,
  fillParent = false,
  className,
}: EmbedFacadeProps) {
  const [isActive, setIsActive] = useState(false);
  const rootClassName = mergeClassNames(
    styles["embed-facade"],
    variant === "video" && !fillParent && styles["embed-facade--video"],
    fillParent && styles["embed-facade--fill"],
    variant === "player" && !fillParent && styles["embed-facade--player"],
    className,
  );

  if (isActive) {
    return (
      <div className={rootClassName}>
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
    <div className={rootClassName}>
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
