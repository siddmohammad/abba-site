"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SPRING = { type: "spring" as const, stiffness: 260, damping: 28 };

const CONV_RATE = 90; // Always 90% — ABBA's guaranteed rate

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function RoiCalculator() {
  const [missedPerWeek, setMissedPerWeek] = useState(15);
  const [avgValue, setAvgValue] = useState(350);

  const recovered = Math.round((missedPerWeek * 4.3) * (CONV_RATE / 100) * avgValue);
  const roi12Month = recovered * 12;

  return (
    <section className="w-full py-20 px-6 md:px-16">
      <div className="container mx-auto max-w-4xl">

        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={SPRING}
        >
          <div className="text-[10px] uppercase tracking-[0.5em] mb-4" style={{ color: "#39FF14" }}>
            ROI CALCULATOR
          </div>
          <h2 className="text-3xl md:text-4xl font-bold print-jitter leading-tight" style={{ color: "var(--foreground)" }}>
            How much are you leaving<br />
            <span style={{ color: "#39FF14" }}>on the table every month?</span>
          </h2>
          <p className="text-sm mt-4 opacity-45" style={{ color: "var(--foreground)" }}>
            Adjust the sliders for your clinic and see your potential recovery instantly.
          </p>
        </motion.div>

        <motion.div
          className="abba-card rounded-xl p-8 md:p-12 flex flex-col gap-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={SPRING}
        >
          {/* Sliders — only 2 now */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Slider
              label="Missed inquiries / week"
              value={missedPerWeek}
              min={1} max={100} step={1}
              onChange={setMissedPerWeek}
              display={`${missedPerWeek} inquiries`}
            />
            <Slider
              label="Avg patient lifetime value"
              value={avgValue}
              min={50} max={5000} step={50}
              onChange={setAvgValue}
              display={formatCurrency(avgValue)}
            />
          </div>

          {/* ABBA rate — fixed, non-interactive */}
          <div
            className="flex items-center justify-between px-5 py-4 rounded-lg"
            style={{ background: "rgba(57,255,20,0.06)", border: "1px solid rgba(57,255,20,0.18)" }}
          >
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.3em] opacity-50" style={{ color: "var(--foreground)" }}>
                ABBA Conversion Rate
              </span>
              <span className="text-[10px] opacity-35 leading-relaxed" style={{ color: "var(--foreground)" }}>
                Guaranteed by our AI — validated across all live clinics
              </span>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ background: "#39FF14" }}
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
              />
              <span className="font-pixel text-2xl neon-text-glow" style={{ color: "#39FF14" }}>
                90%
              </span>
            </div>
          </div>

          {/* Result */}
          <div
            className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-8"
            style={{ borderColor: "var(--card-border)" }}
          >
            <div className="text-center md:text-left">
              <div className="text-[10px] uppercase tracking-[0.4em] mb-2 opacity-45" style={{ color: "var(--foreground)" }}>
                ABBA recovers monthly
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={recovered}
                  className="font-pixel text-4xl md:text-5xl neon-text-glow"
                  style={{ color: "#39FF14" }}
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={SPRING}
                >
                  {formatCurrency(recovered)}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-col items-center md:items-end gap-3">
              <div className="abba-card rounded-lg px-6 py-4 text-center">
                <div className="text-[9px] uppercase tracking-[0.3em] opacity-40 mb-1" style={{ color: "var(--foreground)" }}>
                  12-Month Revenue Recovered
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={roi12Month}
                    className="font-bold text-xl"
                    style={{ color: "#39FF14" }}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={SPRING}
                  >
                    +{formatCurrency(roi12Month)}
                  </motion.div>
                </AnimatePresence>
              </div>
              <motion.a
                href="/onboard"
                className="relative px-7 py-3 text-xs font-bold uppercase tracking-widest rounded-sm overflow-hidden inline-flex"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
              >
                <div className="absolute inset-0" style={{ background: "#39FF14" }} />
                <span className="relative z-10" style={{ color: "#0D0D0D" }}>Claim this revenue →</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Slider({
  label, value, min, max, step, onChange, display,
}: {
  label: string; value: number; min: number; max: number;
  step: number; onChange: (v: number) => void; display: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <span className="text-[10px] uppercase tracking-[0.2em] opacity-50" style={{ color: "var(--foreground)" }}>
          {label}
        </span>
        <motion.span
          key={value}
          className="text-sm font-bold"
          style={{ color: "#39FF14" }}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {display}
        </motion.span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-[9px] opacity-30" style={{ color: "var(--foreground)" }}>
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
