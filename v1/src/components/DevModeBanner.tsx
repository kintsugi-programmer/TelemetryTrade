'use client';

import { useState } from 'react';
import { AlertCircle, X } from 'lucide-react';

export default function DevModeBanner() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="rounded-lg border border-cyan-500/40 bg-gradient-to-r from-cyan-900/80 via-cyan-800/80 to-cyan-900/80 backdrop-blur-sm px-4 py-3 shadow-[0_0_0_1px_rgba(34,211,238,0.2)_inset,0_8px_32px_-8px_rgba(0,0,0,0.4)] animate-in slide-in-from-left-4 duration-500 delay-300">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-cyan-200">Pre-Sale Prototype</p>
          <p className="text-xs text-cyan-300/80 mt-1">Active development in progress.</p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close banner"
          className="flex-shrink-0 text-cyan-400/60 hover:text-cyan-400 transition"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
