export type PageKind = "pillar" | "article" | "about" | "timeline";

export type InlinePart = {
  text: string;
  href?: string;
};

export type ContentParagraph = string | InlinePart[];

export type SourceLink = {
  label: string;
  href: string;
};

export type PageLink = {
  href: string;
  label: string;
  description?: string;
};

export type ContentSection = {
  id: string;
  heading: string;
  paragraphs: ContentParagraph[];
  bullets?: string[];
  imageCount?: number;
};

export type PageContent = {
  path: string;
  kind: PageKind;
  h1: string;
  title: string;
  description: string;
  intro: ContentParagraph[];
  sections: ContentSection[];
  productRoster?: PageLink[];
  childLinks?: PageLink[];
  relatedLinks?: PageLink[];
  sources: SourceLink[];
};

export type ContentImage = {
  productId: string;
  page: string;
  filename: string;
  portraitFilename: string;
  src: string;
  portraitSrc: string;
  width: number;
  height: number;
  portraitWidth: number;
  portraitHeight: number;
  alt: string;
  productHref: string;
};

export type CatalogProduct = {
  id: string;
  name: string;
  slug: string;
  format: "moon-rock" | "blunt" | "pre-roll" | "mini";
  series: "silver" | "gold" | "rose-gold" | null;
  variant: number;
  squareFilename: string;
  portraitFilename: string;
  productHref: string;
  liveStatus: number;
  liveTitle: string;
};

export type PageImagePlan = {
  page: string;
  heading: string;
  productIds: string[];
};
