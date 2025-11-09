// src/app/chat/page.tsx
import CryptoChatbot from "@/components/CryptoChatbot";

export default function Page() {
  return (
    <div className="min-h-screen py-16 px-4 flex flex-col items-center w-full">
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center md:items-start gap-12">
        
        <header className="md:w-1/2 max-w-3xl text-center md:text-left space-y-4">
          <h1
            className="font-rubik
                      text-4xl sm:text-6xl md:text-6xl lg:text-7xl
                      leading-[0.9] text-white"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-emerald-300">
              TelemetryAI
            </span>
          </h1>

          <p className="text-neutral-300 text-base sm:text-lg md:text-xl leading-relaxed">
            A crypto-native AI assistant powered by RAG Google Generative AI integrated with live CoinGecko market feeds.
            Ask real-time questions about price trends, market caps, volatility,
            and trading insights across the Web3 ecosystem.
          </p>

          {/* Disclaimer */}
          <p className="text-neutral-500 text-xs sm:text-sm italic">
            ⚠️ TelemetryAI provides automated AI-generated insights using public
            market feeds. Information may be inaccurate, delayed, or incomplete.
            It is not investment advice. Always verify independently and read our
            Terms & Conditions.
          </p>
        </header>

        {/* Right Chatbot */}
        <div className="md:w-1/2 w-full">
          <CryptoChatbot />
        </div>
      </div>
    </div>
  );
}
