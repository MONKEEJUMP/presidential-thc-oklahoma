import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { schemaEntitiesFor } from "@/content/schema-entities";
import { absoluteUrl, escapeJsonLd, SITE_NAME } from "@/lib/site";

import {
  HUB_COPY,
  RED_CARPET_COPY,
  REGION_PAGES,
  RegionCount,
  RetailerDirectory,
  retailersFor,
} from "./dispensary-directory";
import { HUB_INTRO, HUB_INTRO_BRAND, HUB_INTRO_REGIONS, IntroH3 } from "@/components/r17-intro";
import styles from "./dispensaries.module.css";

const PAGE_TITLE = "Presidential Dispensaries Across Oklahoma Regions";
const PAGE_DESCRIPTION =
  "Oklahoma Presidential dispensaries: browse retailer listings by region and confirm current product availability with each licensed dispensary.";

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
            {HUB_INTRO ? <IntroH3 {...HUB_INTRO} /> : null}
            <IntroH3 heading={"Knowing the brand before you visit"} parts={[{ text: "A dispensary visit goes faster when you already know what Presidential is. The brand was founded in Los Angeles in 2012 and reaches patients through licensed dispensaries, with Silver, Gold, and Rose Gold naming the series on each pack. Learning the crest, the series colors, and the exact product names ahead of time makes it easier to spot the right package on a menu or shelf. For the full background, read " }, { text: "the story behind Presidential in Oklahoma", href: "/about" }, { text: ". Each dispensary sets its own shelf, so call ahead with the exact product name and confirm what is in stock." }]} />
            {HUB_INTRO_REGIONS ? <IntroH3 {...HUB_INTRO_REGIONS} /> : null}
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

          <section aria-labelledby="dispensary-products-heading" className={styles.closingBlock}>
            <div className={styles.closingCopy}>
              <h2 id="dispensary-products-heading">Which Presidential products do these dispensaries carry?</h2>
              <p>
                Presidential is a brand, not a dispensary itself: it reaches patients through licensed Oklahoma
                dispensaries, and the <Link href="/retailers">For Oklahoma retailers</Link> page explains how stores
                carry it.
              </p>
              <p>
                Presidential is a wholesale brand, and these licensed dispensaries stock it in these formats:{" "}
                <Link href="/moon-rocks">Moon Rocks</Link>, the flagship three-layer build of flower, cannabis
                concentrate, and kief; <Link href="/pre-rolls">infused pre-rolls</Link> in paper;{" "}
                <Link href="/blunts">tobacco-free hemp-wrap blunts</Link> in full and mini sizes; and{" "}
                <Link href="/minis">Presidential minis</Link>, the compact blunt and pre-roll family.
              </p>
              <p>
                Across those formats, the Silver Flavor Series carries fruit-forward identities, the Gold
                Strain Series cannabis-first strain names, and the{" "}
                <Link href="/rose-gold">solventless Rose Gold identities</Link>, alongside the Presidential Line and House Line.
              </p>
              <p>
                Every store listed here is independently owned and licensed and chooses its own mix of formats,
                series, and sizes, so a listing does not mean a store has every product. Ask for Presidential, the
                product name, the format, and the size, and bring a current{" "}
                <Link href="/oklahoma">OMMA patient or visitor license</Link>.
              </p>
              {HUB_INTRO_BRAND ? <IntroH3 {...HUB_INTRO_BRAND} /> : null}
            </div>
          </section>
        </div>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: escapeJsonLd({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": absoluteUrl("/dispensaries"),
            url: absoluteUrl("/dispensaries"),
            name: PAGE_TITLE,
            description: PAGE_DESCRIPTION,
            ...schemaEntitiesFor("/dispensaries"),
          }),
        }}
      />
      <SiteFooter />
    </>
  );
}
