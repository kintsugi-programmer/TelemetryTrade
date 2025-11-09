"use client"

import type React from "react"
import { useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
} from "recharts"

interface ChartModalProps {
  open: boolean
  onClose: () => void
  tokenName: string
  tokenSymbol: string
  /** 7-day sparkline as prices in USD */
  priceData?: number[]
  currency: "usd" | "inr"
  /** Optional image url for header avatar (can pass your token image) */
  tokenImageUrl?: string
}

const USD_TO_INR_RATE = 83.5 // keep in sync with your page if you centralize this

const chip =
  "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] tracking-wide"

export const ChartModal: React.FC<ChartModalProps> = ({
  open,
  onClose,
  tokenName,
  tokenSymbol,
  priceData,
  currency,
  tokenImageUrl,
}) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  const chartData = useMemo(() => {
    if (!priceData || priceData.length === 0) return []
    // map evenly to 7 days: Day 0 .. Day 7
    return priceData.map((price, index) => {
      const day = Math.floor((index / (priceData.length - 1)) * 7)
      const usd = Number.parseFloat(price.toFixed(Math.abs(price) < 1 ? 6 : 2))
      const inr = Number.parseFloat((price * USD_TO_INR_RATE).toFixed(Math.abs(price * USD_TO_INR_RATE) < 1 ? 6 : 2))
      return { day: `Day ${day}`, usd, inr }
    })
  }, [priceData])

  const [minPrice, maxPrice, avgPrice] = useMemo(() => {
    if (!chartData.length) return [0, 0, 0]
    const mins = chartData.map((d) => Math.min(d.usd, d.inr))
    const maxs = chartData.map((d) => Math.max(d.usd, d.inr))
    const min = Math.min(...mins)
    const max = Math.max(...maxs)
    const avg =
      chartData.reduce((acc, d) => acc + (currency === "usd" ? d.usd : d.inr), 0) / chartData.length
    return [min, max, avg]
  }, [chartData, currency])

  // domain padding
  const [yMin, yMax] = useMemo(() => {
    if (!chartData.length) return [0, 100]
    const seriesKey = currency === "usd" ? "usd" : "inr"
    const vals = chartData.map((d) => d[seriesKey])
    const min = Math.min(...vals)
    const max = Math.max(...vals)
    const pad = (max - min) * 0.08 || (min || 1) * 0.08
    return [min - pad, max + pad]
  }, [chartData, currency])

  const formatMoney = (v: number) =>
    currency === "usd"
      ? `$${v < 1 ? v.toFixed(6) : v.toLocaleString("en-US", { maximumFractionDigits: 2 })}`
      : `₹${v < 1 ? v.toFixed(6) : v.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`

  if (!open || !mounted) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-5xl rounded-2xl border border-white/10 bg-neutral-950/80 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_20px_60px_-20px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}

            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {tokenName}{" "}
                <span className="ml-2 align-middle text-xs uppercase text-neutral-400">
                  ({tokenSymbol?.toUpperCase()})
                </span>
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className={`${chip} bg-neutral-800/60 text-neutral-200 border-white/10`}>
                  7-Day Price • Sparkline
                </span>
                <span
                  className={`${chip} ${
                    currency === "usd"
                      ? "bg-blue-500/10 text-blue-300 border-blue-400/20"
                      : "bg-orange-500/10 text-orange-300 border-orange-400/20"
                  }`}
                >
                  Base currency: {currency.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 bg-neutral-900 px-4 py-2 text-sm text-white hover:bg-neutral-800/70 active:scale-[0.99]"
            aria-label="Close"
          >
            Close
          </button>
        </div>

        {/* Chart */}
        {chartData.length ? (
          <div className="rounded-xl border border-white/10 bg-neutral-950/50 p-4">
            <ResponsiveContainer width="100%" height={420}>
              <ComposedChart
                data={chartData}
                margin={{ top: 10, right: 24, left: 8, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis
                  dataKey="day"
                  stroke="rgba(255,255,255,0.5)"
                  tick={{ fontSize: 12 }}
                  tickMargin={8}
                />
                {/* Left Y for USD, Right for INR; we still render both for legend tooltips */}
                <YAxis
                  yAxisId="left"
                  domain={currency === "usd" ? [yMin, yMax] : ["auto", "auto"]}
                  stroke="rgba(59,130,246,0.6)"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v) => `$${v < 1 ? v.toFixed(4) : v.toFixed(2)}`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={currency === "inr" ? [yMin, yMax] : ["auto", "auto"]}
                  stroke="rgba(249,115,22,0.6)"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v) => `₹${v < 1 ? v.toFixed(4) : v.toFixed(2)}`}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(23,23,23,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 10,
                  }}
                  labelStyle={{ color: "rgba(255,255,255,0.8)" }}
                  formatter={(value: number, key) => {
                    const isUsd = key.toString().toLowerCase() === "usd"
                    const v =
                      isUsd
                        ? (value as number)
                        : (value as number)
                    return [
                      isUsd
                        ? `$${v < 1 ? v.toFixed(6) : v.toLocaleString("en-US", { maximumFractionDigits: 2 })}`
                        : `₹${v < 1 ? v.toFixed(6) : v.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`,
                      isUsd ? "Price (USD)" : "Price (INR)",
                    ]
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: 8 }}
                  formatter={(v) =>
                    v === "usd" ? "USD" : "INR"
                  }
                />

                {/* Areas for subtle fill */}
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="usd"
                  stroke="transparent"
                  fill="rgba(59,130,246,0.10)"
                  isAnimationActive
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="inr"
                  stroke="transparent"
                  fill="rgba(249,115,22,0.10)"
                  isAnimationActive
                />

                {/* Main lines — emphasize selected currency */}
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="usd"
                  stroke={currency === "usd" ? "rgb(59,130,246)" : "rgba(59,130,246,0.45)"}
                  strokeWidth={currency === "usd" ? 2.2 : 1.4}
                  dot={false}
                  activeDot={{ r: 5 }}
                  name="usd"
                  isAnimationActive
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="inr"
                  stroke={currency === "inr" ? "rgb(249,115,22)" : "rgba(249,115,22,0.45)"}
                  strokeWidth={currency === "inr" ? 2.2 : 1.4}
                  dot={false}
                  activeDot={{ r: 5 }}
                  name="inr"
                  isAnimationActive
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-xl border border-white/10 bg-neutral-950/50 p-12">
            <p className="text-neutral-400">No price data available for this token</p>
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-lg border border-white/10 bg-neutral-900/60 p-4">
            <p className="text-xs text-neutral-400">Min ({currency.toUpperCase()})</p>
            <p className="mt-1 font-semibold text-blue-400">
              {formatMoney(currency === "usd" ? minPrice : minPrice * (currency === "inr" ? 1 : 1))}
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-neutral-900/60 p-4">
            <p className="text-xs text-neutral-400">Max ({currency.toUpperCase()})</p>
            <p className="mt-1 font-semibold text-emerald-400">
              {formatMoney(currency === "usd" ? maxPrice : maxPrice * (currency === "inr" ? 1 : 1))}
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-neutral-900/60 p-4">
            <p className="text-xs text-neutral-400">Average ({currency.toUpperCase()})</p>
            <p className="mt-1 font-semibold text-orange-400">{formatMoney(avgPrice)}</p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
