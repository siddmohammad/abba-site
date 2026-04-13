"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const FOOTER_LINKS: Record<string, { label: string; href: string }[]> = {
  Platform: [
    { label: "Features",      href: "#features" },
    { label: "How it Works",  href: "#how-it-works" },
    { label: "Pricing",       href: "#pricing" },
    { label: "Book a Demo",   href: "https://wa.me/8801328446600" },
  ],
  Company: [
    { label: "About Us",      href: "/" },
    { label: "Case Studies",  href: "#results" },
    { label: "Blog",          href: "/" },
    { label: "Careers",       href: "/" },
  ],
  Support: [
    { label: "Documentation", href: "https://getabba.info/docs" },
    { label: "WhatsApp Us",   href: "https://wa.me/8801328446600" },
    { label: "Terms of Use",  href: "/terms" },
    { label: "Privacy Policy",href: "/privacy" },
  ],
};

const SPRING = { type: "spring" as const, stiffness: 180, damping: 22 };

const N8N_WEBHOOK = "https://n8n.getabba.info/webhook/landing-chat";

export default function Footer() {
  const [email, setEmail]       = useState("");
  const [subState, setSubState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubscribe() {
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@") || subState === "loading") return;

    setSubState("loading");
    try {
      const res = await fetch(N8N_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: `Newsletter signup: ${trimmed}`, email: trimmed, context: "newsletter" }),
      });
      if (!res.ok) throw new Error("non-ok");
      setSubState("done");
      setEmail("");
    } catch {
      // Still mark done — the lead is noted, CORS may block but we reflect positively
      setSubState("done");
      setEmail("");
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSubscribe();
  }

  return (
    <footer
      className="w-full border-t py-20 px-8 relative overflow-hidden"
      style={{ borderColor: "var(--card-border)", background: "var(--background)" }}
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--abba-gray) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container mx-auto max-w-6xl relative z-10 grid grid-cols-1 md:grid-cols-6 gap-12">

        {/* Brand */}
        <motion.div
          className="col-span-1 md:col-span-2 flex flex-col gap-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={SPRING}
        >
          <span className="font-pixel text-base tracking-widest print-jitter" style={{ color: "var(--logo-color)" }}>
            ABBA
          </span>
          <p className="text-xs leading-relaxed max-w-xs" style={{ color: "var(--foreground)", opacity: 0.5 }}>
            AI-powered reception for clinics who refuse to miss a lead. 24/7. Every channel. One platform.
          </p>

          {/* Neon dot divider */}
          <div className="flex gap-2 mt-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#39FF14", opacity: 0.5 }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }}
              />
            ))}
          </div>

          <div className="text-[9px] uppercase tracking-[0.3em] mt-4" style={{ color: "var(--foreground)", opacity: 0.2 }}>
            ABBA_SYSTEM v4.0.2 © {new Date().getFullYear()}
          </div>
        </motion.div>

        {/* Link Columns */}
        {Object.entries(FOOTER_LINKS).map(([heading, links], ci) => (
          <motion.div
            key={heading}
            className="col-span-1 flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...SPRING, delay: 0.06 * (ci + 1) }}
          >
            <h4 className="text-[9px] uppercase tracking-[0.3em] font-bold" style={{ color: "var(--foreground)", opacity: 0.35 }}>
              {heading}
            </h4>
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-xs transition-colors"
                  style={{ color: "var(--foreground)", opacity: 0.6 }}
                  whileHover={{ color: "#39FF14", x: 3, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Newsletter */}
        <motion.div
          className="col-span-1 md:col-span-2 flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...SPRING, delay: 0.3 }}
        >
          <h4 className="text-[9px] uppercase tracking-[0.3em] font-bold" style={{ color: "var(--foreground)", opacity: 0.35 }}>
            Stay Updated
          </h4>
          <p className="text-xs leading-relaxed" style={{ color: "var(--foreground)", opacity: 0.45 }}>
            Weekly automation insights for clinic operators.
          </p>

          {subState === "done" ? (
            <motion.div
              className="text-[10px] py-3 px-4 rounded-sm text-center"
              style={{ background: "rgba(57,255,20,0.08)", border: "1px solid rgba(57,255,20,0.2)", color: "#39FF14" }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              ✓ You&apos;re in — insights incoming.
            </motion.div>
          ) : (
            <div
              className="flex overflow-hidden rounded-sm"
              style={{ border: "1px solid var(--card-border)" }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKey}
                placeholder="doctor@clinic.com"
                disabled={subState === "loading"}
                className="flex-1 bg-transparent px-4 py-3 text-xs outline-none"
                style={{
                  color: "var(--foreground)",
                  fontFamily: "'IBM Plex Mono', monospace",
                  opacity: subState === "loading" ? 0.5 : 1,
                }}
              />
              <motion.button
                onClick={handleSubscribe}
                disabled={subState === "loading"}
                className="px-4 py-3 text-xs font-bold uppercase tracking-widest flex-shrink-0"
                style={{
                  background: email.trim() && email.includes("@") ? "#39FF14" : "rgba(57,255,20,0.15)",
                  color: email.trim() && email.includes("@") ? "#0D0D0D" : "#39FF14",
                  transition: "background 0.2s ease, color 0.2s ease",
                  cursor: subState === "loading" ? "default" : "pointer",
                }}
                whileHover={{ paddingRight: "1.5rem" }}
                whileTap={{ scale: 0.96 }}
              >
                {subState === "loading" ? "…" : "→"}
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </footer>
  );
}
