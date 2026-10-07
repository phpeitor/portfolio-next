// ─────────────────────────────────────────────────────────────────────────
// Visitor geolocation (server-side)
//
// Resolves *where the visitor is* so the hero's locator strip can show their
// city, their local weather, and their time. Runs on the server and degrades
// gracefully through three tiers:
//
//   1. Production on Vercel → free geo headers present on every request
//      (x-vercel-ip-city / -latitude / -longitude / -timezone / -country).
//   2. Local dev (no Vercel headers) → a free, no-key IP lookup (ipapi.co),
//      which geolocates the dev machine's own public IP — i.e. you.
//   3. Both unavailable → a hard-coded fallback (Lima, PE).
// ─────────────────────────────────────────────────────────────────────────
import { headers } from "next/headers"

export type GeoLocation = {
  /** Lower-case city name; the locator uppercases it via CSS. */
  city: string
  /** Lower-case country code shown after the city (e.g. "in"). */
  region: string
  latitude: number
  longitude: number
  /** IANA timezone name (e.g. "America/Lima") — used for the weather fetch. */
  timezone: string
}

// Tier 3 — used when neither the Vercel headers nor the IP lookup resolve.
const FALLBACK: GeoLocation = {
  city: "lima",
  region: "pe",
  latitude: -12.0775,
  longitude: -77.0955,
  timezone: "America/Lima",
}

export async function getLocation(): Promise<GeoLocation> {
  // ── Tier 1: Vercel injects these headers on every production request. ──
  const h = await headers()
  const city = h.get("x-vercel-ip-city")
  const latitude = h.get("x-vercel-ip-latitude")
  const longitude = h.get("x-vercel-ip-longitude")

  if (city && latitude && longitude) {
    return {
      // Vercel RFC3986-encodes non-ASCII city names, so decode first.
      city: decodeURIComponent(city).toLowerCase(),
      region: (h.get("x-vercel-ip-country") ?? FALLBACK.region).toLowerCase(),
      latitude: Number(latitude),
      longitude: Number(longitude),
      timezone: h.get("x-vercel-ip-timezone") ?? FALLBACK.timezone,
    }
  }

  // ── Tier 2: local dev — look up our own public IP (no API key needed). ──
  try {
    const res = await fetch("https://ipapi.co/json/", { cache: "no-store" })
    if (res.ok) {
      const d = (await res.json()) as {
        city?: string
        country_code?: string
        latitude?: number
        longitude?: number
        timezone?: string
      }
      if (typeof d.latitude === "number" && typeof d.longitude === "number") {
        return {
          city: (d.city ?? FALLBACK.city).toLowerCase(),
          region: (d.country_code ?? FALLBACK.region).toLowerCase(),
          latitude: d.latitude,
          longitude: d.longitude,
          timezone: d.timezone ?? FALLBACK.timezone,
        }
      }
    }
  } catch {
    // Network blocked / rate-limited — fall through to the static default.
  }

  // ── Tier 3: hard fallback. ──
  return FALLBACK
}
