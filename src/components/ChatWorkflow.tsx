"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useSpring, animate } from "framer-motion";
import KineticTypography from "./KineticTypography";
import NeonInput from "./NeonInput";
import FluidButton from "./FluidButton";

type Step = "q1" | "q2" | "lead" | "done";

interface Message {
  role: "ai" | "user";
  text: string;
  id: number;
}

const messageBubble = {
  ai: {
    initial: { x: -30, opacity: 0, scale: 0.96 },
    animate: { x: 0, opacity: 1, scale: 1 },
    exit:    { x: -20, opacity: 0 },
  },
  user: {
    initial: { x: 30, opacity: 0, scale: 0.96 },
    animate: { x: 0, opacity: 1, scale: 1 },
    exit:    { x: 20, opacity: 0 },
  },
};

const SPRING = { type: "spring" as const, stiffness: 260, damping: 26 };

export default function ChatWorkflow() {
  const [step, setStep] = useState<Step>("q1");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "ai",
      text: "How many inquiries does your clinic receive per week that go unanswered?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  let msgId = useRef(1);

  /* Auto-scroll to bottom */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  function addMessage(role: "ai" | "user", text: string) {
    setMessages((prev) => [...prev, { id: msgId.current++, role, text }]);
  }

  async function handleSubmit(value: string) {
    addMessage("user", value);
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1400));
    setIsTyping(false);

    if (step === "q1") {
      const missed = parseInt(value) || 10;
      const revenue = (missed * 0.3 * 300).toLocaleString();
      addMessage(
        "ai",
        `That's ~${Math.round(missed * 0.3)} missed leads per week — roughly $${revenue}/month in lost revenue. ABBA captures all of them, 24/7.\n\nWhich platform do they message you on? (WhatsApp, Facebook, Instagram, or all three)`
      );
      setStep("q2");
    } else if (step === "q2") {
      addMessage(
        "ai",
        `Perfect. ABBA integrates natively into ${value}. Your AI receptionist can be live in under 24 hours.\n\nDrop your email and I'll send you a personalised setup estimate — no credit card, no commitment.`
      );
      setStep("lead");
    }
  }

  async function handleLeadSubmit() {
    if (!email.trim() || !email.includes("@")) return;
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsTyping(false);
    addMessage("ai", `You're in. Check ${email} — your personalised setup guide is on its way. We'll have you live before tomorrow morning. 🟢`);
    setSubmitted(true);
    setStep("done");
    // TODO: POST to Supabase / n8n
  }

  return (
    <div
      className="flex flex-col rounded-xl overflow-hidden"
      style={{
        background: "var(--term-bg)",
        border: "1px solid var(--card-border)",
        minHeight: 380,
        maxHeight: 520,
      }}
    >
      {/* ── Terminal Header ── */}
      <div
        className="flex items-center gap-3 px-5 py-3 border-b"
        style={{ background: "var(--term-header)", borderColor: "var(--card-border)" }}
      >
        <div className="flex gap-1.5">
          {["#ff5f57", "#ffbd2e", "#28c940"].map((c) => (
            <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <span
          className="text-[9px] uppercase tracking-[0.3em] ml-2"
          style={{ color: "var(--foreground)", opacity: 0.5 }}
        >
          ABBA_INTAKE_ENGINE v3
        </span>
        <div className="ml-auto flex items-center gap-1.5 text-[9px]" style={{ color: "#39FF14" }}>
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-[#39FF14]"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          />
          ONLINE
        </div>
      </div>

      {/* ── Messages ── */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              variants={messageBubble[msg.role]}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={SPRING}
            >
              {/* Avatar */}
              <div
                className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] font-bold border"
                style={{
                  background: msg.role === "ai" ? "rgba(57,255,20,0.12)" : "var(--card-bg)",
                  borderColor: msg.role === "ai" ? "rgba(57,255,20,0.3)" : "var(--card-border)",
                  color: msg.role === "ai" ? "#39FF14" : "var(--foreground)",
                }}
              >
                {msg.role === "ai" ? "AI" : "YOU"}
              </div>

              {/* Bubble */}
              <div
                className="max-w-[82%] px-4 py-3 rounded-xl text-xs leading-relaxed"
                style={{
                  background: msg.role === "ai" ? "var(--card-bg)" : "rgba(57,255,20,0.12)",
                  border: `1px solid ${msg.role === "ai" ? "var(--card-border)" : "rgba(57,255,20,0.25)"}`,
                  color: msg.role === "ai" ? "#39FF14" : "var(--foreground)",
                  whiteSpace: "pre-line",
                }}
              >
                {msg.role === "ai" ? (
                  <KineticTypography text={msg.text} />
                ) : (
                  msg.text
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={SPRING}
              className="flex items-center gap-3"
            >
              <div
                className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] font-bold border"
                style={{ background: "rgba(57,255,20,0.12)", borderColor: "rgba(57,255,20,0.3)", color: "#39FF14" }}
              >
                AI
              </div>
              <div className="flex gap-1 px-4 py-3 rounded-xl" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#39FF14" }}
                    animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15, ease: "easeInOut" }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Input Row ── */}
      <div className="p-4 border-t flex items-center gap-3" style={{ borderColor: "var(--card-border)", background: "var(--term-bg)" }}>
        <AnimatePresence mode="wait">
          {step !== "lead" && step !== "done" && (
            <motion.div
              key="chat-input"
              className="flex items-center gap-3 w-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={SPRING}
            >
              <NeonInput
                placeholder={step === "q1" ? "e.g. 20 messages per week..." : "e.g. WhatsApp, all three..."}
                onSubmit={handleSubmit}
              />
              <FluidButton onClick={() => {}} />
            </motion.div>
          )}

          {step === "lead" && !submitted && (
            <motion.div
              key="lead-form"
              className="flex items-center gap-3 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={SPRING}
            >
              <NeonInput
                placeholder="your@email.com"
                onSubmit={(val) => { setEmail(val); handleLeadSubmit(); }}
              />
              <motion.button
                onClick={handleLeadSubmit}
                className="px-5 py-4 text-xs font-bold uppercase tracking-widest flex-shrink-0 rounded-sm"
                style={{ background: "#39FF14", color: "#0D0D0D" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.94 }}
              >
                Send →
              </motion.button>
            </motion.div>
          )}

          {step === "done" && (
            <motion.div
              key="done"
              className="w-full text-center text-xs uppercase tracking-widest py-2"
              style={{ color: "#39FF14" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={SPRING}
            >
              ✓ You're all set. Check your inbox.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
