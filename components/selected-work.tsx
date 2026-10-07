"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { SectionShell } from "@/components/section-shell"
import { PROJECTS, type Project } from "@/lib/content"
import { REVEAL_EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/language-provider"

// Each card holds the stage for this long before the timer advances to the next.
const SLIDE_SECONDS = 7

// Diameter of the countdown ring that wraps the active project's index number.
const RING_SIZE = 26

// One slide's share of the whole timeline track. The active card fills exactly
// this fraction over its lifetime, so the fill reaches 100% as the last slide ends.
const SEGMENT_FRACTION = 1 / PROJECTS.length

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

/** Prev / next pair, reused in the desktop column and the mobile control row. */
function CarouselArrows({
  onPrev,
  onNext,
  className,
}: {
  onPrev: () => void
  onNext: () => void
  className?: string
}): React.ReactElement {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous project"
        className="grid size-10 place-items-center rounded-full border border-hairline-strong bg-surface-card text-ink transition-colors hover:border-ink"
      >
        <ArrowLeftIcon size={16} weight="bold" />
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next project"
        className="grid size-10 place-items-center rounded-full border border-hairline-strong bg-surface-card text-ink transition-colors hover:border-ink"
      >
        <ArrowRightIcon size={16} weight="bold" />
      </button>
    </div>
  )
}

function ProjectCard({
  project,
  isActive,
  reduceMotion,
}: {
  project: Project
  isActive: boolean
  reduceMotion: boolean | null
}): React.ReactElement {
  const { t } = useLanguage()
  return (
    <motion.div
      aria-hidden={!isActive}
      // Every card shares the same grid cell so the stack is as tall as its
      // tallest member — no fixed height — which lets the card grow when it
      // stacks vertically (square image + content) on small screens.
      className="[grid-area:1/1]"
      initial={false}
      animate={
        reduceMotion
          ? { opacity: isActive ? 1 : 0 }
          : {
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 14,
              scale: isActive ? 1 : 0.97,
            }
      }
      transition={{ duration: 0.5, ease: REVEAL_EASE }}
      style={{
        zIndex: isActive ? 10 : 1,
        pointerEvents: isActive ? "auto" : "none",
        transformOrigin: "top center",
        // Only promote the card that's currently transitioning; a permanent
        // will-change pins a GPU layer for every off-screen card.
        willChange: isActive ? "transform, opacity" : "auto",
      }}
    >
      <Card
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-xl border bg-surface-card p-0 ring-0 transition-colors duration-300",
          isActive ? "border-hairline-strong" : "border-hairline"
        )}
      >
        <div className="relative z-10 grid h-full grid-cols-1 md:grid-cols-2">
          {/* Square media stacked on top below md; fills the left half at md+. */}
          <div className="relative aspect-square overflow-hidden border-b border-hairline md:border-r md:border-b-0">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col p-6 sm:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="eyebrow text-muted-ink">/ {project.index}</span>

              <span className="ml-auto font-mono text-[11px] tracking-[0.1em] text-muted-ink">
                {project.year}
              </span>
            </div>

            <h3 className="mt-6 text-[1.625rem] tracking-[-0.0125em]">
              {t(project.title)}
            </h3>

            <p className="mt-3 max-w-[44ch] text-[15px] leading-[1.6] text-body">
              {t(project.description)}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="rounded-full border-hairline px-2 font-mono text-[10px] tracking-[0.12em] text-ink uppercase"
                >
                  {t(tag)}
                </Badge>
              ))}
            </div>

            <div className="mt-auto flex items-center justify-between gap-3 border-t border-hairline-soft pt-5">
              <Link
                href={project.href}
                tabIndex={isActive ? undefined : -1}
                className="group/link inline-flex items-center gap-2 border-b border-transparent pb-0.5 text-sm font-medium text-ink transition-[gap,border-color] hover:gap-3 hover:border-ink"
              >
                {t("View case study")}
                <ArrowUpRightIcon
                  size={14}
                  weight="bold"
                  className="transition-transform group-hover/link:translate-x-0.5"
                />
              </Link>

              <span className="font-mono text-[11px] tracking-[0.08em] text-muted-ink">
                {project.status}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

/**
 * A thin ring that depletes over the slide's lifetime, giving the viewer a
 * visual countdown to when the next card will appear.
 *
 * The depletion is pure CSS: the `selected-work-ring` keyframe animates the
 * arc's `stroke-dashoffset` from 0 (full ring) to the full circumference
 * (empty ring) over SLIDE_SECONDS. The parent gives this component a
 * `key={active}` so each new slide remounts it and replays from the start.
 *
 * Under reduced motion we skip the animation entirely and draw a static full
 * ring — matching the rest of the carousel, which also stops auto-advancing.
 */
function CountdownRing({
  label,
  reduceMotion,
}: {
  label: string
  reduceMotion: boolean | null
}): React.ReactElement {
  const size = RING_SIZE
  const stroke = 1.5
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius

  return (
    <span
      className="relative grid shrink-0 place-items-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute -rotate-90"
        aria-hidden
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="stroke-hairline/70"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          className="stroke-ink"
          strokeDasharray={circumference}
          style={
            reduceMotion
              ? { strokeDashoffset: 0 }
              : {
                  // `selected-work-ring` reads --cd-circumference for its end
                  // state, so the offset always matches this ring's geometry.
                  ["--cd-circumference" as string]: circumference,
                  animation: `selected-work-ring ${SLIDE_SECONDS}s linear forwards`,
                }
          }
        />
      </svg>

      <span className="font-mono text-[11px] text-ink tabular-nums">
        {label}
      </span>
    </span>
  )
}

/**
 * The dotted progress rail shown beside the carousel — horizontal above the
 * card on tablets, vertical to its right on desktop. One dot per project; the
 * leading edge fills as the active slide's timer runs.
 *
 * The fill is two stacked pieces:
 *  - a static base that covers every *completed* slide (`active / length`), and
 *  - an animated segment, one slide wide, that grows from 0 → full over
 *    SLIDE_SECONDS via a CSS keyframe. Together they read as a continuous fill
 *    advancing at `(active + elapsed) / length`.
 *
 * `key={active}` on the animated segment remounts it each slide so it replays.
 * Under reduced motion the animated segment is omitted and the static base
 * jumps straight to the slide's start position.
 */
function Timeline({
  orientation,
  active,
  reduceMotion,
}: {
  orientation: "horizontal" | "vertical"
  active: number
  reduceMotion: boolean | null
}): React.ReactElement {
  const isHorizontal = orientation === "horizontal"
  const baseFraction = clamp(active / PROJECTS.length, 0, 1)

  return (
    <div
      className={cn(
        "relative bg-hairline",
        isHorizontal ? "h-px w-full" : "h-full w-px"
      )}
    >
      {/* Filled portion of the rail. */}
      {isHorizontal ? (
        <>
          {/* Completed slides — static, no animation. */}
          <div
            className="absolute inset-y-0 left-0 origin-left bg-ink"
            style={{ width: `${baseFraction * 100}%` }}
          />
          {/* Current slide's growing segment (skipped under reduced motion). */}
          {!reduceMotion && (
            <div
              key={active}
              className="absolute inset-y-0 origin-left bg-ink"
              style={{
                left: `${baseFraction * 100}%`,
                width: `${SEGMENT_FRACTION * 100}%`,
                animation: `selected-work-fill ${SLIDE_SECONDS}s linear forwards`,
              }}
            />
          )}
        </>
      ) : (
        <>
          <div
            className="absolute inset-x-0 top-0 origin-top bg-ink"
            style={{ height: `${baseFraction * 100}%` }}
          />
          {!reduceMotion && (
            <div
              key={active}
              className="absolute inset-x-0 origin-top bg-ink"
              style={{
                top: `${baseFraction * 100}%`,
                height: `${SEGMENT_FRACTION * 100}%`,
                animation: `selected-work-fill-y ${SLIDE_SECONDS}s linear forwards`,
              }}
            />
          )}
        </>
      )}

      {PROJECTS.map((project, index) => {
        const isActive = index === active
        const offset = `${((index + 0.5) / PROJECTS.length) * 100}%`

        return (
          <div
            key={project.title}
            className={cn(
              "absolute",
              isHorizontal
                ? "top-1/2 -translate-x-1/2 -translate-y-1/2"
                : "left-1/2 flex -translate-x-1/2 items-center"
            )}
            style={isHorizontal ? { left: offset } : { top: offset }}
          >
            <motion.span
              className={cn(
                "block size-1.5 rounded-full transition-colors",
                isActive ? "bg-ink" : "bg-hairline-strong"
              )}
              animate={{ scale: isActive ? 1.4 : 1 }}
              transition={{ duration: 0.3, ease: REVEAL_EASE }}
            />

            <span
              className={cn(
                "absolute font-mono text-[10px] tracking-[0.1em] tabular-nums transition-colors",
                isHorizontal ? "top-3 left-1/2 -translate-x-1/2" : "left-3",
                isActive ? "text-muted-ink" : "text-muted-soft/70"
              )}
            >
              {project.year}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export function SelectedWork(): React.ReactElement {
  const { t } = useLanguage()
  const reduceMotion = useReducedMotion()
  const [active, setActive] = React.useState(0)

  // The active label button — scrolled to the center of the horizontal label
  // strip on small screens so the current project always sits in the middle
  // with its neighbours peeking in on either side.
  const activeLabelRef = React.useRef<HTMLButtonElement | null>(null)

  // The horizontal label strip itself. We scroll *this* element manually rather
  // than calling the button's scrollIntoView — scrollIntoView moves the nearest
  // scrollable ancestor on both axes, so when the section is off-screen it drags
  // the whole page down to it every time the carousel auto-advances.
  const labelStripRef = React.useRef<HTMLOListElement | null>(null)

  const goTo = React.useCallback((index: number) => {
    setActive(((index % PROJECTS.length) + PROJECTS.length) % PROJECTS.length)
  }, [])

  // Step relative to the *current* slide. Using the functional setState form
  // means we read the latest `active` without a mirroring ref or stale closure.
  const goNext = React.useCallback(() => {
    setActive((previous) => (previous + 1) % PROJECTS.length)
  }, [])
  const goPrev = React.useCallback(() => {
    setActive((previous) => (previous - 1 + PROJECTS.length) % PROJECTS.length)
  }, [])

  // Center the active label within the horizontal strip by scrolling the strip's
  // own scrollLeft — never the page. When the strip isn't horizontally
  // scrollable (lg+, where it's a vertical column with visible overflow) the
  // scrollWidth check makes this a no-op.
  React.useEffect(() => {
    const strip = labelStripRef.current
    const label = activeLabelRef.current
    if (!strip || !label) return
    if (strip.scrollWidth <= strip.clientWidth) return

    const target =
      label.offsetLeft - strip.clientWidth / 2 + label.clientWidth / 2

    strip.scrollTo({
      left: clamp(target, 0, strip.scrollWidth - strip.clientWidth),
      behavior: reduceMotion ? "auto" : "smooth",
    })
  }, [active, reduceMotion])

  // Auto-advance the carousel. This effect is keyed on `active`, so it re-runs
  // every time the slide changes — from the timer, the arrows, or a label
  // click — which means the 7s countdown always restarts from zero. Advancing
  // with the functional setState form removes any need to track `active` in a
  // ref. Under reduced motion we don't auto-play at all; the viewer drives the
  // carousel with the arrows / labels instead.
  React.useEffect(() => {
    if (reduceMotion) return

    const timer = setTimeout(() => {
      setActive((previous) => (previous + 1) % PROJECTS.length)
    }, SLIDE_SECONDS * 1000)

    return () => clearTimeout(timer)
  }, [active, reduceMotion])

  return (
    <section
      id="work"
      aria-labelledby="work-h"
      className="relative border-t border-hairline-soft"
    >
      {/* Intro */}
      <SectionShell className="pt-20 sm:pt-28">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="eyebrow text-muted-ink">01</span>

            <span className="eyebrow text-ink uppercase">{t("Selected work")}</span>
          </div>

          <span className="hidden font-mono text-[11px] tracking-[0.1em] text-muted-ink uppercase md:block">
            2024–2025
          </span>
        </div>

        <h2
          id="work-h"
          className="mt-10 max-w-[20ch] text-[clamp(2rem,4.4vw,2.75rem)] tracking-[-0.025em]"
        >
          {t("A focused set of recent AI products and systems, each shipped to real users.")}
        </h2>
      </SectionShell>

      <div className="pt-12 pb-20 sm:pb-28">
        <SectionShell>
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-8">
            {/* Project labels — vertical list at lg+, a centered horizontal
                scroll strip below lg (sits above the card). */}
            <nav
              aria-label={t("Project list")}
              className="order-1 flex flex-col lg:col-span-3 lg:col-start-1 lg:row-start-1"
            >
              <ol
                ref={labelStripRef}
                className={cn(
                  "flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1",
                  "lg:snap-none lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0",
                  "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                )}
              >
                {PROJECTS.map((project, index) => {
                  const isActive = index === active

                  return (
                    <li key={project.title} className="shrink-0 snap-center">
                      <button
                        ref={isActive ? activeLabelRef : null}
                        type="button"
                        onClick={() => goTo(index)}
                        aria-current={isActive ? "true" : undefined}
                        className="group relative flex items-center gap-3 py-2 text-left whitespace-nowrap lg:w-full lg:whitespace-normal"
                      >
                        {isActive ? (
                          <CountdownRing
                            // Remount per slide so the depletion animation replays.
                            key={active}
                            label={project.index}
                            reduceMotion={reduceMotion}
                          />
                        ) : (
                          <span
                            className="grid shrink-0 place-items-center font-mono text-[11px] tracking-[0.12em] text-muted-soft tabular-nums"
                            style={{ width: RING_SIZE, height: RING_SIZE }}
                          >
                            {project.index}
                          </span>
                        )}

                        <span
                          className={cn(
                            "text-[14px] leading-snug transition-colors",
                            isActive
                              ? "text-ink"
                              : "text-muted-ink group-hover:text-body"
                          )}
                        >
                          {project.title}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ol>

              {/* Desktop controls — pinned to the bottom of the label column. */}
              <CarouselArrows
                onPrev={goPrev}
                onNext={goNext}
                className="mt-auto hidden border-t border-hairline-soft pt-6 lg:flex"
              />
            </nav>

            {/* Horizontal timeline — shown sm → lg, removed below 640px. */}
            <div
              aria-hidden
              className="order-2 hidden w-full sm:block lg:hidden"
            >
              <Timeline
                orientation="horizontal"
                active={active}
                reduceMotion={reduceMotion}
              />
            </div>

            {/* Card stack — content-sized grid cell so vertical/square cards on
                small screens never clip. */}
            <div className="relative isolate order-3 grid lg:col-span-8 lg:col-start-4 lg:row-start-1 lg:mt-2">
              {PROJECTS.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  isActive={index === active}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>

            {/* Mobile controls — centered, after the card. */}
            <CarouselArrows
              onPrev={goPrev}
              onNext={goNext}
              className="order-4 justify-center lg:hidden"
            />

            {/* Vertical timeline — lg+ only. */}
            <div
              aria-hidden
              className="order-5 hidden lg:col-span-1 lg:col-start-12 lg:row-start-1 lg:flex lg:flex-col lg:items-center"
            >
              <Timeline
                orientation="vertical"
                active={active}
                reduceMotion={reduceMotion}
              />
            </div>
          </div>
        </SectionShell>
      </div>
    </section>
  )
}
