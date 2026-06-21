import { ExternalLink } from "lucide-react";
import primitives from "@/styles/primitives.module.css";
import type { BandsintownEvent } from "../../services/bandsintown";
import styles from "./ShowsList.module.css";

function formatDate(datetime: string) {
  const date = new Date(datetime);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function ShowsList({
  events,
  ticketsLabel,
}: {
  events: BandsintownEvent[];
  ticketsLabel: string;
}) {
  return (
    <ul className={styles["shows-list"]}>
      {events.map((event) => (
        <li key={event.id} className={styles["shows-list__item"]}>
          <div className={styles["shows-list__info"]}>
            <span className={styles["shows-list__date"]}>{formatDate(event.datetime)}</span>
            <div>
              <p className={styles["shows-list__venue"]}>{event.venue.name}</p>
              <p className={primitives.label}>
                {[event.venue.city, event.venue.region, event.venue.country]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>
          </div>
          <a
            href={event.url}
            target="_blank"
            rel="noreferrer"
            className={styles["shows-list__tickets"]}
          >
            {ticketsLabel} <ExternalLink size={14} />
          </a>
        </li>
      ))}
    </ul>
  );
}
