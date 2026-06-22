/**
 * Header hooks — encapsulate the navigation logic for the `Header` component:
 * mobile menu open state, locale-aware path building and active-link detection.
 */

import { usePathname } from "next/navigation";
import { useState } from "react";
import { type Locale, locales } from "@/i18n/config";

/**
 * Encapsulates the `Header` navigation logic: mobile menu state plus helpers to
 * prefix paths with the active locale and detect the currently active route.
 *
 * @param locale - The active locale used to prefix navigation paths.
 * @returns Navigation state and helpers:
 * - `isMenuOpen`: whether the mobile menu is currently open.
 * - `closeMenu`: closes the mobile menu.
 * - `toggleMenu`: toggles the mobile menu open/closed.
 * - `localizePath`: prefixes a path with the active locale.
 * - `isActivePath`: returns whether a given path matches the current route.
 */
export function useSiteNavigation(locale: Locale) {
  const pathname = usePathname();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const localizePath = (path: string) => `/${locale}${path === "/" ? "" : path}`;

  const isActivePath = (path: string) => {
    const target = localizePath(path);
    if (path === "/") {
      return pathname === target;
    }
    return pathname === target || pathname.startsWith(`${target}/`);
  };

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((open) => !open);

  return { isMenuOpen, closeMenu, toggleMenu, localizePath, isActivePath };
}

/**
 * Encapsulates the locale switching logic: rebuilds the current pathname for a
 * target locale, swapping an existing locale segment or inserting one when
 * absent.
 *
 * @returns An object with `buildLocalePath`, which maps a target locale to the
 * equivalent URL for the current page.
 */
export function useLocaleSwitcher() {
  const pathname = usePathname();

  const buildLocalePath = (target: Locale) => {
    const segments = pathname.split("/");
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = target;
    } else {
      segments.splice(1, 0, target);
    }
    return segments.join("/") || `/${target}`;
  };

  return { buildLocalePath };
}
