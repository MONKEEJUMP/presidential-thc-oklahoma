import { allProductImages } from "@/content/assets";
import { pages } from "@/content";
import { absoluteUrl, escapeXml } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const urls = pages.map((page) => {
    const images = allProductImages.filter((image) => image.page === page.path);
    const hero = page.path === "/" ? [{ src: "/images/ok-hero.webp", alt: "Oklahoma landscape beneath a wide evening sky" }] : [];
    const entries = [...hero, ...images].map((image) => `    <image:image>\n      <image:loc>${escapeXml(absoluteUrl(image.src))}</image:loc>\n      <image:caption>${escapeXml(image.alt)}</image:caption>\n    </image:image>`).join("\n");
    return `  <url>\n    <loc>${escapeXml(absoluteUrl(page.path))}</loc>\n${entries}\n  </url>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=86400" } });
}
