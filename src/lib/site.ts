import type { ContentImage, PageContent } from "@/content/types";

export const SITE_NAME = "Presidential THC Oklahoma";
export const SITE_URL = "https://presidentialthcoklahoma.com";
export const MAIN_SITE_URL = "https://presidentialmoonrocks.com";
export const DEFAULT_OG_IMAGE = "/images/ok-hero.webp";

export const primaryNavigation = [
  { href: "/moon-rocks", label: "Moon Rocks" },
  { href: "/blunts", label: "Blunts" },
  { href: "/pre-rolls", label: "Pre-Rolls" },
  { href: "/minis", label: "Minis" },
  { href: "/silver", label: "Series" },
  { href: "/find", label: "Find It" },
] as const;

export const footerProductLinks = [
  { href: `${MAIN_SITE_URL}/moon-rocks/silver`, label: "Silver Flavor Series" },
  { href: `${MAIN_SITE_URL}/moon-rocks/gold`, label: "Gold Strain Series" },
  { href: `${MAIN_SITE_URL}/moon-rocks/rose-gold`, label: "Rose Gold Connoisseur Series" },
  { href: `${MAIN_SITE_URL}/moon-rocks/presidential-line`, label: "Presidential Line" },
  { href: `${MAIN_SITE_URL}/moon-rocks/presidential-house-line`, label: "Presidential House Line" },
  { href: `${MAIN_SITE_URL}/moon-rocks/presidential-x-thc-design`, label: "Presidential x THC Design" },
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
