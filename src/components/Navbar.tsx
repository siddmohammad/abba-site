"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Features",      href: "#features" },
  { label: "How it Works",  href: "#how-it-works" },
  { label: "Results",       href: "#results" },
  { label: "Pricing",       href: "#pricing" },
];

const SPRING = { type: "spring" as const, stiffness: 300, damping: 28 };

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const navBg     = useTransform(scrollY, [0, 60], ["rgba(13,13,13,0)", "rgba(13,13,13,0.92)"]);
  const navBlur   = useTransform(scrollY, [0, 60], [0, 14]);
  const navBorder = useTransform(scrollY, [0, 60], ["rgba(57,255,20,0)", "rgba(57,255,20,0.08)"]);

  /* Magnetic logo */
  const logoRef = useRef<HTMLSpanElement>(null);
  const lx = useMotionValue(0);
  const ly = useMotionValue(0);
  const sx = useSpring(lx, { stiffness: 200, damping: 20 });
  const sy = useSpring(ly, { stiffness: 200, damping: 20 });

  function handleNavMouse(e: React.MouseEvent<HTMLElement>) {
    if (!logoRef.current) return;
    const rect = logoRef.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    if (Math.hypot(dx, dy) < 100) { lx.set(dx * 0.15); ly.set(dy * 0.15); }
    else { lx.set(0); ly.set(0); }
  }
  function handleNavLeave() { lx.set(0); ly.set(0); }

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-4 flex items-center justify-between"
        style={{
          backgroundColor: navBg,
          backdropFilter: useTransform(navBlur, (v) => `blur(${v}px)`) as unknown as string,
          borderBottom: useTransform(navBorder, (v) => `1px solid ${v}`) as unknown as string,
        }}
        onMouseMove={handleNavMouse}
        onMouseLeave={handleNavLeave}
      >
        {/* Logo */}
        <motion.a href="/" style={{ x: sx, y: sy }}>
          <motion.span
            ref={logoRef}
            className="font-pixel text-sm md:text-base tracking-widest print-jitter select-none"
            style={{ color: "var(--logo-color)" }}
            whileHover={{ scale: 1.05 }}
            transition={SPRING}
          >
            ABBA
          </motion.span>
        </motion.a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em]"
              style={{ color: "var(--foreground)" }}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, ...SPRING }}
              whileHover={{ color: "#39FF14", y: -1 }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Desktop CTA + Mobile Hamburger */}
        <div className="flex items-center gap-4">
          <MagneticButton href="/onboard" label="Start Free Trial" className="hidden md:inline-flex" />

          {/* Hamburger (mobile) */}
          <motion.button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              className="block w-5 h-[1.5px] bg-[#39FF14]"
              animate={mobileOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              transition={SPRING}
            />
            <motion.span
              className="block w-5 h-[1.5px] bg-[#39FF14]"
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={SPRING}
            />
            <motion.span
              className="block w-5 h-[1.5px] bg-[#39FF14]"
              animate={mobileOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={SPRING}
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 md:hidden"
            style={{ background: "#0D0D0D" }}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={SPRING}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-2xl uppercase tracking-[0.3em] font-bold"
                style={{ color: "var(--foreground)" }}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...SPRING, delay: 0.06 * i }}
                whileHover={{ color: "#39FF14", x: 8 }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...SPRING, delay: 0.28 }}
            >
              <MagneticButton
                href="/onboard"
                label="Start Free Trial"
                onClick={() => setMobileOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MagneticButton({
  href, label, className = "", onClick,
}: { href: string; label: string; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 20 });
  const sy = useSpring(y, { stiffness: 250, damping: 20 });

  function handleMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.25);
  }
  function handleLeave() { x.set(0); y.set(0); }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy } as any}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      className={`relative px-5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-sm overflow-hidden inline-flex ${className}`}
    >
      <div className="absolute inset-0" style={{ background: "#39FF14" }} />
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{ background: "rgba(255,255,255,0.14)" }}
      />
      <span className="relative z-10" style={{ color: "#0D0D0D" }}>{label}</span>
    </motion.a>
  );
}
