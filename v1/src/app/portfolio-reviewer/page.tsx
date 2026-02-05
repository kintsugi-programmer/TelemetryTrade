"use client";

import React, { useState } from "react";
import PortfolioUploader from "@/components/PortfolioReviewer/PortfolioUploader";
import ReviewChat from "@/components/PortfolioReviewer/ReviewChat";
import SamplePopup from "@/components/PortfolioReviewer/SamplePopup";
import { Sparkles } from "lucide-react";

export default function PortfolioReviewerPage() {
    const [extractedText, setExtractedText] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-neutral-900 to-zinc-950 py-5 px-4 flex flex-col items-center w-full relative overflow-hidden">
            {/* Background gradient accents - Matched from /ai/page.tsx */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl opacity-30"></div>
            </div>

            <div className="w-full max-w-7xl flex flex-col md:flex-row items-center md:items-start gap-12 relative z-10">

                {/* Left Side: Header & Uploader (Replacing the text header from /ai) */}
                <header className="md:w-1/2 w-full max-w-3xl space-y-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
                            <Sparkles className="w-4 h-4" />
                            <span>AI-Powered Analysis</span>
                        </div>
                        <h1
                            className="font-rubik
                                    text-5xl xs:text-5xl sm:text-6xl md:text-6xl lg:text-7xl
                                    leading-[0.9] text-white mb-2
                                    bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-300 bg-clip-text text-transparent"
                        >
                            Portfolio Reviewer
                        </h1>
                        <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-emerald-300 md:mx-0 mt-3 rounded-full"></div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-neutral-200 text-base sm:text-lg md:text-lg leading-relaxed font-medium">
                            Upload your crypto portfolio for real-time AI analysis.
                        </p>
                        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                            Our AI cross-references your holdings with live Real-time market data to provide specific, actionable performance insights and risk assessment.
                        </p>
                        <div className="pt-2">
                            <SamplePopup />
                        </div>
                    </div>

                    {/* Uploader Section */}
                    <div className="space-y-6 pt-4">
                        <div className="bg-neutral-900/40 border border-white/5 rounded-3xl p-6 backdrop-blur-sm shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_10px_30px_-12px_rgba(0,0,0,0.6)]">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold ring-1 ring-cyan-500/50">1</span>
                                <h2 className="text-lg font-semibold text-white">Upload Screenshot</h2>
                            </div>
                            <PortfolioUploader onTextExtracted={setExtractedText} />
                        </div>

                        {extractedText && (
                            <div className="bg-neutral-900/40 border border-white/5 rounded-3xl p-6 backdrop-blur-sm shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_10px_30px_-12px_rgba(0,0,0,0.6)] animate-in fade-in slide-in-from-top-4 duration-500">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold ring-1 ring-emerald-500/50">2</span>
                                    <h2 className="text-lg font-semibold text-white">Data Preview</h2>
                                </div>
                                <div className="p-4 bg-black/40 rounded-xl border border-white/5 max-h-40 overflow-y-auto text-[10px] font-mono text-neutral-400 whitespace-pre-wrap">
                                    {extractedText}
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                {/* Right Side: Chatbot */}
                <div className="md:w-1/2 w-full">
                    <div className="sticky top-5">
                        {/* Matches the wrapper style in /ai/page.tsx */}
                        <div className="rounded-2xl border border-white/10 bg-neutral-900/40 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_10px_30px_-12px_rgba(0,0,0,0.6)] overflow-hidden h-[600px] backdrop-blur-sm">
                            <ReviewChat ocrText={extractedText} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
