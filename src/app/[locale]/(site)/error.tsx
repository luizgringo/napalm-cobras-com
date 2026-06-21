"use client";

import { mergeClassNames } from "@/lib/utils";
import styles from "./error.module.css";

export default function ErrorBoundary({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className={mergeClassNames(styles.screen, styles["screen--inset"])}>
      <p className={styles.screen__title}>Erro</p>
      <p className={styles.screen__text}>Algo quebrou. Tente novamente.</p>
      <button type="button" onClick={reset} className={styles.screen__action}>
        Recarregar
      </button>
    </main>
  );
}
