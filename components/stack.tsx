"use client"

import * as React from "react"
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react"

import { Card } from "@/components/ui/card"
import { Reveal, RevealGroup } from "@/components/reveal"
import { SectionHead, SectionShell } from "@/components/section-shell"
import { STACK_PANES } from "@/lib/content"
import { REVEAL_EASE, viewportOnce } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/language-provider"

// Each line fades up as the editor "reads" the file. Panes cascade, then the
// rows within each pane cascade — like a config populating top-to-bottom.
const lineItem: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: REVEAL_EASE } },
}

const paneStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
}

const lineStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

export function Stack(): React.ReactElement {
  const { t } = useLanguage()
  const reduceMotion = useReducedMotion()
  const editorRef = React.useRef<HTMLDivElement>(null)
  const editorInView = useInView(editorRef, { once: true, margin: "-80px" })
  const [timerDone, setTimerDone] = React.useState(false)
  // Reduced motion → "saved" immediately (derived); otherwise the timer below
  // flips it 900ms after the editor scrolls into view.
  const saved = reduceMotion || timerDone

  React.useEffect(() => {
    if (reduceMotion || !editorInView) return
    const id = window.setTimeout(() => setTimerDone(true), 900)
    return () => window.clearTimeout(id)
  }, [editorInView, reduceMotion])

  return (
    <section id="stack" aria-labelledby="stack-h" className="section-band">
      <SectionShell>
        <SectionHead
          stacked
          numeral="04"
          label={t("Stack")}
          aside={t("Tools / 2026")}
          titleId="stack-h"
          title={t("A small, durable toolchain I trust to take an idea all the way to production.")}
        />

        <RevealGroup className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h3 className="text-[1.625rem] tracking-[-0.0125em]">
              {t("A boring stack, on purpose.")}
            </h3>
            <p className="mt-4 max-w-[36ch] text-[15px] leading-[1.6] text-body">
              {t("Stable defaults, opinionated where it matters, and replaceable where it doesn't. The result is a product that ships faster the second time and the tenth time.")}
            </p>
          </Reveal>

          <Reveal className="lg:col-span-8">
            <Card className="overflow-hidden rounded-lg border border-hairline bg-surface-card p-0 ring-0">
              <div
                ref={editorRef}
                className="flex items-center gap-2.5 border-b border-hairline bg-canvas-soft px-4 py-3 font-mono text-[11px] text-muted-ink"
              >
                <span className="flex gap-1.5" aria-hidden>
                  <span className="size-2.5 rounded-full bg-term-red" />
                  <span className="size-2.5 rounded-full bg-term-yellow" />
                  <span className="size-2.5 rounded-full bg-term-green" />
                </span>
                <span className="ml-1.5 tracking-[0.04em]">
                  ~/metadatape.com / stack.config.ts
                </span>
                <span className="ml-auto flex items-center gap-1.5 text-muted-soft">
                  <motion.span
                    aria-hidden
                    className={cn(
                      "h-1.5 w-1.5 rounded-full transition-colors duration-300",
                      saved ? "bg-success" : "bg-hairline-strong"
                    )}
                    animate={
                      !reduceMotion && saved
                        ? { scale: [1, 1.5, 1] }
                        : undefined
                    }
                    transition={{ duration: 0.4, ease: REVEAL_EASE }}
                  />
                  {saved ? t("saved") : t("editing")}
                </span>
              </div>
              <motion.div
                variants={paneStagger}
                initial={reduceMotion ? false : "hidden"}
                whileInView={reduceMotion ? undefined : "show"}
                viewport={viewportOnce}
                className="grid grid-cols-1 divide-y divide-hairline md:grid-cols-2 md:divide-y-0"
              >
                {STACK_PANES.map((pane, i) => (
                  <motion.div
                    key={pane.title}
                    variants={lineStagger}
                    className={
                      "group/pane p-6 " +
                      (i % 2 === 0 ? "md:border-r md:border-hairline " : "") +
                      (i >= 2 ? "md:border-t md:border-hairline" : "")
                    }
                  >
                    <motion.div
                      variants={lineItem}
                      className="eyebrow mb-3.5 flex items-center gap-2 text-muted-ink uppercase transition-colors group-hover/pane:text-ink before:h-1.5 before:w-1.5 before:rounded-full before:bg-hairline-strong before:transition-colors before:content-[''] group-hover/pane:before:bg-ink"
                    >
                      {pane.title}
                    </motion.div>
                    <motion.ul
                      variants={lineStagger}
                      className="flex flex-col gap-2"
                    >
                      {pane.items.map(([name, tag]) => (
                        <motion.li
                          key={name}
                          variants={lineItem}
                          className="group/row flex items-baseline gap-2 font-mono text-[13px] text-ink"
                        >
                          <span>{name}</span>
                          <span className="ml-auto text-[10px] tracking-[0.08em] text-muted-ink uppercase transition-colors group-hover/row:text-ink">
                            {tag}
                          </span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                ))}
              </motion.div>
            </Card>
          </Reveal>
        </RevealGroup>
      </SectionShell>
    </section>
  )
}
