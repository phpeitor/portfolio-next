"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRightIcon } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { Reveal, RevealGroup } from "@/components/reveal"
import { SectionHead, SectionShell } from "@/components/section-shell"
import { ABOUT_META } from "@/lib/content"
import contactCover from "@/public/assets/contact-cover-image.png"
import { useLanguage } from "@/components/language-provider"

export function Contact(): React.ReactElement {
  const { t } = useLanguage()
  return (
    <div className="relative isolate overflow-hidden">
      {/* Shared editorial backdrop behind the About + Contact bands only */}
      <Image
        src={contactCover}
        alt=""
        aria-hidden
        placeholder="blur"
        sizes="100vw"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover object-[25%] opacity-20 sm:object-top-left sm:opacity-[0.4]"
      />
      {/* Cloudy fades: melt the image into the canvas at the top + bottom edges */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-canvas via-canvas/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-canvas via-canvas/60 to-transparent" />

      {/* About band */}
      <section id="about" aria-labelledby="about-h" className="py-20 sm:py-28">
        <SectionShell>
          <SectionHead
            numeral="05"
            label="About"
            aside={t("Who")}
            titleId="about-h"
            title={t("About")}
            hiddenTitle
          />
          <RevealGroup className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            <Reveal as="blockquote" className="lg:col-span-8">
              <p className="max-w-[22ch] text-[clamp(1.5rem,2.6vw,2.125rem)] leading-[1.25] tracking-[-0.02em] text-ink">
                {t("I'm a developer who cares about both the")}{" "}
                <span className="text-ink">{t("system")}</span> {t("and the")}{" "}
                  <span className="text-ink">{t("surface")}</span>: {t("the architecture users never see, and the interface they feel every second.")}
              </p>
            </Reveal>

            <Reveal as="dl" className="border-t border-hairline lg:col-span-4">
              {ABOUT_META.map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between gap-4 border-b border-hairline py-4 font-mono text-[12.5px]"
                >
                  <dt className="text-[11px] tracking-[0.08em] text-muted-ink uppercase">
                    {t(k)}
                  </dt>
                  <dd className="text-ink">{t(v)}</dd>
                </div>
              ))}
            </Reveal>
          </RevealGroup>
        </SectionShell>
      </section>

      {/* Contact band */}
      <section
        id="contact"
        aria-labelledby="contact-h"
        className="relative py-24 sm:py-32"
      >
        <SectionShell>
          {/* Two-column shell: empty left lets the portrait breathe,
              all text lives in the right column and is right-aligned. */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <RevealGroup className="lg:col-span-7 lg:col-start-6 lg:text-right">
              <Reveal
                as="span"
                className="eyebrow flex items-center gap-3 text-muted-ink uppercase lg:justify-end"
              >
                <span>06</span>
                <span className="text-ink">{t("Contact")}</span>
              </Reveal>
              <Reveal
                as="h2"
                id="contact-h"
                className="mt-6 max-w-[18ch] text-[clamp(1.5rem,2.6vw,2.125rem)] leading-[1.25] tracking-[-0.02em] lg:ml-auto"
              >
                {t("Have an AI product, SaaS idea, or workflow worth building?")}
              </Reveal>
              <Reveal
                as="p"
                className="mt-5 max-w-[48ch] text-base text-body lg:ml-auto"
              >
                {t("Send a short brief. I'll help turn it into a focused, shippable product, usually within a couple of days, sometimes the same one.")}
              </Reveal>

              <Reveal className="mt-9 inline-flex flex-wrap gap-3 lg:justify-end">
                <Button
                  asChild
                  className="h-11 rounded-md bg-primary px-5 text-sm font-medium text-on-primary hover:bg-primary-active"
                >
                  <Link
                    href="mailto:hello@amvsoft.tech"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("Start a conversation")}
                    <ArrowUpRightIcon size={14} weight="bold" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-md border-hairline-strong bg-surface-card px-5 text-sm font-medium text-ink hover:bg-canvas-soft"
                >
                  <Link href="#">{t("Book a 20-min intro")}</Link>
                </Button>
              </Reveal>
            </RevealGroup>
          </div>
        </SectionShell>
      </section>
    </div>
  )
}
