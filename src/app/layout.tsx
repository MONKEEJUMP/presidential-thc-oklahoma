import type { Metadata, Viewport } from "next";
import { Source_Serif_4 } from "next/font/google";
import localFont from "next/font/local";

import { STATE } from "@/config/state";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";

import "./globals.css";

const clashDisplay = localFont({
  src: [
    // Match the main Presidential site: Semibold owns the 400–600 range so
    // unweighted display text, including locator zeros, stays deliberately robust.
    { path: "../../public/fonts/clash-display-semibold.woff2", weight: "400 600" },
    { path: "../../public/fonts/clash-display-bold.woff2", weight: "700 900" },
  ],
  display: "swap",
  variable: "--font-clash-display",
  fallback: ["Arial", "sans-serif"],
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-source-serif",
  fallback: ["Georgia", "serif"],
});

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#070908",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: `The official Presidential site for ${STATE.name}.`,
  robots: { index: true, follow: true },
  openGraph: { siteName: SITE_NAME, type: "website", images: [DEFAULT_OG_IMAGE] },
  twitter: { card: "summary_large_image", images: [DEFAULT_OG_IMAGE] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${clashDisplay.variable} ${sourceSerif.variable}`}><body>{children}</body></html>;
}
