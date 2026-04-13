"use client";

import { motion } from "framer-motion";

/* ──────────────────────────────────────────────────────
   Inline SVG logos using official brand colours.
   Kept minimal so they render crisply at small sizes.
────────────────────────────────────────────────────── */
const LOGOS = [
  {
    name: "Cliniko",
    category: "Practice Mgmt",
    color: "#2F80ED",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
        <rect width="40" height="40" rx="8" fill="#2F80ED"/>
        <path d="M20 8C13.373 8 8 13.373 8 20s5.373 12 12 12 12-5.373 12-12S26.627 8 20 8zm0 4a8 8 0 110 16A8 8 0 0120 12zm-1 3v6.5l5.5 3.2-1 1.7-6.5-3.8V15h2z" fill="#fff"/>
      </svg>
    ),
  },
  {
    name: "Jane App",
    category: "Scheduling",
    color: "#4A90D9",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
        <rect width="40" height="40" rx="8" fill="#4A90D9"/>
        <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold" fill="#fff">J</text>
      </svg>
    ),
  },
  {
    name: "Calendly",
    category: "Booking",
    color: "#006BFF",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
        <rect width="40" height="40" rx="8" fill="#006BFF"/>
        <rect x="9" y="13" width="22" height="18" rx="3" stroke="#fff" strokeWidth="2"/>
        <line x1="9" y1="18" x2="31" y2="18" stroke="#fff" strokeWidth="2"/>
        <line x1="15" y1="9" x2="15" y2="15" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        <line x1="25" y1="9" x2="25" y2="15" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        <rect x="13" y="22" width="5" height="4" rx="1" fill="#fff"/>
        <rect x="22" y="22" width="5" height="4" rx="1" fill="rgba(255,255,255,0.5)"/>
      </svg>
    ),
  },
  {
    name: "HotDoc",
    category: "Patient Portal",
    color: "#00B4A0",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
        <rect width="40" height="40" rx="8" fill="#00B4A0"/>
        <path d="M11 20a9 9 0 1118 0 9 9 0 01-18 0z" stroke="#fff" strokeWidth="2"/>
        <path d="M20 15v10M15 20h10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Nookal",
    category: "Practice Mgmt",
    color: "#FF6B35",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
        <rect width="40" height="40" rx="8" fill="#FF6B35"/>
        <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="#fff">N</text>
      </svg>
    ),
  },
  {
    name: "Microsoft Teams",
    category: "Team Comms",
    color: "#5558AF",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
        <rect width="40" height="40" rx="8" fill="#5558AF"/>
        <path d="M24 16h4a2 2 0 012 2v8a2 2 0 01-2 2h-4" stroke="#fff" strokeWidth="1.5"/>
        <rect x="10" y="14" width="14" height="14" rx="2" fill="#7B83EB" stroke="#fff" strokeWidth="1.5"/>
        <path d="M17 18v6M14 20h6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Google Cal",
    category: "Calendar",
    color: "#4285F4",
    svg: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
        <rect width="40" height="40" rx="8" fill="#fff" stroke="#e0e0e0"/>
        <rect x="8" y="8" width="24" height="5" rx="1" fill="#4285F4"/>
        <rect x="8" y="13" width="24" height="19" rx="1" fill="#fff" stroke="#e0e0e0"/>
        <line x1="8" y1="18" x2="32" y2="18" stroke="#e0e0e0"/>
        <text x="50%" y="71%" dominantBaseline="middle" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold" fill="#4285F4">19</text>
        <line x1="15" y1="8" x2="15" y2="14" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        <line x1="25" y1="8" x2="25" y2="14" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Custom EHR",
    category: "Via Webhook",
    color: "#39FF14",
    dashed: true,
    svg: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
        <rect width="40" height="40" rx="8" fill="rgba(57,255,20,0.08)" stroke="#39FF14" strokeWidth="1.5" strokeDasharray="4 2"/>
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="22" fill="#39FF14">+</text>
      </svg>
    ),
  },
];

const FLOW_STEPS = [
  { step: "01", label: "Patient sends message",      detail: "WhatsApp · Facebook · Instagram" },
  { step: "02", label: "AI qualifies the inquiry",   detail: "3-turn conversation, instant response" },
  { step: "03", label: "Booking pushed to calendar", detail: "Synced to your existing system" },
  { step: "04", label: "Staff just confirms",        detail: "Zero manual input required" },
];

const SPRING = { type: "spring" as const, stiffness: 200, damping: 22 };

export default function EhrShowcase() {
  return (
    <section className="w-full py-20 px-6 md:px-16">
      <div className="container mx-auto max-w-5xl">

        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={SPRING}
        >
          <div className="text-[10px] uppercase tracking-[0.5em] mb-4" style={{ color: "#39FF14" }}>
            ZERO DISRUPTION
          </div>
          <h2 className="text-3xl md:text-4xl font-bold print-jitter leading-tight" style={{ color: "var(--foreground)" }}>
            ABBA plugs into your workflow.
            <br />
            <span style={{ color: "#39FF14" }}>Not the other way around.</span>
          </h2>
          <p className="text-sm mt-4 opacity-45 max-w-xl mx-auto leading-relaxed" style={{ color: "var(--foreground)" }}>
            No re-training. No changing your booking system. ABBA syncs directly into the tools you already trust.
          </p>
        </motion.div>

        {/* 4-step flow */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-14">
          {FLOW_STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              className="abba-card rounded-xl p-5 flex flex-col gap-3 relative"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...SPRING, delay: i * 0.09 }}
            >
              <div className="font-pixel text-xs" style={{ color: "#39FF14" }}>{s.step}</div>
              <div className="text-[10px] font-bold uppercase tracking-wide leading-tight" style={{ color: "var(--foreground)" }}>
                {s.label}
              </div>
              <div className="text-[9px] opacity-40 leading-relaxed" style={{ color: "var(--foreground)" }}>
                {s.detail}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logo grid */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <div className="text-center text-[9px] uppercase tracking-[0.4em] mb-6 opacity-35" style={{ color: "var(--foreground)" }}>
            Compatible with
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {LOGOS.map((int, i) => (
              <motion.div
                key={int.name}
                className="flex flex-col items-center gap-2.5 px-5 py-4 rounded-xl"
                style={{
                  background: "var(--card-bg)",
                  border: int.dashed ? `1px dashed ${int.color}` : "1px solid var(--card-border)",
                  minWidth: "96px",
                }}
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ ...SPRING, delay: 0.35 + i * 0.05 }}
                whileHover={{ scale: 1.06, borderColor: int.color }}
              >
                {int.svg}
                <div className="text-center">
                  <div className="text-[10px] font-bold" style={{ color: "var(--foreground)" }}>{int.name}</div>
                  <div className="text-[8px] uppercase tracking-wider mt-0.5" style={{ color: int.color, opacity: 0.7 }}>{int.category}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
