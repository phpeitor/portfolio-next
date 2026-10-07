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
    title: "Dataset Report",
    description:
      "Digital platform specializing in data management, exploration, and visualization, designed to transform complex information into structured datasets, interactive dashboards, and decision-oriented analysis tools.",
    year: "2026",
    status: "Live · v1.2",
    tags: ["AI SaaS", "charter workflows", "API", "B2B"],
    href: "#",
    image: "/assets/projects/dataset-report.png?v=2",
    imageAlt:
      "Digital platform UI showing a dataset dashboard with a table of structured records, a chart, and a map view of geospatial data.",
  },
  {
    index: "02",
    title: "Cotix360",
    description:
      "A web platform specialized in the management and automation of commercial quotes, designed to simplify cost and sales price calculations. Its flexible architecture integrates tools for managing products, commercial recipes, freight, factors, margins, and exchange rates.",
    year: "2025",
    status: "Live",
    tags: ["Web Platform", "Product UX", "Comercial", "Teams"],
    href: "#",
    image: "/assets/projects/cotix360.png?v=2",
    imageAlt:
      "Web platform UI showing a headshot generation workflow with a model training panel, image editing tools, and a credits balance.",
  },
  {
    index: "03",
    title: "Xintra Elephpant",
    description:
      "Its flexible architecture combines a responsive interface with reusable components, dynamic data visualization, and a user experience optimized for handling large volumes of data.",
    year: "2024",
    status: "Private",
    tags: ["Automation", "Agents", "Workflows", "Infra"],
    href: "#",
    image: "/assets/projects/xintra-elephpant.png?v=2",
    imageAlt:
      "Web platform UI showing an agent workflow with a queue of tasks, a task detail panel, and a chart of system metrics.",
  },
  {
    index: "04",
    title: "Marketo Ecommerce",
    description:
      "A clean, vertically menued multi-vendor e-commerce platform, perfect for your online business. Marketo's design maximizes available space in an elegant and user-friendly way to showcase a wide range of products in various formats.",
    year: "2024",
    status: "Live",
    tags: ["Bagisto", "Ecommerce", "Review UX", "Pipelines"],
    href: "#",
    image: "/assets/projects/marketo-ecommerce.png?v=2",
    imageAlt:
      "E-commerce platform UI showing a product listing with a vertical menu, product cards, and a product detail panel with images, description, and reviews.",
  },
  {
    index: "05",
    title: "Pixitor Media",
    description:
      "A digital solution specialized in professional photography, designed to create high-impact visual experiences and manage portfolios, galleries, and content delivery from a single environment.",
    year: "2023",
    status: "Live",
    tags: ["Labeling", "Collaboration", "Photography", "Tooling"],
    href: "#",
    image: "/assets/projects/pixitor-media.png?v=2",
    imageAlt:
      "Web platform UI showing a data labeling workflow with a queue of images, a labeling panel, and a chart of labeling metrics.",
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
  ["Years shipping", "10+"],
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
      ["amvsoft.tech", "mailto:admin@metadatape.com"],
      ["Start a project", "#contact"],
    ],
  },
  {
    title: "Social",
    links: [
      ["GitHub ↗", "https://github.com/phpeitor"],
      ["LinkedIn ↗", "https://www.linkedin.com/in/drphp"],
      ["X / Twitter ↗", "https://x.com/amvsoftech"],
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
