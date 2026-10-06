import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

import {
  HUB_COPY,
  RED_CARPET_COPY,
  REGION_PAGES,
  RegionCount,
  RetailerDirectory,
  retailersFor,
} from "./dispensary-directory";
import styles from "./dispensaries.module.css";

const PAGE_TITLE = "Presidential Dispensaries Across Oklahoma Regions";
const PAGE_DESCRIPTION =
  "Browse 194 Presidential retailer listings across Oklahoma's regions and confirm current product availability with each licensed dispensary.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: absoluteUrl("/dispensaries") },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/dispensaries"),
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    siteName: SITE_NAME,
    images: [
      {
        url: absoluteUrl(REGION_PAGES[0].image),
        width: 1280,
        height: 720,
        alt: REGION_PAGES[0].imageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [absoluteUrl(REGION_PAGES[0].image)],
  },
};

export default function DispensariesPage() {
  const redCarpetRetailers = retailersFor("Red Carpet Country");

  return (
    <>
      <SiteHeader currentPath="/dispensaries" />
      <main id="main-content">
        <header className={styles.hero}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{PAGE_TITLE}</span>
          </nav>
          <h1>{PAGE_TITLE}</h1>
        </header>

        <div className={styles.pageShell}>
          <section aria-label="Introduction" className={styles.intro}>
            <p>{HUB_COPY}</p>
          </section>

          <div className={styles.regionStack}>
            {REGION_PAGES.map((region) => {
              const retailers = retailersFor(region.name);
              const href = `/dispensaries/${region.slug}`;

              return (
                <section className={styles.regionSection} key={region.slug}>
                  <header className={styles.regionHeader}>
                    <h2>{region.name}</h2>
                  </header>
                  <Link aria-label={`View ${region.name} dispensaries`} href={href}>
                    <Image
                      alt={region.imageAlt}
                      className={styles.regionImage}
                      height={720}
                      loading="lazy"
                      sizes="(max-width: 1439px) calc(100vw - 2rem), 1376px"
                      src={region.image}
                      width={1280}
                    />
                  </Link>
                  <RegionCount count={retailers.length} />
                  <p>
                    <Link href={href}>View {region.name} dispensaries</Link>
                  </p>
                </section>
              );
            })}

            <section className={`${styles.regionSection} ${styles.elsewhereSection}`}>
              <header className={styles.regionHeader}>
                <h2>Red Carpet Country</h2>
              </header>
              <RegionCount count={redCarpetRetailers.length} />
              <div className={styles.regionCopy}>
                <p>{RED_CARPET_COPY}</p>
              </div>
              <RetailerDirectory retailers={redCarpetRetailers} />
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
