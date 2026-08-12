import Image from "next/image";
import Link from "next/link";
import { Fragment, Suspense } from "react";

import { FindUsNationwideVideo } from "@/components/presidential/media/find-us-nationwide-video";
import { STATE } from "@/config/state";
import { pageCatalogHeadings } from "@/content/assets";
import type { ContentImage, ContentParagraph, PageContent } from "@/content/types";
import { absoluteUrl, escapeJsonLd, imageUrl, SITE_URL } from "@/lib/site";

import { ContentFigure } from "./content-figure";
import { HomepageLocatorConsole } from "./homepage-locator-console";
import { RetailerLocator } from "./retailer-locator";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

function RichParagraph({ paragraph }: { paragraph: ContentParagraph }) {
  if (typeof paragraph === "string") return <p>{paragraph}</p>;
  return (
    <p>
      {paragraph.map((part, index) =>
        part.href ? <a href={part.href} key={`${part.text}-${index}`}>{part.text}</a> : <Fragment key={`${part.text}-${index}`}>{part.text}</Fragment>,
      )}
    </p>
  );
}

function PageHero({ page }: { page: PageContent }) {
  if (page.path === "/find") {
    return (
      <section
        aria-labelledby="presidential-route-title"
        className="relative isolate overflow-hidden bg-po-ink text-po-on-dark [container-type:inline-size]"
      >
        <div className="mx-auto w-full max-w-[80rem] px-[clamp(1.25rem,4vw,4rem)] pb-[clamp(2rem,4vw,3rem)] pt-[clamp(3rem,8vw,7rem)]">
          <nav
            aria-label="Breadcrumb"
            className="mb-[clamp(2rem,4vw,3rem)] font-display text-[0.78rem] uppercase text-po-on-dark-muted"
          >
            <ol className="flex flex-wrap items-center gap-2.5">
              <li className="flex items-center gap-2.5">
                <Link
                  className="font-semibold text-po-brand underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-po-brand"
                  href="/"
                >
                  Presidential
                </Link>
              </li>
              <li className="flex items-center gap-2.5">
                <span aria-hidden="true" className="text-po-on-dark-muted">/</span>
                <span aria-current="page" className="font-semibold text-po-on-dark">
                  Find Presidential Near You
                </span>
              </li>
            </ol>
          </nav>

          <div className="w-full">
            <FindUsNationwideVideo />
          </div>

          <h1 className="sr-only" id="presidential-route-title">
            {page.h1}
          </h1>
        </div>

        <span
          aria-hidden="true"
          className="po-gold-thread-inlay absolute inset-x-0 bottom-0 h-0"
        />
      </section>
    );
  }

  if (page.kind === "pillar") {
    return (
      <header className="home-hero">
        <Image
          className="home-hero__image"
          src={STATE.heroImage}
          fill
          sizes="100vw"
          priority
          alt={`${STATE.name} landscape beneath a wide evening sky`}
        />
        <div className="home-hero__overlay" aria-hidden="true" />
        <div className="home-hero__content">
          <p className="home-hero__eyebrow">THE OFFICIAL HOME OF</p>
          <h1>{page.h1}</h1>
          <p className="home-hero__line">{STATE.tagline}</p>
        </div>
      </header>
    );
  }

  return (
    <header className="page-hero">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">{page.h1}</span>
      </nav>
      <h1>{page.h1}</h1>
      <p>{page.description}</p>
    </header>
  );
}

function TableOfContents({ page }: { page: PageContent }) {
  const rows = Math.ceil(page.sections.length / 2);
  return (
    <nav className={`table-of-contents table-of-contents--rows-${rows}`} aria-labelledby="contents-heading">
      <p id="contents-heading">CONTENTS</p>
      <ol>
        {page.sections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.heading}</a></li>)}
      </ol>
    </nav>
  );
}

function LinkDirectory({ page }: { page: PageContent }) {
  return (
    <aside className="link-directory" aria-label={`Continue through the ${STATE.name} reference`}>
      {page.childLinks?.length ? (
        <section>
          <p className="link-directory__label">The full {STATE.name} reference</p>
          <div className="link-directory__grid">
            {page.childLinks.map((link) => (
              <Link className="editorial-link" href={link.href} key={link.href}>
                <span>{link.label}</span>{link.description ? <small>{link.description}</small> : null}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
      {page.relatedLinks?.length ? (
        <section>
          <p className="link-directory__label">Continue reading</p>
          <div className="link-directory__grid link-directory__grid--compact">
            {page.relatedLinks.map((link) => (
              <Link className="editorial-link" href={link.href} key={`${link.href}-${link.label}`}>
                <span>{link.label}</span>{link.description ? <small>{link.description}</small> : null}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </aside>
  );
}

function Sources({ page }: { page: PageContent }) {
  return (
    <aside className="sources" aria-labelledby="sources-heading">
      <p className="sources__label" id="sources-heading">Official sources</p>
      <ul>
        {page.sources.map((source) => (
          <li key={source.href}><a href={source.href} rel="noopener noreferrer">{source.label}</a></li>
        ))}
      </ul>
    </aside>
  );
}

function ProductRoster({ page }: { page: PageContent }) {
  if (!page.productRoster?.length) return null;

  return (
    <aside className="product-roster" aria-labelledby="product-roster-heading">
      <p className="product-roster__eyebrow">The complete official series</p>
      <h2 id="product-roster-heading">Every product in the series</h2>
      <div className="product-roster__grid">
        {page.productRoster.map((product, index) => (
          <a href={product.href} key={product.href}>
            <small>{String(index + 1).padStart(2, "0")}</small>
            <span>{product.label}</span>
          </a>
        ))}
      </div>
    </aside>
  );
}

function ProductCatalogGrid({ heading, images }: { heading?: string; images: ContentImage[] }) {
  if (!heading || images.length === 0) return null;
  const headingId = `product-catalog-${images[0].page.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "home"}`;

  return (
    <section className="product-catalog" aria-labelledby={headingId}>
      <h2 id={headingId}>{heading}</h2>
      <div className="product-catalog__grid">
        {images.map((image) => (
          <a
            aria-label={`View ${image.alt} on the official Presidential site`}
            className="product-catalog__link"
            href={image.productHref}
            key={image.productId}
          >
            <Image
              alt={image.alt}
              className="product-catalog__image"
              height={image.height}
              loading="lazy"
              sizes="(max-width: 767px) 92vw, (max-width: 1023px) 44vw, (max-width: 1279px) 29vw, 22vw"
              src={image.src}
              width={image.width}
            />
          </a>
        ))}
      </div>
    </section>
  );
}

function StructuredData({ page, images }: { page: PageContent; images: ContentImage[] }) {
  const graph: Record<string, unknown>[] = images.map((image) => ({
    "@type": "ImageObject",
    contentUrl: imageUrl(image),
    width: image.width,
    height: image.height,
    description: image.alt,
  }));

  if (page.kind === "pillar") {
    graph.unshift({
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Presidential",
      alternateName: `Presidential THC ${STATE.name}`,
      foundingDate: "2012",
      foundingLocation: { "@type": "Place", name: "Los Angeles, California" },
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: absoluteUrl("/images/presidential-crest.webp") },
      // No verified social profile URLs were supplied; never invent sameAs entries.
      sameAs: [],
    });
  }

  graph.unshift({
    "@type": "WebPage",
    "@id": absoluteUrl(page.path),
    name: page.title,
    description: page.description,
    primaryImageOfPage: imageUrl(images[0]),
  });

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: escapeJsonLd({ "@context": "https://schema.org", "@graph": graph }) }} />;
}

export function ArticlePage({ page, images }: { page: PageContent; images: ContentImage[] }) {
  let imageIndex = 0;
  const sectionImageLimit = Math.min(
    images.length,
    page.sections.reduce((total, section) => total + (section.imageCount ?? 1), 0),
  );
  const gridImages = images.slice(sectionImageLimit);

  return (
    <>
      <SiteHeader currentPath={page.path} />
      <main id="main-content">
        <PageHero page={page} />
        {page.path === "/" ? (
          <>
            <section
              aria-labelledby="presidential-homepage-locator-heading"
              className="bg-po-ink text-po-on-dark"
              id="presidential-homepage-locator"
            >
              <div className="mx-auto w-full max-w-7xl px-[clamp(1.25rem,4vw,4rem)] py-[clamp(3rem,7vw,6rem)]">
                <div className="mb-[clamp(2rem,4vw,3rem)] text-center">
                  <p className="text-xs font-black uppercase text-po-brand">
                    Coast to coast
                  </p>
                  <h2
                    className="mt-2 font-display text-4xl uppercase leading-[0.92] text-po-on-dark sm:text-6xl lg:text-7xl"
                    id="presidential-homepage-locator-heading"
                  >
                    Find Presidential Near You
                  </h2>
                </div>

                <HomepageLocatorConsole layout="stacked" />
              </div>
            </section>

            <section
              aria-label="Nationwide Presidential map"
              className="bg-po-ink px-[clamp(1.25rem,4vw,4rem)] pb-[clamp(3rem,7vw,6rem)] text-po-on-dark"
              id="presidential-homepage-map"
            >
              <div className="mx-auto w-full max-w-7xl">
                <FindUsNationwideVideo />
              </div>
            </section>
          </>
        ) : null}
        {page.path === "/find" ? (
          <section
            aria-label="Find a dispensary"
            className="po-gold-thread-inlay bg-po-ink text-po-on-dark"
            id="presidential-locator-console"
          >
            <div className="mx-auto w-full max-w-7xl px-[clamp(1.25rem,4vw,4rem)] py-[clamp(2rem,4vw,3.5rem)]">
              <Suspense fallback={null}>
                <RetailerLocator />
              </Suspense>
            </div>
          </section>
        ) : null}
        <article className={`publication publication--${page.kind}`}>
          <div className="article-lead">
            {page.intro.map((paragraph, index) => <RichParagraph paragraph={paragraph} key={`intro-${index}`} />)}
          </div>

          <TableOfContents page={page} />

          <div className="article-body">
            {page.sections.map((section) => {
              const count = section.imageCount ?? 1;
              const sectionStart = imageIndex;
              const sectionImages = images.slice(imageIndex, imageIndex + count);
              imageIndex += count;
              return (
                <section className="article-section" id={section.id} key={section.id}>
                  <div className="article-section__copy">
                    <h2>{section.heading}</h2>
                    {section.paragraphs.map((paragraph, index) => <RichParagraph paragraph={paragraph} key={`${section.id}-${index}`} />)}
                    {section.bullets?.length ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
                  </div>
                  {sectionImages.length ? (
                    <div className="article-section__media">
                      {sectionImages.map((image, index) => (
                        <ContentFigure image={image} key={image.productId} priority={sectionStart === 0 && index === 0} />
                      ))}
                    </div>
                  ) : null}
                </section>
              );
            })}
          </div>

          <ProductRoster page={page} />
          <Sources page={page} />
          <LinkDirectory page={page} />
          <ProductCatalogGrid heading={pageCatalogHeadings[page.path]} images={gridImages} />
        </article>
      </main>
      <StructuredData images={images} page={page} />
      <SiteFooter />
    </>
  );
}
