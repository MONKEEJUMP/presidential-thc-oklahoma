import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const SEARCH_UPSTREAM =
  "https://presidentialmoonrocks.com/api/dispensaries/search";
const COUNT_UPSTREAM =
  "https://presidentialmoonrocks.com/api/dispensaries?state=OK";
const REQUEST_TIMEOUT_MS = 8_000;

type UpstreamRetailer = {
  name?: unknown;
  address?: unknown;
  city?: unknown;
  state?: unknown;
  zip?: unknown;
  latitude?: unknown;
  longitude?: unknown;
  distance?: unknown;
};

function json(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

function finiteNumber(value: string | null) {
  if (value === null || value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function safeText(value: unknown) {
  return typeof value === "string" ? value : "";
}

function safeNumber(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function sanitizeRetailer(record: UpstreamRetailer) {
  return {
    name: safeText(record.name),
    address: safeText(record.address),
    city: safeText(record.city),
    state: safeText(record.state),
    zip: safeText(record.zip),
    latitude: safeNumber(record.latitude),
    longitude: safeNumber(record.longitude),
    distance: safeNumber(record.distance),
  };
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  try {
    if (params.get("mode") === "count") {
      const upstream = await fetch(COUNT_UPSTREAM, {
        cache: "no-store",
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });

      if (!upstream.ok) {
        return json({ error: "The live retailer count is temporarily unavailable." }, 502);
      }

      const payload = (await upstream.json()) as {
        state?: unknown;
        count?: unknown;
      };
      const count = safeNumber(payload.count);

      if (count === null) {
        return json({ error: "The live retailer count is temporarily unavailable." }, 502);
      }

      return json({ state: "OK", count });
    }

    if (params.has("offset")) {
      return json({ error: "Offset paging is not supported." }, 400);
    }

    const zip = params.get("zip")?.trim() ?? "";
    const lat = finiteNumber(params.get("lat"));
    const lng = finiteNumber(params.get("lng"));
    const hasZip = zip.length > 0;
    const hasCoordinates = lat !== null || lng !== null;

    if (hasZip === hasCoordinates) {
      return json({ error: "Enter an Oklahoma ZIP code or share your location." }, 400);
    }

    if (hasZip && !/^\d{5}$/.test(zip)) {
      return json({ error: "Enter a valid five-digit ZIP code." }, 400);
    }

    if (
      hasCoordinates &&
      (lat === null || lng === null || lat < -90 || lat > 90 || lng < -180 || lng > 180)
    ) {
      return json({ error: "A valid latitude and longitude are required." }, 400);
    }

    const requestedLimit = finiteNumber(params.get("limit"));
    const limit = Math.min(25, Math.max(1, Math.trunc(requestedLimit ?? 10)));
    const upstreamUrl = new URL(SEARCH_UPSTREAM);
    upstreamUrl.searchParams.set("state", "OK");
    upstreamUrl.searchParams.set("limit", String(limit));

    if (hasZip) {
      upstreamUrl.searchParams.set("zip", zip);
    } else {
      upstreamUrl.searchParams.set("lat", String(lat));
      upstreamUrl.searchParams.set("lng", String(lng));
    }

    const upstream = await fetch(upstreamUrl, {
      cache: "no-store",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!upstream.ok) {
      const status = upstream.status === 429 ? 429 : 502;
      const error =
        upstream.status === 429
          ? "The locator is busy right now. Please try again in a moment."
          : "The retailer search is temporarily unavailable.";
      return json({ error }, status);
    }

    const payload = (await upstream.json()) as { results?: unknown };
    const records = Array.isArray(payload.results) ? payload.results : [];
    const results = records
      .filter((record): record is UpstreamRetailer => Boolean(record && typeof record === "object"))
      .map(sanitizeRetailer)
      .sort((left, right) => (left.distance ?? Number.POSITIVE_INFINITY) - (right.distance ?? Number.POSITIVE_INFINITY));

    return json({ state: "OK", results });
  } catch {
    return json({ error: "The retailer locator could not connect. Please try again shortly." }, 502);
  }
}
