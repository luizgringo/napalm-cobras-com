/**
 * Server component rendering an infinitely scrolling marquee of words separated
 * by decorative crosses.
 *
 * @remarks Structure lives here and styling in `Marquee.module.css`.
 */

import { Fragment } from "react";
import styles from "./Marquee.module.css";

/**
 * Renders a horizontally scrolling band of words.
 *
 * @param props - Component props.
 * @param props.words - Words to display; duplicated to create a seamless loop.
 * @returns The marquee markup.
 * @remarks Server component. The word list is repeated four times so the
 * CSS-animated track loops without visible gaps.
 */
export function Marquee({ words }: { words: string[] }) {
  const items = [...words, ...words, ...words, ...words];
  return (
    <div className={styles.marquee}>
      <div className={styles.marquee__track}>
        {items.map((word, index) => (
          <Fragment key={index}>
            <span className={styles.marquee__word}>{word}</span>
            <span className={styles.marquee__cross} aria-hidden="true">
              𖤐
            </span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
