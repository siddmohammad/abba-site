"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { gsap } from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HowItWorksChat from "@/components/HowItWorksChat";
import GlowCard from "@/components/GlowCard";
import ChaosField from "@/components/ChaosField";
import ComplianceBadges from "@/components/ComplianceBadges";
import RoiCalculator from "@/components/RoiCalculator";
import EhrShowcase from "@/components/EhrShowcase";
import PricingChat from "@/components/PricingChat";

const SPRING = { type: "spring" as const, stiffness: 200, damping: 24 };

const FEATURES = [
  {
    num: "01",
    title: "Sub-1s Response",
    body: "Faster than any human receptionist. Patients get a reply before they consider booking elsewhere.",
  },
  {
    num: "02",
    title: "Every Channel",
    body: "WhatsApp, Facebook Messenger, and Instagram DM — all handled simultaneously, zero extra staff.",
  },
  {
    num: "03",
    title: "Infinite Scale",
    body: "1 inquiry or 1,000. ABBA doesn't flinch. No overtime, no sick days, no burnout.",
  },
];

const STATS = [
  { value: "90%", label: "Patient inquiry recovery rate" },
  { value: "24h", label: "Time to go live after signup" },
  { value: "3×", label: "Avg. revenue uplift per clinic" },
];

/* ──────────────────────────────────────────────────────── */
/*  Magnetic CTA Button                                     */
/* ──────────────────────────────────────────────────────── */
function MagneticCTA({ href = "#", children }: { href?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });

  function onMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  }
  function onLeave() { x.set(0); y.set(0); }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.93 }}
      className="relative inline-flex items-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-sm overflow-hidden"
    >
      <div className="absolute inset-0 rounded-sm" style={{ background: "#39FF14" }} />
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-sm"
        initial={{ x: "-100%", opacity: 0 }}
        whileHover={{ x: "100%", opacity: 0.2 }}
        transition={{ duration: 0.4 }}
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }}
      />
      <span className="relative z-10" style={{ color: "#0D0D0D" }}>{children}</span>
    </motion.a>
  );
}


/* ──────────────────────────────────────────────────────── */
/*  Hero Headline (GSAP SplitText-style word reveal)        */
/* ──────────────────────────────────────────────────────── */
function HeroHeadline() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const words = ref.current.querySelectorAll(".hw");
    gsap.fromTo(
      words,
      {
        opacity: 0,
        y: (i) => (i < 3 ? 40 : -10), // "chaos" words drop in hard, "calm" words float up gently
        skewX: (i) => (i < 3 ? -8 : 2),
        rotate: (i) => (i < 3 ? -3 : 0.5),
      },
      {
        opacity: 1,
        y: 0,
        skewX: 0,
        rotate: 0,
        duration: 0.8,
        stagger: 0.09,
        ease: "elastic.out(1, 0.6)",
        delay: 0.3,
      }
    );
  }, []);

  return (
    <h1
      ref={ref}
      className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tighter print-jitter"
      style={{ color: "var(--foreground)" }}
    >
      {/* Chaos words */}
      {["Your", "clinic", "misses"].map((w) => (
        <span key={w} className="hw inline-block mr-[0.25em]">{w}</span>
      ))}
      {/* The flashpoint number */}
      <motion.span
        className="hw inline-block mr-[0.25em]"
        style={{ color: "#39FF14" }}
        initial={{ opacity: 0, scale: 1.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 20, delay: 0.55 }}
      >
        30%
      </motion.span>
      <br />
      {/* Calm words */}
      {["of", "patient", "inquiries."].map((w) => (
        <span key={w} className="hw inline-block mr-[0.25em]">{w}</span>
      ))}
    </h1>
  );
}

/* ──────────────────────────────────────────────────────── */
/*  Main Page                                               */
/* ──────────────────────────────────────────────────────── */
export default function Home() {
  const { scrollYProgress } = useScroll();
  // Parallax for hero content on scroll
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -40]);

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>

      {/* Chaos particles — fixed background layer */}
      <ChaosField />

      <Navbar />

      <main className="relative z-10">

        {/* ══ HERO ══════════════════════════════════════════ */}
        <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 pt-24 pb-16">
          <motion.div
            style={{ y: heroY }}
            className="container mx-auto max-w-5xl flex flex-col items-center text-center gap-8"
          >
            {/* Social proof pill */}
            <motion.div
              className="inline-flex self-center items-center gap-2 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.25em]"
              style={{ border: "1px solid rgba(57,255,20,0.35)", color: "#39FF14" }}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING, delay: 0.1 }}
            >
              <motion.span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: "#39FF14" }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
              />
              24/7 PATIENT CAPTURE ENGINE
            </motion.div>

            <HeroHeadline />

            <motion.p
              className="text-lg md:text-xl leading-relaxed max-w-2xl"
              style={{ color: "var(--foreground)", opacity: 0.65 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 0.65, y: 0 }}
              transition={{ ...SPRING, delay: 0.7 }}
            >
              Every missed call is a{" "}
              <strong style={{ color: "var(--foreground)", opacity: 1 }}>$300 patient leak</strong>.
              ABBA captures, qualifies, and books them — on WhatsApp, Facebook, and Instagram — while you sleep.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING, delay: 0.85 }}
            >
              <MagneticCTA href="/onboard">Start Free Trial →</MagneticCTA>
              <motion.a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-sm"
                style={{ border: "2px solid var(--card-border)", color: "var(--foreground)" } as React.CSSProperties}
                whileHover={{ borderColor: "#39FF14", color: "#39FF14", x: 3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                See How It Works
              </motion.a>
            </motion.div>

            {/* Stat pills */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              {STATS.map((s, i) => (
                <motion.div
                  key={s.value}
                  className="flex flex-col px-5 py-4 rounded-lg"
                  style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ ...SPRING, delay: 1.1 + i * 0.1 }}
                  whileHover={{ borderColor: "rgba(57,255,20,0.3)", scale: 1.03 }}
                >
                  <span className="font-pixel text-xl" style={{ color: "#39FF14" }}>{s.value}</span>
                  <span className="text-[10px] mt-1" style={{ color: "var(--foreground)", opacity: 0.5 }}>{s.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ══ COMPLIANCE BADGES ══════════════════════════════ */}
        <ComplianceBadges />

        {/* ══ FEATURES ══════════════════════════════════════ */}
        <section id="features" className="py-28 px-6 md:px-16">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={SPRING}
            >
              <div className="text-[10px] uppercase tracking-[0.5em] mb-4" style={{ color: "#39FF14" }}>
                WHY ABBA
              </div>
              <h2
                className="text-3xl md:text-5xl font-bold print-jitter leading-tight"
                style={{ color: "var(--foreground)" }}
              >
                Built for the clinic that{" "}
                <span style={{ color: "#39FF14" }}>can&apos;t afford to miss.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FEATURES.map((f, i) => (
                <GlowCard key={f.num} delay={i * 0.12}>
                  <div className="font-pixel text-2xl mb-6" style={{ color: "#39FF14" }}>{f.num}</div>
                  <h3 className="text-lg font-bold uppercase tracking-tight mb-3" style={{ color: "var(--foreground)" }}>
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)", opacity: 0.55 }}>
                    {f.body}
                  </p>
                </GlowCard>
              ))}
            </div>
          </div>
        </section>

        {/* ══ HOW IT WORKS / N8N CHAT ═══════════════════════ */}
        <HowItWorksChat />

        {/* ══ RESULTS / SOCIAL PROOF ════════════════════════ */}
        <section id="results" className="py-28 px-6 md:px-16">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={SPRING}
            >
              <div className="text-[10px] uppercase tracking-[0.5em] mb-4" style={{ color: "#39FF14" }}>
                SOCIAL PROOF
              </div>
              <h2 className="text-3xl md:text-4xl font-bold print-jitter" style={{ color: "var(--foreground)" }}>
                Real clinics. Real results.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  quote: "ABBA turned our WhatsApp into a 24/7 desk. Weekend leads got answers fast — conversion went up 34% in the first month.",
                  name: "Ratul Zaman",
                  role: "Founder, Aesthetix Clinic",
                },
                {
                  quote: "We were losing patients every Friday night. ABBA fixed that in 24 hours. Now my staff just confirms what the AI already arranged.",
                  name: "Goutam Banik",
                  role: "Director, MedSpa International",
                },
              ].map((t, i) => (
                <GlowCard key={t.name} delay={i * 0.15}>
                  <p className="text-sm leading-relaxed mb-6 italic" style={{ color: "var(--foreground)", opacity: 0.7 }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <div className="font-bold text-xs" style={{ color: "#39FF14" }}>{t.name}</div>
                    <div className="text-[10px] mt-0.5 opacity-40" style={{ color: "var(--foreground)" }}>{t.role}</div>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        </section>

        {/* ══ ROI CALCULATOR ════════════════════════════════ */}
        <RoiCalculator />

        {/* ══ EHR SHOWCASE ══════════════════════════════════ */}
        <EhrShowcase />

        {/* ══ PRICING CHAT ══════════════════════════════════ */}
        <PricingChat />




        {/* ══ FINAL CTA ═════════════════════════════════════ */}
        <section className="py-32 px-6 md:px-16 text-center relative overflow-hidden">
          {/* Pulsing glow orb */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(57,255,20,0.08), transparent 70%)" }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />
          <div className="container mx-auto max-w-3xl relative z-10 flex flex-col items-center gap-8">
            <motion.h2
              className="text-4xl md:text-6xl font-bold print-jitter-strong leading-tight"
              style={{ color: "var(--foreground)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={SPRING}
            >
              Sleep well.{" "}
              <span style={{ color: "#39FF14" }}>ABBA&apos;s got the night.</span>
            </motion.h2>
            <motion.p
              className="text-base leading-relaxed max-w-lg"
              style={{ color: "var(--foreground)", opacity: 0.55 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.55 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Join clinics across the region who haven&apos;t missed a single after-hours lead since going live with ABBA.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ ...SPRING, delay: 0.3 }}
            >
              <MagneticCTA href="/onboard">Start Free 14-Day Trial →</MagneticCTA>
            </motion.div>
            <p className="text-[10px] uppercase tracking-widest opacity-30" style={{ color: "var(--foreground)" }}>
              No credit card · Live in 24 hours · WhatsApp support
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
