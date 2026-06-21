"use client";

import { SITE } from "@/config/site";
import { useI18n } from "@/contexts/i18n-context";
import { SOCIAL_ICONS } from "@/lib/social-icons";
import primitives from "@/styles/primitives.module.css";
import styles from "./Footer.module.css";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__grid}>
        <div>
          <p className={styles.footer__brand}>NAPALM COBRAS</p>
          <p className={styles.footer__tagline}>{t.meta.tagline}</p>
        </div>
        <div>
          <p className={primitives.eyebrow}>{t.contact.follow}</p>
          <ul className={styles.footer__socials}>
            {SITE.follow.map((item) => {
              const Icon = SOCIAL_ICONS[item.key];
              return (
                <li key={item.key}>
                  <a
                    href={SITE.socials[item.key]}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.footer__social}
                  >
                    <Icon size={16} aria-hidden />
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <p className={primitives.eyebrow}>{t.contact.emailLabel}</p>
          <a href={`mailto:${SITE.email}`} className={styles.footer__email}>
            {SITE.email}
          </a>
          <p className={styles.footer__note}>{t.footer.builtIn}</p>
        </div>
      </div>
      <div className={styles.footer__bar}>
        <p className={styles.footer__copy}>
          © {new Date().getFullYear()} Napalm Cobras. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
