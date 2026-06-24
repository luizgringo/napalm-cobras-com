import type { AeoFaqItem } from "@/lib/aeo-content";
import styles from "./AeoFaq.module.css";

interface AeoFaqProps {
  items: AeoFaqItem[];
}

export function AeoFaq({ items }: AeoFaqProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section aria-label="FAQ" className={styles.faq}>
      {items.map((item) => (
        <article key={item.question} className={styles.faq__item}>
          <h2>{item.question}</h2>
          <p>{item.answer}</p>
        </article>
      ))}
    </section>
  );
}
