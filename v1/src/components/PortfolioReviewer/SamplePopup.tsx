"use client";

import React, { useState } from "react";
import { X, Image, Download } from "lucide-react";

export default function SamplePopup() {
    const [isOpen, setIsOpen] = useState(false);

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = "/sample.jpeg";
        link.download = "sample.jpeg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors"
            >
                <Image className="w-3.5 h-3.5" />
                <span>View Sample</span>
            </button>

            {/* Small Image Popup */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="rounded-lg border border-emerald-500/40 bg-gradient-to-br from-emerald-900/90 via-neutral-900/90 to-emerald-900/90 backdrop-blur-sm p-2 shadow-2xl w-48">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-1 right-1 p-0.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
                        >
                            <X className="w-3 h-3" />
                        </button>

                        {/* Image */}
                        <div className="rounded-md overflow-hidden bg-black/40 mb-2">
                            <img
                                src="/sample.jpeg"
                                alt="Sample Portfolio"
                                className="w-full h-auto"
                            />
                        </div>

                        {/* Download Button */}
                        <button
                            onClick={handleDownload}
                            className="w-full flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-400 text-xs font-medium transition-colors"
                        >
                            <Download className="w-3 h-3" />
                            <span>Download</span>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
