'use client';

import { useState } from 'react';
import { Info, X } from 'lucide-react';

export default function NicheFocusBanner() {
    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen) return null;

    return (
        <div className="rounded-lg border border-pink-500/40 bg-gradient-to-r from-pink-900/80 via-pink-800/80 to-rose-900/80 backdrop-blur-sm px-4 py-3 shadow-[0_0_0_1px_rgba(236,72,153,0.2)_inset,0_8px_32px_-8px_rgba(0,0,0,0.4)] animate-in slide-in-from-left-4 duration-500 delay-200">
                <div className="flex items-start gap-3">
                    <Info className="h-4 w-4 text-pink-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-pink-200">Temporary Market Focus</p>
                        <p className="text-xs text-pink-300/80 mt-1">Crypto assets are chosen as niche for early development. We will focus on other domains (Forex, Stocks, IPOs, etc.) later after developing a good base.</p>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        aria-label="Close banner"
                        className="flex-shrink-0 text-pink-400/60 hover:text-pink-400 transition"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </div>
        );
    }
