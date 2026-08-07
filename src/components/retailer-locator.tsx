"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

type Retailer = {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  latitude: number | null;
  longitude: number | null;
  distance: number | null;
};

type SearchState = "idle" | "loading" | "success" | "empty" | "error";
type SearchPayload =
  | { zip: string }
  | { latitude: number; longitude: number };

export function RetailerLocator() {
  const searchParams = useSearchParams();
  const inboundSearch = searchParams.toString();
  const inboundSearchKey = useRef("");
  const [zip, setZip] = useState("");
  const [count, setCount] = useState(194);
  const [results, setResults] = useState<Retailer[]>([]);
  const [searchState, setSearchState] = useState<SearchState>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadCount() {
      try {
        const response = await fetch("/api/retailers?mode=count", {
          signal: controller.signal,
        });
        const payload = (await response.json()) as { count?: number };
        if (response.ok && Number.isFinite(payload.count)) {
          setCount(Number(payload.count));
        }
      } catch {
        // Keep the verified Oklahoma count visible if the live request is interrupted.
      }
    }

    void loadCount();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!inboundSearch || inboundSearchKey.current === inboundSearch) return;
    inboundSearchKey.current = inboundSearch;

    const params = new URLSearchParams(inboundSearch);
    const requestedState = params.get("state");
    if (requestedState && requestedState !== "OK") return;

    const inboundZip = params.get("zip") ?? "";
    if (/^\d{5}$/.test(inboundZip)) {
      setZip(inboundZip);
      void runSearch(
        { zip: inboundZip },
        "Searching verified Oklahoma retailers…",
      );
      return;
    }

    const rawLat = params.get("lat");
    const rawLng = params.get("lng");
    if (rawLat === null || rawLng === null) return;

    const lat = Number(rawLat);
    const lng = Number(rawLng);
    if (
      Number.isFinite(lat) &&
      Number.isFinite(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    ) {
      void runSearch(
        { latitude: lat, longitude: lng },
        "Finding retailers near your current location…",
      );
    }
    // runSearch is intentionally keyed by the validated URL search string.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inboundSearch]);

  async function runSearch(payload: SearchPayload, loadingMessage: string) {
    setSearchState("loading");
    setMessage(loadingMessage);
    setResults([]);

    try {
      const response = await fetch("/api/retailers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, state: "OK", limit: 25 }),
      });
      const payload = (await response.json()) as {
        results?: Retailer[];
        error?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error || "The retailer search is temporarily unavailable.");
      }

      const nearest = Array.isArray(payload.results)
        ? [...payload.results].sort(
            (left, right) =>
              (left.distance ?? Number.POSITIVE_INFINITY) -
              (right.distance ?? Number.POSITIVE_INFINITY),
          )
        : [];

      setResults(nearest);
      if (nearest.length === 0) {
        setSearchState("empty");
        setMessage(
          "No nearby retailers appeared for that search yet. Try a neighboring Oklahoma ZIP to widen the search.",
        );
      } else {
        setSearchState("success");
        setMessage(`${nearest.length} nearby retailer${nearest.length === 1 ? "" : "s"} found.`);
      }
    } catch (error) {
      setSearchState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "The retailer locator could not connect. Please try again shortly.",
      );
    }
  }

  function submitZip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = zip.trim();

    if (!/^\d{5}$/.test(normalized)) {
      setSearchState("error");
      setResults([]);
      setMessage("Enter a valid five-digit ZIP code to search Oklahoma.");
      return;
    }

    void runSearch(
      { zip: normalized },
      "Searching verified Oklahoma retailers…",
    );
  }

  function useLocation() {
    if (!navigator.geolocation) {
      setSearchState("error");
      setMessage("Location access is not available in this browser. Search by ZIP instead.");
      return;
    }

    setSearchState("loading");
    setResults([]);
    setMessage("Finding retailers near your current location…");

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        void runSearch(
          { latitude: coords.latitude, longitude: coords.longitude },
          "Finding retailers near your current location…",
        );
      },
      () => {
        setSearchState("error");
        setMessage("We could not access your location. Search by Oklahoma ZIP instead.");
      },
      { enableHighAccuracy: false, timeout: 10_000, maximumAge: 300_000 },
    );
  }

  function clearSearch() {
    setZip("");
    setResults([]);
    setSearchState("idle");
    setMessage("");
  }

  const busy = searchState === "loading";

  return (
    <section className="retailer-locator" aria-labelledby="retailer-locator-title" id="retailer-locator">
      <div className="retailer-locator__masthead">
        <div>
          <p className="retailer-locator__eyebrow">VERIFIED LICENSED RETAIL</p>
          <h2 id="retailer-locator-title">FIND PRESIDENTIAL IN OKLAHOMA</h2>
        </div>
        <p className="retailer-locator__count">
          <strong>{count}</strong> LIVE RETAILER DOORS
        </p>
      </div>

      <div className="retailer-locator__rule" aria-hidden="true" />

      <p className="retailer-locator__form-title">SEARCH OKLAHOMA</p>
      <div className="retailer-locator__control-grid">
        <div className="retailer-locator__console">
          <form className="retailer-locator__form" onSubmit={submitZip} aria-busy={busy}>
            <label htmlFor="retailer-zip">ENTER YOUR ZIP CODE HERE</label>
            <div className="retailer-locator__search-row">
              <input
                id="retailer-zip"
                value={zip}
                onChange={(event) => {
                  setZip(event.target.value.replace(/\D/g, "").slice(0, 5));
                  setMessage("");
                }}
                placeholder="00000"
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={5}
                disabled={busy}
              />
              <button className="retailer-locator__go" type="submit" disabled={busy} aria-label="Go — search dispensaries">
                GO!
              </button>
            </div>
          </form>

          <div className="retailer-locator__actions">
            <button type="button" onClick={clearSearch} disabled={busy}>
              CLEAR
            </button>
            <button type="button" onClick={useLocation} disabled={busy}>
              USE MY LOCATION
            </button>
          </div>

          <p className="retailer-locator__repeat">ENTER YOUR ZIP CODE HERE</p>
          <div className="retailer-locator__feedback" aria-live="polite">
            {message ? <p>{message}</p> : null}
          </div>
        </div>

        <div className="retailer-results">
          {busy ? (
            <div className="retailer-results__radar" aria-label="Scanning for nearby retailers" role="status">
              <span className="retailer-results__beam" />
              <span className="retailer-results__ping" />
            </div>
          ) : null}

          {!busy && results.length > 0 ? (
            <>
              <div className="retailer-results__heading">
                <p>SIGNAL ACQUIRED</p>
                <span>{results.length} LOCATIONS</span>
              </div>
              <ol>
                {results.map((retailer, index) => (
                  <li key={`${retailer.name}-${retailer.address}-${index}`}>
                    <div>
                      <h3>{retailer.name}</h3>
                      <address>
                        {retailer.address}
                        <br />
                        {retailer.city}, {retailer.state} {retailer.zip}
                      </address>
                    </div>
                    <span className="retailer-results__distance">
                      {retailer.distance === null ? "NEARBY" : `${retailer.distance.toFixed(1)} MI`}
                    </span>
                  </li>
                ))}
              </ol>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
