import type { ContentImage, PageContent } from "@/content/types";
import { STATE } from "@/config/state";

export const SITE_NAME = `Presidential THC ${STATE.name}`;
export const SITE_URL = `https://${STATE.domain}`;
export const MAIN_SITE_URL = "https://presidentialmoonrocks.com";
export const DEFAULT_OG_IMAGE = STATE.heroImage;

export const primaryNavigation = [
  { href: "/moon-rocks", label: "Moon Rocks" },
  { href: "/blunts", label: "Blunts" },
  { href: "/pre-rolls", label: "Pre-Rolls" },
  { href: "/minis", label: "Minis" },
  { href: "/silver", label: "Series" },
  { href: "/find", label: "Find Us" },
  { href: "/dispensaries", label: "Dispensaries" },
] as const;

export const footerProductLinks = [
  { label: "Silver Flavor Series" },
  { label: "Gold Strain Series" },
  { label: "Rose Gold Connoisseur Series" },
  { label: "Presidential Line" },
  { label: "Presidential House Line" },
  { label: "Presidential x THC Design" },
] as const;

export function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  return `/${path.replace(/^\/+|\/+$/g, "")}`;
}

export function pathFromSegments(segments?: string[]): string {
  return segments?.length ? normalizePath(segments.join("/")) : "/";
}

export function absoluteUrl(path: string): string {
  return new URL(normalizePath(path), SITE_URL).toString();
}

export function findPage(
  pages: readonly PageContent[],
  path: string,
): PageContent | undefined {
  const normalized = normalizePath(path);
  return pages.find((page) => normalizePath(page.path) === normalized);
}

export function imagesForPage(
  images: Readonly<Record<string, ContentImage[]>>,
  path: string,
): ContentImage[] {
  return images[normalizePath(path)] ?? [];
}

export function imageUrl(image?: ContentImage): string {
  return absoluteUrl(image?.src ?? DEFAULT_OG_IMAGE);
}

export function escapeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// No cross-domain links between Presidential sites (Sitebulb R8 / chief ruling).
export const isOffSite = (href?: string) => !!href && /^https?:\/\/(www\.)?presidentialmoonrocks\.com/i.test(href);
