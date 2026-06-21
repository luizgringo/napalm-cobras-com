import type { Dict } from "@/i18n/config";

export type { Dict, Locale } from "@/i18n/config";

export interface NavItem {
  href: string;
  key: keyof Dict["nav"];
}

export interface StreamingLink {
  name: string;
  url: string;
}

export interface Release {
  title: string;
  type: "ep" | "live" | "single";
  year: string;
  url: string;
}

export interface TimelineEntry {
  year: string;
  text: string;
}
