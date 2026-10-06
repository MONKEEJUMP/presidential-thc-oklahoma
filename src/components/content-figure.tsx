import Image from "next/image";

import type { ContentImage } from "@/content/types";

export function ContentFigure({ image, priority = false }: { image: ContentImage; priority?: boolean }) {
  return (
    <figure className="content-figure">
      <Image
        className="content-figure__image"
        src={image.portraitSrc}
        width={image.portraitWidth}
        height={image.portraitHeight}
        sizes="(max-width: 767px) 92vw, (max-width: 1199px) 42vw, 500px"
        alt={image.alt}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
      />
    </figure>
  );
}
