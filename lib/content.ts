/**
 * Centralized site copy.
 *
 * This file holds the repeating, list-shaped content rendered across the
 * portfolio — nav links, projects, capabilities, the stack, footer columns,
 * and so on. One-off strings (headlines, section intros, CTA labels) stay
 * inline in their components; only data with a repeating pattern lives here so
 * it's easy to edit, translate, or hand off in one place.
 *
 * Each export is consumed by the component named in its comment.
 */

// --- Site header ----------------------------------------------------------
// components/site-header.tsx — primary + mobile nav.
export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Approach", href: "#process" },
  { label: "Stack", href: "#stack" },
  { label: "About", href: "#about" },
] as const

// --- Practice strip -------------------------------------------------------
// components/practice-strip.tsx — the thin band of practice areas.
export const PRACTICE_AREAS = [
  { k: "01", v: "AI SaaS products" },
  { k: "02", v: "Full-stack systems" },
  { k: "03", v: "Workflow automation" },
  { k: "04", v: "Product UI" },
  { k: "05", v: "API-first architecture" },
] as const

// --- Selected work --------------------------------------------------------
// components/selected-work.tsx — the project carousel.
export type Project = {
  index: string
  title: string
  description: string
  year: string
  status: string
  tags: readonly string[]
  href: string
  image: string
  imageAlt: string
}

export const PROJECTS: readonly Project[] = [
  {
    index: "01",
    title: "AI Interior Design Platform",
    description:
      "A workflow-driven SaaS product for interior designers and architects, combining image transformation, regional processing, and public API delivery.",
    year: "2025",
    status: "Live · v3.2",
    tags: ["AI SaaS", "Image workflows", "API", "B2B"],
    href: "#",
    image: "/assets/projects/interior-design-platform.png",
    imageAlt:
      "Interior design platform UI showing a before/after room render with a materials palette and a generate-design control bar.",
  },
  {
    index: "02",
    title: "AI Headshot Generator",
    description:
      "A polished consumer and team headshot experience with model training, image editing, credits, and premium generation flows.",
    year: "2025",
    status: "Live",
    tags: ["AI Images", "Product UX", "Credits", "Teams"],
    href: "#",
    image: "/assets/projects/headshot-generator.png",
    imageAlt:
      "AI headshot generator UI with a grid of generated professional portraits, style and lighting controls, and a credits counter.",
  },
  {
    index: "03",
    title: "Automation & Agent Systems",
    description:
      "Internal tools, workflow engines, and agent-backed systems designed to reduce manual operations and speed up product execution.",
    year: "2024",
    status: "Private",
    tags: ["Automation", "Agents", "Workflows", "Infra"],
    href: "#",
    image: "/assets/projects/automation-agent-systems.png",
    imageAlt:
      "Dark automation dashboard showing an agent workflow node graph alongside a live event stream and run log.",
  },
  {
    index: "04",
    title: "Document Intelligence",
    description:
      "Extraction, classification, and review tooling that turns dense unstructured documents into structured, queryable records.",
    year: "2024",
    status: "Live",
    tags: ["NLP", "Extraction", "Review UX", "Pipelines"],
    href: "#",
    image: "/assets/projects/document-intelligence.png",
    imageAlt:
      "Document intelligence UI extracting structured fields from an invoice, with a review queue and confidence indicators.",
  },
  {
    index: "05",
    title: "Data Labeling Platform",
    description:
      "A collaborative annotation surface with quality controls, reviewer queues, and exports tuned for fast model iteration.",
    year: "2023",
    status: "Live",
    tags: ["Labeling", "Collaboration", "QA", "Tooling"],
    href: "#",
    image: "/assets/projects/data-labeling-platform.png",
    imageAlt:
      "Data labeling platform annotating a room scene with bounding boxes, a reviewer queue, and a quality score panel.",
  },
]

// --- Capabilities ---------------------------------------------------------
// components/capabilities.tsx — the three practice cards. Cards map to the
// icons in components/capability-icons.tsx by position.
export const CAPABILITIES = [
  {
    num: "— 01",
    title: "Product engineering",
    body: "End-to-end SaaS systems built for actual production load. Type-safe APIs, predictable data layers, and a frontend that survives real users without ceremony.",
    items: [
      "Next.js",
      "Hono / tRPC",
      "Postgres",
      "Drizzle",
      "Stripe",
      "Edge / Workers",
    ],
  },
  {
    num: "— 02",
    title: "AI workflow systems",
    body: "Image, text, and agent pipelines that respect latency, cost, and failure modes. The hard parts — queues, retries, observability — built in from day one.",
    items: [
      "OpenAI",
      "Replicate",
      "Vercel AI SDK",
      "Inngest",
      "Queues",
      "Vector DBs",
    ],
  },
  {
    num: "— 03",
    title: "Interface design",
    body: "Calm, opinionated product UI with restraint. Typography, hierarchy, and motion treated as engineering disciplines — not decoration applied at the end.",
    items: [
      "Design systems",
      "Tailwind",
      "Radix / shadcn",
      "Framer Motion",
      "Figma",
      "Prototyping",
    ],
  },
] as const

// --- Approach -------------------------------------------------------------
// components/approach.tsx — the four ordered process steps.
export const APPROACH_STEPS = [
  {
    k: "— Step 01",
    t: "Understand the business goal",
    d: "Before any UI or schema. What does this product change for the people using it, and how do we know it worked?",
  },
  {
    k: "— Step 02",
    t: "Design the smallest useful product",
    d: "The shortest path between a real user and a real outcome. Everything else is deferred until the core is honest.",
  },
  {
    k: "— Step 03",
    t: "Build with production architecture",
    d: "Type-safe from edge to database. Observability, retries, and migrations as first-class — not bolted on under pressure.",
  },
  {
    k: "— Step 04",
    t: "Refine until it feels effortless",
    d: "The last 20% is where products stop feeling like demos. Latency, copy, motion, edge cases — sanded down until they disappear.",
  },
] as const

// --- Stack ----------------------------------------------------------------
// components/stack.tsx — the editor-mockup panes. Each item is [name, tag].
export const STACK_PANES = [
  {
    title: "Application",
    items: [
      ["Next.js", "framework"],
      ["TypeScript", "language"],
      ["React 19", "ui"],
      ["Tailwind CSS", "styling"],
      ["Radix / shadcn", "primitives"],
    ],
  },
  {
    title: "Server & data",
    items: [
      ["Node.js / Hono", "runtime"],
      ["Postgres", "database"],
      ["Drizzle ORM", "data"],
      ["Cloudflare", "edge"],
      ["Vercel", "deploy"],
    ],
  },
  {
    title: "AI & workflows",
    items: [
      ["Vercel AI SDK", "orchestration"],
      ["OpenAI / Anthropic", "models"],
      ["Replicate", "image"],
      ["Inngest", "workflows"],
    ],
  },
  {
    title: "Infra",
    items: [
      ["Docker", "runtime"],
      ["Resend", "email"],
      ["Stripe", "payments"],
      ["PostHog / Sentry", "observability"],
    ],
  },
] as const

// --- About ----------------------------------------------------------------
// components/contact.tsx (About band) — the meta definition list. [key, value].
export const ABOUT_META = [
  ["Based", "Peru · UTC -5"],
  ["Practice", "AI-first SaaS products"],
  ["Years shipping", "6+"],
  ["Availability", "Selected product builds"],
  ["Engagements", "Fractional · Build · Advisory"],
] as const

// --- Site footer ----------------------------------------------------------
// components/site-footer.tsx — link columns. Each link is [label, href].
export const FOOTER_COLUMNS = [
  {
    title: "Site",
    links: [
      ["Work", "#work"],
      ["Capabilities", "#capabilities"],
      ["Approach", "#process"],
      ["Stack", "#stack"],
      ["About", "#about"],
    ],
  },
  {
    title: "Contact",
    links: [
      ["codebucks.agency", "mailto:codebucks27@gmail.com"],
      ["Start a project", "#contact"],
    ],
  },
  {
    title: "Social",
    links: [
      ["GitHub ↗", "https://github.com/codebucks27"],
      ["LinkedIn ↗", "https://www.linkedin.com/in/codebucks/"],
      ["X / Twitter ↗", "https://x.com/code_bucks"],
    ],
  },
] as const

// --- Token-usage widget ---------------------------------------------------
// components/widgets/token-usage.tsx — sample usage rows.
export type Vendor = "Anthropic" | "OpenAI" | "Google" | "Mistral"

export type UsageRow = {
  model: string
  vendor: Vendor
  tokens: number
  costUsd: number
}

export const TOKEN_USAGE: UsageRow[] = [
  { model: "Opus 4.7", vendor: "Anthropic", tokens: 8_230_000, costUsd: 211 },
  { model: "Sonnet 4.6", vendor: "Anthropic", tokens: 2_400_000, costUsd: 42 },
  { model: "Haiku 4.5", vendor: "Anthropic", tokens: 1_140_000, costUsd: 19 },
  { model: "GPT-5", vendor: "OpenAI", tokens: 730_000, costUsd: 12 },
]
