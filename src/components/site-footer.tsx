import Image from "next/image";
import Link from "next/link";

import { STATE } from "@/config/state";
import { footerProductLinks, MAIN_SITE_URL, SITE_NAME } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <Link className="footer-brand" href="/" aria-label={`${SITE_NAME} home`}>
          <Image
            src="/images/presidential-crest.webp"
            width={512}
            height={512}
            sizes="120px"
            alt="Presidential crest"
          />
          <span>
            <strong>{SITE_NAME}</strong>
            <small>The official Presidential site</small>
          </span>
        </Link>

        <nav className="footer-link-block" aria-label="Official Presidential links">
          <p>Official Presidential</p>
          <a href={MAIN_SITE_URL} rel="nofollow">The main site</a>
          <a href={STATE.locatorPath} rel="nofollow">{STATE.name} locator</a>
          {footerProductLinks.map((link) => (
            <a href={link.href} rel="nofollow" key={link.href}>{link.label}</a>
          ))}
        </nav>

        <nav className="footer-site-nav" aria-label={`${STATE.name} site links`}>
          <p>{STATE.name} collection</p>
          <Link href="/moon-rocks">Moon Rocks</Link>
          <Link href="/blunts">Blunts</Link>
          <Link href="/pre-rolls">Pre-Rolls</Link>
          <Link href="/minis">Minis</Link>
          <Link href="/silver">Silver Flavor Series</Link>
          <Link href="/gold">Gold Strain Series</Link>
          <Link href="/rose-gold">Rose Gold Series</Link>
          <Link href="/find">Find Presidential</Link>
          <Link href="/retailers">For retailers</Link>
          <Link href="/oklahoma">{STATE.name} cannabis guide</Link>
          <Link href="/about">About this site</Link>
        </nav>

        <p className="site-footer__legal">
          For licensed patients of legal age. Purchase Presidential only through licensed {STATE.name} retailers.
        </p>
      </div>
    </footer>
  );
}
