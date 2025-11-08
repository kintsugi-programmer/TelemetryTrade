// app/page.tsx
"use client";
import React from "react";
import { WavyBackground } from "@/components/ui/wavy-background";
import { LightRays } from "@/components/ui/light-rays";
import { Button1 } from "@/components/ui/button1";
export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-zinc-950">
      {/* Decorative BG behind content */}
      <LightRays className="pointer-events-none absolute inset-0 z-0" />
      <WavyBackground className="mx-auto pb-40">


      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-8xl flex-col items-center justify-center gap-2 px-6 text-center">
        <h1
          className="font-rubik text-center 
                     sm:text-7xl md:text-8xl lg:text-9xl text-7xl pt-40
                     leading-[0.9] text-white"
        >
          <span className="block sm:hidden">
            Telemetry<br />Trade
          </span>
          <span className="hidden sm:block">Telemetry Trade</span>
        </h1>

        <h2
          className="text-center font-extrabold tracking-wide uppercase
                     text-white text-xl sm:text-2xl md:text-2xl lg:text-3xl
                     drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]"
        >
          High-Performance Token Trading Interface
        </h2>

        <p
          className="mt-2 text-center font-semibold uppercase
                     text-white/90 text-sm sm:text-base md:text-lg
                     drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
        >
          New Delhi<br />ESTD 2025
        </p>

        <p
          className="mt-6 max-w-6xl mx-auto text-center text-pretty text-gray-300
                     text-base sm:text-lg md:text-xl lg:text-xl
                     leading-relaxed md:leading-8 font-medium
                     px-4 sm:px-6 lg:px-8"
        >
          TelemetryTrade is a modern, high-performance web trading interface designed to show real-time
          price movement of crypto tokens. Engineered with a Trade Token Discovery Table approach and
          built to meet the demanding standards of low-latency traders, the project is architected
          with strict performance, scalability, and accessibility principles in mind.

        </p>
            <div className="grid place-content-center p-4">
              <Button1 />
            </div>
      </div>
      </WavyBackground>
    </div>
  );
}
