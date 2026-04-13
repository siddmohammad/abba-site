"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, Database } from "lucide-react";

const BADGES = [
  {
    icon: ShieldCheck,
    label: "HIPAA-Ready Architecture",
    sub: "Patient data handled with clinical-grade security protocols. Built for the healthcare environment.",
  },
  {
    icon: Lock,
    label: "End-to-End Encrypted",
    sub: "Every message encrypted in transit and at rest. Your patients' data stays private — always.",
  },
  {
    icon: Database,
    label: "Zero Patient Data Retention",
    sub: "ABBA routes conversations and bookings. We never store sensitive patient information.",
  },
];

const SPRING = { type: "spring" as const, stiffness: 200, damping: 22 };

export default function ComplianceBadges() {
  return (
    <section className="w-full py-16 px-6 md:px-16">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center text-[9px] uppercase tracking-[0.5em] mb-8"
          style={{ color: "var(--abba-green)", opacity: 0.6 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
        >
          Security & Compliance
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {BADGES.map(({ icon: Icon, label, sub }, i) => (
            <motion.div
              key={label}
              className="flex flex-col gap-4 p-6 md:p-8 rounded-xl"
              style={{
                background: "var(--compliance-bg)",
                border: "1px solid var(--compliance-border)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...SPRING, delay: i * 0.1 }}
              whileHover={{
                borderColor: "rgba(57,255,20,0.45)",
                boxShadow: "0 0 28px rgba(57,255,20,0.07)",
              }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(57,255,20,0.1)", border: "1px solid rgba(57,255,20,0.2)" }}
              >
                <Icon size={22} strokeWidth={1.5} color="#39FF14" />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2">
                <span
                  className="font-bold text-sm uppercase tracking-[0.1em]"
                  style={{ color: "#39FF14" }}
                >
                  {label}
                </span>
                <span
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--foreground)", opacity: 0.55 }}
                >
                  {sub}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
