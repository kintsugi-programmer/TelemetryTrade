'use client';

import { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function DisclaimerBanner() {
    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen) return null;

    return (
        <div className="rounded-lg border border-green-500/40 bg-gradient-to-r from-green-900/80 via-green-800/80 to-emerald-900/80 backdrop-blur-sm px-4 py-3 shadow-[0_0_0_1px_rgba(34,197,94,0.2)_inset,0_8px_32px_-8px_rgba(0,0,0,0.4)] animate-in slide-in-from-left-4 duration-500 delay-100">
            <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-green-200">Disclaimer</p>
                    <p className="text-xs text-green-300/80 mt-1">TelemetryTradeAI is provided strictly for educational and informational purposes only and does not constitute investment, financial, or trading advice. All market analysis and explanations are generic in nature and may not be suitable for individual circumstances. Trading and investing involve significant risk, including the potential loss of capital. Users are solely responsible for their decisions and outcomes.</p>
                </div>
                <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close disclaimer"
                    className="flex-shrink-0 text-green-400/60 hover:text-green-400 transition"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
