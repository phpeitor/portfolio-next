"use client"

import { Reveal, RevealGroup } from "@/components/reveal"
import { SectionShell } from "@/components/section-shell"
import { PRACTICE_AREAS } from "@/lib/content"
import { useLanguage } from "@/components/language-provider"

export function PracticeStrip(): React.ReactElement {
  const { t } = useLanguage()
  return (
    <section
      aria-label={t("Practice areas")}
      className="border-y border-hairline py-9"
    >
      <SectionShell>
        {/* className={cn("mx-auto w-full max-w-[1240px] px-6 sm:px-10", className)} */}
        <RevealGroup
          as="ul"
          className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5 lg:gap-0"
        >
          {PRACTICE_AREAS.map((item, i) => (
            <Reveal
              as="li"
              key={item.v}
              className="flex flex-col gap-1.5 px-0 lg:px-5 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-hairline"
              style={{ paddingLeft: i === 0 ? 0 : undefined }}
            >
              <span className="eyebrow text-muted-ink uppercase">{item.k}</span>
              <span className="text-sm font-medium tracking-[-0.01em] text-ink">
                {t(item.v)}
              </span>
            </Reveal>
          ))}
        </RevealGroup>
      </SectionShell>
    </section>
  )
}
