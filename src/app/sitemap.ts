import type { MetadataRoute } from "next";

import { pages } from "@/content";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((page) => ({
      url: absoluteUrl(page.path),
      changeFrequency: page.kind === "pillar" ? ("weekly" as const) : ("monthly" as const),
      priority: page.kind === "pillar" ? 1 : 0.8,
    })),
    {
      url: absoluteUrl("/dispensaries"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
