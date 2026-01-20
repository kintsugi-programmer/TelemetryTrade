"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from 'react-markdown';

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

interface ReviewChatProps {
    ocrText: string | null;
}

// Adapted follow-up generator for Portfolio context
const buildFollowUps = (userText?: string, modelText?: string, isFirstModel?: boolean) => {
    const cleanedUser = userText?.trim() ?? "";
    const cleanedModel = modelText?.trim() ?? "";

    const boldMention = cleanedModel.match(/\*\*([^*]+)\*\*/)?.[1];
    // Extract potential tickers from user text (simplistic regex)
    const tickerMatch = cleanedUser.match(/\b[A-Z]{2,6}\b/);
    const topic = (boldMention ?? tickerMatch?.[0] ?? "your portfolio");

    const shortTopic = topic.length > 40 ? `${topic.slice(0, 37)}...` : topic;

    const portfolioGuidancePool = [
        "What specific risks should I be aware of in this allocation?",
        "How can I better diversity my holdings?",
        "Are there any redundant assets in my portfolio?",
        "What would be a good strategy to take profits?",
        "How does my portfolio compare to a standard balanced portfolio?",
    ];

    const marketGuidancePool = [
        "Can you analyze the market sediment for my top holdings?",
        "What are the upcoming catalysts for these coins?",
        "How would a market downturn affect this specific portfolio?",
    ];

    const randomPortfolio = portfolioGuidancePool[Math.floor(Math.random() * portfolioGuidancePool.length)];
    const randomMarket = marketGuidancePool[Math.floor(Math.random() * marketGuidancePool.length)];

    if (isFirstModel) {
        return [
            "What are the biggest red flags in my portfolio?",
            "Which assets seem underperforming relative to the market?",
            "Give me 3 actionable steps to improve this portfolio.",
        ];
    }

    return [
        `Tell me more about the potential upside for ${shortTopic}.`,
        randomPortfolio,
        randomMarket,
    ];
};

export default function ReviewChat({ ocrText }: ReviewChatProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content: "Hello! Upload your portfolio screenshot, and I'll analyze your holdings, performance, and provide guidance.",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Follow-up state
    const [followups, setFollowups] = useState<string[]>([]);
    const [followupForIndex, setFollowupForIndex] = useState<number>(-1);
    const lastModelIndexRef = useRef<number>(-1);


    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages, isLoading, followups]);

    // Trigger initial analysis when OCR text is ready
    useEffect(() => {
        if (ocrText) {
            addMessage("assistant", "I've read your portfolio data! Analyzing it now... 🔍");
            handleSendMessage("Please analyze my portfolio based on the extracted text above.", ocrText);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ocrText]);

    // Generate Follow-ups when messages change
    useEffect(() => {
        const latestModelIndex = messages
            .map((m, idx) => (m.role === "assistant" ? idx : -1))
            .filter((idx) => idx >= 0)
            .pop() ?? -1;

        if (latestModelIndex === -1 || latestModelIndex === lastModelIndexRef.current) return;

        const modelText = messages[latestModelIndex]?.content;
        const previousUserText = messages
            .slice(0, latestModelIndex)
            .reverse()
            .find((m) => m.role === "user")?.content;

        // Check if it's the very first welcome message (no OCR analysis yet)
        const isWelcome = messages[latestModelIndex].id === "welcome";

        if (!isWelcome) {
            const isFirstAnalysis = latestModelIndex === 1; // 0 is welcome, 1 is "I've read...", 2 is analysis? No, logical mapping needs care.
            // Simplification: If we have OCR text, we assume real interaction started.
            // Actually, let's just pass the texts.
            setFollowups(buildFollowUps(previousUserText, modelText, isFirstAnalysis));
            setFollowupForIndex(latestModelIndex);
            lastModelIndexRef.current = latestModelIndex;
        }
    }, [messages]);


    const addMessage = (role: "user" | "assistant", content: string) => {
        setMessages((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                role,
                content,
                timestamp: new Date(),
            },
        ]);
    };

    const handleSendMessage = async (text: string, contextOverride?: string) => {
        if ((!text.trim() && !contextOverride)) return;

        const userMsg = text;
        if (!contextOverride) { // Don't show the hidden system trigger message
            addMessage("user", userMsg);
            setInput("");
        }

        // Clear followups while loading
        setFollowups([]);

        setIsLoading(true);

        try {
            const res = await fetch("/api/portfolio-review", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMsg,
                    context: contextOverride || ocrText || "No portfolio context available yet."
                }),
            });

            if (!res.ok) throw new Error("Failed to fetch response");
            const data = await res.json();

            addMessage("assistant", data.text || "I couldn't generate a response. Please try again.");
        } catch (err) {
            console.error(err);
            addMessage("assistant", "Something went wrong. Please check your connection.");
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage(input);
    };

    const onFollowUpClick = (text: string) => {
        handleSendMessage(text);
    };

    return (
        <div className="flex flex-col h-[600px] w-full rounded-2xl border border-white/10 bg-neutral-900/50 backdrop-blur-md overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-neutral-900/80 flex items-center gap-3 sticky top-0 z-10">
                <div className="p-2 rounded-lg bg-cyan-500/10">
                    <Bot className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                    <h3 className="text-white font-medium text-sm">Portfolio Analyst</h3>
                    <p className="text-neutral-500 text-xs">Powered by TelemetryAI</p>
                </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
                <AnimatePresence initial={false}>
                    {messages.map((m, i) => (
                        <motion.div
                            key={m.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                                "flex gap-3 max-w-[90%]",
                                m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                            )}
                        >
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1",
                                m.role === "user" ? "bg-indigo-500/20" : "bg-cyan-500/20"
                            )}>
                                {m.role === "user" ? <User className="w-4 h-4 text-indigo-400" /> : <Sparkles className="w-4 h-4 text-cyan-400" />}
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <div className={cn(
                                    "p-3 rounded-2xl text-sm leading-relaxed",
                                    m.role === "user"
                                        ? "bg-indigo-600 text-white rounded-tr-sm"
                                        : "bg-neutral-800 text-neutral-200 rounded-tl-sm border border-white/5"
                                )}>
                                    <ReactMarkdown
                                        components={{
                                            strong: ({ ...props }) => <span className="font-bold text-cyan-400" {...props} />,
                                            ul: ({ ...props }) => <ul className="list-disc pl-4 space-y-1 my-2" {...props} />,
                                            ol: ({ ...props }) => <ol className="list-decimal pl-4 space-y-1 my-2" {...props} />,
                                            li: ({ ...props }) => <li className="pl-1" {...props} />,
                                            h1: ({ ...props }) => <h1 className="text-lg font-bold my-2 text-white" {...props} />,
                                            h2: ({ ...props }) => <h2 className="text-base font-bold my-2 text-white" {...props} />,
                                            h3: ({ ...props }) => <h3 className="text-sm font-bold my-1 text-white" {...props} />,
                                            p: ({ ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                        }}
                                    >
                                        {m.content}
                                    </ReactMarkdown>
                                </div>

                                {/* Follow-ups for this message */}
                                {m.role === "assistant" && i === followupForIndex && followups.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="rounded-xl border border-white/10 bg-neutral-900/60 p-3 mt-1"
                                    >
                                        <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
                                            <Sparkles className="h-3 w-3 text-cyan-400" />
                                            Suggested Actions
                                        </div>
                                        <div className="grid grid-cols-1 gap-2">
                                            {followups.map((q, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => onFollowUpClick(q)}
                                                    className="text-left text-xs text-neutral-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition-colors border border-white/5"
                                                >
                                                    {q}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-3 mr-auto"
                    >
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                            <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                        </div>
                        <div className="bg-neutral-800/50 p-3 rounded-2xl rounded-tl-sm border border-white/5">
                            <div className="flex gap-1 h-5 items-center">
                                <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5 bg-neutral-900/80 sticky bottom-0">
                <form onSubmit={onSubmit} className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about your portfolio..."
                        disabled={isLoading}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 pr-12 transition-all disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-cyan-500 text-zinc-950 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </div>
    );
}
