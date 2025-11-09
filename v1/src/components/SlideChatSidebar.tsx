"use client"

import { X } from "lucide-react"
import CryptoChatbot from "@/components/CryptoChatbot"
import { cn } from "@/lib/utils"

interface SlideChatSidebarProps {
  open: boolean
  onClose: () => void
}

export default function SlideChatSidebar({ open, onClose }: SlideChatSidebarProps) {
  return (
    <div>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-full max-w-lg transform bg-[#05070B] border-l border-white/10 shadow-xl transition-transform",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <h2 className="text-lg font-semibold text-neutral-200">AI Analyst</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-neutral-800/60 border border-white/10"
          >
            <X className="h-5 w-5 text-neutral-300" />
          </button>
        </div>

        {/* Chat */}
        <div className="h-[calc(100%-56px)] overflow-y-auto">
          <CryptoChatbot />
        </div>
      </div>
    </div>
  )
}
