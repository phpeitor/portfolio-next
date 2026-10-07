import type { Metadata } from "next"

import { Approach } from "@/components/approach"
import { Capabilities } from "@/components/capabilities"
import { Contact } from "@/components/contact"
import { Hero } from "@/components/hero"
import { PracticeStrip } from "@/components/practice-strip"
import { SelectedWork } from "@/components/selected-work"
import { Stack } from "@/components/stack"
import { getLocation } from "@/lib/location"
import { getWeather } from "@/lib/weather"
import { getModelRankings } from "@/lib/model-rankings"

const title = "Full-stack engineer, AI-first"
const description =
  "Full-stack engineer designing and shipping AI-native software from the inference layer to the last interaction."

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "amvsoft.tech",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1665,
        height: 983,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@amvsofttech",
    images: ["/og.png"],
  },
}

export default async function Page(): Promise<React.ReactElement> {
  // Resolve the visitor's location, then their weather — both server-side, so
  // the hero receives ready-to-render, serializable props (no client fetching).
  const location = await getLocation()
  const weather = await getWeather(location)
  const modelRankings = await getModelRankings()

  return (
    <main className="relative">
      <Hero location={location} weather={weather} modelRankings={modelRankings} />
      <PracticeStrip />
      <SelectedWork />
      <Capabilities />
      <Approach />
      <Stack />
      <Contact />
    </main>
  )
}
