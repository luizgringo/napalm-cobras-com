/**
 * Root App Router layout for the Napalm Cobras site. Defines the global
 * metadata, viewport, and the top-level layout shell that wraps every route.
 */
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SITE } from "@/config/site";
import { BASE_URL } from "@/lib/seo";
import "@/styles/globals.css";

/**
 * Global default metadata applied to all routes (title template, description,
 * canonical base URL, and indexing rules). Merged with per-page metadata.
 */
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Napalm Cobras — Metalpunk de Belo Horizonte",
    template: "%s — Napalm Cobras",
  },
  description: SITE.album.title,
  applicationName: SITE.name,
  robots: { index: true, follow: true },
  alternates: {
    types: {
      "text/plain": [{ url: "/llms.txt", title: "LLMs" }],
    },
  },
};

/**
 * Global viewport configuration (theme color and responsive scaling).
 */
export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

/**
 * Root layout Server Component. Renders its children directly; the actual HTML
 * shell is provided by the localized layout under `[locale]`.
 *
 * @param props - Layout props.
 * @param props.children - Nested route content to render.
 * @returns The provided children unchanged.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
