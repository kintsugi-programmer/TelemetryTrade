// src/components/CryptoChatbot.tsx
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
import { Loader2, Bot, User, Send } from "lucide-react";

type Role = "user" | "model";
type ChatMessage = { role: Role; text: string };

// Simple markdown bold parser
const parseMarkdown = (text: string) => {
  const parts: (string | React.ReactNode)[] = [];
  let lastIndex = 0;

  // Match **text** pattern for bold
  const boldRegex = /\*\*([^*]+)\*\*/g;
  let match;

  while ((match = boldRegex.exec(text)) !== null) {
    // Add text before the bold part
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    // Add bold text
    parts.push(
      <strong key={`bold-${match.index}`} className="font-bold">
        {match[1]}
      </strong>
    );
    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
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

  React.useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async () => {
    const content = input.trim();
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

  return (
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
                className={`flex items-start gap-3 ${
                  m.role === "user" ? "justify-end" : ""
                }`}
              >
                {m.role === "model" && (
                  <div className="flex-shrink-0 rounded-full p-2 bg-muted">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-xs sm:text-sm whitespace-pre-wrap break-words ${
                    m.role === "model"
                      ? "bg-neutral-800 text-neutral-100"
                      : "bg-cyan-600 text-white"
                  }`}
                >
                  {parseMarkdown(m.text)}
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
          onClick={sendMessage} 
          disabled={loading || !input.trim()}
          size="sm"
          className="h-8 bg-cyan-600 hover:bg-cyan-700 text-white"
        >
          <Send className="h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
}
