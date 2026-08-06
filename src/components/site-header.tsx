import Image from "next/image";
import Link from "next/link";

import { MAIN_SITE_URL, primaryNavigation } from "@/lib/site";

export function SiteHeader({ currentPath = "/" }: { currentPath?: string }) {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to the page
      </a>
      <div className="site-header__inner">
        <Link className="brand-lockup" href="/" aria-label="Presidential THC Oklahoma home">
          <Image
            className="brand-crest"
            src="/images/presidential-crest.webp"
            width={512}
            height={512}
            sizes="(max-width: 640px) 62px, 78px"
            priority
            alt="Presidential crest"
          />
          <span className="brand-lockup__text">
            <span className="brand-lockup__name">Presidential THC Oklahoma</span>
            <span className="brand-lockup__tagline">The Official Presidential Site</span>
          </span>
        </Link>

        <a className="official-header-link" href={MAIN_SITE_URL} rel="nofollow">
          <span className="official-header-link__full">Official </span>
          Presidential <span aria-hidden="true">↗</span>
        </a>

        <nav className="primary-nav" aria-label="Primary navigation">
          {primaryNavigation.map((item) => {
            const current = currentPath === item.href;
            return (
              <Link href={item.href} key={item.href} aria-current={current ? "page" : undefined}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
