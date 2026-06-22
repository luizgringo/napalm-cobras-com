/**
 * Font loading configuration for the Napalm Cobras website.
 *
 * @remarks
 * Registers the brand, display, sans and monospace fonts via `next/font` and
 * exposes their CSS variables so they can be applied on a root element.
 */
import { Bebas_Neue, Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

/** Locally hosted brand display font (Cattedrale). */
const fontBrand = localFont({
  src: "../../public/assets/fonts/Cattedrale-Demo-Regular.woff",
  weight: "400",
  variable: "--font-cattedrale",
  display: "swap",
});

/** Condensed display font (Bebas Neue) for headings. */
const fontDisplay = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

/** Primary sans-serif body font (Inter). */
const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** Monospace font (JetBrains Mono) for code-like accents. */
const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

/**
 * Space-separated CSS variable class names for every registered font, applied
 * to a root element to expose the font custom properties globally.
 */
export const fontVariables = `${fontBrand.variable} ${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`;
