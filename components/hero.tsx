"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { ArrowDownIcon, ArrowUpRightIcon } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import {
  DayNightSwitch,
  type DayNightMode,
} from "@/components/widgets/day-night-switch"
import { LiveLocator } from "@/components/widgets/live-locator"
import { cn } from "@/lib/utils"
import type { GeoLocation } from "@/lib/location"
import type { Weather } from "@/lib/weather"
import { TokenUsage as HeroWidget } from "@/components/widgets/token-usage"
import { useLanguage } from "@/components/language-provider"

// Day vs. night background media. The day clip is the bright blue-sky scene;
// the night clip is the warm golden-hour scene. Posters are the first frame of
// each clip so the still matches the video that fades in over it.
const MEDIA: Record<DayNightMode, { poster: string; video: string }> = {
  day: {
    poster: "/assets/hero-day-poster.webp",
    video: "/assets/hero-background-video.mp4",
  },
  night: {
    poster: "/assets/hero-night-poster.webp",
    video: "/assets/hero-night-video.mp4",
  },
}

// Daytime is 06:00–17:59 by the visitor's own clock; everything else is night.
function getClockMode(): DayNightMode {
  const hour = new Date().getHours()
  return hour >= 6 && hour < 18 ? "day" : "night"
}

const CONTENT_FRAME = "mx-auto w-full max-w-[1480px] px-6 sm:px-10 lg:px-14"

const REVEAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

type HeroProps = {
  /** Visitor location resolved on the server (lib/location.ts). */
  location: GeoLocation
  /** Weather snapshot fetched on the server and passed to the locator strip. */
  weather: Weather | null
}

export function Hero({ location, weather }: HeroProps): React.ReactElement {
  const { t } = useLanguage()
  const sectionRef = React.useRef<HTMLElement>(null)
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = React.useState(false)
  // Background mode: starts as "day" so the server and first client paint
  // agree, then snaps to the visitor's real time-of-day on mount. Flipping the
  // switch (onChange={setMode}) just overwrites it.
  const [mode, setMode] = React.useState<DayNightMode>("day")
  React.useEffect(() => {
    // One-time, post-mount sync to the visitor's real time-of-day. It can't run
    // on the server (there's no "visitor clock" there), so this single update is
    // intentional — we knowingly opt out of the "no setState in an effect" rule.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMode(getClockMode())
  }, [])
  const prefersReducedMotion = useReducedMotion()
  const shouldRenderVideo = !prefersReducedMotion

  const { poster: posterSrc, video: videoSrc } = MEDIA[mode]

  // Reload + replay the <video> when the source swaps, and drop back to the
  // poster while the new clip buffers.
  React.useEffect(() => {
    const video = videoRef.current
    if (!shouldRenderVideo || !video) return
    setVideoReady(false)
    video.load()
    void video.play().catch(() => {})
  }, [mode, shouldRenderVideo])

  React.useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.05 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [shouldRenderVideo])

  // Entrance animation props for a single element. `delay` choreographs the
  // cascade; reduced-motion collapses it to a plain opacity fade.
  const reveal = (delay: number) =>
    prefersReducedMotion
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.3, delay },
        }
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: REVEAL_EASE },
        }

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Introduction"
      className="relative isolate h-svh max-h-[1080px] min-h-[680px] w-full overflow-hidden bg-overlay-ink text-overlay-cream"
    >
      {/* Background: video underneath, poster image fades out when video is ready. */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        {shouldRenderVideo && (
          <video
            ref={videoRef}
            aria-hidden="true"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={posterSrc}
            src={videoSrc}
            onCanPlay={() => setVideoReady(true)}
            // Person sits right-of-center in the scene; bias the crop toward
            // them on narrow viewports so they stay in frame, then recenter
            // once there's room for the full landscape.
            className="h-full w-full object-cover object-[72%_center] sm:object-center"
          />
        )}
        <Image
          src={posterSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className={cn(
            "object-cover object-[72%_center] transition-opacity duration-[900ms] ease-out sm:object-center",
            videoReady ? "opacity-0" : "opacity-100"
          )}
        />
      </div>

      {/* Directional dark veil, heavier on the left where the type sits */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(108deg,rgba(15,15,12,0.78)_0%,rgba(15,15,12,0.58)_22%,rgba(15,15,12,0.32)_46%,rgba(15,15,12,0.08)_68%,rgba(15,15,12,0)_84%)]"
      />
      {/* Top scrim, full-width, for navbar legibility across the hero */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-32 bg-[linear-gradient(to_bottom,rgba(15,15,12,0.55),rgba(15,15,12,0.18)_55%,rgba(15,15,12,0)_100%)]"
      />
      {/* Bottom fade for footer caption legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-[linear-gradient(to_top,rgba(15,15,12,0.55),rgba(15,15,12,0)_85%)]"
      />

      {/* Foreground */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Reserve space for the SiteHeader. */}
        <div className="h-16 shrink-0 sm:h-20" />

        {/* Editorial stack (left) */}
        <div className="flex flex-1 items-center">
          {/* const CONTENT_FRAME = "mx-auto w-full max-w-[1480px] px-6 sm:px-10 lg:px-14" */}
          <div className={CONTENT_FRAME}>
            <div className="max-w-[640px]">
              <motion.p
                {...reveal(0.2)}
                className="caption-uppercase text-overlay-cream/70"
              >
                {t("Full-stack · AI-first engineer")}
              </motion.p>

              <motion.h1
                {...reveal(0.28)}
                className="mt-5 text-[clamp(2.25rem,4.8vw,4.25rem)] leading-[1.04] tracking-[-0.03em]"
              >
                {t("Modern software,")}
                <br />
                {t("built to think,")}
                <br />
                {t("shipped end-to-end.")}
              </motion.h1>

              <motion.p
                {...reveal(0.38)}
                className="mt-6 max-w-[560px] text-[15px] leading-[1.6] text-overlay-cream/80 sm:text-base"
              >
                {t("I'm amvsoft.tech, a full-stack engineer designing and shipping AI-native products from the inference layer to the last interaction.")}
              </motion.p>

              <motion.div
                {...reveal(0.48)}
                className="mt-9 flex flex-wrap items-center gap-3"
              >
                <Button
                  asChild
                  className="h-11 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary-active focus-visible:ring-primary/40"
                >
                  <Link href="#work">
                    {t("View selected work")}
                    <ArrowUpRightIcon size={16} weight="bold" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="h-11 rounded-md border border-overlay-cream/25 bg-overlay-cream/[0.06] px-5 text-sm font-medium text-overlay-cream backdrop-blur-[2px] hover:bg-overlay-cream/15 hover:text-overlay-cream"
                >
                  <Link href="#contact">{t("Get in touch")}</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Day / night switch — 25% from the top on the right edge. Floats over
            the scene and swaps the background video + poster between day and
            night. Vertical offset lives on the wrapper so it survives the
            reveal's transform animation on the inner motion node. */}
        <div className="absolute top-1/4 right-6 z-20 -translate-y-1/2 sm:right-10 lg:right-14">
          <motion.div {...reveal(0.55)}>
            <DayNightSwitch value={mode} onChange={setMode} />
          </motion.div>
        </div>

        {/* Floating widget — bottom right, above the locator strip. The widget
            self-collapses to a small pill via its own close button; anchored to
            the corner so the pill ends up in the same spot. */}
        <motion.div
          {...reveal(0.6)}
          className="pointer-events-none absolute right-6 bottom-24 z-10 hidden items-end justify-end sm:right-10 lg:right-14 lg:flex"
        >
          <div className="pointer-events-auto">
            <HeroWidget />
          </div>
        </motion.div>

        {/* Bottom strip: availability pill (left) + scroll cue + locator (right) */}
        {/* const CONTENT_FRAME = "mx-auto w-full max-w-[1480px] px-6 sm:px-10 lg:px-14" */}
        <div className="shrink-0 pb-7 sm:pb-9">
          <div
            className={cn(
              CONTENT_FRAME,
              "flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4"
            )}
          >
            <motion.p
              {...reveal(0.7)}
              className="inline-flex items-center gap-2 rounded-full border border-overlay-cream/20 bg-overlay-ink/40 px-3 py-1.5 font-mono text-[11px] tracking-[0.04em] text-overlay-cream/85 backdrop-blur-[2px]"
            >
              <span className="relative inline-flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/70 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-success" />
              </span>
              {t("Available for new work · Q3 2026")}
            </motion.p>

            {/* Locator follows the availability pill: stacked beneath it on
                mobile, inline on the right (with the scroll cue) from sm up. */}
            <motion.div
              {...reveal(0.7)}
              className="flex items-center gap-3 text-overlay-cream/65"
            >
              <span className="hidden items-center gap-3 sm:flex">
                <ArrowDownIcon size={14} weight="regular" />
                <span className="caption-uppercase">{t("Scroll")}</span>
                <span aria-hidden className="h-px w-10 bg-overlay-cream/25" />
              </span>
              <LiveLocator location={location} weather={weather} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
