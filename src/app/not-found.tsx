import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return <><SiteHeader /><main className="not-found" id="main-content"><p className="not-found__code">404</p><h1>This Oklahoma page is not on the shelf.</h1><p>Return to the official Oklahoma reference and keep exploring Presidential.</p><Link className="button-link" href="/">Presidential THC Oklahoma</Link></main><SiteFooter /></>;
}
