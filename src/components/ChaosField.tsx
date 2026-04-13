"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useScrollOrchestrator } from "@/providers/ScrollOrchestrator";

const PARTICLE_COUNT = 14;

type Particle = {
  id: number;
  // Chaos position (random, jittery)
  cx: number;
  cy: number;
  // Calm position (clean grid)
  gx: number;
  gy: number;
  // Visual chaos properties
  size: number;
  shape: "dot" | "dash" | "ring";
  rotation: number;
  animDelay: number;
  jitterX: number;
  jitterY: number;
};

const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  cx: 8 + (i % 7) * 14 + Math.sin(i * 2.1) * 5,
  cy: 10 + Math.floor(i / 7) * 55 + Math.cos(i * 1.7) * 12,
  gx: 5 + (i % 7) * 14,
  gy: 10 + Math.floor(i / 7) * 50,
  size: i % 3 === 0 ? 6 : i % 3 === 1 ? 10 : 4,
  shape: i % 3 === 0 ? "dot" : i % 3 === 1 ? "dash" : "ring",
  rotation: (i * 37) % 180,
  animDelay: i * 0.13,
  jitterX: (Math.random() - 0.5) * 8,
  jitterY: (Math.random() - 0.5) * 8,
}));

export default function ChaosField() {
  const { isCalmMode } = useScrollOrchestrator();
  const [hasMounted, setHasMounted] = React.useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const scrollCalm = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const springCalm = useSpring(scrollCalm, { stiffness: 120, damping: 22 });

  const isCalm = isCalmMode;

  if (!hasMounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          initial={{
            left: `${p.cx}%`,
            top: `${p.cy}%`,
            opacity: 0.4,
            rotate: p.rotation,
          }}
          animate={
            isCalm
              ? {
                  left: `${p.gx}%`,
                  top: `${p.gy}%`,
                  rotate: 0,
                  opacity: 0.15,
                  x: 0,
                  y: 0,
                }
              : {
                  left: [`${p.cx}%`, `${p.cx + p.jitterX}%`, `${p.cx}%`],
                  top: [`${p.cy}%`, `${p.cy + p.jitterY}%`, `${p.cy}%`],
                  rotate: [p.rotation, p.rotation + 20, p.rotation - 10, p.rotation],
                  opacity: [0.35, 0.55, 0.35],
                  x: 0,
                  y: 0,
                }
          }
          transition={
            isCalm
              ? {
                  type: "spring",
                  stiffness: 180,
                  damping: 28,
                  delay: p.animDelay,
                }
              : {
                  duration: 3 + p.animDelay,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: p.animDelay,
                }
          }
          style={{ width: p.size, height: p.size }}
        >
          {p.shape === "dot" && (
            <div
              className="rounded-full"
              style={{
                width: p.size,
                height: p.size,
                background: "var(--chaos-particle)",
              }}
            />
          )}
          {p.shape === "dash" && (
            <div
              style={{
                width: p.size * 2.5,
                height: 1.5,
                background: "var(--chaos-particle)",
                borderRadius: 1,
              }}
            />
          )}
          {p.shape === "ring" && (
            <div
              className="rounded-full"
              style={{
                width: p.size,
                height: p.size,
                border: `1.5px solid var(--chaos-particle)`,
                background: "transparent",
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
