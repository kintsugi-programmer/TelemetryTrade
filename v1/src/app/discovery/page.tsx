'use client'

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  PropsWithChildren,
  HTMLAttributes,
} from 'react'
import { createPortal } from 'react-dom'

/* ===========================
   Types
   =========================== */
interface Token {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number | null
  market_cap: number | null
  market_cap_rank: number | null
  total_volume: number | null
  price_change_percentage_1h_in_currency: number | null
  price_change_percentage_24h_in_currency: number | null
  price_change_percentage_7d_in_currency: number | null
  circulating_supply: number | null
  total_supply: number | null
  sparkline_in_7d?: { price: number[] }
}

type Currency = 'usd' | 'inr'

/* ===========================
   API
   =========================== */
const fetchTokens = async (currency: Currency): Promise<Token[]> => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en`,
    { cache: 'no-store' }
  )
  if (!res.ok) throw new Error('Failed to fetch tokens')
  return res.json()
}

/* ===========================
   Utils
   =========================== */
const CURRENCY_SYMBOL: Record<Currency, string> = { usd: '$', inr: '₹' }

const formatCompact = (num?: number | null, cur?: Currency): string => {
  if (num == null || Number.isNaN(num)) return '—'
  const prefix = cur ? CURRENCY_SYMBOL[cur] : ''
  if (num >= 1e12) return `${prefix}${(num / 1e12).toFixed(2)}T`
  if (num >= 1e9) return `${prefix}${(num / 1e9).toFixed(2)}B`
  if (num >= 1e6) return `${prefix}${(num / 1e6).toFixed(2)}M`
  if (num >= 1e3) return `${prefix}${(num / 1e3).toFixed(2)}K`
  return `${prefix}${num.toFixed(2)}`
}

const formatPrice = (price?: number | null, cur: Currency = 'usd'): string => {
  if (price == null || Number.isNaN(price)) return '—'
  const prefix = CURRENCY_SYMBOL[cur]
  if (price < 1) return `${prefix}${price.toFixed(6)}`
  return `${prefix}${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

const formatSupply = (supply?: number | null): string => {
  if (supply == null || Number.isNaN(supply)) return '—'
  if (supply >= 1e12) return `${(supply / 1e12).toFixed(2)}T`
  if (supply >= 1e9) return `${(supply / 1e9).toFixed(2)}B`
  if (supply >= 1e6) return `${(supply / 1e6).toFixed(2)}M`
  if (supply >= 1e3) return `${(supply / 1e3).toFixed(2)}K`
  return supply.toFixed(0)
}

/* ===========================
   Icons
   =========================== */
const ArrowUp = ({ className = '' }) => (
  <svg viewBox="0 0 20 20" className={`h-3.5 w-3.5 ${className}`} aria-hidden="true">
    <path d="M10 4l6 6H4l6-6zm0 0v12" fill="currentColor" />
  </svg>
)
const ArrowDown = ({ className = '' }) => (
  <svg viewBox="0 0 20 20" className={`h-3.5 w-3.5 ${className}`} aria-hidden="true">
    <path d="M10 16l-6-6h12l-6 6zm0 0V4" fill="currentColor" />
  </svg>
)

/* ===========================
   Tooltip system
   =========================== */
const TooltipRoot: React.FC<PropsWithChildren> = ({ children }) => <>{children}</>

type TooltipTriggerProps = PropsWithChildren<HTMLAttributes<HTMLSpanElement>>
const TooltipTrigger: React.FC<TooltipTriggerProps> = ({ children, ...rest }) => (
  <span {...rest}>{children}</span>
)

interface TooltipContentProps extends PropsWithChildren {
  open: boolean
  anchorEl: HTMLElement | null
}
const TooltipContent: React.FC<TooltipContentProps> = ({ open, anchorEl, children }) => {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)

  useEffect(() => {
    if (!open || !anchorEl) return
    const update = () => {
      const rect = anchorEl.getBoundingClientRect()
      setPos({
        top: rect.top + window.scrollY - 10,
        left: rect.left + rect.width / 2 + window.scrollX,
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [open, anchorEl])

  if (!open || !anchorEl || !pos) return null

  return createPortal(
    <div
      role="tooltip"
      className="pointer-events-none fixed z-[10000] -translate-x-1/2 -translate-y-full rounded-xl border border-white/10 bg-neutral-900/95 px-3 py-2 text-sm text-neutral-100 shadow-2xl backdrop-blur-md
                 animate-[ttIn_120ms_ease-out]"
      style={{ top: pos.top, left: pos.left }}
    >
      <style>{`@keyframes ttIn{from{opacity:.5; transform:translate(-50%,-110%) scale(.96)} to{opacity:1; transform:translate(-50%,-100%) scale(1)}}`}</style>
      {children}
    </div>,
    document.body
  )
}

const HoverCard: React.FC<PropsWithChildren<{ content: React.ReactNode; delay?: number }>> = ({
  content,
  children,
  delay = 140,
}) => {
  const [open, setOpen] = useState(false)
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const timer = useRef<number | null>(null)

  const onEnter = (e: React.MouseEvent<HTMLElement>) => {
    setAnchor(e.currentTarget)
    timer.current = window.setTimeout(() => setOpen(true), delay)
  }
  const onLeave = () => {
    if (timer.current) window.clearTimeout(timer.current)
    setOpen(false)
  }

  return (
    <TooltipRoot>
      <TooltipTrigger onMouseEnter={onEnter} onMouseLeave={onLeave}>
        <span className="inline-flex">{children}</span>
      </TooltipTrigger>
      <TooltipContent open={open} anchorEl={anchor}>
        {content}
      </TooltipContent>
    </TooltipRoot>
  )
}

/* ===========================
   Badge
   =========================== */
type BadgeIntent = 'default' | 'success' | 'danger' | 'muted'
const Badge: React.FC<PropsWithChildren<{ intent?: BadgeIntent }>> = ({ intent = 'default', children }) => {
  const map: Record<BadgeIntent, string> = {
    default: 'bg-neutral-800 text-neutral-100 border-white/10',
    success: 'bg-emerald-900/40 text-emerald-300 border-emerald-600/20',
    danger: 'bg-rose-900/40 text-rose-300 border-rose-600/20',
    muted: 'bg-neutral-800/60 text-neutral-400 border-white/10',
  }
  return <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs ${map[intent]}`}>{children}</span>
}

const PriceChangeBadge = ({ value }: { value: number | null }) => {
  if (value == null || Number.isNaN(value)) return <Badge intent="muted">—</Badge>
  const up = value >= 0
  return (
    <Badge intent={up ? 'success' : 'danger'}>
      {up ? <ArrowUp /> : <ArrowDown />}
      {up ? '+' : ''}
      {value.toFixed(2)}%
    </Badge>
  )
}

/* ===========================
   Sparkline (with hover price tooltip)
   =========================== */
const Sparkline: React.FC<{
  data?: number[]
  currency: Currency
}> = ({ data, currency }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [hover, setHover] = useState<{ x: number; y: number; v: number } | null>(null)

  const series = Array.isArray(data) && data.length > 1 ? data : undefined
  const w = 140
  const h = 56
  const pad = 6

  const { path, area, lastUp, points } = useMemo(() => {
    if (!series) return { path: '', area: '', lastUp: true, points: [] as { x: number; y: number; v: number }[] }
    const minV = Math.min(...series)
    const maxV = Math.max(...series)
    const range = maxV - minV || 1
    const pts = series.map((v, i) => {
      const x = (i / (series.length - 1)) * (w - pad * 2) + pad
      const y = h - ((v - minV) / range) * (h - pad * 2) - pad
      return { x, y, v }
    })
    const p = pts.reduce((acc, pt, i) => (i ? `${acc} L ${pt.x} ${pt.y}` : `M ${pt.x} ${pt.y}`), '')
    const a = `${p} L ${w - pad} ${h - pad} L ${pad} ${h - pad} Z`
    const up = series[series.length - 1] >= series[0]
    return { path: p, area: a, lastUp: up, points: pts }
  }, [series])

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!points.length || !containerRef.current) return
    const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect()
    const mx = e.clientX - rect.left
    let nearest = points[0]
    let dmin = Infinity
    for (const p of points) {
      const d = Math.abs(p.x - mx)
      if (d < dmin) {
        dmin = d
        nearest = p
      }
    }
    setHover(nearest)
  }

  const onLeave = () => setHover(null)

  const stroke = lastUp ? 'stroke-emerald-400' : 'stroke-rose-400'
  const fill = lastUp ? 'fill-emerald-500/10' : 'fill-rose-500/10'

  const PriceTooltip = () =>
    hover ? (
      <div
        className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-2 rounded-md border border-white/10 bg-neutral-900/95 px-2 py-1 text-xs text-neutral-100 shadow-lg"
        style={{ left: hover.x, top: hover.y }}
      >
        {formatPrice(hover.v, currency)}
      </div>
    ) : null

  return (
    <div ref={containerRef} className="relative h-14 w-36">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="absolute inset-0 h-full w-full"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {area && <path d={area} className={fill} />}
        {path && <path d={path} className={stroke} strokeWidth="1.6" fill="none" />}
        {hover && (
          <>
            <line x1={hover.x} x2={hover.x} y1={pad} y2={h - pad} className="stroke-white/20" strokeWidth="1" />
            <circle cx={hover.x} cy={hover.y} r="2.8" className="fill-white" />
          </>
        )}
      </svg>
      <PriceTooltip />
    </div>
  )
}

/* ===========================
   Main Page
   =========================== */
type SortKey = 'rank' | 'name' | 'price' | 'h1' | 'h24' | 'd7' | 'mcap' | 'vol' | 'supply'

const Page: React.FC = () => {
  const [currency, setCurrency] = useState<Currency>('usd')
  const [tokens, setTokens] = useState<Token[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<number | null>(null)

  const [query, setQuery] = useState('')
  const [density, setDensity] = useState<'comfortable' | 'compact'>('comfortable')
  const [sortKey, setSortKey] = useState<SortKey>('rank')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const load = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchTokens(currency)
      setTokens(data)
      setLastUpdated(Date.now())
    } catch (e: any) {
      setError(e?.message ?? 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [currency])

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    const id = setInterval(load, 60_000)
    return () => clearInterval(id)
  }, [load])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const base = q
      ? tokens.filter(t => t.name.toLowerCase().includes(q) || t.symbol.toLowerCase().includes(q))
      : tokens

    const safe = (v: any) => (v == null || Number.isNaN(v) ? -Infinity : v)
    const cmp = (a: Token, b: Token): number => {
      switch (sortKey) {
        case 'rank': return safe(a.market_cap_rank) - safe(b.market_cap_rank)
        case 'name': return a.name.localeCompare(b.name)
        case 'price': return safe(a.current_price) - safe(b.current_price)
        case 'h1': return safe(a.price_change_percentage_1h_in_currency) - safe(b.price_change_percentage_1h_in_currency)
        case 'h24': return safe(a.price_change_percentage_24h_in_currency) - safe(b.price_change_percentage_24h_in_currency)
        case 'd7': return safe(a.price_change_percentage_7d_in_currency) - safe(b.price_change_percentage_7d_in_currency)
        case 'supply': return safe(a.circulating_supply) - safe(b.circulating_supply)
        case 'mcap': return safe(a.market_cap) - safe(b.market_cap)
        case 'vol': return safe(a.total_volume) - safe(b.total_volume)
      }
    }
    const sorted = [...base].sort((a, b) => {
      const v = cmp(a, b)
      return sortDir === 'asc' ? v : -v
    })
    return sorted
  }, [tokens, query, sortKey, sortDir])

  const densityRow = density === 'compact' ? 'py-2' : 'py-4'

  const HeaderCell: React.FC<PropsWithChildren<{ k: SortKey }>> = ({ k, children }) => (
    <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
      <button
        className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5 hover:bg-white/5 focus:outline-none"
        onClick={() => {
          if (sortKey === k) setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
          else { setSortKey(k); setSortDir(k === 'rank' ? 'asc' : 'desc') }
        }}
      >
        <span>{children}</span>
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 opacity-60" aria-hidden="true">
          <path d="M7 10h10v2H7v-2zm-4 6h14v2H3v-2zm8-12h6v2h-6V4z" fill="currentColor" />
        </svg>
      </button>
    </th>
  )

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-neutral-950/70 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/55">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-[0_0_20px_-6px] shadow-cyan-400/40" />
              <div className="flex flex-col leading-tight">
                <span className="text-sm text-neutral-400">TelementryTrade</span>
                <h1 className="text-lg font-semibold tracking-tight">Token Discovery</h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 rounded-xl border border-white/10 bg-neutral-900 px-3 py-2">
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search by name or symbol…"
                  className="w-64 bg-transparent text-sm outline-none placeholder:text-neutral-500"
                />
              </div>

              <HoverCard content={<div className="text-xs text-neutral-300">Choose pricing currency. Data refetches instantly.</div>}>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="rounded-lg border border-white/10 bg-neutral-900 px-3 py-2 text-sm outline-none hover:bg-neutral-800/60"
                  aria-label="Currency"
                >
                  <option value="usd">USD</option>
                  <option value="inr">INR</option>
                </select>
              </HoverCard>

              <HoverCard content={<div className="text-xs text-neutral-300">Row density</div>}>
                <button
                  onClick={() => setDensity(d => (d === 'compact' ? 'comfortable' : 'compact'))}
                  className="rounded-lg border border-white/10 bg-neutral-900 px-3 py-2 text-sm hover:bg-neutral-800/60"
                >
                  {density === 'compact' ? 'Compact' : 'Comfort'}
                </button>
              </HoverCard>

              <HoverCard content={<div className="text-xs text-neutral-300">Refresh now</div>}>
                <button
                  onClick={load}
                  className="rounded-lg border border-white/10 bg-neutral-900 px-3 py-2 text-sm hover:bg-neutral-800/60"
                >
                  Refresh
                </button>
              </HoverCard>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* Status */}
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
          <Badge intent="muted">Live • 60s auto-refresh</Badge>
          <Badge intent="muted">Last update: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : '—'}</Badge>
          <Badge intent="default">{filtered.length} assets</Badge>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/40 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_10px_30px_-12px_rgba(0,0,0,0.6)]">
          {error ? (
            <div className="flex min-h-[420px] items-center justify-center p-10 text-center">
              <div>
                <p className="mb-1 text-rose-400">Failed to load token data</p>
                <p className="text-sm text-neutral-400">Please try again or switch currency.</p>
              </div>
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <HeaderCell k="rank">#</HeaderCell>
                    <HeaderCell k="name">Name</HeaderCell>
                    <HeaderCell k="price">Price</HeaderCell>
                    <HeaderCell k="h1">1h %</HeaderCell>
                    <HeaderCell k="h24">24h %</HeaderCell>
                    <HeaderCell k="d7">7d %</HeaderCell>
                    <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Last 7 Days</th>
                    <HeaderCell k="mcap">Market Cap</HeaderCell>
                    <HeaderCell k="vol">Volume (24h)</HeaderCell>
                    <HeaderCell k="supply">Circulating Supply</HeaderCell>
                  </tr>
                </thead>
                <tbody>
                  {loading
                    ? Array.from({ length: 12 }).map((_, i) => (
                        <tr key={i} className="border-b border-white/5">
                          {Array.from({ length: 10 }).map((__, j) => (
                            <td key={`${i}-${j}`} className={`px-4 ${densityRow}`}>
                              <div className="h-4 w-24 animate-pulse rounded bg-neutral-800/80" />
                            </td>
                          ))}
                        </tr>
                      ))
                    : filtered.map((t) => (
                        <tr key={t.id} className="border-b border-white/5 transition-colors hover:bg-white/5">
                          <td className={`px-4 ${densityRow} text-sm text-neutral-400`}>{t.market_cap_rank ?? '—'}</td>

                          <td className={`px-4 ${densityRow}`}>
                            <div className="flex items-center gap-3">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={t.image} alt={t.name} className="h-8 w-8 rounded-full" />
                              <div>
                                <div className="font-semibold">{t.name}</div>
                                <div className="text-[10px] uppercase text-neutral-400">{t.symbol}</div>
                              </div>
                            </div>
                          </td>

                          <td className={`px-4 ${densityRow} font-mono text-sm`}>
                            <HoverCard content={<div>{t.name} spot price</div>}>
                              <span className="cursor-default underline decoration-dotted underline-offset-4">
                                {formatPrice(t.current_price ?? undefined, currency)}
                              </span>
                            </HoverCard>
                          </td>

                          <td className={`px-4 ${densityRow}`}><PriceChangeBadge value={t.price_change_percentage_1h_in_currency} /></td>
                          <td className={`px-4 ${densityRow}`}><PriceChangeBadge value={t.price_change_percentage_24h_in_currency} /></td>
                          <td className={`px-4 ${densityRow}`}><PriceChangeBadge value={t.price_change_percentage_7d_in_currency} /></td>

                          <td className={`px-4 ${densityRow}`}>
                            <Sparkline data={t.sparkline_in_7d?.price} currency={currency} />
                          </td>

                          <td className={`px-4 ${densityRow} text-sm font-medium`}>
                            {formatCompact(t.market_cap ?? undefined, currency)}
                          </td>

                          <td className={`px-4 ${densityRow} text-sm`}>
                            {formatCompact(t.total_volume ?? undefined, currency)}
                          </td>

                          <td className={`px-4 ${densityRow} text-sm text-neutral-400`}>
                            {formatSupply(t.circulating_supply)} {t.symbol?.toUpperCase()}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Mobile search */}
        <div className="mt-6 md:hidden">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search assets…"
            className="w-full rounded-xl border border-white/10 bg-neutral-900 px-3 py-2 text-sm outline-none placeholder:text-neutral-500"
          />
        </div>
      </main>
    </div>
  )
}

export default Page
