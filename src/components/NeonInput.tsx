"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";

interface NeonInputProps {
  placeholder?: string;
  /** Controlled mode: provide both value + onChange together */
  value?: string;
  onChange?: (v: string) => void;
  /** Optional external ref so parent can imperatively read/focus */
  inputRef?: React.RefObject<HTMLInputElement | null>;
  /** Called when Enter is pressed (or parent calls it) */
  onSubmit: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export default function NeonInput({
  placeholder = "Type your clinic's problem...",
  value,
  onChange,
  inputRef: externalRef,
  onSubmit,
  className = "",
  disabled = false,
}: NeonInputProps) {
  const internalRef = useRef<HTMLInputElement>(null);
  const ref = externalRef ?? internalRef;
  const containerRef = useRef<HTMLDivElement>(null);

  /* controlled vs uncontrolled */
  const isControlled = value !== undefined && onChange !== undefined;

  /* ── Cursor-tracking radial glow ── */
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const springGlowX = useSpring(glowX, { stiffness: 120, damping: 18 });
  const springGlowY = useSpring(glowY, { stiffness: 120, damping: 18 });

  /* ── Border glow scale ── */
  const glowScale = useMotionValue(0.3);
  const springGlow = useSpring(glowScale, { stiffness: 200, damping: 25 });

  /* ── Keypress bump ── */
  const scaleVal = useMotionValue(1);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  function handleFocus() {
    animate(glowScale, 1, { type: "spring", stiffness: 200, damping: 18 });
  }

  function handleBlur() {
    animate(glowScale, 0.3, { type: "spring", stiffness: 150, damping: 22 });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    // Bounce on each keystroke
    animate(scaleVal, [1, 1.006, 0.998, 1], { duration: 0.18, ease: "easeOut" });

    if (e.key === "Enter") {
      if (isControlled) {
        if (value.trim()) onSubmit(value);
      } else {
        const val = ref.current?.value.trim();
        if (val) {
          onSubmit(val);
          if (ref.current) ref.current.value = "";
        }
      }
    }
  }

  const inputProps = isControlled
    ? { value, onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value) }
    : {};

  return (
    <motion.div
      ref={containerRef}
      className={`relative flex-1 rounded-sm overflow-hidden ${className}`}
      style={{ scale: scaleVal, opacity: disabled ? 0.5 : 1 }}
      onMouseMove={handleMouseMove}
    >
      {/* Cursor-tracking radial glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-sm"
        style={{
          background: `radial-gradient(circle 120px at ${springGlowX}% ${springGlowY}%, rgba(57,255,20,0.15), transparent 70%)`,
          opacity: springGlow,
        }}
      />
      {/* Border glow ring */}
      <motion.div
        className="absolute inset-0 rounded-sm pointer-events-none"
        style={{
          boxShadow: `0 0 0 1px rgba(57,255,20,${springGlow}), 0 0 20px rgba(57,255,20,0.15)`,
        }}
      />

      <input
        ref={ref}
        type="text"
        placeholder={disabled ? "ABBA is thinking..." : placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        {...inputProps}
        className="w-full bg-transparent px-5 py-4 text-sm outline-none placeholder:opacity-40"
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          color: "#39FF14",
          caretColor: "#39FF14",
          border: "1px solid rgba(57,255,20,0.2)",
          WebkitTextFillColor: "#39FF14",
        }}
      />
    </motion.div>
  );
}
