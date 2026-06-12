import { createFileRoute } from "@tanstack/react-router";
import { Mail, Instagram, Youtube, Music } from "lucide-react";
import { useI18n } from "@/i18n";
import { PageHero } from "@/components/site/SectionTitle";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Napalm Cobras" },
      { name: "description", content: "Booking, press, partnerships and collaborations with Napalm Cobras." },
      { property: "og:title", content: "Contact — Napalm Cobras" },
      { property: "og:description", content: "Get in touch for booking and press." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero eyebrow="Get in touch" title={t.contact.title} intro={t.contact.intro} />

      <section>
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-blood">// {t.contact.booking}</p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-3 flex items-center gap-3 font-display text-3xl text-paper hover:text-blood md:text-5xl"
            >
              <Mail className="text-blood" /> {SITE.email}
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-blood">// {t.contact.follow}</p>
            <ul className="mt-3 space-y-3">
              <SocialLink icon={Instagram} label="Instagram" href={SITE.socials.instagram} handle="@napalmcobras" />
              <SocialLink icon={Music} label="Bandcamp" href={SITE.socials.bandcamp} handle="napalmcobras.bandcamp.com" />
              <SocialLink icon={Youtube} label="YouTube" href={SITE.socials.youtube} handle="@napalmcobras" />
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function SocialLink({ icon: Icon, label, href, handle }: { icon: typeof Mail; label: string; href: string; handle: string }) {
  return (
    <li>
      <a href={href} target="_blank" rel="noreferrer" className="group flex items-center gap-4 border-b border-paper/15 py-3 hover:border-blood">
        <Icon className="text-blood" size={20} />
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-paper/50">{label}</p>
          <p className="font-display text-2xl text-paper group-hover:text-blood">{handle}</p>
        </div>
      </a>
    </li>
  );
}
