/**
 * SectionTitle module — reusable page hero/section heading. Structure lives
 * here, styling in `SectionTitle.module.css`.
 */

import styles from "./SectionTitle.module.css";

/**
 * Page hero heading rendering an optional eyebrow, a main title, an optional
 * intro paragraph and a decorative rule.
 *
 * Server Component.
 *
 * @param props - Component props.
 * @param props.eyebrow - Optional small label shown above the title.
 * @param props.title - The main heading text.
 * @param props.intro - Optional introductory paragraph below the title.
 * @returns A section element used as a page/section header.
 */
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
