"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { gsap } from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlowCard from "@/components/GlowCard";
import ChaosField from "@/components/ChaosField";

const SPRING = { type: "spring" as const, stiffness: 200, damping: 24 };

const CAPABILITIES = [
  {
    num: "01",
    title: "Website Design & Build",
    body: "A clean, fast website built around your business, not a generic template. Live in weeks, not months.",
  },
  {
    num: "02",
    title: "AI Integration",
    body: "Chatbots, WhatsApp automation, smart booking. Whatever saves you time and answers customers even when you can't. Layered on top of your new site.",
  },
  {
    num: "03",
    title: "Ongoing Support",
    body: "Your site and AI tools keep working after launch. Updates, fixes, and improvements as your business grows.",
  },
];

const PROBLEMS = [
  {
    num: "01",
    title: "No Real Website",
    body: "You're on Facebook, maybe Instagram. No real site. Customers searching for you online find nothing, or find a competitor instead.",
  },
  {
    num: "02",
    title: "Manual Everything",
    body: "Every booking, every question, every order comes in by phone or DM. Someone has to answer it, every single time.",
  },
  {
    num: "03",
    title: "Falling Behind",
    body: "Bigger competitors already look more professional online and use AI to respond faster. Small businesses get left behind by default, not by choice.",
  },
];

const PROCESS = [
  {
    num: "01",
    title: "Discovery Call",
    body: "We learn about your business, what you sell, and where customers get stuck today. Free, no pitch, no obligation.",
  },
  {
    num: "02",
    title: "Design & Build",
    body: "We design and build your website first, then map exactly where AI can save you the most time.",
  },
  {
    num: "03",
    title: "Launch in Phases",
    body: "Your site goes live first. AI features layer on top once the foundation is solid. You see progress at every step.",
  },
  {
    num: "04",
    title: "Own It",
    body: "You own the site and the system. No vendor lock-in, no monthly SaaS tax. Your business stays yours.",
  },
];

const STATS = [
  { value: "Phase-based", label: "No big-bang commitments" },
  { value: "You Own It",  label: "No lock-in, ever" },
  { value: "BDT-priced",  label: "Built for Bangladesh" },
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
/*  Hero Headline — GSAP word reveal                        */
/* ──────────────────────────────────────────────────────── */
const ACROSTIC = [
  { letter: "A", rest: "lways" },
  { letter: "B", rest: "uilding" },
  { letter: "B", rest: "etter" },
  { letter: "A", rest: "utomations" },
];

function HeroHeadline() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const rows = ref.current.querySelectorAll(".hw-row");
    gsap.fromTo(
      rows,
      { opacity: 0, x: -40, skewX: -6 },
      { opacity: 1, x: 0, skewX: 0, duration: 0.75, stagger: 0.12, ease: "elastic.out(1, 0.65)", delay: 0.2 }
    );
  }, []);

  return (
    <div ref={ref} className="flex flex-col items-start gap-1 md:gap-2">
      {ACROSTIC.map(({ letter, rest }, i) => (
        <div
          key={i}
          className="hw-row flex items-baseline leading-none"
          style={{ opacity: 0 }}
        >
          <motion.span
            className="font-pixel print-jitter inline-block"
            style={{
              color: "#39FF14",
              fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
              lineHeight: 1,
              minWidth: "1ch",
            }}
            animate={{ y: [0, -8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              delay: i * 0.25,
              ease: "easeInOut",
            }}
          >
            {letter}
          </motion.span>
          <span
            className="font-bold"
            style={{
              color: "var(--foreground)",
              fontSize: "clamp(3.5rem, 8vw, 7rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {rest}
          </span>
        </div>
      ))}
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="px-6 md:px-16">
      <div className="container mx-auto max-w-6xl">
        <div style={{ height: "1px", background: "var(--card-border)", opacity: 0.5 }} />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */
/*  Main Page                                               */
/* ──────────────────────────────────────────────────────── */
export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -40]);

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>

      <ChaosField />
      <Navbar />

      <main className="relative z-10">

        {/* ══ HERO ══════════════════════════════════════════ */}
        <section className="px-6 md:px-16 pt-32 pb-14">
          <motion.div
            style={{ y: heroY }}
            className="container mx-auto max-w-5xl flex flex-col items-center text-center gap-8"
          >
            {/* Badge */}
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
              Now building for small businesses across Bangladesh
            </motion.div>

            <HeroHeadline />

            <motion.p
              className="text-lg md:text-xl leading-relaxed max-w-2xl"
              style={{ color: "var(--foreground)", opacity: 0.65 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 0.65, y: 0 }}
              transition={{ ...SPRING, delay: 0.7 }}
            >
              We help small businesses adopt smart solutions. First, a website that actually works for you. Then, AI built in to save you time on bookings, questions, and follow ups.{" "}
              <strong style={{ color: "var(--foreground)", opacity: 1 }}>Built for you. Live in weeks.</strong>
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING, delay: 0.85 }}
            >
              <MagneticCTA href="#contact">Book a Free Discovery Call →</MagneticCTA>
              <motion.a
                href="#capabilities"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-sm"
                style={{ border: "2px solid var(--card-border)", color: "var(--foreground)" } as React.CSSProperties}
                whileHover={{ borderColor: "#39FF14", color: "#39FF14", x: 3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                See What We Build
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

        <SectionDivider />

        {/* ══ THE PROBLEM ═══════════════════════════════════ */}
        <section className="py-14 px-6 md:px-16">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={SPRING}
            >
              <div className="text-[10px] uppercase tracking-[0.5em] mb-4" style={{ color: "#39FF14" }}>
                THE PROBLEM
              </div>
              <h2
                className="text-3xl md:text-5xl font-bold print-jitter leading-tight"
                style={{ color: "var(--foreground)" }}
              >
                Your business is ready.{" "}
                <span style={{ color: "#39FF14" }}>Your website isn&apos;t.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PROBLEMS.map((p, i) => (
                <GlowCard key={p.num} delay={i * 0.12}>
                  <div className="font-pixel text-2xl mb-6" style={{ color: "#39FF14" }}>{p.num}</div>
                  <h3 className="text-lg font-bold uppercase tracking-tight mb-3" style={{ color: "var(--foreground)" }}>
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)", opacity: 0.55 }}>
                    {p.body}
                  </p>
                </GlowCard>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ══ CAPABILITIES ══════════════════════════════════ */}
        <section id="capabilities" className="py-14 px-6 md:px-16">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={SPRING}
            >
              <div className="text-[10px] uppercase tracking-[0.5em] mb-4" style={{ color: "#39FF14" }}>
                CAPABILITIES
              </div>
              <h2
                className="text-3xl md:text-5xl font-bold print-jitter leading-tight"
                style={{ color: "var(--foreground)" }}
              >
                What we actually build.{" "}
                <span style={{ color: "#39FF14" }}>For you, not a template.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CAPABILITIES.map((c, i) => (
                <GlowCard key={c.num} delay={i * 0.12}>
                  <div className="font-pixel text-2xl mb-6" style={{ color: "#39FF14" }}>{c.num}</div>
                  <h3 className="text-lg font-bold uppercase tracking-tight mb-3" style={{ color: "var(--foreground)" }}>
                    {c.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)", opacity: 0.55 }}>
                    {c.body}
                  </p>
                </GlowCard>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ══ WHO THIS IS FOR ═══════════════════════════════ */}
        <section className="py-14 px-6 md:px-16">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={SPRING}
            >
              <div className="text-[10px] uppercase tracking-[0.5em] mb-4" style={{ color: "#39FF14" }}>
                WHO THIS IS FOR
              </div>
              <h2 className="text-3xl md:text-5xl font-bold print-jitter leading-tight" style={{ color: "var(--foreground)" }}>
                Built for small businesses{" "}
                <span style={{ color: "#39FF14" }}>ready to look, and work, like bigger ones.</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--foreground)", opacity: 0.5 }}>
                ABBA builds websites and AI tools for small and local businesses in Bangladesh. Not enterprise software, not generic templates. Built around how your business actually runs.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {[
                { icon: "🐾", sector: "Pet Shops & Pet Care", desc: "A real site to show products, services, and hours, with AI to answer common questions automatically." },
                { icon: "🚗", sector: "Car Dealers & Auto Sales", desc: "Showcase your inventory online and let AI handle initial buyer questions and test drive bookings." },
                { icon: "🛍️", sector: "Retail & Local Shops", desc: "Get found online, list what you sell, and let AI handle repetitive questions and orders." },
                { icon: "🍽️", sector: "Restaurants & Cafes", desc: "Menus, hours, and location always up to date online, with AI-assisted bookings and orders." },
                { icon: "💇", sector: "Salons, Clinics & Wellness", desc: "A professional site that builds trust, with AI to handle appointment requests around the clock." },
                { icon: "🔧", sector: "Home & Trade Services", desc: "A site that shows what you do and where, with AI to capture leads even after hours." },
              ].map((item, i) => (
                <GlowCard key={item.sector} delay={i * 0.08}>
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="text-sm font-bold uppercase tracking-tight mb-2" style={{ color: "var(--foreground)" }}>
                    {item.sector}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--foreground)", opacity: 0.55 }}>
                    {item.desc}
                  </p>
                </GlowCard>
              ))}
            </div>

            {/* Pull-quote */}
            <motion.div
              className="text-center px-6 py-8 rounded-xl mx-auto max-w-3xl"
              style={{ background: "var(--card-bg)", border: "1px solid rgba(57,255,20,0.15)" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...SPRING, delay: 0.2 }}
            >
              <p className="text-base md:text-lg font-bold leading-snug" style={{ color: "var(--foreground)" }}>
                &ldquo;If your business doesn&apos;t show up online, or your team spends all day answering the same questions,<br />
                <span style={{ color: "#39FF14" }}>that&apos;s exactly what we fix.&rdquo;</span>
              </p>
              <p className="mt-3 text-[10px] uppercase tracking-widest" style={{ color: "var(--foreground)", opacity: 0.35 }}>
                ABBA: Websites &amp; AI for Small Business
              </p>
            </motion.div>
          </div>
        </section>

        <SectionDivider />

        {/* ══ PROCESS ═══════════════════════════════════════ */}
        <section id="process" className="py-14 px-6 md:px-16">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={SPRING}
            >
              <div className="text-[10px] uppercase tracking-[0.5em] mb-4" style={{ color: "#39FF14" }}>
                PROCESS
              </div>
              <h2
                className="text-3xl md:text-5xl font-bold print-jitter leading-tight"
                style={{ color: "var(--foreground)" }}
              >
                Phased.{" "}
                <span style={{ color: "#39FF14" }}>De-risked. Every time.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROCESS.map((step, i) => (
                <GlowCard key={step.num} delay={i * 0.1}>
                  <div className="font-pixel text-2xl mb-6" style={{ color: "#39FF14" }}>{step.num}</div>
                  <h3 className="text-lg font-bold uppercase tracking-tight mb-3" style={{ color: "var(--foreground)" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)", opacity: 0.55 }}>
                    {step.body}
                  </p>
                </GlowCard>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* ══ FINAL CTA ═════════════════════════════════════ */}
        <section id="contact" className="py-16 px-6 md:px-16 text-center relative overflow-hidden">
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
              Ready to look,{" "}
              <span style={{ color: "#39FF14" }}>and work, like a bigger business?</span>
            </motion.h2>
            <motion.p
              className="text-base leading-relaxed max-w-lg"
              style={{ color: "var(--foreground)", opacity: 0.55 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.55 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Book a free 30-minute call. We&apos;ll look at what you have today, a Facebook page, an old site, or nothing at all, and show you exactly what a real website plus AI would look like for your business. No pitch. Just clarity.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ ...SPRING, delay: 0.3 }}
            >
              <MagneticCTA href="mailto:dahamoody@gmail.com?subject=Website%20%2B%20AI%20Inquiry&body=Hi%2C%0A%0AI%27d%20like%20to%20book%20a%20free%20Discovery%20Call%20with%20ABBA.%0A%0AName%3A%20%0ABusiness%3A%20%0ACurrent%20website%20(if%20any)%3A%20%0AWhat%20I%20want%20AI%20to%20help%20with%3A%20">Book Your Free Call →</MagneticCTA>
            </motion.div>
            <p className="text-[10px] uppercase tracking-widest opacity-30" style={{ color: "var(--foreground)" }}>
              Currently available for new engagements.
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
