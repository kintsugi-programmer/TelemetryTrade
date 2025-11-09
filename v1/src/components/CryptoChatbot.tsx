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
    <Card className="w-full max-w-2xl mx-auto bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          TelemetryAI Crypto Analyst
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[420px] pr-3" ref={listRef}>
          <div className="space-y-4">
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
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
                    m.role === "model"
                      ? "bg-muted text-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {m.text}
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

      <CardFooter className="gap-2">
        <Input
          placeholder="Ask about BTC vs ETH, top gainers, entries, risks…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={loading}
        />
        <Button onClick={sendMessage} disabled={loading || !input.trim()}>
          <Send className="h-4 w-4 mr-1" />
          Send
        </Button>
      </CardFooter>
    </Card>
  );
}
