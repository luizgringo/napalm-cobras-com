"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { GlitchText } from "@/components/sections/GlitchText";
import { NAV } from "@/config/navigation";
import { useI18n } from "@/contexts/i18n-context";
import { type Locale, locales } from "@/i18n/config";
import { mergeClassNames } from "@/lib/utils";
import styles from "./Header.module.css";

export function Header() {
  const { t, lang } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const localize = (path: string) => `/${lang}${path === "/" ? "" : path}`;

  const isActive = (path: string) => {
    const target = localize(path);
    if (path === "/") {
      return pathname === target;
    }
    return pathname === target || pathname.startsWith(`${target}/`);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <Link href={localize("/")} className={styles.header__brand} onClick={() => setOpen(false)}>
          <GlitchText className={styles["header__brand-name"]} continuous>
            NAPALM COBRAS
          </GlitchText>
        </Link>

        <nav className={styles.header__nav}>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={localize(item.href)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={mergeClassNames(
                styles.header__link,
                isActive(item.href) && styles["header__link--active"],
              )}
            >
              {t.nav[item.key]}
            </Link>
          ))}
          <LangSwitch />
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className={styles.header__toggle}
          aria-label="menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
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
                  href={localize(item.href)}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={mergeClassNames(
                    styles["header__mobile-link"],
                    isActive(item.href) && styles["header__mobile-link--active"],
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
  const pathname = usePathname();

  const swapLocale = (target: Locale) => {
    const segments = pathname.split("/");
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = target;
    } else {
      segments.splice(1, 0, target);
    }
    return segments.join("/") || `/${target}`;
  };

  return (
    <div className={styles["lang-switch"]}>
      {locales.map((locale) => (
        <Link
          key={locale}
          href={swapLocale(locale)}
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
