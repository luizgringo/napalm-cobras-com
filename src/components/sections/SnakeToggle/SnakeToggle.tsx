"use client";

import { mergeClassNames } from "@/lib/utils";
import styles from "./SnakeToggle.module.css";

interface SnakeToggleProps {
  active: boolean;
  onToggle: () => void;
  labelEnable: string;
  labelDisable: string;
}

export function SnakeToggle({ active, onToggle, labelEnable, labelDisable }: SnakeToggleProps) {
  const label = active ? labelDisable : labelEnable;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      title={label}
      className={mergeClassNames(styles.toggle, active && styles["toggle--active"])}
    >
      <svg
        className={styles.toggle__icon}
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 9 q 3.5 -4 7 0 t 7 0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="19" cy="9" r="1.4" fill="currentColor" />
        {!active && (
          <path d="M4 4 L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        )}
      </svg>
      <span className={styles.toggle__text}>
        Snake Mode <span className={styles.toggle__state}>{active ? "On" : "Off"}</span>
      </span>
    </button>
  );
}
