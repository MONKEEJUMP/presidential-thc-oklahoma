"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

const productLinks = [
  { href: "/moon-rocks", label: "Moon Rocks" },
  { href: "/blunts", label: "Blunts" },
  { href: "/pre-rolls", label: "Pre-Rolls" },
  { href: "/minis", label: "Minis" },
] as const;

export function ProductsMenu({ currentPath }: { currentPath: string }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const current = productLinks.some(
    (item) =>
      currentPath === item.href || currentPath.startsWith(`${item.href}/`),
  );

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className="products-menu" ref={rootRef}>
      <button
        aria-controls={menuId}
        aria-expanded={open}
        aria-haspopup="true"
        className="products-menu__trigger"
        data-current={current ? "true" : undefined}
        onClick={() => setOpen((value) => !value)}
        ref={triggerRef}
        type="button"
      >
        <span>Products</span>
        <span aria-hidden="true">&#9662;</span>
      </button>
      <div className="products-menu__panel" hidden={!open} id={menuId}>
        {productLinks.map((item) => (
          <Link
            aria-current={
              currentPath === item.href ||
              currentPath.startsWith(`${item.href}/`)
                ? "page"
                : undefined
            }
            href={item.href}
            key={item.href}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
