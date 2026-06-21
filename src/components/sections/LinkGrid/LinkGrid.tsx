import type { IconType } from "react-icons";
import { prettyHost } from "@/lib/utils";
import styles from "./LinkGrid.module.css";

export interface LinkGridItem {
  name: string;
  href: string;
  icon: IconType;
}

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
