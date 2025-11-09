"use client";

import { Maximize2, Minimize2, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/** ---- Minimal TradingView typings (local only) ---- */
interface TVWidget {
  remove: () => void;
}
type TVCtor = new (config: object) => TVWidget;
type WindowWithTV = Window & { TradingView?: { widget: TVCtor } };

/** Extend script element with our private flag (no `any`) */
interface TVScriptElement extends HTMLScriptElement {
  _tvLoaded?: boolean;
}

/** Popular crypto shortcuts */
const POPULAR_CRYPTOS = [
  { symbol: "BTCUSD", name: "Bitcoin" },
  { symbol: "ETHUSD", name: "Ethereum" },
  { symbol: "BNBUSD", name: "BNB" },
  { symbol: "SOLUSD", name: "Solana" },
  { symbol: "ADAUSD", name: "Cardano" },
  { symbol: "XRPUSD", name: "XRP" },
  { symbol: "DOTUSD", name: "Polkadot" },
  { symbol: "AVAXUSD", name: "Avalanche" },
] as const;

export default function CryptoChart() {
  const [currentSymbol, setCurrentSymbol] = useState("BTCUSD");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const widgetRef = useRef<TVWidget | null>(null);

  // Stable container id for TradingView
  const containerIdRef = useRef<string>(
    `tv-chart-${Math.random().toString(36).slice(2)}`
  );

  // Load TradingView tv.js exactly once (client-only)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const w = window as WindowWithTV;

    // Already available
    if (w.TradingView) {
      setIsScriptLoaded(true);
      return;
    }

    // Reuse existing script if present
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://s3.tradingview.com/tv.js"]'
    ) as TVScriptElement | null;

    if (existing) {
      if (existing._tvLoaded) {
        setIsScriptLoaded(true);
      } else {
        existing.addEventListener(
          "load",
          () => {
            existing._tvLoaded = true;
            setIsScriptLoaded(true);
          },
          { once: true }
        );
      }
      return;
    }

    // Create new script
    const script = document.createElement("script") as TVScriptElement;
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.addEventListener(
      "load",
      () => {
        script._tvLoaded = true;
        setIsScriptLoaded(true);
      },
      { once: true }
    );
    document.head.appendChild(script);
  }, []);

  // Create/update widget when script is loaded or symbol changes
  useEffect(() => {
    if (!isScriptLoaded) return;
    if (!chartContainerRef.current) return;

    const w = window as WindowWithTV;
    const TV = w.TradingView;
    if (!TV) return;

    // Clean up previous instance
    if (widgetRef.current) {
      widgetRef.current.remove();
      widgetRef.current = null;
    }

    // Clear container and create widget
    chartContainerRef.current.innerHTML = "";
    widgetRef.current = new TV.widget({
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

    // Cleanup on unmount / deps change
    return () => {
      if (widgetRef.current) {
        widgetRef.current.remove();
        widgetRef.current = null;
      }
    };
  }, [isScriptLoaded, currentSymbol]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const raw = searchTerm.trim();
    if (!raw) return;
    const upper = raw.toUpperCase();
    const symbol = upper.endsWith("USD") ? upper : `${upper}USD`;
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
            <h2 className="text-lg font-semibold text-gray-800">
              {currentSymbol}
            </h2>
            <span className="text-sm text-gray-500">
              {POPULAR_CRYPTOS.find((c) => c.symbol === currentSymbol)?.name ??
                "Cryptocurrency"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {/* Search */}
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

            {/* Fullscreen */}
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

        {/* Quick picks */}
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

      {/* Chart container */}
      <div className={`bg-white ${isFullscreen ? "h-[calc(100vh-140px)]" : "h-[500px]"}`}>
        <div
          ref={chartContainerRef}
          id={containerIdRef.current}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
