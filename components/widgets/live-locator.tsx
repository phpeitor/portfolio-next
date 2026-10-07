"use client"

import * as React from "react"
import {
  CloudFogIcon,
  CloudIcon,
  CloudLightningIcon,
  CloudRainIcon,
  CloudSnowIcon,
  CloudSunIcon,
  SunIcon,
} from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import type { GeoLocation } from "@/lib/location"
import type { Weather } from "@/lib/weather"
import { useLanguage } from "@/components/language-provider"

const TEMP_UNIT: "celsius" | "fahrenheit" = "fahrenheit"
const TEMP_SYMBOL = TEMP_UNIT === "fahrenheit" ? "°F" : "°C"

type IconComponent = React.ComponentType<{
  size?: number
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone"
  className?: string
  "aria-hidden"?: boolean
}>

// Open-Meteo WMO weather codes → editorial icon + label.
function weatherFor(code: number): { Icon: IconComponent; label: string } {
  if (code === 0) return { Icon: SunIcon, label: "Clear" }
  if (code <= 2) return { Icon: CloudSunIcon, label: "Partly cloudy" }
  if (code === 3) return { Icon: CloudIcon, label: "Overcast" }
  if (code <= 48) return { Icon: CloudFogIcon, label: "Fog" }
  if (code <= 57) return { Icon: CloudRainIcon, label: "Drizzle" }
  if (code <= 67) return { Icon: CloudRainIcon, label: "Rain" }
  if (code <= 77) return { Icon: CloudSnowIcon, label: "Snow" }
  if (code <= 82) return { Icon: CloudRainIcon, label: "Showers" }
  if (code <= 99) return { Icon: CloudLightningIcon, label: "Thunderstorm" }
  return { Icon: CloudIcon, label: "Cloudy" }
}

type Props = {
  className?: string
  /** Visitor location resolved on the server (lib/location.ts). */
  location: GeoLocation
  /** Weather snapshot fetched on the server (Open-Meteo behind a 6h Data
   *  Cache). Null when the upstream call failed — the widget then degrades to
   *  location + time only. */
  weather: Weather | null
}

export function LiveLocator({
  className,
  location,
  weather,
}: Props): React.ReactElement {
  const { t } = useLanguage()
  // Live wall-clock. Null on the server and the first client paint (so the SSR
  // and hydrated markup match), then set on mount and ticked every 30s.
  const [now, setNow] = React.useState<Date | null>(null)
  React.useEffect(() => {
    // Start the clock after mount (it's null on the server, so the first paint
    // matches), then tick every 30s. This one-time initial set is intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  const timeStr = React.useMemo(() => {
    if (!now) return null
    // The visitor's own browser/system time — no fixed timeZone, so it resolves
    // to their local zone. (Same clock the hero uses to pick day vs. night.)
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(now)
  }, [now])

  const wx = weather ? weatherFor(weather.code) : null
  const WeatherIcon = wx?.Icon

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.12em] text-overlay-cream/65",
        className
      )}
    >
      <span className="uppercase">
        {location.city}, {location.region}
      </span>

      {timeStr && (
        <>
          <span aria-hidden className="text-overlay-cream/25">
            &middot;
          </span>
          <span className="tracking-[0.04em] normal-case tabular-nums">
            {timeStr}
          </span>
        </>
      )}

      {weather && wx && WeatherIcon && (
        <>
          <span aria-hidden className="text-overlay-cream/25">
            &middot;
          </span>
          <span
            className="inline-flex items-center gap-1.5"
            aria-label={`${t(wx.label)}, ${Math.round(weather.temperature)}${TEMP_SYMBOL}`}
            title={t(wx.label)}
          >
            <WeatherIcon
              size={13}
              weight="regular"
              className="text-overlay-cream/85"
              aria-hidden
            />
            <span className="tracking-[0.04em] normal-case tabular-nums">
              {Math.round(weather.temperature)}
              {TEMP_SYMBOL}
            </span>
          </span>
        </>
      )}
    </div>
  )
}
