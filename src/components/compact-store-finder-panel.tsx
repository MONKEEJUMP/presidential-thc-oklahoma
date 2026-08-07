"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useId, useState } from "react";

type CompactStoreFinderPanelProps = {
  readonly onRoute?: () => void;
};

export function LocationPin({ className = "" }: { readonly className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d="M12 21s6-5.15 6-11a6 6 0 1 0-12 0c0 5.85 6 11 6 11Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.25"
      />
      <circle cx="12" cy="10" r="2.25" stroke="currentColor" strokeWidth="2.25" />
    </svg>
  );
}

export function CompactStoreFinderPanel({ onRoute }: CompactStoreFinderPanelProps) {
  const router = useRouter();
  const inputId = useId();
  const messageId = useId();
  const [zip, setZip] = useState("");
  const [message, setMessage] = useState("");
  const [locating, setLocating] = useState(false);

  function routeToFinder(params: URLSearchParams) {
    params.set("state", "OK");
    setMessage("");
    onRoute?.();
    router.push(`/find?${params.toString()}#retailer-locator`);
  }

  function submitZip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^\d{5}$/.test(zip)) {
      setMessage("Enter a valid five-digit ZIP code.");
      return;
    }

    routeToFinder(new URLSearchParams({ zip }));
  }

  function useLocation() {
    setMessage("");
    if (!("geolocation" in navigator)) {
      setMessage("Location is unavailable. Enter a ZIP code instead.");
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocating(false);
        routeToFinder(
          new URLSearchParams({
            lat: coords.latitude.toFixed(6),
            lng: coords.longitude.toFixed(6),
          }),
        );
      },
      () => {
        setLocating(false);
        setMessage("Location permission was not available. Enter a ZIP code instead.");
      },
      { enableHighAccuracy: false, maximumAge: 300_000, timeout: 10_000 },
    );
  }

  return (
    <div aria-label="Find a Presidential store" className="compact-store-finder" role="region">
      <form className="compact-store-finder__form" noValidate onSubmit={submitZip}>
        <p className="compact-store-finder__eyebrow">BUY PRESIDENTIAL @ YOUR LOCAL DISPO</p>
        <label className="sr-only" htmlFor={inputId}>
          ZIP code
        </label>
        <div className="compact-store-finder__input-row">
          <input
            aria-describedby={messageId}
            autoComplete="postal-code"
            id={inputId}
            inputMode="numeric"
            maxLength={5}
            onChange={(event) => {
              setZip(event.target.value.replace(/\D/g, "").slice(0, 5));
              setMessage("");
            }}
            pattern="[0-9]{5}"
            placeholder="ENTER YOUR ZIP CODE HERE"
            type="text"
            value={zip}
          />
          <button type="submit">GO</button>
        </div>
      </form>

      <button
        className="compact-store-finder__location"
        disabled={locating}
        onClick={useLocation}
        type="button"
      >
        <LocationPin className="compact-store-finder__pin" />
        {locating ? "Locating..." : "Use My Location"}
      </button>

      <p aria-live="polite" className="compact-store-finder__message" id={messageId}>
        {message}
      </p>
    </div>
  );
}
