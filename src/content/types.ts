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
  page: string;
  filename: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  productHref: string;
};
