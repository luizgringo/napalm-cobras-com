/**
 * Renders the list of upcoming shows with date, venue, location, and a
 * tickets link per event.
 */

import { ExternalLink } from "lucide-react";
import primitives from "@/styles/primitives.module.css";
import type { BandsintownEvent } from "../../services/bandsintown";
import styles from "./ShowsList.module.css";

/**
 * Formats an event datetime as a Brazilian Portuguese (pt-BR) date.
 *
 * @param datetime - The event datetime string.
 * @returns The formatted date (e.g. "01 jan. 2026").
 */
function formatDate(datetime: string) {
  const date = new Date(datetime);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

/**
 * Renders a list of upcoming shows.
 *
 * @param props - Component props.
 * @param props.events - The events to display.
 * @param props.ticketsLabel - Localized label for the tickets link.
 * @remarks Server component.
 */
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
