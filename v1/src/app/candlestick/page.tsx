"use client";

import { Maximize2, Minimize2, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Popular cryptocurrency symbols for easy access
const POPULAR_CRYPTOS = [
  { symbol: "BTCUSD", name: "Bitcoin" },
  { symbol: "ETHUSD", name: "Ethereum" },
  { symbol: "BNBUSD", name: "BNB" },
  { symbol: "SOLUSD", name: "Solana"},
  { symbol: "ADAUSD", name: "Cardano"},
  { symbol: "XRPUSD", name: "XRP"},
  { symbol: "DOTUSD", name: "Polkadot"},
  { symbol: "AVAXUSD", name: "Avalanche"},
];

export default function CryptoChart() {
  const [currentSymbol, setCurrentSymbol] = useState("BTCUSD");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);

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
    if (!isScriptLoaded || !chartContainerRef.current) return;

    if (widgetRef.current) {
      widgetRef.current.remove();
    }
    chartContainerRef.current.innerHTML = "";

    widgetRef.current = new window.TradingView.widget({
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
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      className={`bg-neutral-900 border border-neutral-800 rounded-lg shadow-lg text-white ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none" : "relative"
      }`}
    >
      {/* Header with controls */}
      <div className="bg-neutral-800 p-6 border-b border-neutral-700">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <header className="space-y-2">
       <h1
            className="font-rubik
                      text-4xl sm:text-2xl md:text-2xl lg:text-3xl
                      leading-[0.9] text-white"
          >
            <span className=" bg-clip-text text-red-500">
              Telemetry CandleStick
            </span>
          </h1>
            <p className="text-sm text-neutral-400">
              Visualize real-time candlestick data for popular cryptocurrencies
              using TradingView`s 3rd-party charting engine. Useful for analyzing
              live price movements, trends, and volatility.
            </p>
            <p className="text-xs text-neutral-600 italic">
              ⚠️ Currently in early stage with 3rd-party embed. Chart data may
              be limited or delayed.
            </p>
          </header>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {/* Search form */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Enter crypto symbol"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-neutral-700 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm w-full sm:w-48 text-white placeholder-neutral-400"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors text-sm whitespace-nowrap"
              >
                Search
              </button>
            </form>

            {/* Fullscreen toggle */}
            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-2 px-3 py-2 bg-neutral-700 text-neutral-200 rounded-md hover:bg-neutral-600 transition-colors text-sm"
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

        {/* Popular crypto buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          {POPULAR_CRYPTOS.map((crypto) => (
            <button
              key={crypto.symbol}
              onClick={() => handleSymbolChange(crypto.symbol)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                currentSymbol === crypto.symbol
                  ? "bg-emerald-600 text-white"
                  : "bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
              }`}
            >
              {crypto.name}
            </button>
          ))}
        </div>
      </div>

      {/* Chart container */}
      <div
        className={`bg-neutral-900 ${
          isFullscreen ? "h-[calc(100vh-200px)]" : "h-[500px]"
        }`}
      >
        <div
          ref={chartContainerRef}
          id="tradingview-chart"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
