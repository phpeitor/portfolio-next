 "use client"

import Link from "next/link"

import { SectionShell } from "@/components/section-shell"
import { FOOTER_COLUMNS } from "@/lib/content"
import { useLanguage } from "@/components/language-provider"

export function SiteFooter(): React.ReactElement {
  const { t } = useLanguage()
  const year = new Date().getFullYear()
  return (
    <footer className="bg-canvas pt-14 pb-10">
      <SectionShell>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 md:gap-x-8">
          <div className="col-span-2 md:col-span-2">
            <Link
              href="#top"
              className="inline-flex items-baseline gap-1.5 text-[15px] font-medium tracking-[-0.01em] text-ink"
            >
              <span className="size-1.5 -translate-y-px rounded-full bg-primary" />
              amvsoft.tech
            </Link>
            <p className="mt-3 max-w-[32ch] text-sm leading-[1.55] text-body">
              {t("Independent developer building AI-first SaaS products. Available for selected engagements.")}
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="caption-uppercase mb-4 text-muted-ink">
                {t(col.title)}
              </h4>
              <ul className="flex flex-col gap-2">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-body transition-colors hover:text-ink"
                    >
                      {t(label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="caption-uppercase mb-4 text-muted-ink">{t("Now")}</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li className="text-ink">Q3 2026 · 2 slots</li>
              <li className="text-body">Remote · Perú</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-hairline-soft pt-6 font-mono text-[11px] tracking-[0.06em] text-muted-ink">
          <span>
            © {year} · Designed &amp; built with care by{" "}
            <Link
              href="https://amvsoft.tech"
              className="text-body transition-colors hover:text-ink"
            >
              amvsoft.tech
            </Link>
          </span>
          <span>{t("last updated 10 / 26")}</span>
        </div>
      </SectionShell>
    </footer>
  )
}
