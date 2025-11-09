// src/app/api/chatbot/route.ts
import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import type { TokenMarket } from '@/app/api/market/route'

/** ENV + model */
const apiKey = process.env.GEMINI_API_KEY
const model = 'gemini-2.0-flash' as const

/** Small, typed pick */
const pick = <T extends object, K extends readonly (keyof T)[]>(
  obj: T,
  keys: K
): Pick<T, K[number]> => {
  const out = {} as Pick<T, K[number]>
  for (const k of keys) out[k] = obj[k]
  return out
}

/** Fields we send to the model (keep it lean) */
const fields = [
  'id',
  'symbol',
  'name',
  'current_price',
  'market_cap',
  'market_cap_rank',
  'total_volume',
  'circulating_supply',
  'price_change_percentage_1h_in_currency',
  'price_change_percentage_24h_in_currency',
  'price_change_percentage_7d_in_currency',
] as const satisfies readonly (keyof TokenMarket)[]

type SnapshotRow = Pick<TokenMarket, (typeof fields)[number]>

async function getMarketSnapshot(vs: string): Promise<SnapshotRow[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/market?vs=${vs}&per_page=50`,
    {
      // On Vercel, absolute URL is not needed; on localhost, set NEXT_PUBLIC_BASE_URL=http://localhost:3000
      cache: 'no-store',
    }
  )
  if (!res.ok) throw new Error('market fetch failed')
  const list = (await res.json()) as TokenMarket[]
  return list.map((t) => pick(t, fields))
}

function sysPrompt(vs: string) {
  return `You are a concise crypto trading assistant.
- Use ONLY the provided market snapshot (fresh CoinGecko data) as ground truth for prices and 1h/24h/7d %.
- Quote prices in ${vs.toUpperCase()} and include timestamps if the user asks about "now".
- When asked for ideas, provide balanced answer: quick summary, bullish and bearish points, and a simple risk note.
- If a symbol isn't in the snapshot, say you don't have it right now and suggest checking again.
- Keep answers short by default (<= 8 sentences) unless the user asks for more.
- Where useful, include small tables in HTML (no markdown).`
}

/**
 * POST /api/chatbot
 * body: { message: string; vs?: string }
 */
export async function POST(req: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing GEMINI_API_KEY' }, { status: 500 })
    }

    const { message, vs = 'usd' } = (await req.json()) as {
      message: string
      vs?: string
    }

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 })
    }

    // Fresh market snapshot to ground answers
    const snapshot = await getMarketSnapshot(vs)
    const timestamp = new Date().toISOString()

    // Initialize Google Gen AI (new SDK)
    const ai = new GoogleGenAI({ apiKey })

    // Build contents. We put our “system” guidance first,
    // then the market snapshot, then the user’s message.
    // (The SDK accepts strings or structured parts.)
// Build mutable parts array (no `as const`)
const contents: { text: string }[] = [
  { text: sysPrompt(vs) },
  {
    text:
      `Market snapshot (${vs.toUpperCase()}), ISO time: ${timestamp}\n` +
      JSON.stringify(snapshot, null, 2),
  },
  { text: message },
]

const response = await ai.models.generateContent({
  model,
  contents, // OK: mutable PartUnion[]
  generationConfig: {
    temperature: 0.3,
    topP: 0.9,
    maxOutputTokens: 1024,
  },
})


    // The SDK exposes a convenient .text accessor
    const text = response.text

    return NextResponse.json({
      ok: true,
      vs,
      timestamp,
      result: text,
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
