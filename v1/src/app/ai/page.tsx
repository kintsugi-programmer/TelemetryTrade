// src/app/chat/page.tsx
import CryptoChatbot from "@/components/CryptoChatbot";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-neutral-900 to-zinc-950 py-16 px-4 flex flex-col items-center w-full relative overflow-hidden">
      {/* Background gradient accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center md:items-start gap-12 relative z-10">
        
        <header className="md:w-1/2 max-w-3xl text-center md:text-left space-y-6">
          <div>
            <h1
              className="font-rubik
                        text-5xl xs:text-5xl sm:text-6xl md:text-6xl lg:text-7xl
                        leading-[0.9] text-white mb-2
                        bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-300 bg-clip-text text-transparent"
            >
              TelemetryAI
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-emerald-300 md:mx-0 mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="space-y-4">
            <p className="text-neutral-200 text-base sm:text-lg md:text-lg leading-relaxed font-medium">
              Your AI-powered crypto analyst with real-time market intelligence.
            </p>

            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Powered by advanced Groq LLM with live CoinGecko market feeds. Ask about price trends, market caps, volatility, and trading insights across the Web3 ecosystem.
            </p>
          </div>

          {/* Features list */}
          <div className="space-y-2 pt-4">
            <div className="flex items-center gap-3 text-sm text-neutral-300">
              <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
              Real-time market data updates
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-300">
              <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
              Lightning-fast AI responses
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-300">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              Explainable insights & analysis
            </div>
          </div>

          {/* Disclaimer */}
          <div className="rounded-lg border border-yellow-900/50 bg-yellow-950/20 p-3 mt-6">
            <p className="text-yellow-700 text-xs sm:text-sm">
              ⚠️ <span className="font-semibold">Disclaimer:</span> AI-generated insights. Not investment advice. Verify independently.
            </p>
          </div>
        </header>

        {/* Right Chatbot */}
        <div className="md:w-1/2 w-full">
          <div className="rounded-2xl border border-white/10 bg-neutral-900/40 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_10px_30px_-12px_rgba(0,0,0,0.6)] overflow-hidden h-[600px] backdrop-blur-sm">
            <ErrorBoundary>
              <CryptoChatbot />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}
