// app/page.tsx
"use client";
import React from "react";
import Link from "next/link";
import { WavyBackground } from "@/components/ui/wavy-background";
// import { LightRays } from "@/components/ui/light-rays";
// import { Button1 } from "@/components/ui/button1";
import { FeaturesSection } from "@/components/FeaturesSection";
import { FourDIntelligence } from "@/components/FourDIntelligence";
import { CompetitiveAnalysis } from "@/components/CompetitiveAnalysis";
import { FoundersSection } from "@/components/FoundersSection";
import { FundingHighlight } from "@/components/FundingHighlight";

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden bg-zinc-950">
      {/* Hero Section */}
      <section className="min-h-screen w-full">
        <WavyBackground className="mx-auto pb-20 sm:pb-40">
          {/* <LightRays className="pointer-events-none absolute inset-0 z-100" /> */}


          {/* Content */}
          <div className="relative z-10 mx-auto flex min-h-screen max-w-8xl flex-col items-center justify-center gap-0 px-4 sm:px-6 text-center">
            <h1
              className="font-rubik text-center 
                     text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl
                     leading-[0.95] sm:leading-[0.9] pt-20 sm:pt-32
                     text-white"
            >
              <span className="block sm:hidden">
                TelemetryTrade<br />AI
              </span>
              <span className="hidden sm:block">TelemetryTradeAI</span>
            </h1>

            <h2
              className="text-center font-extrabold tracking-widest uppercase
                     text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300
                     text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl
                     drop-shadow-[0_0_20px_rgba(34,211,238,0.5)] mt-1 sm:mt-2"
            >
              Re-Inventing Trading
            </h2>

            <p
              className="mt-2 sm:mt-3 max-w-3xl mx-auto text-center font-bold
                     text-cyan-200/90 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl
                     drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]
                     leading-snug sm:leading-relaxed"
            >
              With 4D Intelligence, AI reads the entire market so you don&apos;t have to.
            </p>

            <p
              className="mt-2 sm:mt-3 max-w-4xl mx-auto text-center text-pretty text-gray-200
                     text-xs xs:text-sm sm:text-base md:text-base lg:text-lg
                     leading-relaxed sm:leading-relaxed md:leading-8 font-medium
                     px-2 sm:px-4 lg:px-8"
            >
              TelemetryTrade is the next-gen, AI-powered Bloomberg Re-Invented for retail traders, combining real-time multi-level charting, verified RAG research, and portfolio intelligence to help new-gen traders make safer and smarter decisions.
            </p>
            {/* <Link href="/discovery">
              <div className="grid place-content-center p-3 sm:p-4 mt-2 sm:mt-3">
                <Button1 />
              </div>
            </Link> */}

            {/* Quick Access Buttons */}
            <div className="flex flex-wrap justify-center gap-2 my-2">
              <Link href="/ai">
                <button className="bg-cyan-950 text-cyan-400 border border-cyan-400 border-b-4 font-medium overflow-hidden relative px-6 py-3 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                  <span className="bg-cyan-400 shadow-cyan-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]" />
                  AI Analyst
                </button>
              </Link>

              <Link href="/portfolio-reviewer">
                <button className="bg-yellow-950 text-yellow-400 border border-yellow-400 border-b-4 font-medium overflow-hidden relative px-6 py-3 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                  <span className="bg-yellow-400 shadow-yellow-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]" />
                  Portfolio Reviewer
                </button>
              </Link>

              <Link href="/discovery">
                <button className="bg-emerald-950 text-emerald-400 border border-emerald-400 border-b-4 font-medium overflow-hidden relative px-6 py-3 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                  <span className="bg-emerald-400 shadow-emerald-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]" />
                  Token Market
                </button>
              </Link>

              <Link href="https://telemetrytradeai.github.io/academy/">
                <button className="bg-zinc-950 text-zinc-400 border border-zinc-400 border-b-4 font-medium overflow-hidden relative px-6 py-3 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                  <span className="bg-zinc-400 shadow-zinc-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]" />
                  Academy
                </button>
              </Link>
            </div>

            <p
              className="mt-2 sm:mt-3 max-w-4xl mx-auto text-center text-pretty text-gray-300
                     text-xs xs:text-sm sm:text-sm md:text-base lg:text-base
                     leading-relaxed sm:leading-relaxed md:leading-7 font-medium
                     px-2 sm:px-4 lg:px-8"
            >
              It transforms the time-consuming process of reading hundreds of whitepapers, cross-competitive analysis of live data into fast, explainable, AI-driven Chatbot answers.
            </p>



            <p
              className="mt-2 sm:mt-3 max-w-4xl mx-auto text-center text-pretty text-cyan-100/80
                     text-xs xs:text-sm sm:text-sm md:text-base lg:text-base
                     leading-relaxed sm:leading-relaxed md:leading-7 font-medium italic
                     px-2 sm:px-4 lg:px-8 pb-10 sm:pb-0"
            >
              Learning from the whole past in multiple Layers & Angles simultaneously to help predict future trends.
            </p>


          </div>
        </WavyBackground>
      </section>

      {/* Funding Started & Recognition Highlight */}
      <FundingHighlight />

      {/* Features Section */}
      <FeaturesSection />

      {/* 4D Intelligence Section */}
      <FourDIntelligence />

      {/* Competitive Analysis Section */}
      <CompetitiveAnalysis />

      {/* Founders Section */}
      <FoundersSection />
    </div>
  );
}
