'use client';

import { Info } from 'lucide-react';

export default function NicheFocusBanner() {
    return (
        <div className="w-full bg-gradient-to-r from-yellow-400/20 via-yellow-500/20 to-orange-600/25 border-b border-yellow-500/40 px-4 py-3">
            <div className="max-w-7xl mx-auto flex items-center gap-3">
                <Info className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                <p className="text-sm text-yellow-200">
                    <span className="font-semibold text-yellow-100">Market Focus:</span> Crypto assets are chosen as niche for early development. We will focus on other domains (Forex, Stocks, IPOs, etc.) later after developing a good base.
                </p>
            </div>
        </div>
    );
}
