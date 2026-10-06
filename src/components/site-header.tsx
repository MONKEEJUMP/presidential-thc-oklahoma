import { existsSync } from "node:fs";
import { join } from "node:path";

import Image from "next/image";
import Link from "next/link";

import { primaryNavigation } from "@/lib/site";

import { HeaderStoreFinder } from "./header-store-finder";
import { ProductsMenu } from "./products-menu";

const headerNavigation = primaryNavigation.filter(
  (item) => item.href === "/silver" || item.href === "/find",
);

function hasDispensariesRoute() {
  return existsSync(
    join(process.cwd(), "src", "app", "dispensaries", "page.tsx"),
  );
}

export function SiteHeader({ currentPath = "/" }: { currentPath?: string }) {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to the page
      </a>
      <div className="site-header__inner">
        <div className="brand-lockup">
          <Link
            aria-label="Presidential home"
            className="brand-lockup__home"
            href="/"
          >
            <span className="brand-lockup__real" aria-hidden="true">
              THE REAL
            </span>
            <Image
              className="brand-banner"
              src="/images/presidential-banner.webp"
              width={1839}
              height={604}
              sizes="(max-width: 640px) 82px, 116px"
              priority
              alt=""
            />
          </Link>
          <span className="brand-lockup__text">
            <span className="brand-lockup__tagline">
              <span>The Official</span>
              <span>Presidential Site</span>
            </span>
          </span>
        </div>

        <nav className="primary-nav" aria-label="Primary navigation">
          <ProductsMenu currentPath={currentPath} />
          {headerNavigation.map((item) => {
            const current = currentPath === item.href;
            return (
              <Link href={item.href} key={item.href} aria-current={current ? "page" : undefined}>
                {item.label}
              </Link>
            );
          })}
          {hasDispensariesRoute() ? (
            <Link
              href="/dispensaries"
              aria-current={currentPath === "/dispensaries" ? "page" : undefined}
            >
              Dispensaries
            </Link>
          ) : null}
        </nav>

        <HeaderStoreFinder />
      </div>
    </header>
  );
}
