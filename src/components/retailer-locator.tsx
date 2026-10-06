"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useId, useMemo, useRef, useState } from "react";

import { STATE } from "@/config/state";

import styles from "./locator-console.module.css";

type SearchPayload =
  | { zip: string }
  | { latitude: number; longitude: number };

type LocatorResult = Readonly<{
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string | null;
  website: string | null;
  distance_miles: number;
}>;

type LocatorApiResponse = Readonly<{ results: readonly LocatorResult[] }>;
type LocatorApiError = Readonly<{ error: string }>;
type LocatorInitialSearch = SearchPayload;

function delay(milliseconds: number) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function isNullablePhone(value: unknown): value is string | null {
  return (
    value === null ||
    (typeof value === "string" && /^\+?[0-9().\s-]{7,24}$/.test(value))
  );
}

function isLocatorResult(value: unknown): value is LocatorResult {
  if (!isRecord(value)) return false;

  return (
    Number.isSafeInteger(value.id) &&
    Number(value.id) > 0 &&
    isNonEmptyString(value.name) &&
    isNonEmptyString(value.address) &&
    isNonEmptyString(value.city) &&
    isNonEmptyString(value.state) &&
    typeof value.zip === "string" &&
    /^\d{5}$/.test(value.zip) &&
    isNullablePhone(value.phone) &&
    (value.website === null || isNonEmptyString(value.website)) &&
    typeof value.distance_miles === "number" &&
    Number.isFinite(value.distance_miles) &&
    value.distance_miles >= 0
  );
}

function parseLocatorApiPayload(
  value: unknown,
): LocatorApiResponse | LocatorApiError | undefined {
  if (!isRecord(value)) return undefined;

  if (typeof value.error === "string" && value.error.trim().length > 0) {
    return { error: value.error };
  }

  if (
    Array.isArray(value.results) &&
    value.results.length <= 25 &&
    value.results.every(
      (result) => isLocatorResult(result) && result.state === STATE.code,
    )
  ) {
    return { results: value.results };
  }

  return undefined;
}

function parseInitialSearch(query: string): LocatorInitialSearch | undefined {
  const params = new URLSearchParams(query);
  const zip = params.get("zip");
  const latitude = params.get("latitude");
  const longitude = params.get("longitude");

  if (zip && /^\d{5}$/.test(zip) && latitude === null && longitude === null) {
    return { zip };
  }

  if (zip !== null || latitude === null || longitude === null) {
    return undefined;
  }

  const parsedLatitude = Number(latitude);
  const parsedLongitude = Number(longitude);
  if (
    !Number.isFinite(parsedLatitude) ||
    !Number.isFinite(parsedLongitude) ||
    parsedLatitude < -90 ||
    parsedLatitude > 90 ||
    parsedLongitude < -180 ||
    parsedLongitude > 180
  ) {
    return undefined;
  }

  return { latitude: parsedLatitude, longitude: parsedLongitude };
}

function LocatorReadout({
  results,
  searching,
  showPhone,
}: {
  readonly results: readonly LocatorResult[];
  readonly searching: boolean;
  readonly showPhone: boolean;
}) {
  return (
    <div className={styles.readout}>
      {searching ? (
        <div
          aria-label="Scanning for nearby retailers"
          className={styles.radar}
          role="status"
        >
          <span className={styles.radarBeam} />
          <span className={styles.radarPing} />
        </div>
      ) : null}

      {!searching && results.length > 0 ? (
        <div>
          <div className={styles.resultsHeading}>
            <p>Signal acquired</p>
            <span>{results.length} locations</span>
          </div>
          <ol className={styles.resultsList}>
            {results.map((result) => (
              <li className={styles.resultCard} key={result.id}>
                <div>
                  <h2>{result.name}</h2>
                  <address>
                    {result.address}
                    <br />
                    {result.city}, {result.state} {result.zip}
                  </address>
                  {showPhone && result.phone ? (
                    <a href={`tel:${result.phone}`}>{result.phone}</a>
                  ) : null}
                </div>
                <span className={styles.distance}>
                  {result.distance_miles.toFixed(1)} MI
                </span>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  );
}

export function RetailerLocator({ showPhone = true }: { readonly showPhone?: boolean }) {
  const searchParams = useSearchParams();
  const query = searchParams?.toString() ?? "";
  const initialSearch = useMemo(() => parseInitialSearch(query), [query]);
  const zipInputId = useId();
  const messageId = useId();
  const [zip, setZip] = useState(() =>
    initialSearch && "zip" in initialSearch ? initialSearch.zip : "",
  );
  const [results, setResults] = useState<readonly LocatorResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [message, setMessage] = useState("");
  const [reducedMotion, setReducedMotion] = useState(false);
  const autoSearchKey = useRef("");
  const inboundSearchKey = useRef("");
  const requestNumber = useRef(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  async function locate(payload: SearchPayload) {
    const currentRequest = ++requestNumber.current;
    setSearching(true);
    setMessage("");
    const request = fetch("/api/retailers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, state: STATE.code }),
    });

    try {
      const [response] = await Promise.all([
        request,
        reducedMotion ? Promise.resolve() : delay(800),
      ]);
      const data = parseLocatorApiPayload(await response.json());
      if (currentRequest !== requestNumber.current) return;
      if (!data) {
        setResults([]);
        setMessage("Locator service is temporarily unavailable.");
      } else if (!response.ok || "error" in data) {
        setResults([]);
        setMessage(
          "error" in data
            ? data.error
            : "Locator service is temporarily unavailable.",
        );
      } else if (data.results.length === 0) {
        setResults([]);
        setMessage("Nearest retailers are unavailable for this location.");
      } else {
        setResults(data.results);
      }
    } catch {
      if (currentRequest === requestNumber.current) {
        setResults([]);
        setMessage("Locator service is temporarily unavailable.");
      }
    } finally {
      if (currentRequest === requestNumber.current) setSearching(false);
    }
  }

  useEffect(() => {
    if (!initialSearch) return;

    if ("zip" in initialSearch) {
      const key = `${STATE.code}:zip:${initialSearch.zip}`;
      if (inboundSearchKey.current === key) return;
      inboundSearchKey.current = key;
      autoSearchKey.current = "";
      setZip(initialSearch.zip);
      setMessage("");
      return;
    }

    const key = `${STATE.code}:coords:${initialSearch.latitude}:${initialSearch.longitude}`;
    if (inboundSearchKey.current === key) return;
    inboundSearchKey.current = key;
    void locate(initialSearch);
    // locate is intentionally keyed by the validated inbound search values.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSearch]);

  useEffect(() => {
    const key = `${STATE.code}:${zip}`;
    if (zip.length !== 5 || autoSearchKey.current === key) return;
    const timer = window.setTimeout(() => {
      autoSearchKey.current = key;
      void locate({ zip });
    }, 120);
    return () => window.clearTimeout(timer);
    // locate is intentionally keyed by the stable search inputs only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zip]);

  function submitZip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^\d{5}$/.test(zip)) {
      setMessage("Enter a valid five-digit ZIP code.");
      return;
    }
    autoSearchKey.current = `${STATE.code}:${zip}`;
    void locate({ zip });
  }

  function useLocation() {
    setMessage("");
    if (!("geolocation" in navigator)) {
      setMessage("Location is unavailable. Enter a ZIP code instead.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        void locate({
          latitude: coords.latitude,
          longitude: coords.longitude,
        }),
      () =>
        setMessage(
          "Location permission was not available. Enter a ZIP code instead.",
        ),
      { enableHighAccuracy: false, maximumAge: 300000, timeout: 10000 },
    );
  }

  function clearFinder() {
    requestNumber.current += 1;
    autoSearchKey.current = "";
    setZip("");
    setResults([]);
    setSearching(false);
    setMessage("");
  }

  return (
    <div>
      <div className={styles.controlGrid}>
        <div className={styles.console}>
          <form className={styles.searchForm} onSubmit={submitZip}>
            <label htmlFor={zipInputId}>ENTER YOUR ZIP CODE HERE</label>
            <div className={styles.inputRow}>
              <input
                aria-describedby={messageId}
                autoComplete="postal-code"
                id={zipInputId}
                inputMode="numeric"
                maxLength={5}
                onChange={(event) => {
                  setZip(event.target.value.replace(/\D/g, "").slice(0, 5));
                  setMessage("");
                }}
                pattern="[0-9]{5}"
                placeholder="00000"
                type="text"
                value={zip}
              />
              <button
                aria-label="Go — search dispensaries"
                disabled={searching}
                type="submit"
              >
                GO!
              </button>
            </div>
          </form>

          <div className={styles.actionRow}>
            <button
              className={styles.locationButton}
              onClick={clearFinder}
              type="button"
            >
              Clear
            </button>
            <button
              className={styles.locationButton}
              disabled={searching}
              onClick={useLocation}
              type="button"
            >
              Use My Location
            </button>
          </div>

          <p className={styles.repeatCta}>ENTER YOUR ZIP CODE HERE</p>

          <p aria-live="polite" className={styles.message} id={messageId}>
            {message}
          </p>
        </div>

        <LocatorReadout results={results} searching={searching} showPhone={showPhone} />
      </div>
    </div>
  );
}
