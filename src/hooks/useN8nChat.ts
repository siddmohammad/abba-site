"use client";

import { useState, useRef } from "react";

const N8N_WEBHOOK = "https://n8n.getabba.info/webhook/landing-chat";

export type ChatMessage = { id: number; role: "ai" | "user"; text: string };
export type ChatContext = "how_it_works" | "pricing";

let msgId = 1;

function genSessionId(): string {
  try { return crypto.randomUUID(); } catch { return Math.random().toString(36).slice(2) + Date.now(); }
}

function detectEmail(text: string): string | undefined {
  const m = text.match(/[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+/);
  return m ? m[0] : undefined;
}

function fallback(context: ChatContext, userMsg: string): string {
  if (context === "pricing") {
    return "Thanks for reaching out! Based on your setup, we'll put together a tailored quote and have it with you within 24 hours. Could you share the best email address to send it to?";
  }
  return `ABBA can solve that. For challenges like "${userMsg.slice(0, 50)}…", our AI agent handles the entire inquiry flow — qualifying patients, booking appointments, and syncing to your calendar. It goes live in under 24 hours. What other challenges is your clinic facing?`;
}

export function useN8nChat(context: ChatContext, initialMessage: string) {
  const sessionId = useRef(genSessionId());
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, role: "ai", text: initialMessage },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);

  async function send(userText: string) {
    if (!userText.trim() || isTyping) return;

    const email = detectEmail(userText);

    setMessages((p) => [...p, { id: msgId++, role: "user", text: userText }]);
    setIsTyping(true);

    let replyText = "";
    let captured = false;

    try {
      const res = await fetch(N8N_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          sessionId: sessionId.current,
          context,
          ...(email && { email }),
        }),
      });

      if (!res.ok) throw new Error("non-ok");

      const data = await res.json();
      replyText = data.reply ?? data.message ?? data.output ?? data.text ?? "";
      if (!replyText) throw new Error("empty reply");
      captured = !!data.leadCaptured || !!email;
    } catch {
      replyText = fallback(context, userText);
      captured = !!email;
    }

    setIsTyping(false);
    setMessages((p) => [...p, { id: msgId++, role: "ai", text: replyText }]);
    if (captured) setLeadCaptured(true);
  }

  return { messages, isTyping, send, leadCaptured };
}
