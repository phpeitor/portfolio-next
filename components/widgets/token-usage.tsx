"use client"

import * as React from "react"
import Link from "next/link"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from "motion/react"
import { ArrowUpRightIcon, GaugeIcon, XIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/language-provider"
import type { ModelRankings } from "@/lib/model-rankings"

const PERIOD = {
  label: "daily",
}

const OPACITY_LADDER = [1, 0.72, 0.5, 0.34, 0.24]

function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`
  return `${n}`
}

type Props = {
  className?: string
  rankings: ModelRankings | null
}

export function TokenUsage({ className, rankings }: Props): React.ReactElement {
  const { t } = useLanguage()
  const [collapsed, setCollapsed] = React.useState(false)
  const prefersReducedMotion = useReducedMotion()

  const fadeTransition: Transition = prefersReducedMotion
    ? { duration: 0 }
    : {
        duration: 0.18,
        ease: "easeOut",
      }

  const fade = {
    initial: prefersReducedMotion ? false : { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: fadeTransition,
  }
  const rows = rankings?.rows ?? []
  const totalTokens = rankings?.totalTokens ?? 0
  const displayRows = rows.map((row, index) => ({
    ...row,
    share: totalTokens ? row.tokens / totalTokens : 0,
    opacity: OPACITY_LADDER[index] ?? OPACITY_LADDER.at(-1)!,
  }))

  return (
    <AnimatePresence initial={false} mode="wait">
      {collapsed ? (
        <motion.button
          key="pill"
          type="button"
          onClick={() => setCollapsed(false)}
          aria-expanded={false}
          aria-label="Show token usage details"
          {...fade}
          className={cn(
            "caption-uppercase inline-flex items-center gap-2 rounded-full border border-overlay-cream/15 bg-overlay-ink/55 px-3.5 py-2 text-overlay-cream/85 shadow-sm backdrop-blur-[10px] transition-colors hover:text-overlay-cream focus-visible:ring-2 focus-visible:ring-overlay-cream/45 focus-visible:outline-none",
            className
          )}
        >
          <GaugeIcon
            size={14}
            weight="regular"
            className="shrink-0 text-overlay-cream/60"
            aria-hidden
          />

          <span className="truncate">{t("Token usage")}</span>

          <span className="font-mono text-[10px] tracking-[0.04em] text-overlay-cream/55">
            {rankings ? formatTokens(totalTokens) : t("offline")}
          </span>
        </motion.button>
      ) : (
        <motion.aside
          key="panel"
          aria-label={t("Global model usage")}
          {...fade}
          className={cn(
            "w-[280px] overflow-hidden rounded-xl border border-overlay-cream/15 bg-overlay-ink/55 p-5 text-overlay-cream shadow-sm backdrop-blur-[10px]",
            className
          )}
        >
          <div className="flex min-w-0 items-center justify-between gap-3 whitespace-nowrap">
            <button
              type="button"
              onClick={() => setCollapsed(true)}
              aria-label="Hide token usage details"
              className="caption-uppercase inline-flex min-w-0 items-center gap-2 rounded-full text-overlay-cream/85 transition-colors hover:text-overlay-cream focus-visible:ring-2 focus-visible:ring-overlay-cream/45 focus-visible:outline-none"
            >
              <GaugeIcon
                size={14}
                weight="regular"
                className="shrink-0 text-overlay-cream/60"
                aria-hidden
              />

              <span className="truncate">{t("Token usage")}</span>

              <span className="text-overlay-cream/70">· {t(PERIOD.label)}</span>
            </button>

            <button
              type="button"
              onClick={() => setCollapsed(true)}
              aria-label="Hide token usage details"
              className="-mr-1 inline-flex size-6 shrink-0 items-center justify-center rounded-full text-overlay-cream/55 transition-colors hover:bg-overlay-cream/10 hover:text-overlay-cream focus-visible:ring-2 focus-visible:ring-overlay-cream/45 focus-visible:outline-none"
            >
              <XIcon size={13} weight="bold" />
            </button>
          </div>

          <div>
            <div className="mt-4 border-t border-overlay-cream/12 pt-4">
              <div className="flex items-baseline gap-2">
                <p className="text-[30px] leading-none tracking-[-0.025em]">
                  {rankings ? formatTokens(totalTokens) : "—"}
                </p>
                <p className="text-[12px] text-overlay-cream/60">{t("tokens")}</p>
              </div>

              <div
                role="img"
                aria-label="Share of usage by model"
                className="mt-3 flex h-[6px] gap-[2px]"
              >
                {displayRows.map((row) => (
                  <div
                    key={row.model}
                    style={{
                      width: `${row.share * 100}%`,
                      opacity: row.opacity,
                    }}
                    className="h-full min-w-[3px] rounded-[1px] bg-overlay-cream"
                  />
                ))}
              </div>
            </div>

            <ol className="mt-4 space-y-2.5">
              {displayRows.map((row, index) => (
                <li
                  key={row.model}
                  className="flex items-baseline justify-between gap-3 text-[13px]"
                >
                  <div className="flex min-w-0 items-baseline gap-2">
                    <span
                      style={{ opacity: row.opacity }}
                      className="size-1.5 shrink-0 self-center rounded-full bg-overlay-cream"
                      aria-hidden
                    />

                    <span
                      className={cn(
                        "truncate",
                        index === 0
                          ? "text-overlay-cream"
                          : "text-overlay-cream/85"
                      )}
                    >
                      {row.model}
                    </span>

                    <span className="shrink-0 font-mono text-[10px] tracking-[0.04em] text-overlay-cream/40">
                      {row.vendor}
                    </span>
                  </div>

                  <div className="shrink-0 font-mono tabular-nums">
                    <span
                      className={cn(
                        "text-[12px]",
                        index === 0
                          ? "text-overlay-cream"
                          : "text-overlay-cream/70"
                      )}
                    >
                      {formatTokens(row.tokens)}
                    </span>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-overlay-cream/12 pt-3">
              <p className="font-mono text-[11px] tracking-[0.04em] text-overlay-cream/55">
                {rankings
                  ? `${t("Updated")} ${rankings.updatedAt}`
                  : t("Global data unavailable")}
              </p>

              <Link
                href={rankings?.sourceUrl ?? "https://openrouter.ai/rankings"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1 text-[12px] text-overlay-cream/85 transition-colors hover:text-overlay-cream focus-visible:ring-2 focus-visible:ring-overlay-cream/45 focus-visible:outline-none"
              >
                {t("See breakdown")}
                <ArrowUpRightIcon size={12} weight="bold" />
              </Link>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
