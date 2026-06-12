import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { useI18n } from "@/i18n";
import { PageHero } from "@/components/site/SectionTitle";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/shows")({
  head: () => ({
    meta: [
      { title: "Shows & Tour — Napalm Cobras" },
      { name: "description", content: "Upcoming Napalm Cobras shows and tour dates. Live Metal Punk / Speedrock from Belo Horizonte." },
      { property: "og:title", content: "Shows — Napalm Cobras" },
      { property: "og:description", content: "Live shows powered by Bandsintown." },
      { property: "og:url", content: "/shows" },
    ],
    links: [{ rel: "canonical", href: "/shows" }],
  }),
  component: ShowsPage,
});

function ShowsPage() {
  const { t } = useI18n();

  useEffect(() => {
    const id = "bandsintown-widget-script";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    s.src = "https://widgetv3.bandsintown.com/main.min.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <>
      <PageHero eyebrow="Live" title={t.shows.title} intro={t.shows.intro} />

      <section className="border-b border-paper/10 bg-smoke">
        <div className="mx-auto max-w-5xl px-4 py-16 md:px-8 md:py-20">
          <Reveal>
            <div className="border-2 border-paper/20 bg-ink p-2 md:p-4 hard-shadow">
              <a
                className="bit-widget-initializer"
                data-artist-name="Napalm Cobras"
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
                data-social-media-accounts=""
                data-display-limit="all"
                data-date-format="MMM. D, YYYY"
                data-date-orientation="horizontal"
                data-date-border-color="#c8102e"
                data-date-border-width="2px"
                data-date-capitalization="uppercase"
                data-date-border-radius="0px"
                data-event-ticket-cta-size="medium"
                data-event-custom-ticket-text=""
                data-event-ticket-text="TICKETS"
                data-event-ticket-icon="false"
                data-event-ticket-cta-text-color="#f5f1e8"
                data-event-ticket-cta-bg-color="#c8102e"
                data-event-ticket-cta-border-color="#c8102e"
                data-event-ticket-cta-border-width="0px"
                data-event-ticket-cta-border-radius="0px"
                data-follow-section-position="top"
                data-follow-section-alignment="center"
                data-follow-section-header-text="GET CONCERT ALERTS"
                data-follow-section-cta-size="medium"
                data-follow-section-cta-text="FOLLOW"
                data-follow-section-cta-text-color="#f5f1e8"
                data-follow-section-cta-bg-color="#c8102e"
                data-follow-section-cta-border-color="#c8102e"
                data-follow-section-cta-border-width="0px"
                data-follow-section-cta-border-radius="0px"
                data-play-my-city-position="bottom"
                data-play-my-city-alignment="center"
                data-play-my-city-header-text="DON'T SEE A SHOW NEAR YOU?"
                data-play-my-city-cta-size="medium"
                data-play-my-city-cta-text="REQUEST A SHOW"
                data-play-my-city-cta-text-color="#f5f1e8"
                data-play-my-city-cta-bg-color="#c8102e"
                data-play-my-city-cta-border-color="#c8102e"
                data-play-my-city-cta-border-width="0px"
                data-play-my-city-cta-border-radius="0px"
                data-language="en"
                data-app-id=""
                data-affil-code=""
                data-bit-logo-position="bottomRight"
                data-bit-logo-color="#c8102e"
              />
              <noscript>
                <p className="p-6 text-center text-paper/70">{t.shows.fallback}</p>
              </noscript>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={SITE.socials.bandsintown}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border-2 border-paper px-5 py-3 font-mono text-xs uppercase tracking-widest text-paper hover:bg-paper hover:text-ink"
              >
                {t.shows.openBandsintown} <ExternalLink size={14} />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-blood px-5 py-3 font-mono text-xs uppercase tracking-widest text-paper hover:bg-paper hover:text-ink"
              >
                {t.shows.booking}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
