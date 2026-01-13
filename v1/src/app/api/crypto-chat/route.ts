// src/app/api/crypto-chat/route.ts
import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export const runtime = "nodejs"; // keep server-side

type CoinForPrompt = {
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
};

// Minimal shape of what we read from CoinGecko
type CoinGeckoCoin = {
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
};

export async function POST(req: Request) {
  try {
    const { message } = (await req.json()) as { message?: string };
    if (!message || !message.trim()) {
      return NextResponse.json({ error: "Empty message" }, { status: 400 });
    }

    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    const COINGECKO_URL = process.env.COINGECKO_URL;

    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY missing in env" },
        { status: 500 }
      );
    }
    if (!COINGECKO_URL) {
      return NextResponse.json(
        { error: "COINGECKO_URL missing in env" },
        { status: 500 }
      );
    }

    // Fetch current market snapshot from CoinGecko
    const cgRes = await fetch(COINGECKO_URL, { cache: "no-store" });
    if (!cgRes.ok) {
      return NextResponse.json(
        { error: `CoinGecko error: ${cgRes.status}` },
        { status: 502 }
      );
    }

    // Avoid `any[]`: parse as unknown, then narrow
    const raw = (await cgRes.json()) as unknown;
    if (!Array.isArray(raw)) {
      return NextResponse.json(
        { error: "Unexpected CoinGecko response shape" },
        { status: 502 }
      );
    }
    const coins: CoinGeckoCoin[] = raw.map((c) => ({
      name: String((c as Record<string, unknown>).name ?? ""),
      symbol: String((c as Record<string, unknown>).symbol ?? ""),
      current_price: Number((c as Record<string, unknown>).current_price ?? 0),
      market_cap: Number((c as Record<string, unknown>).market_cap ?? 0),
      price_change_percentage_24h: Number(
        (c as Record<string, unknown>).price_change_percentage_24h ?? 0
      ),
      price_change_percentage_1h_in_currency: Number(
        (c as Record<string, unknown>)
          .price_change_percentage_1h_in_currency ?? 0
      ),
      price_change_percentage_7d_in_currency: Number(
        (c as Record<string, unknown>)
          .price_change_percentage_7d_in_currency ?? 0
      ),
    }));

    const simplified: CoinForPrompt[] = coins.slice(0, 20).map((c) => ({
      name: c.name,
      symbol: c.symbol,
      current_price: c.current_price,
      market_cap: c.market_cap,
      price_change_percentage_24h: c.price_change_percentage_24h,
      price_change_percentage_1h_in_currency:
        c.price_change_percentage_1h_in_currency,
      price_change_percentage_7d_in_currency:
        c.price_change_percentage_7d_in_currency,
    }));

    const prompt = `
You are an expert crypto trading analyst. Use the live market snapshot below to answer.
Be concise, practical, and avoid disclaimers. Use **bold** for coin names and key metrics.

Market Snapshot (JSON):
${JSON.stringify(simplified, null, 2)}

User Query: "${message}"
`;

    const groq = new Groq({
      apiKey: GROQ_API_KEY,
    });
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1024,
    });

    // Safely extract text from Groq response
    const text =
      response.choices?.[0]?.message?.content ?? "I couldn't generate a response.";

    return NextResponse.json({ text });
  } catch (err: unknown) {
    // No `any` here; log safely
    const msg =
      err instanceof Error ? err.message : typeof err === "string" ? err : "";
    console.error("Chat API error:", msg || err);
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
