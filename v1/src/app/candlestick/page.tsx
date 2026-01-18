"use client";

import { Maximize2, Minimize2, Search, MessageSquare, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CryptoChatbot from "@/components/CryptoChatbot";

/** ---- Minimal TradingView typings ---- */
type TVWidget = { remove: () => void };

type TVWidgetConfig = {
  autosize?: boolean;
  symbol: string;
  container_id: string;
  interval?: string;
  timezone?: string;
  theme?: "dark" | "light";
  style?: string | number;
  locale?: string;
  toolbar_bg?: string;
  enable_publishing?: boolean;
  hide_top_toolbar?: boolean;
  hide_legend?: boolean;
  save_image?: boolean;
  backgroundColor?: string;
};

declare global {
  interface Window {
    TradingView?: {
      widget: new (config: object) => TVWidget; // align with existing declaration
    };
  }
}


/** ---------------------------------------------- */

// Popular cryptocurrency symbols for easy access
const POPULAR_CRYPTOS = [
  { symbol: "BTCUSD", name: "Bitcoin" },
  { symbol: "ETHUSD", name: "Ethereum" },
  { symbol: "BNBUSD", name: "BNB" },
  { symbol: "SOLUSD", name: "Solana" },
  { symbol: "ADAUSD", name: "Cardano" },
  { symbol: "XRPUSD", name: "XRP" },
  { symbol: "DOTUSD", name: "Polkadot" },
  { symbol: "AVAXUSD", name: "Avalanche" },
];

export default function CryptoChart() {
  const [currentSymbol, setCurrentSymbol] = useState("BTCUSD");
  const [chatOpen, setChatOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<TVWidget | null>(null);

  useEffect(() => {
    if (window.TradingView) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      setIsScriptLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (!isScriptLoaded || !chartContainerRef.current || !window.TradingView) return;

    // Remove any existing widget safely
    try {
      if (widgetRef.current) {
        widgetRef.current.remove();
        widgetRef.current = null;
      }
    } catch (error) {
      console.warn('Widget cleanup warning:', error);
    }
    
    // Clear container
    if (chartContainerRef.current) {
      chartContainerRef.current.innerHTML = "";
    }

    // Create a new widget and assign with explicit type
    widgetRef.current = new window.TradingView.widget(
      {
        autosize: true,
        symbol: currentSymbol,
        container_id: chartContainerRef.current.id,
        interval: "1D",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#1e1e1e",
        enable_publishing: false,
        hide_top_toolbar: false,
        hide_legend: false,
        save_image: false,
        backgroundColor: "#0d0d0d",
      } satisfies TVWidgetConfig
    ) as TVWidget;

    return () => {
      try {
        if (widgetRef.current) {
          widgetRef.current.remove();
          widgetRef.current = null;
        }
      } catch (error) {
        console.warn('Widget cleanup warning:', error);
      }
    };
  }, [isScriptLoaded, currentSymbol]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const symbol = searchTerm.toUpperCase().endsWith("USD")
        ? searchTerm.toUpperCase()
        : searchTerm.toUpperCase() + "USD";
      handleSymbolChange(symbol);
    }
  };

  const handleSymbolChange = (symbol: string) => {
    setCurrentSymbol(symbol.toUpperCase());
    setSearchTerm("");
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-neutral-900 to-black text-white relative overflow-hidden">
      {/* Decorative blur blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className={`${isFullscreen ? "fixed inset-0 z-50" : "container mx-auto px-4 py-12"}`}>
        <div
          className={`bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-2xl shadow-2xl text-white relative ${
            isFullscreen ? "h-full rounded-none" : ""
          }`}
        >
          {/* Header with controls */}
          <div className="bg-neutral-800/50 p-6 border-b border-neutral-700/50">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <header className="space-y-2">
                <h1
                  className="font-rubik
                            text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                            leading-[0.9]"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400">
                    Telemetry CandleStick
                  </span>
                </h1>
                <p className="text-sm text-neutral-400">
                  Advanced technical analysis with real-time market data and professional charting tools
                </p>
                <p className="text-xs text-cyan-400/60 italic">
                  Powered by TradingView • Real-time data streams
                </p>
              </header>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                {/* Search form */}
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center gap-2"
                >
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400/60 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Enter crypto symbol"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-neutral-700/50 border border-neutral-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm w-full sm:w-48 text-white placeholder-neutral-400 backdrop-blur-sm transition"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg transition-all text-sm whitespace-nowrap font-medium shadow-lg shadow-cyan-500/25"
                  >
                    Search
                  </button>
                </form>

                {/* Fullscreen toggle */}
                <button
                  onClick={toggleFullscreen}
                  className="flex items-center gap-2 px-4 py-2 bg-neutral-700/50 text-neutral-200 rounded-lg hover:bg-neutral-600/50 transition-colors text-sm backdrop-blur-sm border border-neutral-600/50"
                >
                  {isFullscreen ? (
                    <>
                      <Minimize2 className="w-4 h-4" />
                      Exit
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-4 h-4" />
                      Fullscreen
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Popular crypto buttons */}
              <div className="flex flex-wrap gap-2 mt-4">
              {POPULAR_CRYPTOS.map((crypto) => (
                <button
                  key={crypto.symbol}
                  onClick={() => handleSymbolChange(crypto.symbol)}
                  className={`px-4 py-2 rounded-full text-sm transition-all font-medium ${
                    currentSymbol === crypto.symbol
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                      : "bg-neutral-700/50 text-neutral-300 hover:bg-neutral-600/50 border border-neutral-600/50 backdrop-blur-sm"
                  }`}
                >
                  {crypto.name}
                </button>
              ))}
              </div>

              {/* Chat Button */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setChatOpen(!chatOpen)}
                  className="bg-yellow-950 text-yellow-400 border border-yellow-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
                >
                  <span className="bg-yellow-400 shadow-yellow-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]" />
                  <span className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Chat
                  </span>
                </button>
              </div>
          </div>

          {/* Chart and Chat Grid Container */}
          <div className={`grid gap-6 ${chatOpen ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {/* Chart - Takes 2/3 on large screens when chat is open */}
            <div className={`${chatOpen ? 'lg:col-span-2' : 'col-span-1'}`}>
          <div
            className={`bg-neutral-950 ${
              isFullscreen ? "h-[calc(100vh-200px)]" : "h-[500px]"
            }`}
          >
            <div
              ref={chartContainerRef}
              id="tradingview-chart"
              className="w-full h-full rounded-b-2xl"
            />
          </div>
            </div>

            {/* Chat Panel */}
            {chatOpen && (
              <div className="lg:col-span-1 h-fit order-first lg:order-none">
                <div className="rounded-2xl border border-white/10 bg-neutral-950/40 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_10px_30px_-12px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col h-[500px] lg:h-[600px]">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-white/10 bg-neutral-900/50">
                    <h2 className="text-sm font-semibold text-white">AI Analyst</h2>
                    <button
                      onClick={() => setChatOpen(false)}
                      className="lg:hidden p-2 hover:bg-neutral-700 rounded-lg transition-colors"
                      aria-label="Close chat"
                    >
                      <X className="h-4 w-4 text-neutral-400" />
                    </button>
                  </div>
                  {/* Chat */}
                  <div className="flex-1 overflow-y-auto">
                    <CryptoChatbot />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
