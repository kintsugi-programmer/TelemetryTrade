// app/not-found.tsx
"use client";
import { MessageSquare } from "lucide-react"

import React from "react";
import Link from "next/link";
import { WavyBackground } from "@/components/ui/wavy-background";
// import { LightRays } from "@/components/ui/light-rays";
import { Button1 } from "@/components/ui/button1";

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-zinc-950">
      {/* Decorative BG behind content */}
      <WavyBackground className="mx-auto pb-40">
        {/* <LightRays className="pointer-events-none absolute inset-0 z-[100]" /> */}

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-8xl flex-col items-center justify-center gap-6 px-6 text-center">

          {/* Brand heading (taken from home) */}
          <h1
            className="font-rubik text-center 
                       sm:text-7xl md:text-8xl lg:text-9xl text-5xl pt-20
                       leading-[0.9] text-white"
          >
            <span className="block sm:hidden">
              Telemetry<br />Trade
            </span>
            <span className="hidden sm:block">Telemetry Trade</span>
          </h1>

          {/* Tagline (kept for consistency) */}
          <h2
            className="text-center font-extrabold tracking-wide uppercase
                       text-white text-xl sm:text-2xl md:text-2xl lg:text-3xl
                       drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]"
          >
            High-Performance Token Trading Interface
          </h2>

          {/* 404 Block */}
          <div className="mt-8">
            <p className="text-7xl sm:text-8xl md:text-9xl font-black leading-none text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-sky-500 to-blue-600">
              404
            </p>
            <p className="mt-4 text-lg sm:text-xl text-gray-300">
              The page you&apos;re looking for doesn&apos;t exist.
            </p>
            <p className="text-sm text-white/60 mt-1">
              It might have been moved, renamed, or never existed.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-8 flex items-center gap-4">
            <Link
              href="/"
              className=""
              aria-label="Go back home"
            >
            <button className="bg-green-950 text-green-400 border border-green-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
            <span className="bg-green-400 shadow-green-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]" />
            Go back home
          </button>            </Link>


            <Link href="/discovery" aria-label="Open Discovery">
              <div className="grid place-content-center">
                <Button1 />
              </div>
            </Link>
            <Link
              href="/"
              className=""
              aria-label="Go back home"
            >
            <button className="bg-yellow-950 text-yellow-400 border border-yellow-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
            <span className="bg-yellow-400 shadow-yellow-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]" />
             <span className="flex items-center gap-2">
    <MessageSquare className="h-4 w-4" />
    Chat
  </span>
          </button>            </Link>
          </div>

          {/* Footer line (location + year to match home vibe) */}
          <p
            className="mt-8 text-center font-semibold uppercase
                       text-white/80 text-xs sm:text-sm
                       drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
          >
            New Delhi • ESTD 2025
          </p>
        </div>
      </WavyBackground>
    </div>
  );
}
