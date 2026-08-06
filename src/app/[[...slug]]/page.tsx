import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticlePage } from "@/components/article-page";
import { pageImages } from "@/content/assets";
import { pages } from "@/content";
import { absoluteUrl, DEFAULT_OG_IMAGE, findPage, imageUrl, imagesForPage, pathFromSegments } from "@/lib/site";

type PageProps = { params: Promise<{ slug?: string[] }> };

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string[] }> {
  return pages.map((page) => ({ slug: page.path === "/" ? [] : page.path.split("/").filter(Boolean) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const path = pathFromSegments(slug);
  const page = findPage(pages, path);
  if (!page) return { title: "Page Not Found — Presidential THC Oklahoma", robots: { index: false, follow: false } };

  const image = imagesForPage(pageImages, path)[0];
  const canonical = absoluteUrl(path);
  const social = image ? { url: imageUrl(image), width: image.width, height: image.height, alt: image.alt } : { url: absoluteUrl(DEFAULT_OG_IMAGE), width: 1600, height: 900, alt: "Oklahoma landscape beneath an evening sky" };

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: { type: "website", url: canonical, title: page.title, description: page.description, siteName: "Presidential THC Oklahoma", images: [social] },
    twitter: { card: "summary_large_image", title: page.title, description: page.description, images: [social.url] },
  };
}

export default async function PublicationPage({ params }: PageProps) {
  const { slug } = await params;
  const path = pathFromSegments(slug);
  const page = findPage(pages, path);
  if (!page) notFound();
  return <ArticlePage page={page} images={imagesForPage(pageImages, path)} />;
}
