"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ListIcon, XIcon } from "@phosphor-icons/react"

import { NAV_LINKS } from "@/lib/content"
import { cn } from "@/lib/utils"

type Variant = "overlay" | "solid"

const VARIANT_STYLES: Record<
  Variant,
  {
    header: string
    wordmark: string
    nav: string
    navLink: string
    action: string
    /** Hamburger / close trigger shown on small screens. */
    trigger: string
    /** Mobile dropdown panel surface. */
    panel: string
    /** Links inside the mobile panel. */
    panelLink: string
    /** Hairline divider inside the mobile panel. */
    panelDivider: string
  }
> = {
  overlay: {
    header: "",
    wordmark: "text-overlay-cream",
    nav: "text-overlay-cream/95",
    navLink: "hover:text-overlay-cream",
    action:
      "border-overlay-cream/55 bg-overlay-ink/55 text-overlay-cream backdrop-blur-[6px] hover:bg-overlay-ink/70",
    trigger:
      "border-overlay-cream/55 bg-overlay-ink/55 text-overlay-cream backdrop-blur-[6px] hover:bg-overlay-ink/70",
    panel:
      "border-overlay-cream/15 bg-overlay-ink/85 text-overlay-cream backdrop-blur-xl",
    panelLink: "text-overlay-cream/85 hover:text-overlay-cream",
    panelDivider: "bg-overlay-cream/12",
  },
  solid: {
    header: "border-b border-hairline bg-canvas/85 backdrop-blur",
    wordmark: "text-ink",
    nav: "text-body",
    navLink: "hover:text-ink",
    action:
      "border-hairline-strong bg-surface-card text-ink hover:bg-surface-strong",
    trigger:
      "border-hairline-strong bg-surface-card text-ink hover:bg-surface-strong",
    panel: "border-hairline bg-canvas/95 text-ink backdrop-blur-xl",
    panelLink: "text-body hover:text-ink",
    panelDivider: "bg-hairline",
  },
}

export function SiteHeader(): React.ReactElement {
  const prefersReducedMotion = useReducedMotion()
  const [menuOpen, setMenuOpen] = React.useState(false)
  // Overlay while the hero is on screen (cream type over the video), solid once
  // the hero scrolls past (ink type on a blurred canvas bar). The page renders
  // the hero with id="hero"; on routes without one we default to solid.
  const [solid, setSolid] = React.useState(false)
  const styles = VARIANT_STYLES[solid ? "solid" : "overlay"]

  React.useEffect(() => {
    const hero = document.getElementById("hero")
    if (!hero) {
      // No hero on this route → show the solid bar. Deferred a frame so we're
      // not calling setState synchronously inside the effect body.
      const raf = requestAnimationFrame(() => setSolid(true))
      return () => cancelAnimationFrame(raf)
    }
    // Trigger line sits at the header's bottom edge (~80px): the hero stops
    // intersecting — and the bar turns solid — the moment its bottom scrolls
    // above the header.
    const observer = new IntersectionObserver(
      ([entry]) => setSolid(!entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px" }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  // Lock body scroll + close on Escape while the mobile menu is open.
  React.useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [menuOpen])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        styles.header
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1480px] items-center justify-between px-6 sm:px-10 lg:px-14">
        {/* Wordmark */}
        <Link
          href="/"
          aria-label="amvsoft.tech, home"
          className={cn(
            "group inline-flex items-center gap-1.5 text-[15px] font-medium tracking-[-0.01em]",
            styles.wordmark
          )}
        >
          <span>amvsoft.tech</span>
          <span
            aria-hidden
            className="size-1.5 rounded-full bg-primary transition-transform duration-500 ease-out group-hover:scale-125 group-hover:rotate-180"
          />
        </Link>

        {/* Primary nav — desktop */}
        <nav
          aria-label="Primary"
          className={cn(
            "hidden items-center gap-8 text-[13.5px] md:flex",
            styles.nav
          )}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100",
                styles.navLink
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          {/* Talk CTA — desktop only; on mobile it lives inside the menu. */}
          <Link
            href="#contact"
            className={cn(
              "hidden h-9 items-center gap-2 rounded-full border px-4 text-[13px] transition-colors md:inline-flex",
              styles.action
            )}
          >
            <span aria-hidden className="size-1.5 rounded-full bg-success" />
            <span>Let&apos;s talk</span>
          </Link>

          {/* Hamburger — mobile/tablet only */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors md:hidden",
              styles.trigger
            )}
          >
            {menuOpen ? (
              <XIcon size={18} weight="regular" />
            ) : (
              <ListIcon size={18} weight="regular" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Tap-away backdrop */}
            <motion.button
              type="button"
              aria-hidden
              tabIndex={-1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 -z-10 cursor-default bg-overlay-ink/30 md:hidden"
            />

            <motion.nav
              id="mobile-nav"
              aria-label="Primary"
              initial={
                prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }
              }
              transition={{
                duration: 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                "mx-4 mb-2 overflow-hidden rounded-2xl border p-2 sm:mx-10 md:hidden",
                styles.panel
              )}
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "block rounded-lg px-4 py-3 text-[15px] transition-colors",
                    styles.panelLink
                  )}
                >
                  {link.label}
                </Link>
              ))}

              <span
                aria-hidden
                className={cn("my-2 block h-px w-full", styles.panelDivider)}
              />

              <Link
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-4 py-3 text-[15px] transition-colors",
                  styles.panelLink
                )}
              >
                <span
                  aria-hidden
                  className="size-1.5 rounded-full bg-success"
                />
                <span>Let&apos;s talk</span>
              </Link>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
