import manifest from "./assets.json";

import type { ContentImage } from "./types";

type ManifestImage = Omit<ContentImage, "src"> & { source: string };

export const allProductImages: ContentImage[] = (manifest as ManifestImage[]).map(
  ({ source: _source, ...image }) => ({
    ...image,
    src: `/images/products/${image.filename}`,
  }),
);

export const pageImages = allProductImages.reduce<Record<string, ContentImage[]>>(
  (pages, image) => {
    pages[image.page] ??= [];
    pages[image.page].push(image);
    return pages;
  },
  {},
);
