import Image from "next/image";
import Link from "next/link";

import { STATE } from "@/config/state";
import { MAIN_SITE_URL, primaryNavigation, SITE_NAME } from "@/lib/site";

import { HeaderStoreFinder } from "./header-store-finder";

export function SiteHeader({ currentPath = "/" }: { currentPath?: string }) {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to the page
      </a>
      <div className="site-header__inner">
        <Link className="brand-lockup" href="/" aria-label={`${SITE_NAME} home`}>
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
            <span className="brand-lockup__name">{SITE_NAME}</span>
            <span className="brand-lockup__tagline">The Official Presidential Site</span>
          </span>
        </Link>

        <HeaderStoreFinder />

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
          data-state={STATE.code}
        >
          <span className="official-header-link__label" aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
