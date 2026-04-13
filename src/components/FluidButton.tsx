"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ─── Inner R3F Sphere ──────────────────────────────────── */
function FluidSphere({ isSubmitting }: { isSubmitting: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const matRef = useRef<any>(null!);
  const { mouse } = useThree();

  useFrame((state) => {
    if (!meshRef.current || !matRef.current) return;
    const t = state.clock.getElapsedTime();

    // Distort based on cursor proximity
    const dist = Math.hypot(mouse.x, mouse.y);
    matRef.current.distort = THREE.MathUtils.lerp(
      matRef.current.distort,
      isSubmitting ? 0.8 : 0.15 + dist * 0.4,
      0.08
    );
    matRef.current.speed = isSubmitting ? 8 : 2 + dist * 3;

    // Gentle breath rotation
    meshRef.current.rotation.y = t * 0.4;
    meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;

    // Scale pulse on submit
    const targetScale = isSubmitting
      ? 1 + Math.sin(t * 20) * 0.15
      : 1;
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1)
    );
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 4]} />
      <MeshDistortMaterial
        ref={matRef}
        color="#39FF14"
        roughness={0.1}
        metalness={0.6}
        distort={0.2}
        speed={2}
        transparent
        opacity={0.92}
        emissive="#39FF14"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

/* ─── R3F Canvas Wrapper ─────────────────────────────────── */
function FluidCanvas({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.8], fov: 40 }}
      dpr={[1, 1.5]}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} intensity={1.8} color="#39FF14" />
      <pointLight position={[-2, -1, 1]} intensity={0.6} color="#00ffff" />
      <FluidSphere isSubmitting={isSubmitting} />
    </Canvas>
  );
}

/* ─── Main FluidButton ───────────────────────────────────── */
interface FluidButtonProps {
  onClick?: () => void;
  label?: string;
  disabled?: boolean;
}

export default function FluidButton({ onClick, label = "SPEAK", disabled = false }: FluidButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  /* Magnetic pull */
  function handleMove(e: React.MouseEvent) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    const dist = Math.hypot(dx, dy);
    if (dist < 90) {
      x.set(dx * 0.3);
      y.set(dy * 0.3);
    }
  }
  function handleLeave() { x.set(0); y.set(0); }

  async function handleClick() {
    setIsSubmitting(true);
    // Absorb animation
    await animate(sx as any, [0, -4, 2, 0], { duration: 0.35 });
    onClick?.();
    setTimeout(() => setIsSubmitting(false), 800);
  }

  return (
    <motion.button
      ref={containerRef}
      style={{ x: sx, y: sy, opacity: disabled ? 0.4 : 1, cursor: disabled ? "default" : "pointer" } as any}
      className="relative flex-shrink-0 w-16 h-16 rounded-full overflow-hidden"
      onMouseMove={disabled ? undefined : handleMove}
      onMouseLeave={disabled ? undefined : handleLeave}
      onClick={disabled ? undefined : handleClick}
      whileTap={disabled ? {} : { scale: 0.88 }}
      aria-label={label}
    >
      <FluidCanvas isSubmitting={isSubmitting} />
      <div
        className="absolute inset-0 flex items-center justify-center font-pixel text-[6px] tracking-widest pointer-events-none"
        style={{ color: "#0D0D0D", mixBlendMode: "multiply" }}
      >
        {label}
      </div>
    </motion.button>
  );
}
