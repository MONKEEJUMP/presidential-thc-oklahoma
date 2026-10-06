"use client";

import Link from "next/link";
import { MouseEvent, useEffect, useId, useRef, useState } from "react";

import { STATE } from "@/config/state";

import { CompactStoreFinderPanel, LocationPin } from "./compact-store-finder-panel";

const HOVER_INTENT_MS = 150;
const HOVER_CLOSE_DELAY_MS = 180;

export function HeaderStoreFinder() {
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const focusInputOnOpenRef = useRef(false);
  const panelOwnsFocusRef = useRef(false);
  const hoverOpenTimer = useRef<number | null>(null);
  const hoverCloseTimer = useRef<number | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const focusFrame = focusInputOnOpenRef.current
      ? window.requestAnimationFrame(() =>
          panelRef.current?.querySelector<HTMLInputElement>("input")?.focus(),
        )
      : null;
    const dismissOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        panelOwnsFocusRef.current = false;
        setOpen(false);
      }
    };
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      panelOwnsFocusRef.current = false;
      setOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener("pointerdown", dismissOutside);
    window.addEventListener("keydown", dismissOnEscape);
    return () => {
      if (focusFrame !== null) window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("pointerdown", dismissOutside);
      window.removeEventListener("keydown", dismissOnEscape);
    };
  }, [open]);

  useEffect(
    () => () => {
      if (hoverOpenTimer.current) window.clearTimeout(hoverOpenTimer.current);
      if (hoverCloseTimer.current) window.clearTimeout(hoverCloseTimer.current);
    },
    [],
  );

  function canHover() {
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }

  function keepHoverOpen() {
    if (hoverCloseTimer.current) {
      window.clearTimeout(hoverCloseTimer.current);
      hoverCloseTimer.current = null;
    }
  }

  function scheduleHoverOpen() {
    if (!canHover()) return;
    keepHoverOpen();
    if (hoverOpenTimer.current) window.clearTimeout(hoverOpenTimer.current);
    hoverOpenTimer.current = window.setTimeout(() => {
      hoverOpenTimer.current = null;
      focusInputOnOpenRef.current = false;
      setOpen(true);
    }, HOVER_INTENT_MS);
  }

  function scheduleHoverClose() {
    if (!canHover() || panelOwnsFocusRef.current) return;
    if (hoverOpenTimer.current) {
      window.clearTimeout(hoverOpenTimer.current);
      hoverOpenTimer.current = null;
    }
    if (hoverCloseTimer.current) window.clearTimeout(hoverCloseTimer.current);
    hoverCloseTimer.current = window.setTimeout(() => {
      hoverCloseTimer.current = null;
      if (!panelOwnsFocusRef.current) setOpen(false);
    }, HOVER_CLOSE_DELAY_MS);
  }

  function togglePanel(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    if (hoverOpenTimer.current) {
      window.clearTimeout(hoverOpenTimer.current);
      hoverOpenTimer.current = null;
    }
    keepHoverOpen();
    panelOwnsFocusRef.current = false;
    focusInputOnOpenRef.current = !open;
    setOpen((current) => !current);
  }

  function closeForRoute() {
    panelOwnsFocusRef.current = false;
    setOpen(false);
  }

  return (
    <div
      className="header-store-finder"
      onMouseEnter={keepHoverOpen}
      onMouseLeave={scheduleHoverClose}
      ref={rootRef}
    >
      <Link
        aria-controls={panelId}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={`Find a store in ${STATE.name}`}
        className="store-header-link"
        href="/find"
        onClick={togglePanel}
        onMouseEnter={scheduleHoverOpen}
        ref={triggerRef}
      >
        <LocationPin />
        <span className="store-header-link__text">FIND A STORE</span>
      </Link>

      {open ? (
        <div
          aria-label="Find a Presidential store"
          className="header-store-finder__panel"
          id={panelId}
          role="dialog"
        >
          <div
            onFocus={() => {
              panelOwnsFocusRef.current = true;
              keepHoverOpen();
            }}
            ref={panelRef}
          >
            <CompactStoreFinderPanel onRoute={closeForRoute} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
