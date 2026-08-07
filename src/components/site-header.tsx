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
            className="brand-banner"
            src="/images/presidential-banner.webp"
            width={1839}
            height={604}
            sizes="(max-width: 640px) 82px, 116px"
            priority
            alt="Presidential"
          />
          <span className="brand-lockup__text">
            <span className="brand-lockup__name">Presidential THC Oklahoma</span>
            <span className="brand-lockup__tagline">The Official Presidential Site</span>
          </span>
        </Link>

        <Link className="store-header-link" href="/find" aria-label="Find a store in Oklahoma">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M12 22s7-6.1 7-13a7 7 0 1 0-14 0c0 6.9 7 13 7 13Z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          <span className="store-header-link__text">FIND A STORE</span>
        </Link>

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

        <a
          className="official-header-link"
          href={MAIN_SITE_URL}
          rel="nofollow"
          aria-label="Official Presidential"
        >
          <span className="official-header-link__label" aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
