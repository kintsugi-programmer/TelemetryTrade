"use client";

import { Maximize2, Minimize2, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ---- Minimal TradingView typings so TS is happy ----
type TVWidget = { remove: () => void };
type TVGlobal = { widget: new (config: Record<string, unknown>) => TVWidget };

// Make window.TradingView known to TS (but optional)
declare global {
  interface Window {
    TradingView?: TVGlobal;
  }
}

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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<TVWidget | null>(null);

  // A stable, unique container id (so container_id is always valid)
  const containerIdRef = useRef(`tv-chart-${Math.random().toString(36).slice(2)}`);

  // Load tv.js once on the client
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.TradingView) {
      setIsScriptLoaded(true);
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://s3.tradingview.com/tv.js"]'
    );
    if (existing) {
      if ((existing as any)._tvLoaded) {
        setIsScriptLoaded(true);
      } else {
        existing.addEventListener("load", () => setIsScriptLoaded(true), { once: true });
      }
      return;
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.addEventListener(
      "load",
      () => {
        (script as any)._tvLoaded = true;
        setIsScriptLoaded(true);
      },
      { once: true }
    );
    document.head.appendChild(script);
  }, []);

  // Create / update widget whenever script loads or symbol changes
  useEffect(() => {
    if (!isScriptLoaded || !chartContainerRef.current) return;

    const TV = typeof window !== "undefined" ? window.TradingView : undefined;
    if (!TV) return; // still not present? bail safely.

    // Tear down previous
    if (widgetRef.current) {
      widgetRef.current.remove();
      widgetRef.current = null;
    }

    // Ensure container is clean
    chartContainerRef.current.innerHTML = "";

    // Create widget (TS knows TV is defined here)
    const WidgetCtor = TV.widget;
    widgetRef.current = new WidgetCtor({
      autosize: true,
      symbol: currentSymbol,
      container_id: containerIdRef.current,
      interval: "1D",
      timezone: "Etc/UTC",
      theme: "light",
      style: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
    });

    return () => {
      if (widgetRef.current) {
        widgetRef.current.remove();
        widgetRef.current = null;
      }
    };
  }, [isScriptLoaded, currentSymbol]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    const s = searchTerm.toUpperCase();
    const symbol = s.endsWith("USD") ? s : `${s}USD`;
    setCurrentSymbol(symbol);
    setSearchTerm("");
  };

  const toggleFullscreen = () => setIsFullscreen((v) => !v);

  return (
    <div
      className={`bg-white rounded-lg shadow-lg ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none" : "relative"
      }`}
    >
      {/* Header */}
      <div className="bg-gray-100 p-4 border-b">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-800">{currentSymbol}</h2>
            <span className="text-sm text-gray-500">
              {POPULAR_CRYPTOS.find((c) => c.symbol === currentSymbol)?.name ?? "Cryptocurrency"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Enter crypto symbol"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-full sm:w-48"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm whitespace-nowrap"
              >
                Search
              </button>
            </form>

            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-4 h-4" />
                  Exit Fullscreen
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

        <div className="flex flex-wrap gap-2 mt-4">
          {POPULAR_CRYPTOS.map((crypto) => (
            <button
              key={crypto.symbol}
              onClick={() => setCurrentSymbol(crypto.symbol)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                currentSymbol === crypto.symbol
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {crypto.name}
            </button>
          ))}
        </div>
      </div>

      <div className={`bg-white ${isFullscreen ? "h-[calc(100vh-140px)]" : "h-[500px]"}`}>
        <div ref={chartContainerRef} id={containerIdRef.current} className="w-full h-full" />
      </div>
    </div>
  );
}
