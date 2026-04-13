"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";
import { useN8nChat } from "@/hooks/useN8nChat";
import KineticTypography from "./KineticTypography";

const SPRING = { type: "spring" as const, stiffness: 240, damping: 26 };

const INITIAL_MSG =
  "Hi! I'm here to help find the right ABBA setup for your clinic. To get started — what does your current patient inquiry process look like? (e.g., do you rely on phone calls, forms, WhatsApp?)";

/* ─────────────────────────────────────────────────────────
   Chat Panel (shown after button click)
───────────────────────────────────────────────────────── */
function ChatPanel({ onClose }: { onClose: () => void }) {
  const { messages, isTyping, send, leadCaptured } = useN8nChat("pricing", INITIAL_MSG);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }, [messages, isTyping]);

  useEffect(() => {
    // focus input when panel opens
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  function handleSend() {
    if (!input.trim() || isTyping) return;
    send(input.trim());
    setInput("");
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <motion.div
      className="w-full rounded-xl overflow-hidden shadow-2xl"
      style={{ background: "var(--term-bg)", border: "1px solid var(--card-border)" }}
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={SPRING}
    >
      {/* Header */}
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
          style={{ color: "var(--foreground)", opacity: 0.4 }}
        >
          ABBA_QUOTE_ENGINE v1.0
        </span>
        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[9px]" style={{ color: "#39FF14" }}>
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[#39FF14]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
            />
            ONLINE
          </div>
          <motion.button
            type="button"
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded opacity-40 hover:opacity-100"
            style={{ color: "var(--foreground)" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Close chat"
          >
            <X size={14} />
          </motion.button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-4 p-5 min-h-[300px] max-h-[420px] overflow-y-auto">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              initial={{ opacity: 0, x: msg.role === "ai" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={SPRING}
            >
              <div
                className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[8px] font-bold border"
                style={{
                  background: msg.role === "ai" ? "rgba(57,255,20,0.12)" : "var(--card-bg)",
                  borderColor: msg.role === "ai" ? "rgba(57,255,20,0.3)" : "var(--card-border)",
                  color: msg.role === "ai" ? "#39FF14" : "var(--foreground)",
                }}
              >
                {msg.role === "ai" ? "AI" : "YOU"}
              </div>
              <div
                className="max-w-[85%] px-4 py-3 rounded-xl text-xs leading-relaxed"
                style={{
                  background: msg.role === "ai" ? "var(--card-bg)" : "rgba(57,255,20,0.1)",
                  border: `1px solid ${msg.role === "ai" ? "var(--card-border)" : "rgba(57,255,20,0.2)"}`,
                  color: msg.role === "ai" ? "#39FF14" : "var(--foreground)",
                  whiteSpace: "pre-wrap",
                }}
              >
                {msg.role === "ai" ? <KineticTypography text={msg.text} /> : msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing dots */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={SPRING}
            >
              <div
                className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[8px] font-bold border"
                style={{ background: "rgba(57,255,20,0.12)", borderColor: "rgba(57,255,20,0.3)", color: "#39FF14" }}
              >
                AI
              </div>
              <div
                className="flex gap-1 px-4 py-3 rounded-xl"
                style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#39FF14" }}
                    animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lead captured confirmation */}
        <AnimatePresence>
          {leadCaptured && (
            <motion.div
              className="text-[10px] text-center py-2 px-4 rounded-lg"
              style={{ background: "rgba(57,255,20,0.08)", border: "1px solid rgba(57,255,20,0.2)", color: "#39FF14" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              ✓ Details captured — your tailored quote will arrive within 24 hours.
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        className="p-4 border-t flex gap-3 items-center"
        style={{ borderColor: "var(--card-border)", background: "var(--term-header)" }}
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          disabled={isTyping}
          placeholder={isTyping ? "ABBA is thinking..." : "Type your message..."}
          className="flex-1 bg-transparent text-xs outline-none px-4 py-3 rounded-lg"
          style={{
            border: "1px solid rgba(57,255,20,0.2)",
            color: "var(--foreground)",
            fontFamily: "'IBM Plex Mono', monospace",
            opacity: isTyping ? 0.5 : 1,
          }}
        />
        <motion.button
          type="button"
          onClick={handleSend}
          disabled={isTyping || !input.trim()}
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: input.trim() && !isTyping ? "#39FF14" : "rgba(57,255,20,0.1)",
            border: "1px solid rgba(57,255,20,0.3)",
            color: input.trim() && !isTyping ? "#0D0D0D" : "#39FF14",
            cursor: input.trim() && !isTyping ? "pointer" : "default",
          }}
          whileTap={input.trim() && !isTyping ? { scale: 0.9 } : {}}
          transition={SPRING}
          aria-label="Send message"
        >
          <Send size={14} />
        </motion.button>
      </div>

      <p
        className="text-center text-[9px] py-2 px-4"
        style={{ color: "var(--foreground)", opacity: 0.3 }}
      >
        No contracts. No surprise fees. Quote arrives in &lt; 24 hours.
      </p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   Main Export — trigger button + reveal panel
───────────────────────────────────────────────────────── */
export default function PricingChat() {
  const [open, setOpen] = useState(false);

  return (
    <section id="pricing" className="w-full py-28 px-6 md:px-16 flex flex-col items-center">
      {/* Label */}
      <motion.div
        className="text-[10px] uppercase tracking-[0.5em] mb-4"
        style={{ color: "#39FF14" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        PRICING
      </motion.div>

      <motion.h2
        className="text-3xl md:text-5xl font-bold text-center mb-4 print-jitter leading-tight"
        style={{ color: "var(--foreground)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={SPRING}
      >
        Our pricing is structured{" "}
        <span style={{ color: "#39FF14" }}>for every clinic.</span>
      </motion.h2>

      <motion.p
        className="text-sm text-center max-w-xl leading-relaxed mb-10"
        style={{ color: "var(--foreground)", opacity: 0.5 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Every clinic is different — your channels, your volume, your systems. Talk to ABBA and we&apos;ll build a quote that fits yours exactly.
      </motion.p>

      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ ...SPRING, delay: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {!open ? (
            /* Trigger button */
            <motion.div
              key="trigger"
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={SPRING}
            >
              <motion.button
                type="button"
                onClick={() => setOpen(true)}
                className="relative inline-flex items-center gap-3 px-10 py-5 text-sm font-bold uppercase tracking-widest rounded-lg overflow-hidden"
                style={{ background: "#39FF14", color: "#0D0D0D" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING}
              >
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
                />
                <MessageSquare size={18} />
                <span className="relative z-10">Get Your Custom Quote →</span>
              </motion.button>
              <p className="text-[10px]" style={{ color: "var(--foreground)", opacity: 0.3 }}>
                No contracts. No surprise fees. Quote arrives in &lt; 24 hours.
              </p>
            </motion.div>
          ) : (
            /* Chat panel */
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={SPRING}
            >
              <ChatPanel onClose={() => setOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
