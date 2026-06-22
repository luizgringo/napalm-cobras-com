import { usePathname } from "next/navigation";
import { useState } from "react";
import { type Locale, locales } from "@/i18n/config";

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
