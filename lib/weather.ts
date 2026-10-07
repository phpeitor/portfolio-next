// Server-side Open-Meteo fetch. Given the visitor's coordinates (resolved in
// lib/location.ts), returns the current temperature + weather code. Lives on
// the server so the Next.js Data Cache can dedupe identical coordinate lookups
// across visitors — Open-Meteo is hit at most once per location per
// revalidation window.
import type { GeoLocation } from "@/lib/location"

const TEMP_UNIT: "celsius" | "fahrenheit" = "celsius"

// 6 hours. Each unique coordinate's fetch is served from the Data Cache for
// this long.
const REVALIDATE_SECONDS = 60 * 60 * 6

export type Weather = { temperature: number; code: number }

export async function getWeather(
  location: Pick<GeoLocation, "latitude" | "longitude" | "timezone">
): Promise<Weather | null> {
  const url = new URL("https://api.open-meteo.com/v1/forecast")
  // Round to ~1km of precision: nearby visitors then share one Data Cache
  // entry, and we avoid sending pin-point visitor coordinates upstream.
  url.searchParams.set("latitude", location.latitude.toFixed(2))
  url.searchParams.set("longitude", location.longitude.toFixed(2))
  url.searchParams.set("current", "temperature_2m,weather_code")
  url.searchParams.set("temperature_unit", TEMP_UNIT)
  url.searchParams.set("timezone", location.timezone)

  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } })
    if (!res.ok) return null

    const data = (await res.json()) as {
      current?: { temperature_2m?: number; weather_code?: number }
    }
    const temperature = data.current?.temperature_2m
    const code = data.current?.weather_code

    if (typeof temperature !== "number" || typeof code !== "number") return null

    return { temperature, code }
  } catch {
    // Silent — callers degrade to location + time only.
    return null
  }
}
