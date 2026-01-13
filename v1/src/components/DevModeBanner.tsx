'use client';

import { AlertCircle } from 'lucide-react';

export default function DevModeBanner() {
  return (
    <div className="w-full bg-amber-900/30 border-b border-amber-700/50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0" />
        <p className="text-sm text-amber-200">
          <span className="font-semibold">Development Mode:</span> Application is running in development environment. Please refresh the page if experiencing issues.
        </p>
      </div>
    </div>
  );
}
