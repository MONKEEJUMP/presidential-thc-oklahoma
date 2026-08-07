import Image from "next/image";
import Link from "next/link";
import { Fragment, Suspense } from "react";

import type { ContentImage, ContentParagraph, PageContent } from "@/content/types";
import { absoluteUrl, escapeJsonLd, imageUrl, SITE_URL } from "@/lib/site";

import { ContentFigure } from "./content-figure";
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
      <header className="find-page-hero">
        <Image
          className="find-page-hero__image"
          src="/images/ok-hero.webp"
          fill
          sizes="100vw"
          priority
          alt="Oklahoma landscape beneath a wide evening sky"
        />
        <div className="find-page-hero__top-scrim" aria-hidden="true" />
        <div className="find-page-hero__bottom-scrim" aria-hidden="true" />
        <div className="find-page-hero__content">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">{page.h1}</span>
          </nav>
          <h1>{page.h1}</h1>
          <p>{page.description}</p>
        </div>
      </header>
    );
  }

  if (page.kind === "pillar") {
    return (
      <header className="home-hero">
        <Image
          className="home-hero__image"
          src="/images/ok-hero.webp"
          fill
          sizes="100vw"
          priority
          alt="Oklahoma landscape beneath a wide evening sky"
        />
        <div className="home-hero__overlay" aria-hidden="true" />
        <div className="home-hero__content">
          <p className="home-hero__eyebrow">THE OFFICIAL</p>
          <h1>{page.h1}</h1>
          <p className="home-hero__line">The Sooner The Better. A Presidential High.</p>
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
    <aside className="link-directory" aria-label="Continue through the Oklahoma reference">
      {page.childLinks?.length ? (
        <section>
          <p className="link-directory__label">The full Oklahoma reference</p>
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
      alternateName: "Presidential THC Oklahoma",
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

  return (
    <>
      <SiteHeader currentPath={page.path} />
      <main id="main-content">
        <PageHero page={page} />
        <article className={`publication publication--${page.kind}`}>
          {page.path === "/find" ? (
            <Suspense fallback={null}>
              <RetailerLocator />
            </Suspense>
          ) : null}

          <div className="article-lead">
            {page.intro.map((paragraph, index) => <RichParagraph paragraph={paragraph} key={`intro-${index}`} />)}
          </div>

          <TableOfContents page={page} />

          <div className="article-body">
            {page.sections.map((section) => {
              const count = section.imageCount ?? 1;
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
                      {sectionImages.map((image) => <ContentFigure image={image} key={image.src} />)}
                    </div>
                  ) : null}
                </section>
              );
            })}
          </div>

          <ProductRoster page={page} />
          <Sources page={page} />
          <LinkDirectory page={page} />
        </article>
      </main>
      <StructuredData images={images} page={page} />
      <SiteFooter />
    </>
  );
}
