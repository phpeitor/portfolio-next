"use client"

import { Card } from "@/components/ui/card"
import { CAPABILITY_ICONS } from "@/components/capability-icons"
import { Reveal, RevealGroup } from "@/components/reveal"
import { SectionHead, SectionShell } from "@/components/section-shell"
import { CAPABILITIES } from "@/lib/content"
import { useLanguage } from "@/components/language-provider"

export function Capabilities(): React.ReactElement {
  const { t } = useLanguage()
  return (
    <section id="capabilities" aria-labelledby="cap-h" className="section-band">
      <SectionShell>
        <SectionHead
          stacked
          numeral="02"
          label={t("Capabilities")}
          aside={t("What I do")}
          titleId="cap-h"
          title={t("Three practices that compound engineering, AI systems, and interface design.")}
        />

        <RevealGroup className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((cap, i) => {
            const Icon = CAPABILITY_ICONS[i]
            return (
              <Reveal key={cap.title}>
                <Card className="group flex h-full flex-col gap-5 rounded-lg border border-hairline bg-surface-card p-7 ring-0 transition-colors hover:border-hairline-strong">
                  <div className="flex items-start justify-between">
                    <span className="size-14 text-muted-ink transition-colors duration-300 group-hover:text-ink">
                      <Icon />
                    </span>
                    <span className="eyebrow text-muted-ink">{cap.num}</span>
                  </div>
                  <h3 className="text-[1.625rem] tracking-[-0.0125em]">
                    {t(cap.title)}
                  </h3>
                  <p className="text-[15px] leading-[1.6] text-body">
                    {t(cap.body)}
                  </p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-hairline-soft pt-4">
                    {cap.items.map((item) => (
                      <li
                        key={item}
                        className="mono-bullet flex items-center gap-2 font-mono text-[11px] text-ink"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            )
          })}
        </RevealGroup>
      </SectionShell>
    </section>
  )
}
