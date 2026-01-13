'use client';

import { AlertCircle } from 'lucide-react';

export default function DevModeBanner() {
  return (
    <div className="w-full bg-amber-900/30 border-b border-amber-700/50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0" />
        <p className="text-sm text-amber-200">
          <span className="font-semibold">Pre-Sale Prototype:</span> This platform is currently in prototype mode for stakeholders and early users. Features are under active development.
        </p>
      </div>
    </div>
  );
}
