'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'

export default function TermsPage() {
  const effectiveDate = useMemo(() => new Date('2025-11-09T00:00:00+05:30'), [])

  const sections = [
    { id: 'acceptance', title: 'Acceptance of Terms' },
    { id: 'eligibility', title: 'Eligibility' },
    { id: 'accounts', title: 'Accounts & Security' },
    { id: 'market-data', title: 'Market Data & Third‑Party Services' },
    { id: 'no-advice', title: 'No Investment Advice' },
    { id: 'use', title: 'Permitted Use & Prohibited Conduct' },
    { id: 'plans', title: 'Plans, Billing, Trials & Refunds' },
    { id: 'fair-use', title: 'Fair Use & Rate Limits' },
    { id: 'ip', title: 'Intellectual Property' },
    { id: 'privacy', title: 'Privacy' },
    { id: 'warranties', title: 'Disclaimers & Warranties' },
    { id: 'liability', title: 'Limitation of Liability' },
    { id: 'indemnity', title: 'Indemnification' },
    { id: 'law', title: 'Governing Law & Disputes' },
    { id: 'changes', title: 'Changes to the Service & Terms' },
    { id: 'contact', title: 'Contact' },
  ] as const

  const [active, setActive] = useState<string>(sections[0].id)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handler = () => {
      const bounds: Array<{ id: string; top: number }> = []
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        bounds.push({ id: s.id, top: rect.top })
      }
      const visible = bounds
        .filter(b => b.top <= (typeof window !== 'undefined' ? (window.innerHeight * 0.3) : 0) + 80)
        .sort((a, b) => b.top - a.top)[0]
      if (visible) setActive(visible.id)
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('scroll', handler)
      window.removeEventListener('resize', handler)
    }
  }, [sections])

 type ChipTone = "default" | "warning" | "muted";

interface ChipProps {
  children: React.ReactNode;
  tone?: ChipTone;
}

const Chip: React.FC<ChipProps> = ({ children, tone = "default" }) => {
  const map: Record<ChipTone, string> = {
    default: "bg-neutral-800 text-neutral-100 border-white/10",
    warning: "bg-yellow-950 text-yellow-300 border-yellow-700/30",
    muted: "bg-neutral-800/60 text-neutral-400 border-white/10",
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs ${map[tone]}`}>
      {children}
    </span>
  );
};

  const SectionCard: React.FC<{ id: string; title: string; children: React.ReactNode }> = ({ id, title, children }) => (
    <section id={id} className="scroll-mt-28">
      <div className="rounded-2xl border border-white/10 bg-neutral-950/40 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_10px_30px_-12px_rgba(0,0,0,0.6)]">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{title}</h2>
        <div className="mt-3 space-y-3 text-sm leading-6 text-neutral-300">{children}</div>
      </div>
    </section>
  )

  const AnchorNav = () => (
    <nav className="sticky top-20 hidden lg:block">
      <div className="rounded-2xl border border-white/10 bg-neutral-950/60 p-4">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">On this page</div>
        <ul className="space-y-1">
          {sections.map(s => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`block rounded-md px-2 py-1 text-sm transition-colors ${
                  active === s.id ? 'bg-emerald-500/10 text-emerald-300' : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
                }`}
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-neutral-950/70 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/55">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h1 className="font-rubik text-2xl sm:text-3xl md:text-4xl leading-[0.9] text-white">
                Terms & Conditions
              </h1>
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-xs text-neutral-400">TelemetryTrade</span>
                <span className="text-sm font-medium tracking-tight">Legal</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Chip tone="muted">Effective {effectiveDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</Chip>
              <Chip>v1.0</Chip>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="border-b border-white/10 bg-neutral-950/40">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-3xl text-neutral-300">
              Welcome to <span className="font-semibold text-neutral-100">TelemetryTrade</span>. These Terms & Conditions ("Terms")
              govern your access to and use of our websites, apps, dashboards, widgets, APIs and related
              services (collectively, the "Service"). By accessing or using the Service, you agree to be bound
              by these Terms.
            </p>
            <div className="flex items-center gap-2">
              <Chip tone="warning">Not financial advice</Chip>
              <Chip>Crypto is risky</Chip>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <main ref={containerRef} className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <SectionCard id="acceptance" title="Acceptance of Terms">
              <p>
                By creating an account, clicking "I agree", or using any part of the Service, you acknowledge that you
                have read, understood, and agree to be bound by these Terms and any policies referenced here, including
                our <Link href="/privacy" className="text-emerald-300 underline decoration-dotted underline-offset-4">Privacy Policy</Link>.
                If you do not agree, do not use the Service.
              </p>
              <p>
                If you use the Service on behalf of an organization, you represent that you have authority to bind that
                organization and that "you" includes that organization and its affiliates.
              </p>
            </SectionCard>

            <SectionCard id="eligibility" title="Eligibility">
              <ul className="list-disc pl-5">
                <li>You must be the age of majority in your jurisdiction (and at least 18 years old) to use the Service.</li>
                <li>You are not barred from using the Service under any applicable laws, sanctions, or embargoes.</li>
                <li>You are solely responsible for ensuring that using the Service complies with the laws where you live.</li>
              </ul>
            </SectionCard>

            <SectionCard id="accounts" title="Accounts & Security">
              <ul className="list-disc pl-5">
                <li>You are responsible for safeguarding your account credentials and for activities under your account.</li>
                <li>Notify us immediately if you suspect unauthorized access or a security incident.</li>
                <li>We may suspend or terminate accounts for violations of these Terms or suspected abuse.</li>
              </ul>
            </SectionCard>

            <SectionCard id="market-data" title="Market Data & Third‑Party Services">
              <p>
                TelemetryTrade presents pricing, charts, and other information sourced from third parties such as
                CoinGecko (REST APIs), TradingView (embedded charts/widgets), exchanges, news feeds, and analytics
                providers (collectively, "Data Providers"). These Data Providers are not controlled by us.
              </p>
              <ul className="list-disc pl-5">
                <li>Data is provided "as is" for informational purposes only and may be delayed, incomplete, or inaccurate.</li>
                <li>APIs and widgets are governed by the providers’ own terms; your use must comply with those terms.</li>
                <li>We may change or remove integrations at any time, with or without notice.</li>
              </ul>
            </SectionCard>

            <SectionCard id="no-advice" title="No Investment Advice">
              <p>
                Content on the Service does not constitute investment, financial, legal, tax, or any other professional
                advice, and should not be relied upon to make decisions. Cryptoassets are volatile and involve high risk,
                including loss of principal. Do your own research and consult qualified advisors.
              </p>
            </SectionCard>

            <SectionCard id="use" title="Permitted Use & Prohibited Conduct">
              <p>Subject to these Terms, we grant you a limited, revocable, non‑exclusive, non‑transferable right to access and use the Service.</p>
              <p className="font-semibold">You agree NOT to:</p>
              <ul className="list-disc pl-5">
                <li>Scrape, spider, or harvest data except via documented export features or allowed APIs.</li>
                <li>Reverse engineer, decompile, or attempt to derive source code except as allowed by law.</li>
                <li>Bypass security controls, rate limits, or access non‑public areas.</li>
                <li>Use the Service for unlawful activities, market manipulation, spam, or malware distribution.</li>
                <li>Impersonate others or misrepresent your affiliation with a person or entity.</li>
              </ul>
            </SectionCard>

            <SectionCard id="plans" title="Plans, Billing, Trials & Refunds">
              <ul className="list-disc pl-5">
                <li>Some features may require a paid plan. Prices and features are subject to change.</li>
                <li>Unless stated otherwise, subscriptions renew automatically until canceled.</li>
                <li>Trials convert to paid at the end of the trial unless you cancel beforehand.</li>
                <li>Except where required by law, fees are non‑refundable. We may, at our discretion, issue partial credits.</li>
              </ul>
            </SectionCard>

            <SectionCard id="fair-use" title="Fair Use & Rate Limits">
              <p>
                To protect the stability of the Service and our Data Providers, we may enforce fair‑use policies and rate
                limits. Excessive or abusive usage may be throttled or suspended. Contact us for enterprise access if you
                need higher limits.
              </p>
            </SectionCard>

            <SectionCard id="ip" title="Intellectual Property">
              <ul className="list-disc pl-5">
                <li>All rights in the Service, including software, design, and content we create, are owned by us or our licensors.</li>
                <li>Logos and trademarks are the property of their respective owners. Use does not imply endorsement.</li>
                <li>You retain rights to content you upload; you grant us a limited license to host and display it for the Service’s operation.</li>
              </ul>
            </SectionCard>

            <SectionCard id="privacy" title="Privacy">
              <p>
                Our <Link href="/privacy" className="text-emerald-300 underline decoration-dotted underline-offset-4">Privacy Policy</Link>
                explains how we collect, use, and share information about you. By using the Service, you consent to our
                data practices described there.
              </p>
            </SectionCard>

            <SectionCard id="warranties" title="Disclaimers & Warranties">
              <p>
                THE SERVICE IS PROVIDED ON AN \"AS IS\" AND \"AS AVAILABLE\" BASIS, WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                PURPOSE, AND NON‑INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE ACCURATE, RELIABLE, ERROR‑FREE,
                UNINTERRUPTED, OR SECURE, OR THAT DEFECTS WILL BE CORRECTED.
              </p>
            </SectionCard>

            <SectionCard id="liability" title="Limitation of Liability">
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, DATA, OR USE,
                ARISING OUT OF OR IN CONNECTION WITH THE SERVICE OR THESE TERMS, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
              <p>
                OUR AGGREGATE LIABILITY FOR ALL CLAIMS RELATING TO THE SERVICE SHALL NOT EXCEED THE GREATER OF (A) THE
                AMOUNT YOU PAID US IN THE 3 MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM OR (B) USD $100.
              </p>
            </SectionCard>

            <SectionCard id="indemnity" title="Indemnification">
              <p>
                You agree to defend, indemnify, and hold harmless TelemetryTrade and its affiliates, officers, employees,
                and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable
                attorneys’ fees) arising out of or in any way connected with your use of the Service or your violation of
                these Terms.
              </p>
            </SectionCard>

            <SectionCard id="law" title="Governing Law & Disputes">
              <p>
                These Terms are governed by the laws of <span className="font-medium">[YOUR JURISDICTION]</span> without regard to its
                conflict of laws rules. All disputes shall be brought exclusively in the courts located in
                <span className="font-medium"> [YOUR CITY, YOUR JURISDICTION]</span>. You and TelemetryTrade waive any objections to venue or
                convenience of forum. Nothing herein limits either party’s right to seek injunctive relief.
              </p>
              <p className="text-xs text-neutral-400">Tip: If you operate from India, consider specifying the laws of India and the courts of New Delhi, Maharashtra, etc. Check with counsel.</p>
            </SectionCard>

            <SectionCard id="changes" title="Changes to the Service & Terms">
              <p>
                We may modify the Service and these Terms at any time. If a change is material, we will provide reasonable
                notice (e.g., by posting in‑app or via email). Your continued use of the Service after changes become
                effective constitutes acceptance of the revised Terms.
              </p>
            </SectionCard>

            <SectionCard id="contact" title="Contact">
              <p>
                Questions about these Terms? Email us at <a href="mailto:kintsugidevstudio@gmail.com" className="text-emerald-300 underline decoration-dotted underline-offset-4">kintsugidevstudio@gmail.com</a>.
              </p>
              <p className="text-xs text-neutral-400">This page is provided for convenience and does not constitute legal advice. Have a qualified attorney review before publishing.</p>
            </SectionCard>
          </div>

          <AnchorNav />
        </div>
      </main>

      {/* Footer helper */}
      <footer className="border-t border-white/10 bg-neutral-950/60">
        <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-neutral-400">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Chip tone="muted">Last updated: {effectiveDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</Chip>
              <span>•</span>
              <Link href="/" className="text-neutral-300 underline decoration-dotted underline-offset-4">Back to Dashboard</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/privacy" className="text-neutral-300 underline decoration-dotted underline-offset-4">Privacy Policy</Link>
              <span>•</span>
              <Link href="/disclosures" className="text-neutral-300 underline decoration-dotted underline-offset-4">Disclosures</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

