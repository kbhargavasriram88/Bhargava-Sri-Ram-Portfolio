"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Cpu, ShieldCheck, Radio, Activity } from "lucide-react";

function isAdminRoute(p?: string | null): boolean {
  let path = p;
  if (!path && typeof window !== "undefined") {
    path = window.location.pathname;
  }
  if (!path) return false;
  return path.startsWith("/admin") || path.startsWith("/login") || path.startsWith("/api/auth");
}

export function FuturisticLogoEffect({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isAdmin = isAdminRoute(pathname);

  const [mounted, setMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; color: string; angle: number }>>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Clean up if path switches to admin or login
  useEffect(() => {
    if (isAdminRoute(pathname) && isActive) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setIsActive(false);
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    }
  }, [pathname, isActive]);

  const navigateToHome = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsActive(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
    if (pathname !== "/") {
      router.push("/");
    }
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, router]);

  // Lock body scroll whenever isActive is true
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isActive]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, []);

  const playFuturisticSound = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Master gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.15, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      masterGain.connect(ctx.destination);

      // Sci-fi synth oscillator sweep
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.3);
      osc.frequency.exponentialRampToValueAtTime(520, ctx.currentTime + 0.9);
      osc.connect(masterGain);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);

      // Sub bass pulse
      const subOsc = ctx.createOscillator();
      subOsc.type = "triangle";
      subOsc.frequency.setValueAtTime(90, ctx.currentTime);
      subOsc.frequency.linearRampToValueAtTime(180, ctx.currentTime + 0.4);
      subOsc.connect(masterGain);
      subOsc.start();
      subOsc.stop(ctx.currentTime + 0.8);
    } catch {
      // Fallback silently if audio policy blocks autoplay
    }
  }, []);

  const triggerActivationEffect = useCallback(() => {
    // Disable in admin panel and login
    if (isAdminRoute(pathname)) {
      return;
    }

    playFuturisticSound();

    const maxParticleX = typeof window !== "undefined" ? Math.min(window.innerWidth * 0.38, 160) : 140;
    const maxParticleY = typeof window !== "undefined" ? Math.min(window.innerHeight * 0.38, 160) : 140;

    // Spawn 28 random holographic energy particles
    const newParticles = Array.from({ length: 28 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 2 * maxParticleX,
      y: (Math.random() - 0.5) * 2 * maxParticleY,
      size: Math.random() * 6 + 3,
      color: i % 3 === 0 ? "#10b981" : i % 3 === 1 ? "#06b6d4" : "#3b82f6",
      angle: Math.random() * 360,
    }));

    setParticles(newParticles);
    setIsActive(true);

    if (timerRef.current) clearTimeout(timerRef.current);
    // After the animation finishes, smoothly transition to the Home page
    timerRef.current = setTimeout(() => {
      navigateToHome();
    }, 2200);
  }, [pathname, playFuturisticSound, navigateToHome]);

  const triggerFuturisticEffect = (e: React.MouseEvent) => {
    if (isAdminRoute(pathname)) return;
    e.preventDefault();
    e.stopPropagation();
    triggerActivationEffect();
  };

  // Listen for the custom event dispatched by LoaderInit
  useEffect(() => {
    const handleIntro = () => {
      if (isAdminRoute(pathname)) {
        return;
      }
      triggerActivationEffect();
    };
    window.addEventListener("trigger-quantum-intro", handleIntro);
    return () => {
      window.removeEventListener("trigger-quantum-intro", handleIntro);
    };
  }, [pathname, triggerActivationEffect]);

  return (
    <>
      {/* Clickable Wrapper around Logo */}
      <div 
        onClick={triggerFuturisticEffect}
        className="relative cursor-pointer select-none group inline-block"
        title="Tap for Cybernetic Core Blast!"
      >
        {/* Glow halo around logo when tapped */}
        <motion.div
          animate={isActive ? { scale: [1, 1.35, 1], opacity: [0.4, 1, 0.4] } : { scale: 1, opacity: 0.2 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-400 to-teal-400 blur-md pointer-events-none"
        />

        <motion.div
          whileTap={{ scale: 0.88, rotate: -8 }}
          animate={isActive ? { rotate: [0, 360], scale: [1, 1.15, 1] } : {}}
          transition={{ duration: 0.8, ease: "anticipate" }}
          className="relative z-10"
        >
          {children}
        </motion.div>
      </div>

      {/* Holographic Full-Screen Quantum Overlay portaled directly to document.body */}
      {mounted && !isAdmin && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={navigateToHome}
              style={{
                position: "fixed",
                inset: 0,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: "100%",
                maxWidth: "100vw",
                height: "100vh",
                maxHeight: "100dvh",
                zIndex: 999999,
                padding: "max(16px, env(safe-area-inset-top)) max(16px, env(safe-area-inset-right)) max(16px, env(safe-area-inset-bottom)) max(16px, env(safe-area-inset-left))",
                boxSizing: "border-box",
              }}
              className="fixed inset-0 z-[999999] pointer-events-auto cursor-pointer flex items-center justify-center overflow-hidden bg-black/75 backdrop-blur-md select-none box-border"
              title="Click anywhere to jump to Home"
            >
              {/* Holographic Cyber Grid Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98115_1px,transparent_1px),linear-gradient(to_bottom,#10b98115_1px,transparent_1px)] bg-[size:32px_32px] opacity-70 pointer-events-none" />

              {/* Traveling Laser Scanline */}
              <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: "100%" }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
                className="absolute inset-x-0 h-2 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_25px_#10b981] opacity-80 pointer-events-none"
              />

              {/* Central Expanding Concentric Shockwaves - Centered & non-overflowing */}
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: [0, 1.8, 3.2], opacity: [1, 0.7, 0] }}
                transition={{ duration: 1.8, ease: "easeOut" }}
                className="absolute inset-0 m-auto w-48 h-48 sm:w-64 sm:h-64 rounded-full border-2 border-emerald-400/80 shadow-[0_0_60px_#10b981] pointer-events-none"
              />

              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: [0, 1.4, 2.5], opacity: [1, 0.8, 0] }}
                transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
                className="absolute inset-0 m-auto w-48 h-48 sm:w-64 sm:h-64 rounded-full border-2 border-cyan-400/70 shadow-[0_0_40px_#06b6d4] pointer-events-none"
              />

              {/* Radial Energetic Nodes Particles */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                {particles.map((p) => (
                  <motion.div
                    key={p.id}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                      x: p.x,
                      y: p.y,
                      opacity: [1, 0.8, 0],
                      scale: [1, 1.4, 0.2],
                      rotate: p.angle,
                    }}
                    transition={{ duration: 1.6, ease: "easeOut" }}
                    style={{
                      width: p.size,
                      height: p.size,
                      backgroundColor: p.color,
                      boxShadow: `0 0 16px ${p.color}`,
                    }}
                    className="absolute rounded-full pointer-events-none"
                  />
                ))}
              </div>

              {/* Sci-Fi HUD Quantum Banner - Responsive & Centered */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 25 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.85, opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="relative z-20 flex flex-col items-center gap-2.5 sm:gap-3 px-4 sm:px-7 py-5 sm:py-6 rounded-2xl sm:rounded-3xl bg-slate-950/95 border border-emerald-500/60 shadow-[0_0_60px_rgba(16,185,129,0.45)] backdrop-blur-2xl text-center w-[min(calc(100vw-32px),420px)] max-w-full mx-auto box-border"
              >
                {/* Rotating Sci-Fi Energy Ring Icon */}
                <div className="relative shrink-0">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-dashed border-emerald-400 flex items-center justify-center"
                  />
                  <Cpu className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400 absolute inset-0 m-auto animate-pulse" />
                </div>

                {/* Holographic Text */}
                <div className="space-y-1 w-full flex flex-col items-center">
                  <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-emerald-300">
                    <Activity className="w-3.5 h-3.5 text-emerald-400 animate-bounce shrink-0" />
                    <span>BHARGAV TECH 4.0</span>
                  </div>
                  <h3 className="text-[17px] sm:text-2xl font-black bg-gradient-to-r from-white via-emerald-200 to-cyan-300 bg-clip-text text-transparent tracking-tight leading-snug break-words max-w-full">
                    QUANTUM CORE ACTIVATED
                  </h3>
                  <p className="text-[11px] sm:text-xs font-mono text-emerald-300/80 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap max-w-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>System Status: 100% Operational</span>
                    <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse shrink-0" />
                  </p>
                </div>

                {/* Sci-Fi Loading Progress Bar */}
                <div className="w-full max-w-[190px] sm:max-w-[220px] h-2 bg-emerald-950/80 rounded-full overflow-hidden border border-emerald-500/40 p-0.5 shadow-inner mt-1">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-teal-300 shadow-[0_0_15px_#10b981]"
                  />
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-cyan-300/90 tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin shrink-0" />
                  <span>ENTERING HOME PAGE...</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
