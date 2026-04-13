"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  large?: boolean;
  delay?: number;
}

export default function GlowCard({ children, className = "", large = false, delay = 0 }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sx = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const sy = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(sy, [-100, 100], [4, -4]);
  const rotateY = useTransform(sx, [-100, 100], [-4, 4]);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }
  function handleLeave() { mouseX.set(0); mouseY.set(0); }

  return (
    <motion.div
      ref={ref}
      className={`abba-card rounded-xl ${large ? "p-10" : "p-6"} ${className}`}
      style={{ perspective: 800 }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 180, damping: 22, delay }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        {children}
      </motion.div>
    </motion.div>
  );
}
