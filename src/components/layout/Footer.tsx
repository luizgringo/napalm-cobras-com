import { useI18n } from "@/i18n";
import { SITE } from "@/lib/site";
import { Instagram, Youtube, Music } from "lucide-react";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="noise border-t-4 border-blood bg-smoke">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-display text-3xl text-paper">NAPALM COBRAS</p>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-paper/60">
            {t.meta.tagline}
          </p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-blood">{t.contact.follow}</p>
          <div className="mt-3 flex gap-3">
            <a href={SITE.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="border border-paper/20 p-2 text-paper transition-colors hover:border-blood hover:text-blood">
              <Instagram size={18} />
            </a>
            <a href={SITE.socials.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="border border-paper/20 p-2 text-paper transition-colors hover:border-blood hover:text-blood">
              <Youtube size={18} />
            </a>
            <a href={SITE.socials.bandcamp} target="_blank" rel="noreferrer" aria-label="Bandcamp" className="border border-paper/20 p-2 text-paper transition-colors hover:border-blood hover:text-blood">
              <Music size={18} />
            </a>
          </div>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-blood">{t.contact.emailLabel}</p>
          <a href={`mailto:${SITE.email}`} className="mt-3 block font-display text-2xl text-paper hover:text-blood">
            {SITE.email}
          </a>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-paper/50">{t.footer.builtIn}</p>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <p className="mx-auto max-w-7xl px-4 py-4 font-mono text-[10px] uppercase tracking-widest text-paper/40 md:px-8">
          © {new Date().getFullYear()} Napalm Cobras. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
