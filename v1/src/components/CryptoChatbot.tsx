"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Bot, User, Send, Sparkles } from "lucide-react";
import ReactMarkdown from 'react-markdown';

type Role = "user" | "model";
type ChatMessage = { role: Role; text: string };

// Light-weight follow-up generator so each model reply surfaces fresh prompts
const buildFollowUps = (userText?: string, modelText?: string, isFirstModel?: boolean) => {
  const cleanedUser = userText?.trim() ?? "";
  const cleanedModel = modelText?.trim() ?? "";

  const boldMention = cleanedModel.match(/\*\*([^*]+)\*\*/)?.[1];
  const tickerMatch =
    cleanedUser.match(/\b[A-Z]{2,6}\b/) ?? cleanedModel.match(/\b[A-Z]{2,6}\b/);
  const topic = (boldMention ?? tickerMatch?.[0] ?? cleanedUser) || "this topic";

  const shortTopic = topic.length > 42 ? `${topic.slice(0, 39)}...` : topic;

  const financePrinciplesPool = [
    "Want a 90-second primer on what trading really is vs investing?",
    "Should we outline core finance principles like risk/return, liquidity, and diversification?",
    "Need a quick recap on time horizons, compounding, and opportunity cost?",
    "Should we talk through how market microstructure affects fills and slippage?",
  ];

  const tradingGuidancePool = [
    "Want a quick checklist on position sizing and stop-loss placement?",
    "Need a reminder on journaling entries and exits to tighten your process?",
    "Shall I outline a basic risk rule-of-thumb like 1-2% per trade?",
    "Should we sketch a simple plan for scaling in and out instead of all-in moves?",
    "Want a short guide on avoiding overtrading during chop?",
  ];

  const randomFinance = financePrinciplesPool[Math.floor(Math.random() * financePrinciplesPool.length)];
  const randomTrading = tradingGuidancePool[Math.floor(Math.random() * tradingGuidancePool.length)];

  if (isFirstModel) {
    return [
      "Want a quick refresher on what trading means and how it differs from investing?",
      "Interested in core finance principles like risk/return, diversification, and time value?",
      "Should we sketch a simple starter roadmap for safe trading habits?",
    ];
  }

  return [
    `Should we go deeper on ${shortTopic}—drivers, risks, comps, or catalysts?`,
    randomFinance,
    randomTrading,
  ];
};

export default function CryptoChatbot() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      role: "model",
      text:
        "Hi! I’m your TelemetryAI Crypto Analyst. Ask about coins, trends, or comparisons and I’ll use fresh market data.",
    },
  ]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const listRef = React.useRef<HTMLDivElement>(null);
  const lastModelIndexRef = React.useRef<number>(-1);
  const [followups, setFollowups] = React.useState<string[]>([]);
  const [followupForIndex, setFollowupForIndex] = React.useState<number>(-1);

  React.useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  React.useEffect(() => {
    const latestModelIndex =
      messages
        .map((m, idx) => (m.role === "model" ? idx : -1))
        .filter((idx) => idx >= 0)
        .pop() ?? -1;

    if (latestModelIndex === -1 || latestModelIndex === lastModelIndexRef.current) return;

    const modelText = messages[latestModelIndex]?.text;
    const previousUserText = messages
      .slice(0, latestModelIndex)
      .reverse()
      .find((m) => m.role === "user")?.text;

    const isFirstModel = latestModelIndex === 0 && !previousUserText;
    setFollowups(buildFollowUps(previousUserText, modelText, isFirstModel));
    setFollowupForIndex(latestModelIndex);
    lastModelIndexRef.current = latestModelIndex;
  }, [messages]);

  const sendMessage = async (contentOverride?: string) => {
    const content = (contentOverride ?? input).trim();
    if (!content || loading) return;

    // optimistic user message
    setMessages((prev) => [...prev, { role: "user", text: content }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/crypto-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      });

      const data = (await res.json()) as { text?: string; error?: string };
      const modelText =
        data.text ?? data.error ?? "Sorry, I couldn’t generate a reply.";

      setMessages((prev) => [...prev, { role: "model", text: modelText }]);
    } catch (err) {
      console.error("sendMessage error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Network error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const onFollowUpClick = (text: string) => {
    sendMessage(text);
  };

  return (
    <>
      <Card className="w-full mx-auto bg-transparent border-0 h-full flex flex-col p-0">
        <CardHeader className="p-4 border-b border-neutral-800 bg-neutral-900/50 sticky top-0 z-10">
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-white">
            <Bot className="h-4 w-4 text-cyan-400" />
            AI Analyst
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 flex-1 overflow-hidden">
          <ScrollArea className="h-full w-full" ref={listRef}>
            <div className="space-y-3 p-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 ${m.role === "user" ? "justify-end" : ""
                    }`}
                >
                  {m.role === "model" && (
                    <div className="flex-shrink-0 rounded-full p-2 bg-muted">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}

                  <div className="flex max-w-[80%] flex-col gap-2">
                    <div
                      className={`rounded-lg px-3 py-2 text-xs sm:text-sm whitespace-pre-wrap break-words ${m.role === "model"
                          ? "bg-neutral-800 text-neutral-100"
                          : "bg-cyan-600 text-white"
                        }`}
                    >
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
                        {m.text}
                      </ReactMarkdown>
                    </div>

                    {m.role === "model" && i === followupForIndex && followups.length > 0 && (
                      <div className="rounded-xl border border-white/10 bg-neutral-900/60 p-3">
                        <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-neutral-300">
                          <Sparkles className="h-4 w-4 text-cyan-400" />
                          Curious follow-ups
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {followups.map((q, idx) => (
                            <button
                              key={idx}
                              onClick={() => onFollowUpClick(q)}
                              className="rounded-lg border border-white/10 bg-neutral-900 px-3 py-3 text-left text-xs text-neutral-100 transition hover:bg-neutral-800"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {m.role === "user" && (
                    <div className="flex-shrink-0 rounded-full p-2 bg-primary/15">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Thinking…
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter className="gap-2 p-3 border-t border-neutral-800 bg-neutral-900/50 sticky bottom-0">
          <Input
            placeholder="Ask about coins..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={loading}
            className="h-8 text-xs px-2 py-1 bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500"
          />
          <Button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            size="sm"
            className="h-8 bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            <Send className="h-3 w-3" />
          </Button>
        </CardFooter>
      </Card>

      {followups.length > 0 && (
        <div className="mt-3 w-full">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-neutral-300">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            Curious follow-ups
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {followups.map((q, idx) => (
              <button
                key={idx}
                onClick={() => onFollowUpClick(q)}
                className="rounded-lg border border-white/10 bg-neutral-900/70 px-3 py-3 text-left text-xs text-neutral-100 transition hover:bg-neutral-800/80"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
