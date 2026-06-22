"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { GlitchText } from "@/components/sections/GlitchText";
import { NAV } from "@/config/navigation";
import { useI18n } from "@/contexts/i18n-context";
import { locales } from "@/i18n/config";
import { mergeClassNames } from "@/lib/utils";
import { useLocaleSwitcher, useSiteNavigation } from "./Header.hooks";
import styles from "./Header.module.css";

export function Header() {
  const { t, lang } = useI18n();
  const { isMenuOpen, closeMenu, toggleMenu, localizePath, isActivePath } = useSiteNavigation(lang);

  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <Link href={localizePath("/")} className={styles.header__brand} onClick={closeMenu}>
          <GlitchText className={styles["header__brand-name"]} continuous>
            NAPALM COBRAS
          </GlitchText>
        </Link>

        <nav className={styles.header__nav}>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={localizePath(item.href)}
              aria-current={isActivePath(item.href) ? "page" : undefined}
              className={mergeClassNames(
                styles.header__link,
                isActivePath(item.href) && styles["header__link--active"],
              )}
            >
              {t.nav[item.key]}
            </Link>
          ))}
          <LangSwitch />
        </nav>

        <button
          type="button"
          onClick={toggleMenu}
          className={styles.header__toggle}
          aria-label="menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={styles.header__mobile}
          >
            <div className={styles["header__mobile-inner"]}>
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={localizePath(item.href)}
                  onClick={closeMenu}
                  aria-current={isActivePath(item.href) ? "page" : undefined}
                  className={mergeClassNames(
                    styles["header__mobile-link"],
                    isActivePath(item.href) && styles["header__mobile-link--active"],
                  )}
                >
                  {t.nav[item.key]}
                </Link>
              ))}
              <div className={styles["header__mobile-lang"]}>
                <LangSwitch />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function LangSwitch() {
  const { lang } = useI18n();
  const { buildLocalePath } = useLocaleSwitcher();

  return (
    <div className={styles["lang-switch"]}>
      {locales.map((locale) => (
        <Link
          key={locale}
          href={buildLocalePath(locale)}
          className={mergeClassNames(
            styles["lang-switch__item"],
            lang === locale && styles["lang-switch__item--active"],
          )}
        >
          {locale}
        </Link>
      ))}
    </div>
  );
}
