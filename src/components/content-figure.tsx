import Image from "next/image";

import type { ContentImage } from "@/content/types";

function Ornament({ className, id }: { className: string; id: string }) {
  return (
    <svg aria-hidden="true" className={className} focusable="false" viewBox="0 0 200 20">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F4E3A1" />
          <stop offset="0.52" stopColor="#D4B96A" />
          <stop offset="1" stopColor="#8F6B24" />
        </linearGradient>
      </defs>
      <g fill={`url(#${id})`}>
        <polygon points="100,5 104,10 100,15 96,10" />
        <polygon points="57,6 61,10 57,14 53,10" />
        <polygon points="143,6 147,10 143,14 139,10" />
        <polygon points="17,7 20,10 17,13 14,10" />
        <polygon points="7,7 10,10 7,13 4,10" />
        <polygon points="183,7 186,10 183,13 180,10" />
        <polygon points="193,7 196,10 193,13 190,10" />
      </g>
      <g fill="none" stroke={`url(#${id})`} strokeWidth="1.5" vectorEffect="non-scaling-stroke">
        <polygon points="91,10 77,7 63,10 77,13" />
        <polygon points="109,10 123,7 137,10 123,13" />
        <polygon points="51,10 38,7.5 25,10 38,12.5" />
        <polygon points="149,10 162,7.5 175,10 162,12.5" />
      </g>
    </svg>
  );
}

export function ContentFigure({ image, priority = false }: { image: ContentImage; priority?: boolean }) {
  const id = image.filename.replace(/[^a-z0-9-]/g, "");
  return (
    <figure className="content-figure">
      <a className="content-figure__link" href={image.productHref} aria-label={`View ${image.alt} on the official Presidential site`}>
        <Image
          className="content-figure__image"
          src={image.src}
          width={image.width}
          height={image.height}
          sizes="(max-width: 767px) 92vw, (max-width: 1199px) 42vw, 500px"
          alt={image.alt}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
        <span className="content-figure__frame" aria-hidden="true">
          <svg className="content-figure__rule" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`${id}-rule`} x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#F4E3A1" />
                <stop offset="0.52" stopColor="#D4B96A" />
                <stop offset="1" stopColor="#8F6B24" />
              </linearGradient>
            </defs>
            <rect x="0.75" y="0.75" width="98.5" height="98.5" fill="none" stroke={`url(#${id}-rule)`} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          </svg>
          <Ornament className="content-figure__ornament content-figure__ornament--top" id={`${id}-top`} />
          <Ornament className="content-figure__ornament content-figure__ornament--bottom" id={`${id}-bottom`} />
        </span>
      </a>
    </figure>
  );
}
