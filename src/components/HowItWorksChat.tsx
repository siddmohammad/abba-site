"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useN8nChat } from "@/hooks/useN8nChat";
import KineticTypography from "./KineticTypography";
import NeonInput from "./NeonInput";
import FluidButton from "./FluidButton";

const SPRING = { type: "spring" as const, stiffness: 240, damping: 26 };

const INITIAL_MSG =
  "Hello — tell me your clinic's biggest patient communication challenge and I'll show you exactly how ABBA fixes it.";

export default function HowItWorksChat() {
  const { messages, isTyping, send, leadCaptured } = useN8nChat("how_it_works", INITIAL_MSG);
  const [inputValue, setInputValue] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (inputValue.trim()) {
      send(inputValue);
      setInputValue("");
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }, [messages, isTyping]);

  return (
    <section id="how-it-works" className="w-full py-28 px-6 md:px-16 flex flex-col items-center">
      {/* Label */}
      <motion.div
        className="text-[10px] uppercase tracking-[0.5em] mb-4"
        style={{ color: "#39FF14" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        WORKFLOW DISCOVERY
      </motion.div>

      <motion.h2
        className="text-3xl md:text-5xl font-bold text-center mb-3 print-jitter leading-tight max-w-3xl"
        style={{ color: "var(--foreground)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={SPRING}
      >
        Find out exactly how we{" "}
        <span style={{ color: "#39FF14" }}>fix your clinic&apos;s leak.</span>
      </motion.h2>

      <motion.p
        className="text-sm text-center mb-12 max-w-xl leading-relaxed"
        style={{ color: "var(--foreground)", opacity: 0.5 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Powered by ABBA&apos;s proprietary AI engine — trained on clinic inquiry patterns.
      </motion.p>

      {/* Terminal */}
      <motion.div
        className="w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl"
        style={{ background: "var(--term-bg)", border: "1px solid var(--card-border)" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={SPRING}
      >
        {/* Header bar */}
        <div
          className="flex items-center gap-3 px-6 py-3 border-b"
          style={{ background: "var(--term-header)", borderColor: "var(--card-border)" }}
        >
          <div className="flex gap-1.5">
            {["#ff5f57", "#ffbd2e", "#28c940"].map((c) => (
              <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            ))}
          </div>
          <span className="text-[9px] uppercase tracking-[0.3em] ml-2 opacity-40" style={{ color: "var(--foreground)" }}>
            ABBA_STRATEGY_ENGINE v1.0.4
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

        {/* Messages */}
        <div className="flex flex-col gap-5 p-6 min-h-80 max-h-[460px] overflow-y-auto">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                initial={{ opacity: 0, x: msg.role === "ai" ? -24 : 24 }}
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
                  className="max-w-[84%] px-4 py-3 rounded-xl text-xs leading-relaxed"
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

          {/* Typing indicator */}
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

          {/* Lead captured banner */}
          <AnimatePresence>
            {leadCaptured && (
              <motion.div
                className="text-[10px] text-center py-2 px-4 rounded-lg"
                style={{ background: "rgba(57,255,20,0.08)", border: "1px solid rgba(57,255,20,0.2)", color: "#39FF14" }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                ✓ Email captured — our team will be in touch within 24 hours.
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div
          className="p-5 border-t flex gap-3"
          style={{ borderColor: "var(--card-border)", background: "var(--term-header)" }}
        >
          <NeonInput
            value={inputValue}
            onChange={setInputValue}
            placeholder="Describe your clinic's biggest challenge..."
            onSubmit={handleSend}
            disabled={isTyping}
          />
          <FluidButton onClick={handleSend} />
        </div>

        {/* Watermark */}
        <div className="relative h-0 overflow-visible pointer-events-none">
          <div
            className="absolute bottom-4 right-6 text-[60px] font-bold opacity-[0.025] select-none leading-none"
            style={{ color: "var(--foreground)" }}
          >
            ABBA_OS
          </div>
        </div>
      </motion.div>
    </section>
  );
}
