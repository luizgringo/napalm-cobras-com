/**
 * Server component rendering a grid of external link cards, each with an icon,
 * name and the prettified host of its URL.
 *
 * @remarks Structure lives here and styling in `LinkGrid.module.css`.
 */

import type { IconType } from "react-icons";
import { prettyHost } from "@/lib/utils";
import styles from "./LinkGrid.module.css";

/** A single external link entry shown in the {@link LinkGrid}. */
export interface LinkGridItem {
  /** Display name of the link. */
  name: string;
  /** Absolute destination URL (opened in a new tab). */
  href: string;
  /** Icon component rendered alongside the link. */
  icon: IconType;
}

/**
 * Renders an unordered grid of external link cards.
 *
 * @param props - Component props.
 * @param props.items - The link entries to render.
 * @returns The link grid markup.
 * @remarks Server component.
 */
export function LinkGrid({ items }: { items: LinkGridItem[] }) {
  return (
    <ul className={styles.grid}>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.href} className={styles.item}>
            <a href={item.href} target="_blank" rel="noreferrer" className={styles.card}>
              <Icon className={styles.icon} size={20} aria-hidden />
              <div className={styles.text}>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.host}>{prettyHost(item.href)}</p>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
