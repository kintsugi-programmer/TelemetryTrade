'use client';

import { AlertCircle } from 'lucide-react';

export default function DevModeBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-cyan-400/20 via-cyan-500/20 to-purple-600/25 border-b border-cyan-500/40 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <AlertCircle className="h-4 w-4 text-cyan-500 flex-shrink-0" />
        <p className="text-sm text-cyan-200">
          <span className="font-semibold">Pre-Sale Prototype:</span> This platform is currently in prototype mode for stakeholders and early users. Features are under active development.
        </p>
      </div>
    </div>
  );
}
