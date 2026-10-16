import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

import {
  REGION_PAGES,
  RegionCount,
  RetailerDirectory,
  regionForSlug,
  retailersFor,
} from "../dispensary-directory";
import styles from "../dispensaries.module.css";
import { IntroH3, REGION_INTROS } from "@/components/r17-intro";

type PageProps = { params: Promise<{ region: string }> };

export const dynamicParams = false;

export function generateStaticParams(): Array<{ region: string }> {
  return REGION_PAGES.map((region) => ({ region: region.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region: slug } = await params;
  const region = regionForSlug(slug);

  if (!region) {
    return {
      title: `Page Not Found | ${SITE_NAME}`,
      robots: { index: false, follow: false },
    };
  }

  const path = `/dispensaries/${region.slug}`;
  const title = `${region.name} Dispensaries | Presidential THC`;
  const description = region.metaDescription;

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: {
      type: "website",
      url: absoluteUrl(path),
      title,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: absoluteUrl(region.image),
          width: 1280,
          height: 720,
          alt: region.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(region.image)],
    },
  };
}

// One contextual link per region page: the first "licensed retailers" goes to the retailer page.
function linkedRegionCopy(copy: string) {
  const anchor = "licensed retailers";
  const at = copy.indexOf(anchor);
  if (at < 0) return copy;
  return (
    <>
      {copy.slice(0, at)}
      <Link href="/retailers">{anchor}</Link>
      {copy.slice(at + anchor.length)}
    </>
  );
}

export default async function DispensaryRegionPage({ params }: PageProps) {
  const { region: slug } = await params;
  const region = regionForSlug(slug);

  if (!region) notFound();

  const retailers = retailersFor(region.name);

  return (
    <>
      <SiteHeader currentPath="/dispensaries" />
      <main id="main-content">
        <header className={styles.hero}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/dispensaries">Dispensaries</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{region.name}</span>
          </nav>
          <h1>Presidential Dispensaries in {region.name}</h1>
        </header>

        <div className={styles.pageShell}>
          <section className={styles.regionSection}>
            <Image
              alt={region.imageAlt}
              className={styles.regionImage}
              height={720}
              priority
              sizes="(max-width: 1439px) calc(100vw - 2rem), 1376px"
              src={region.image}
              width={1280}
            />
            <div className={styles.regionCopy}>
              <p>{linkedRegionCopy(region.copy)}</p>
            </div>
            {REGION_INTROS[region.slug] ? <IntroH3 {...REGION_INTROS[region.slug]!} /> : null}
            <RegionCount count={retailers.length} />
            <RetailerDirectory retailers={retailers} />
          </section>

          <nav aria-label="Other Oklahoma regions">
            <p>
              Other Oklahoma regions:{" "}
              {REGION_PAGES.filter((other) => other.slug !== region.slug).map((other, index) => (
                <span key={other.slug}>
                  {index ? ", " : ""}
                  <Link href={`/dispensaries/${other.slug}`}>{other.name}</Link>
                </span>
              ))}
            </p>
          </nav>

          <p>
            <Link href="/dispensaries">All Oklahoma regions</Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
