import { catalogProducts } from "@/content/assets";
import { pages } from "@/content";
import { absoluteUrl, escapeXml } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const formatPaths = {
    "moon-rock": "/moon-rocks",
    blunt: "/blunts",
    "pre-roll": "/pre-rolls",
    mini: "/minis",
  } as const;

  const urls = pages.map((page) => {
    const images = catalogProducts.filter((product) => formatPaths[product.format] === page.path);
    const entries = images.map((product) => {
      const variant = product.variant > 1 ? ` package variant ${product.variant}` : " package";
      const caption = `${product.name} Presidential ${product.format.replace("-", " ")}${variant}`;
      return `    <image:image>\n      <image:loc>${escapeXml(absoluteUrl(`/images/${product.squareFilename}`))}</image:loc>\n      <image:caption>${escapeXml(caption)}</image:caption>\n    </image:image>`;
    }).join("\n");
    return `  <url>\n    <loc>${escapeXml(absoluteUrl(page.path))}</loc>\n${entries}\n  </url>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=86400" } });
}
