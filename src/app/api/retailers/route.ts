import { NextRequest, NextResponse } from "next/server";

import { STATE } from "@/config/state";

export const dynamic = "force-dynamic";

const SEARCH_UPSTREAM =
  "https://presidentialmoonrocks.com/api/dispensaries/search";
const COUNT_UPSTREAM =
  `https://presidentialmoonrocks.com/api/dispensaries?state=${STATE.code}`;
const REQUEST_TIMEOUT_MS = 8_000;

type UpstreamRetailer = {
  id?: unknown;
  name?: unknown;
  address?: unknown;
  city?: unknown;
  state?: unknown;
  zip?: unknown;
  latitude?: unknown;
  longitude?: unknown;
  distance?: unknown;
  distance_miles?: unknown;
  phone?: unknown;
  website?: unknown;
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function sanitizeRetailer(record: UpstreamRetailer, index: number) {
  const sourceId = safeNumber(record.id);
  const id = sourceId !== null && Number.isSafeInteger(sourceId) && sourceId > 0
    ? sourceId
    : index + 1;
  const distanceMiles = safeNumber(record.distance_miles) ?? safeNumber(record.distance) ?? 0;
  const phone = typeof record.phone === "string" && /^\+?[0-9().\s-]{7,24}$/.test(record.phone)
    ? record.phone
    : null;
  const website = typeof record.website === "string" && record.website.length > 0
    ? record.website
    : null;

  return {
    id,
    name: safeText(record.name),
    address: safeText(record.address),
    city: safeText(record.city),
    state: STATE.code,
    zip: safeText(record.zip),
    phone,
    website,
    distance_miles: distanceMiles,
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

      return json({ state: STATE.code, count });
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
      return json({ error: `Enter a ${STATE.name} ZIP code or share your location.` }, 400);
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
    upstreamUrl.searchParams.set("state", STATE.code);
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
      .sort((left, right) => left.distance_miles - right.distance_miles);

    return json({ state: STATE.code, results });
  } catch {
    return json({ error: "The retailer locator could not connect. Please try again shortly." }, 502);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as unknown;
    if (!isRecord(body)) {
      return json({ error: `Enter a ${STATE.name} ZIP code or share your location.` }, 400);
    }

    if (body.state !== undefined && body.state !== STATE.code) {
      return json({ error: `Only ${STATE.name} retailer searches are supported.` }, 400);
    }

    const url = new URL(request.url);
    if (typeof body.zip === "string") url.searchParams.set("zip", body.zip);
    if (typeof body.latitude === "number") url.searchParams.set("lat", String(body.latitude));
    if (typeof body.longitude === "number") url.searchParams.set("lng", String(body.longitude));
    if (typeof body.limit === "number") url.searchParams.set("limit", String(body.limit));
    if (body.offset !== undefined) url.searchParams.set("offset", String(body.offset));

    return GET(new NextRequest(url));
  } catch {
    return json({ error: "The retailer search request was not valid JSON." }, 400);
  }
}
