"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export function FundingHighlight() {
  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-zinc-950 via-blue-950/10 to-zinc-950">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
            <span className="text-xl">🏆</span>
            <span className="text-sm sm:text-base font-semibold text-cyan-300">Event & Recognition</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Funding Started & <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Major Recognition</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            TelemetryTradeAI recognized as a Top 100 Startup at Delhi Startup Yuva Festival 2026
          </p>
        </div>

        {/* Image Gallery - 6 Images from GOD Folder */}
        <div className="flex justify-center mb-16 sm:mb-20">
          <div className="w-full max-w-6xl px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* Image 1 - Rectangle */}
              <div className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 to-black shadow-lg hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-400">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                <div className="relative w-full h-64 flex items-center justify-center">
                  <Image
                    src="/GOD/1 (1).jpg"
                    alt="Event Recognition 1"
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              
              {/* Image 2 - Square */}
              <div className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 to-black shadow-lg hover:shadow-2xl hover:shadow-pink-500/40 transition-all duration-400">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                <div className="relative w-full h-56 flex items-center justify-center">
                  <Image
                    src="/GOD/1 (1).png"
                    alt="Event Recognition 2"
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              
              {/* Image 3 - Rectangle */}
              <div className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 to-black shadow-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-400">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                <div className="relative w-full h-64 flex items-center justify-center">
                  <Image
                    src="/GOD/1 (2).jpg"
                    alt="Event Recognition 3"
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              
              {/* Image 4 - Rectangle */}
              <div className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 to-black shadow-lg hover:shadow-2xl hover:shadow-violet-500/40 transition-all duration-400">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                <div className="relative w-full h-64 flex items-center justify-center">
                  <Image
                    src="/GOD/1 (3).jpg"
                    alt="Event Recognition 4"
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Image 5 - Rectangle */}
              <div className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 to-black shadow-lg hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-400">
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                <div className="relative w-full h-64 flex items-center justify-center">
                  <Image
                    src="/GOD/telemetry-trade-ai-delhi-cm-rekha-gupta-startup-award-1-lakh.jpg"
                    alt="Delhi CM Rekha Gupta Award"
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Image 6 - Rectangle */}
              <div className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 to-black shadow-lg hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-400">
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                <div className="relative w-full h-64 flex items-center justify-center">
                  <Image
                    src="/GOD/banner.webp"
                    alt="TelemetryTradeAI Banner"
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12">
          {/* Left: Logo */}
          <div className="flex justify-center items-center relative">
            <div className="relative w-full max-w-sm h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/30 flex items-center justify-center backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300">
              <Image
                src="/Images/Logo.png"
                alt="TelemetryTradeAI Logo"
                width={300}
                height={300}
                className="object-contain p-8"
              />
            </div>
          </div>

          {/* Right: Funding & Achievement Details */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-2xl">👑</span> Government Support
              </h3>
              <div className="space-y-3 text-gray-200 text-sm sm:text-base">
                <p className="leading-relaxed">
                  <span className="font-semibold text-cyan-300">Secured Funding</span> from the Directorate of Training and Technical Education, Government of NCT of Delhi
                </p>
                <p className="leading-relaxed">
                  <span className="font-semibold text-cyan-300">Program:</span> Delhi Startup Yuva Program – Supporting next-gen entrepreneurs
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-2xl">🏆</span> National Recognition
              </h3>
              <div className="space-y-2 text-gray-200 text-sm sm:text-base">
                <p><span className="font-semibold text-cyan-300">Achievement:</span> Shortlisted among Top 100 Startups</p>
                <p><span className="font-semibold text-cyan-300">Scope:</span> Across India for national showcase</p>
                <p><span className="font-semibold text-cyan-300">Category:</span> AI / FinTech / Trading Intelligence</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-2xl">🎯</span> Initiative
              </h3>
              <div className="space-y-2 text-gray-200 text-sm sm:text-base">
                <p><span className="font-semibold text-cyan-300">Program:</span> Delhi Startup Yuva Initiative</p>
                <p><span className="font-semibold text-cyan-300">Focus:</span> Supporting AI & FinTech Innovation</p>
                <p><span className="font-semibold text-cyan-300">Date:</span> 14 January 2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {[
            {
              icon: "🧠",
              title: "AI-First Platform",
              description: "Advanced AI-powered trading intelligence platform"
            },
            {
              icon: "📊",
              title: "Real-Time Signals",
              description: "Reads and connects signals across multiple assets simultaneously"
            },
            {
              icon: "💬",
              title: "Conversational Insights",
              description: "Converts complex market data into simple, explainable answers"
            },
            {
              icon: "🎓",
              title: "Beginner-Friendly",
              description: "Educational focus on learning and trading safety"
            },
            {
              icon: "🔍",
              title: "Full Explainability",
              description: "Understand every decision and market signal"
            },
            {
              icon: "💡",
              title: "Risk Awareness",
              description: "Built-in risk management and awareness tools"
            }
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/30 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300"
            >
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h4 className="font-bold text-white mb-2">{feature.title}</h4>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Video & CTA Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Video Embed */}
          <div className="aspect-video rounded-2xl overflow-hidden bg-black border border-blue-500/30">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/SA6GP3SVA-0"
              title="TelemetryTradeAI - Funding & Recognition"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>

          {/* Right CTA Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                What This Means for You
              </h3>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4">
                TelemetryTradeAI is officially recognized as one of India&apos;s top emerging startups, solving critical problems in trading intelligence and financial education.
              </p>
              <ul className="space-y-3">
                {[
                  "Verified and certified by government authorities",
                  "Part of Delhi's startup ecosystem initiative",
                  "Backed by awards and recognition",
                  "Committed to trader success"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-200">
                    <span className="text-cyan-400 font-bold text-lg mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/discovery"
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 text-center"
              >
                Explore Now
              </Link>
              <a
                href="https://www.youtube.com/watch?v=SA6GP3SVA-0"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg border-2 border-cyan-400 text-cyan-300 font-bold hover:bg-cyan-400/10 transition-all duration-300 text-center"
              >
                Watch Full Event
              </a>
            </div>
          </div>
        </div>

        {/* Certificate Info */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-xl bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/30 text-center">
          <p className="text-gray-200 text-sm sm:text-base mb-2">
            <span className="font-semibold text-cyan-300">Certificate Issued:</span> 14 January 2026
          </p>
          <p className="text-gray-300 text-xs sm:text-sm">
            Dr. Ambedkar International Centre, New Delhi | Authorized by Sh. Pandurang K. Pole, IAS, Secretary, Higher & Technical Education Department
          </p>
        </div>
      </div>
    </section>
  );
}
