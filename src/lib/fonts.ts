import { Bebas_Neue, Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

const fontBrand = localFont({
  src: "../../public/assets/fonts/Cattedrale-Demo-Regular.woff",
  weight: "400",
  variable: "--font-cattedrale",
  display: "swap",
});

const fontDisplay = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const fontVariables = `${fontBrand.variable} ${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`;
