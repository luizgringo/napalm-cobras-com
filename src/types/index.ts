import type { Lang } from "@/i18n/config";

export interface NavItem {
  href: string;
  key: keyof Lang["nav"];
}
