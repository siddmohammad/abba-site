"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface KineticTypographyProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function KineticTypography({
  text,
  className = "",
  delay = 0,
}: KineticTypographyProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const chars = containerRef.current.querySelectorAll(".kchar");

    // Start invisible
    gsap.set(chars, { opacity: 0 });

    // Clean Typewriter Reveal
    gsap.to(chars, {
      opacity: 1,
      duration: 0.05,
      stagger: 0.03, // Typewriter speed
      delay,
      ease: "none",
    });
  }, [text, delay]);

  // Split into per-character spans
  const charSpans = text.split("").map((char, i) => (
    <span
      key={i}
      className="kchar inline"
      style={{ 
        opacity: 0, // Initial state for SSR
        whiteSpace: "pre-wrap" // Ensure spaces are preserved
      }}
    >
      {char}
    </span>
  ));

  return (
    <span ref={containerRef} className={`inline font-mono ${className}`}>
      {charSpans}
    </span>
  );
}
