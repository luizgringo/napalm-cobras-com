import { Fragment } from "react";
import styles from "./Marquee.module.css";

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
