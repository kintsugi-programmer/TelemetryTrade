// app/page.tsx
"use client";
import React from "react";
import Link from "next/link";
import { WavyBackground } from "@/components/ui/wavy-background";
// import { LightRays } from "@/components/ui/light-rays";
import { Button1 } from "@/components/ui/button1";
export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-zinc-950">
      {/* Decorative BG behind content */}
      
      <WavyBackground className="mx-auto pb-40">
        {/* <LightRays className="pointer-events-none absolute inset-0 z-100" /> */}


      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-8xl flex-col items-center justify-center gap-2 px-6 text-center">
        <h1
          className="font-rubik text-center 
                     sm:text-7xl md:text-8xl lg:text-9xl text-5xl pt-40
                     leading-[0.9] "
        >
          <span className="block sm:hidden">
            TelemetryTrade<br />AI
          </span>
          <span className="hidden sm:block">TelemetryTradeAI</span>
        </h1>

        <h2
          className="text-center font-extrabold tracking-wider uppercase
                     text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300
                     text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                     drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]"
        >
          Re-Inventing Trading
        </h2>

        <p
          className="mt-4 max-w-4xl mx-auto text-center font-bold
                     text-cyan-200/90 text-lg sm:text-xl md:text-2xl lg:text-2xl
                     drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]"
        >
          With 4D Intelligence, AI reads the entire market so you don't have to.
        </p>

        <p
          className="mt-8 max-w-5xl mx-auto text-center text-pretty text-gray-200
                     text-base sm:text-lg md:text-lg lg:text-lg
                     leading-relaxed md:leading-8 font-medium
                     px-4 sm:px-6 lg:px-8"
        >
          TelemetryTrade is the next-gen, AI-powered Bloomberg Re-Invented for retail traders, combining real-time multi-level charting, verified RAG research, and portfolio intelligence to help new-gen traders make safer and smarter decisions.
        </p>

        <p
          className="mt-6 max-w-5xl mx-auto text-center text-pretty text-gray-300
                     text-sm sm:text-base md:text-base lg:text-base
                     leading-relaxed md:leading-7 font-medium
                     px-4 sm:px-6 lg:px-8"
        >
          It transforms the time-consuming process of reading hundreds of whitepapers, cross-competitive analysis of live data into fast, explainable, AI-driven Chatbot answers.
        </p>
        <Link href="/discovery">
            <div className="grid place-content-center p-2 ">
              <Button1 />
            </div>
            
        </Link>
        <p
          className="mt-6 max-w-5xl mx-auto text-center text-pretty text-cyan-100/80
                     text-sm sm:text-base md:text-base lg:text-base
                     leading-relaxed md:leading-7 font-medium italic
                     px-4 sm:px-6 lg:px-8"
        >
          Learning from the whole past in multiple Layers & Angles simultaneously to help predict future trends.
        </p>


      </div>
      </WavyBackground>
    </div>
  );
}
