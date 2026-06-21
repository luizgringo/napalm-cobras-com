import type { ReactNode } from "react";
import styles from "./SectionTitle.module.css";

export function SectionTitle({ eyebrow, children }: { eyebrow?: string; children: ReactNode }) {
  return (
    <div className={styles["section-title"]}>
      {eyebrow && <p className={styles["section-title__eyebrow"]}>// {eyebrow}</p>}
      <h2 className={styles["section-title__heading"]}>{children}</h2>
      <div className={styles["section-title__rule"]} />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className={styles["page-hero"]}>
      <div className={styles["page-hero__inner"]}>
        {eyebrow && <p className={styles["page-hero__eyebrow"]}>// {eyebrow}</p>}
        <h1 className={styles["page-hero__title"]}>{title}</h1>
        {intro && <p className={styles["page-hero__intro"]}>{intro}</p>}
        <div className={styles["page-hero__rule"]} />
      </div>
    </section>
  );
}
