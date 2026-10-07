"use client"

import { motion, useReducedMotion, type Variants } from "motion/react"

import { Reveal, RevealGroup } from "@/components/reveal"
import { SectionHead, SectionShell } from "@/components/section-shell"
import { APPROACH_STEPS } from "@/lib/content"
import { REVEAL_EASE } from "@/lib/motion"
import { useLanguage } from "@/components/language-provider"

// The top rule traces left-to-right as the steps land, reading the four moves
// as one ordered path rather than four separate cells.
const drawRule: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.7, ease: REVEAL_EASE } },
}

export function Approach(): React.ReactElement {
  const { t } = useLanguage()
  const reduceMotion = useReducedMotion()

  return (
    <section id="process" aria-labelledby="appr-h" className="section-band">
      <SectionShell>
        <SectionHead
          stacked
          numeral="03"
          label={t("Approach")}
          aside={t("How I work")}
          titleId="appr-h"
          title={t("Four moves, in order. Most of the work is removing things before adding them.")}
        />
        <RevealGroup
          as="ol"
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        >
          <motion.span
            aria-hidden
            variants={reduceMotion ? undefined : drawRule}
            className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left bg-hairline"
          />
          {APPROACH_STEPS.map((step) => (
            <Reveal
              as="li"
              key={step.t}
              className="group relative flex flex-col gap-3.5 border-b border-hairline px-6 py-7 transition-colors duration-300 last:border-b-0 hover:bg-surface-card md:border-b-0 lg:border-r lg:last:border-r-0 md:[&:nth-child(1)]:border-b lg:[&:nth-child(1)]:border-b-0 md:[&:nth-child(2)]:border-b lg:[&:nth-child(2)]:border-b-0 md:[&:nth-child(odd)]:border-r md:[&:nth-child(odd)]:border-hairline lg:[&:nth-child(odd)]:border-r"
            >
              <span
                aria-hidden
                className="absolute top-0 left-0 h-px w-6 bg-ink transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full motion-reduce:transition-none"
              />
              <span className="eyebrow text-muted-ink">{step.k}</span>
              <h3 className="text-lg leading-[1.25] font-medium tracking-[-0.01em]">
                {t(step.t)}
              </h3>
              <p className="text-sm leading-[1.55] text-body">{t(step.d)}</p>
            </Reveal>
          ))}
        </RevealGroup>
      </SectionShell>
    </section>
  )
}
