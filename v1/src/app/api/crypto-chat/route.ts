// src/app/api/crypto-chat/route.ts
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

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

export async function POST(req: Request) {
  try {
    const { message } = (await req.json()) as { message?: string };
    if (!message || !message.trim()) {
      return NextResponse.json({ error: "Empty message" }, { status: 400 });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const COINGECKO_URL = process.env.COINGECKO_URL;

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY missing in env" },
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
    const coins = (await cgRes.json()) as any[];

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

    const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // Safely extract text
    const text =
      response.candidates?.[0]?.content?.parts
        ?.map((p: any) => p?.text ?? "")
        .join("") ?? "I couldn't generate a response.";

    return NextResponse.json({ text });
  } catch (err: any) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
