const RANKINGS_URL =
  "https://openrouter.ai/api/v1/datasets/rankings-daily?limit=50"
const REVALIDATE_SECONDS = 60 * 60

export type ModelUsageRow = {
  model: string
  vendor: string
  tokens: number
}

export type ModelRankings = {
  rows: ModelUsageRow[]
  totalTokens: number
  updatedAt: string
  sourceUrl: string
}

type OpenRouterRanking = {
  date?: string
  model_permaslug?: string
  total_tokens?: string | number
}

const VENDOR_NAMES: Record<string, string> = {
  anthropic: "Anthropic",
  openai: "OpenAI",
  google: "Google",
  meta: "Meta",
  mistralai: "Mistral",
  xai: "xAI",
  deepseek: "DeepSeek",
}

function getModelName(permaslug: string): string {
  const [, ...parts] = permaslug.split("/")
  return (parts.join("/") || permaslug).replace(/-\d{4}-\d{2}-\d{2}$/, "")
}

function getVendor(permaslug: string): string {
  const provider = permaslug.split("/")[0]?.toLowerCase()
  return VENDOR_NAMES[provider] ?? provider ?? "Other"
}

export async function getModelRankings(): Promise<ModelRankings | null> {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) return null

  try {
    const response = await fetch(RANKINGS_URL, {
      headers: { Authorization: `Bearer ${apiKey}` },
      next: { revalidate: REVALIDATE_SECONDS },
    })

    if (!response.ok) return null

    const payload = (await response.json()) as {
      data?: OpenRouterRanking[]
      meta?: { as_of?: string }
    }
    const rankings = payload.data ?? []
    const latestDate = rankings.reduce(
      (latest, row) => (row.date && row.date > latest ? row.date : latest),
      ""
    )
    const allLatestRows = rankings
      .filter((row) => !latestDate || row.date === latestDate)
      .map((row) => ({
        model: row.model_permaslug
          ? getModelName(row.model_permaslug)
          : "Unknown model",
        vendor: row.model_permaslug
          ? getVendor(row.model_permaslug)
          : "Other",
        tokens:
          typeof row.total_tokens === "number"
            ? row.total_tokens
            : Number(row.total_tokens),
      }))
      .filter((row) => Number.isFinite(row.tokens) && row.tokens > 0)
      .sort((a, b) => b.tokens - a.tokens)

    if (!allLatestRows.length) return null

    return {
      rows: allLatestRows.slice(0, 10),
      totalTokens: allLatestRows.reduce((total, row) => total + row.tokens, 0),
      updatedAt: payload.meta?.as_of ?? latestDate,
      sourceUrl: "https://openrouter.ai/rankings",
    }
  } catch {
    return null
  }
}
