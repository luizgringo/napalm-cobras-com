"use client";

/**
 * Route-segment error boundary. Client Component shown when a page in this
 * segment throws during render, offering a retry action.
 */
import { mergeClassNames } from "@/lib/utils";
import styles from "./error.module.css";

/**
 * Renders the error screen with a button that retries rendering the segment.
 *
 * @param props - Error boundary props provided by Next.js.
 * @param props.error - The error thrown by the segment (unused in the UI).
 * @param props.reset - Callback that attempts to re-render the segment.
 * @returns The error fallback UI.
 */
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
