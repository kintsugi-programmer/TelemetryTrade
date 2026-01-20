import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export const runtime = "nodejs";

// Type definitions matching CoinGecko response
type CoinGeckoCoin = {
    name: string;
    symbol: string;
    current_price: number;
    market_cap: number;
    price_change_percentage_24h: number;
    price_change_percentage_1h_in_currency: number;
    price_change_percentage_7d_in_currency: number;
};

type CoinForPrompt = {
    name: string;
    symbol: string;
    current_price: number;
    price_change_24h: number;
    price_change_7d: number;
};

export async function POST(req: Request) {
    try {
        const { message, context } = (await req.json()) as { message?: string; context?: string };

        if (!message) {
            return NextResponse.json({ error: "Empty message" }, { status: 400 });
        }

        const GROQ_API_KEY = process.env.GROQ_API_KEY;
        const COINGECKO_URL = process.env.COINGECKO_URL;

        if (!GROQ_API_KEY) {
            return NextResponse.json({ error: "GROQ_API_KEY missing" }, { status: 500 });
        }

        // Fetch live market data
        let marketData = "Live market data unavailable.";
        if (COINGECKO_URL) {
            try {
                const cgRes = await fetch(COINGECKO_URL, { cache: "no-store" });
                if (cgRes.ok) {
                    const raw = (await cgRes.json()) as unknown;
                    if (Array.isArray(raw)) {
                        const coins: CoinGeckoCoin[] = raw.map((c) => ({
                            name: String((c as Record<string, unknown>).name ?? ""),
                            symbol: String((c as Record<string, unknown>).symbol ?? ""),
                            current_price: Number((c as Record<string, unknown>).current_price ?? 0),
                            market_cap: Number((c as Record<string, unknown>).market_cap ?? 0),
                            price_change_percentage_24h: Number((c as Record<string, unknown>).price_change_percentage_24h ?? 0),
                            price_change_percentage_1h_in_currency: Number((c as Record<string, unknown>).price_change_percentage_1h_in_currency ?? 0),
                            price_change_percentage_7d_in_currency: Number((c as Record<string, unknown>).price_change_percentage_7d_in_currency ?? 0),
                        }));

                        const simplified: CoinForPrompt[] = coins.slice(0, 50).map(c => ({
                            name: c.name,
                            symbol: c.symbol,
                            current_price: c.current_price,
                            price_change_24h: c.price_change_percentage_24h,
                            price_change_7d: c.price_change_percentage_7d_in_currency
                        }));

                        marketData = JSON.stringify(simplified, null, 2);
                    }
                }
            } catch (e) {
                console.error("CoinGecko Fetch Error:", e);
            }
        }

        const prompt = `
You are an expert, direct, and guidance-oriented crypto portfolio analyst.
Your goal is to provide actionable, specific advice based on the user's portfolio and REAL-TIME market conditions.
Avoid generic disclaimers. Speak like a senior trader or hedge fund manager.

**Inputs:**
1. **User's Portfolio (OCR Text):** 
"""
${context || "No portfolio text found."}
"""

2. **Live Market Data (Top 50 Coins by Market Cap):**
"""
${marketData}
"""

**User Query:** "${message}"

**Analysis Instructions:**
1. **Cross-Reference:** Match the assets found in the OCR text with the Live Market Data.
   - If a coin from the user's portfolio is in the market data, use the *current* price and *7d change* to give specific feedback (e.g., "BTC is down 5% this week, but your holding...").
2. **Specific Guidance:**
   - Don't just say "diversify". Say "You are 90% in BTC. Consider rotating into ETH or SOL which are showing X% growth."
   - Identify dead weight. If you see coins not in the top 50 or known trash, call them out.
   - If the portfolio text is messy, extract what you can and make reasonable assumptions, but note them.
3. **Tone:**
   - Professional but sharp. 
   - No fluff ("It is important to remember...").
   - Action-oriented.
4. **Structure:**
   - **Portfolio Snapshot**: Summary of recognized assets and their inferred value.
   - **Market Context**: How these assets are performing *right now* vs the market.
   - **Actionable Advice**: 3 bullet points on what to do (Buy/Sell/Hold/Rotate).
`.trim();

        const groq = new Groq({ apiKey: GROQ_API_KEY });
        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 1500,
        });

        const text = response.choices?.[0]?.message?.content ?? "No response generated.";
        return NextResponse.json({ text });

    } catch (err: unknown) {
        console.error("Portfolio API Error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
