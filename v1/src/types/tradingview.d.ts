// types/tradingview.d.ts
interface TVWidget { remove: () => void }
declare global {
  interface Window {
    TradingView?: { widget: new (config: object) => TVWidget }
  }
}
export {};
