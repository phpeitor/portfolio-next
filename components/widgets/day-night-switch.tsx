"use client"

import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { MoonIcon, SunIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export type DayNightMode = "day" | "night"

type Props = {
  value: DayNightMode
  onChange: (next: DayNightMode) => void
  className?: string
}

// Vertical sun/night toggle — a cream thumb slides between the sun (top) and
// moon (bottom) over a hairline-bordered ink track. Floats by contrast, no shadow.
const THUMB_TRAVEL = 42 // px: slot (36) + gap (6)

export function DayNightSwitch({
  value,
  onChange,
  className,
}: Props): React.ReactElement {
  const prefersReducedMotion = useReducedMotion()
  const isDay = value === "day"

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          role="switch"
          aria-checked={isDay}
          aria-label={`Background lighting: ${isDay ? "day" : "night"}. Switch to ${
            isDay ? "night" : "day"
          }.`}
          onClick={() => onChange(isDay ? "night" : "day")}
          className={cn(
            "group relative flex w-9 flex-col items-center gap-1.5 rounded-full border border-overlay-cream/20 bg-overlay-ink/40 p-1.5 backdrop-blur-md transition-colors hover:border-overlay-cream/40 focus-visible:ring-2 focus-visible:ring-overlay-cream/45 focus-visible:outline-none",
            className
          )}
        >
          <motion.span
            aria-hidden
            initial={false}
            animate={{ y: isDay ? 0 : THUMB_TRAVEL }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 420, damping: 34 }
            }
            className="absolute top-1.5 left-1.5 h-9 w-6 rounded-full bg-overlay-cream"
          />

          <span
            className={cn(
              "relative z-10 flex h-9 w-6 items-center justify-center transition-colors duration-300",
              isDay
                ? "text-overlay-ink"
                : "text-overlay-cream/55 group-hover:text-overlay-cream/85"
            )}
          >
            <SunIcon
              size={17}
              weight={isDay ? "fill" : "regular"}
              aria-hidden
            />
          </span>

          <span
            className={cn(
              "relative z-10 flex h-9 w-6 items-center justify-center transition-colors duration-300",
              !isDay
                ? "text-overlay-ink"
                : "text-overlay-cream/55 group-hover:text-overlay-cream/85"
            )}
          >
            <MoonIcon
              size={16}
              weight={!isDay ? "fill" : "regular"}
              aria-hidden
            />
          </span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="left">
        {isDay ? "Switch to night" : "Switch to day"}
      </TooltipContent>
    </Tooltip>
  )
}
