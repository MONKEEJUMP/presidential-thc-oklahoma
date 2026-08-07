"use client";

import { FormEvent, useEffect, useState } from "react";

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

export function RetailerLocator() {
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
        // Keep the verified launch count visible if the live request is interrupted.
      }
    }

    void loadCount();
    return () => controller.abort();
  }, []);

  async function runSearch(path: string, loadingMessage: string) {
    setSearchState("loading");
    setMessage(loadingMessage);
    setResults([]);

    try {
      const response = await fetch(path);
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
      `/api/retailers?zip=${encodeURIComponent(normalized)}&limit=25`,
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
          `/api/retailers?lat=${encodeURIComponent(coords.latitude)}&lng=${encodeURIComponent(coords.longitude)}&limit=25`,
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
    <section className="retailer-locator" aria-labelledby="retailer-locator-title">
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

      <form className="retailer-locator__form" onSubmit={submitZip} aria-busy={busy}>
        <p className="retailer-locator__form-title">SEARCH OKLAHOMA</p>
        <label htmlFor="retailer-zip">ENTER YOUR ZIP CODE HERE</label>
        <div className="retailer-locator__search-row">
          <input
            id="retailer-zip"
            value={zip}
            onChange={(event) => setZip(event.target.value.replace(/\D/g, "").slice(0, 5))}
            placeholder="00000"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            disabled={busy}
          />
          <button className="retailer-locator__go" type="submit" disabled={busy}>
            GO!
          </button>
        </div>
        <div className="retailer-locator__actions">
          <button type="button" onClick={clearSearch} disabled={busy}>
            CLEAR
          </button>
          <button type="button" onClick={useLocation} disabled={busy}>
            USE MY LOCATION
          </button>
        </div>
      </form>

      <div className="retailer-locator__feedback" aria-live="polite">
        {message ? <p>{message}</p> : null}
      </div>

      {results.length > 0 ? (
        <div className="retailer-results">
          <h3>NEAREST VERIFIED RETAILERS</h3>
          <ol>
            {results.map((retailer, index) => (
              <li key={`${retailer.name}-${retailer.address}-${index}`}>
                <div>
                  <h4>{retailer.name}</h4>
                  <address>
                    {retailer.address}
                    <br />
                    {retailer.city}, {retailer.state} {retailer.zip}
                  </address>
                </div>
                <p className="retailer-results__distance">
                  {retailer.distance === null ? "NEARBY" : `${retailer.distance.toFixed(1)} mi`}
                </p>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </section>
  );
}
