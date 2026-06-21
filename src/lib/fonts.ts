import { Bebas_Neue, Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

export const fontBrand = localFont({
  src: "../../public/assets/fonts/Cattedrale-Demo-Regular.woff",
  weight: "400",
  variable: "--font-cattedrale",
  display: "swap",
});

export const fontDisplay = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const fontVariables = `${fontBrand.variable} ${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`;
