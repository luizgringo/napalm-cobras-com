"use client";

/**
 * Client component that mounts the official Bandsintown events widget and
 * loads its third-party script.
 */

import Script from "next/script";
import { SITE } from "@/config/site";
import styles from "./ShowsWidget.module.css";

/**
 * Renders the Bandsintown widget initializer anchor and loads the widget script.
 *
 * @param props - Component props.
 * @param props.fallback - Text shown via `<noscript>` when JavaScript is disabled.
 * @remarks Client component; injects the Bandsintown widget at runtime.
 */
export function ShowsWidget({ fallback }: { fallback: string }) {
  return (
    <div className={styles["embed-frame"]}>
      {/* biome-ignore lint/a11y/useAnchorContent: Bandsintown widget injects content into this anchor */}
      <a
        className="bit-widget-initializer"
        href={SITE.socials.bandsintown}
        data-artist-name={`id_${SITE.bandsintown.artistId}`}
        data-events-to-display=""
        data-background-color="rgba(0,0,0,1)"
        data-separator-color="rgba(245,241,232,0.15)"
        data-text-color="rgba(245,241,232,1)"
        data-font="Inter,sans-serif"
        data-auto-style="false"
        data-button-label-capitalization="uppercase"
        data-header-capitalization="uppercase"
        data-location-capitalization="uppercase"
        data-venue-capitalization="uppercase"
        data-display-local-dates="true"
        data-local-dates-position="tab"
        data-display-past-dates="true"
        data-display-details="false"
        data-display-lineup="false"
        data-display-play-my-city="true"
        data-display-limit="all"
        data-date-format="MMM. D, YYYY"
        data-date-orientation="horizontal"
        data-date-border-color="#c8102e"
        data-date-border-width="2px"
        data-date-capitalization="uppercase"
        data-date-border-radius="0px"
        data-event-ticket-cta-size="medium"
        data-event-ticket-text="TICKETS"
        data-event-ticket-cta-text-color="#f5f1e8"
        data-event-ticket-cta-bg-color="#c8102e"
        data-event-ticket-cta-border-color="#c8102e"
        data-event-ticket-cta-border-width="0px"
        data-event-ticket-cta-border-radius="0px"
        data-language="pt"
        data-bit-logo-position="bottomRight"
        data-bit-logo-color="#c8102e"
      />
      <noscript>
        <p className={styles["shows-widget__fallback"]}>{fallback}</p>
      </noscript>
      <Script src="https://widgetv3.bandsintown.com/main.min.js" strategy="afterInteractive" />
    </div>
  );
}
