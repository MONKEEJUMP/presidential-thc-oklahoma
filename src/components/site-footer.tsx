import Image from "next/image";
import Link from "next/link";

import { footerProductLinks, MAIN_SITE_URL } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <Link className="footer-brand" href="/" aria-label="Presidential THC Oklahoma home">
          <Image
            src="/images/presidential-crest.webp"
            width={512}
            height={512}
            sizes="120px"
            alt="Presidential crest"
          />
          <span>
            <strong>Presidential THC Oklahoma</strong>
            <small>The official Presidential site</small>
          </span>
        </Link>

        <nav className="footer-link-block" aria-label="Official Presidential links">
          <p>Official Presidential</p>
          <a href={MAIN_SITE_URL} rel="nofollow">The main site</a>
          <a href={`${MAIN_SITE_URL}/find-us/ok`} rel="nofollow">Oklahoma locator</a>
          {footerProductLinks.map((link) => (
            <a href={link.href} rel="nofollow" key={link.href}>{link.label}</a>
          ))}
        </nav>

        <nav className="footer-site-nav" aria-label="Oklahoma site links">
          <p>Oklahoma collection</p>
          <Link href="/moon-rocks">Moon Rocks</Link>
          <Link href="/blunts">Blunts</Link>
          <Link href="/pre-rolls">Pre-Rolls</Link>
          <Link href="/minis">Minis</Link>
          <Link href="/silver">Silver Flavor Series</Link>
          <Link href="/gold">Gold Strain Series</Link>
          <Link href="/rose-gold">Rose Gold Series</Link>
          <Link href="/find">Find Presidential</Link>
          <Link href="/retailers">For retailers</Link>
          <Link href="/oklahoma">Oklahoma cannabis guide</Link>
          <Link href="/about">About this site</Link>
        </nav>

        <p className="site-footer__legal">
          For licensed patients of legal age. Purchase Presidential only through licensed Oklahoma retailers.
        </p>
      </div>
    </footer>
  );
}
