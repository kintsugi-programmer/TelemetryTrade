# 🚀 TelemetryTrade – High-Performance Token Trading Interface

TelemetryTrade is a modern, high-performance web trading interface designed to show real-time price movement of crypto tokens. Engineered Trade Token Discovery Table and built to meet the demanding standards of low-latency traders, the project is architected with strict performance, scalability, and accessibility principles in mind.

---

## 🏢 Company

**TelemetryTrade** is your take-home assessment for a frontend developer role in a high-speed trading environment. Focused on UX performance, real-time data, and pixel-perfect design, the app demonstrates your ability to deliver production-grade code with modern tools.

**Inspired by** startups like **Axiom Trade** and **Eterna**, the goal is to build an institutional-grade trading UI in a limited-time window.

---

## ✨ Features

- ✅ Pixel-perfect recreation of Axiom Trade's token discovery table (≤ 2px diff)
- ✅ Fully responsive down to 320px width with mobile-first optimizations
- ✅ Real-time WebSocket price updates and animated row deltas (smooth green/red transitions)
- ✅ Sortable, filterable, and dynamic token table with live hover effects and modals
- ✅ Loading states including skeleton, shimmer, and progressive loading
- ✅ Performant rendering: no layout shifts, <100ms interactions, virtualized rows
- ✅ Visual-regression test compatible (e.g., Percy, Chromatic)
- ✅ Lighthouse ≥ 90 on both mobile and desktop

---

## ⚠️ Downsides (Limitations)

- ❌ Data is mocked (no real trading)
- ❌ Not production-connected to live chain APIs
- ❌ Charts (e.g. tradingview) are placeholders unless added as a bonus
- ❌ WebSocket server currently runs locally (not yet deployed cross-server for Vercel)

---

## 🔥 Extras (Optional Bonus Additions)

- 🎨 Framer motion for smooth animated transitions
- 📊 Token preview charts with Recharts or TradingView widgets
- 🔄 Token state persisted via Zustand or URL params
- ♿ Full keyboard navigation & ARIA roles for accessibility
- 🔍 Search & deep-link filters, user-configurable columns
- 🤖 Deployed WebSocket server (e.g. Fly.io or Railway)

---

## 🌐 Web Fundamentals

- **Frontend**: Next.js 14 (App Router), TypeScript (strict mode), Tailwind CSS
- **State Management**: Redux Toolkit + React Query
- **UI Components**: Radix UI / shadcn/ui / Headless UI
- **Streaming**: WebSocket (Socket.io-client mock)
- **Table**: Virtualized row rendering for 10k+ rows with no lag
- **Performance Tools**: Lighthouse, memoization, lazy-loading
- **Testing**: Jest + React Testing Library
- **Architecture**: Atomic Design (Atoms → Molecules → Organisms → Templates)
- **Styling**: Tailwind, utility-first, no inline styles
- **Documentation**: README, code comments, clean commits


```bash
# Core Libraries to Install
npm install @reduxjs/toolkit react-redux @tanstack/react-query axios socket.io-client @radix-ui/react-popover @radix-ui/react-tooltip tailwindcss @shadcn/ui class-variance-authority clsx framer-motion react-virtual
````

---

## 📦 Deliverables Overview

| Deliverable          | Requirement                               |
| -------------------- | ----------------------------------------- |
| 📁 GitHub Repo       | Clean commit history, public repo link    |
| 🌍 Vercel Deployment | Live running demo of app                  |
| 🎥 YouTube Demo      | 1–2 min public walkthrough of features    |
| 🛠️ README.md        | Architecture, setup steps, tech decisions |

✅ All deliverables **required** for completion.

---

## 🎬 YouTube Demo Guide

Your demo video should include:

1. App load → skeleton screens
2. Table → hover effects + sorting + tabs
3. Real-time price updates with transitions
4. Mobile view at 320px
5. Quick code walkthrough (optional)
6. Deployed Vercel link in description

Make it **public**, 1–2 min max.

---

## 🛠️ Project Roadmap (24–48 Hour Scope)

```plaintext
📍 PHASE 1 – Setup & Architecture
1. Initialize Next.js + TS project
2. Configure Tailwind, shadcn/ui, ESLint, Prettier
3. Add folder structure (Atomic Design)
4. Setup Redux Toolkit and React Query

📍 PHASE 2 – UI Construction
5. Build pixel-perfect token table
6. Implement tabs: "New Pairs", "Final Stretch", "Migrated"
7. Add sorting, row hover effects, modal on click
8. Build UI with Radix + Tailwind (≤ 2px diff)

📍 PHASE 3 – Real-Time + Loading States
9. Mock WebSocket server to push price updates
10. Smooth animated deltas on price changes
11. Add skeleton, shimmer, progressive loading

📍 PHASE 4 – Performance & Mobile
12. Virtualized table (without layout shifts)
13. Responsive view for 320px (horizontal scroll)
14. Lighthouse score tuning ≥ 90

📍 PHASE 5 – Deliverables
15. Push code to GitHub (clean commits)
16. Deploy app to Vercel (WebSocket fix)
17. Record 1–2mi YouTube demo (public)
18. Finalize README w/ screenshots + architecture
```

---

## 📁 Folder Structure (Atomic Architecture)

```plaintext
src/
├── app/
│   ├── page.tsx
│   └── layout.tsx
├── components/
│   ├── atoms/         # Buttons, badges, icons
│   ├── molecules/     # Rows, modals, lists
│   ├── organisms/     # Token table, filters
├── features/
│   ├── token-table/   # Redux slice, hooks
├── hooks/             # Custom queries, WS hooks
├── lib/               # Utils, constants, API
├── store/             # Redux config
├── types/             # TypeScript types
└── styles/            # Global styles
```

---

## 📝 Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm run test

# Lint code
npm run lint

# Build for production
npm run build
```

---

## 📊 Performance Checklist

* [ ] No layout shifts (CLS = 0)
* [ ] First render < 1.2s on 3G
* [ ] All interactions < 100ms
* [ ] Lighthouse > 90 mobile/desktop
* [ ] JS bundle < 200kb (unused removed)
* [ ] WebSocket client reconnect on fail

---

## 🙋‍♂️ Contributing & Support

Clone this repository, install dependencies, and start building! For bug reports or feature suggestions, open an issue on GitHub.

---

## 📜 License

MIT License © 2025 TelemetryTrade

# Notes
- Avoid Next.js 15; its forced jump to React 19 breaks half the ecosystem with dependency conflicts, while Next.js 14 stays rock-solid and production-safe.
  - or if wanna upgrade, use this overrides in config
    ```js
    "packageManager": "npm@10.5.2",
    "overrides": {
    "react": "$react",
    "react-dom": "$react-dom",
    "next": "$next"},
    ```
- Added TypeScript, ESLint, TailwindCSS, and src/ directory structure
- Implemented App Router with alias support for @/*
- Added delayed loader for improved UX
- Installed dependencies: react-icons and framer-motion
- Built responsive sticky navbar (links via navLinks.json)
- Created interactive responsive footer (links via footLinks.json)
- Integrated newsletter form with MailService + NewsletterService APIs
- Stored subscribed user in mailUsers.json
- Added .env to .gitignore for security
- favicon with manifest
- fonts --font-satoshi --font-rubik-80s
- shadcn design system
- Skeleton Loading UI + Shimmer State
- Hero Section responsive
- Clerk secure multiauth with various wallet accounts & mail
- Responsive Navbar with Mobile Menu 
- Responsive Footer with Newsletters Section
- Added @tanstack/react-query for data fetching and caching
- Installed recharts for chart visualizations
- Added lucide-react for icons
- Installed tailwindcss-animate, class-variance-authority, clsx, and tailwind-merge for enhanced styling and utility support
- feat(tokens): add Token Discovery table with CoinGecko data, null-safety, sparkline, and auto-refresh
  - WHY
    - Needed a compact crypto “discovery” table with real-time market data.
    - Existing UI had no polling, no graceful null handling, and no quick trend insight.
  - WHAT
    - Added Token Discovery page rendering top-20 tokens.
    - Pulled live data from CoinGecko `coins/markets` with sparkline + price % changes.
    - Auto-refresh every 60s + Next revalidate(60) for caching.
    - Graceful null/NaN handling everywhere.
    - SVG sparkline (no chart libs) + min/max hover info.
    - Inline SVG up/down badges for 1h/24h/7d % moves.
    - Skeleton rows shown on load.
    - Dark mode friendly.
    - Semantic table markup.
  - LOGIC & THINKING
    - Data shaped into `Token` interface; numeric fields made `number | null`.
    - `fetchTokens()` throws if `!res.ok`; error surfaced in UI.
    - Minimal state: tokens/error/loading.
    - `useEffect`: initial load + 60s poll with cleanup.
    - Formatters return `-` when num is null/NaN. Prices <1 use higher precision.
    - Percent fields show +/- sign via lightweight badge.
    - Sparkline:
      - Pure SVG; X from index, Y normalized by min/max.
      - Fallback to 2-point flat line if array missing or small.
      - `useMemo` avoids repeated geometry calc.
      - Green if last >= first; else red.
    - Table rows show:
      rank | name/symbol/image | price | 1h% | 24h% | 7d% | sparkline | market cap | volume | circ supply
    - Skeleton rows keep layout stable while loading.
  - API DETAILS
    - CoinGecko endpoint:
      - GET /api/v3/coins/markets
      - vs_currency=usd
      - order=market_cap_desc
      - per_page=20
      - page=1
      - sparkline=true
      - price_change_percentage=1h,24h,7d
      - locale=en
    - Notes:
      - No API key.
      - Missing fields possible → null-safe UI.
      - Rate-limits → combined polling + revalidate to be gentle.
  - EDGE CASES HANDLED
    - API failure → friendly error panel.
    - Null numeric fields → “-”.
    - Missing or tiny sparkline → flat fallback line.
    - range=0 → guard to avoid div-by-zero.
    - Very small price (<$1) → show 6 dp.
  - PERF
    - Inline SVG (no chart deps).
    - `useMemo` for sparkline geometry.
    - Minimal DOM.
  - FUTURE IMPROVEMENTS
    - Sort/filter columns.
    - Currency selector + locale options.
    - Search bar.
    - Retry CTA + jittered poll.
    - Virtualize rows for >50 assets.
  - SECURITY
    - No secrets; only public HTTPS API.
    - No user data stored.
  - CHANGELOG
    - add Token Discovery table
    - add CoinGecko fetch + polling
    - add null-safe formatters
    - add SVG sparkline
    - add loading skeleton + error UI
    - style dark/light modes
- feat(tokens): add currency switcher, sorting, filtering, density toggle, and interactive sparkline
  - Added currency selector (USD/INR) with dynamic price + compact formatting
  - Expanded API fetch to 100 assets; removed server revalidate, using no-store
  - Implemented live client-side search for name/symbol
  - Added sortable table headers for rank, name, price, pct-changes, mcap, volume, supply
  - Added row-density toggle (comfortable/compact)
  - Added manual data Refresh control + visible timestamps
  - Added status badges (asset count, last update, auto-refresh indicator)
  - Reworked sparkline to include:
    - Area fill + stroke
    - Hover crosshair + marker
    - Tooltip price display (portal)
  - Added lightweight Tooltip/HoverCard system using portals
  - Added PriceChangeBadge w/ semantic intents (success/danger/muted)
  - Improved null/NaN safety across formatting
  - Introduced memoized filtering + sorting pipeline
  - Updated UI: sticky header controls, improved dark styling
- feat(tokens): add full client-side pagination with page-size control and navigable footer
  - Added pagination state: page + pageSize (25 | 50 | 100)
  - Computed derived values: totalItems, totalPages, pageClamped, startIdx, endIdx
  - Slice filtered dataset into pageData for rendering
  - Added pagination footer with:
    - Page size selector
    - First / Prev / Next / Last buttons
    - Windowed page-number display with ellipsis for large ranges
  - Shows range badge: “Showing X–Y of N”
  - Auto-resets to page 1 when query, sort, density, currency, or pageSize changes
  - Proper disabled states + aria-label/title for navigation buttons
  - Matches table styling (dark mode, borders, hover)

