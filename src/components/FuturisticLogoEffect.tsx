"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Cpu, ShieldCheck, Zap, Radio, Activity } from "lucide-react";

export function FuturisticLogoEffect({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; color: string; angle: number }>>([]);

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

  const triggerFuturisticEffect = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    playFuturisticSound();

    // Spawn 28 random holographic energy particles
    const newParticles = Array.from({ length: 28 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 450,
      y: (Math.random() - 0.5) * 450,
      size: Math.random() * 8 + 4,
      color: i % 3 === 0 ? "#10b981" : i % 3 === 1 ? "#06b6d4" : "#3b82f6",
      angle: Math.random() * 360,
    }));

    setParticles(newParticles);
    setIsActive(true);

    setTimeout(() => {
      setIsActive(false);
    }, 2400);
  };

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

      {/* Holographic Full-Screen Quantum Overlay */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center overflow-hidden bg-black/40 backdrop-blur-sm"
          >
            {/* Holographic Cyber Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98115_1px,transparent_1px),linear-gradient(to_bottom,#10b98115_1px,transparent_1px)] bg-[size:32px_32px] opacity-70" />

            {/* Traveling Laser Scanline */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: "100%" }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
              className="absolute inset-x-0 h-2 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_25px_#10b981] opacity-80"
            />

            {/* Central Expanding Concentric Shockwaves */}
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 2.5, 4.8], opacity: [1, 0.7, 0] }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="absolute w-64 h-64 rounded-full border-2 border-emerald-400/80 shadow-[0_0_60px_#10b981]"
            />

            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 1.8, 3.6], opacity: [1, 0.8, 0] }}
              transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
              className="absolute w-64 h-64 rounded-full border-2 border-cyan-400/70 shadow-[0_0_40px_#06b6d4]"
            />

            {/* Radial Energetic Nodes Particles */}
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: p.x,
                  y: p.y,
                  opacity: [1, 0.8, 0],
                  scale: [1, 1.6, 0.2],
                  rotate: p.angle,
                }}
                transition={{ duration: 1.6, ease: "easeOut" }}
                style={{
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  boxShadow: `0 0 16px ${p.color}`,
                }}
                className="absolute rounded-full"
              />
            ))}

            {/* Sci-Fi HUD Quantum Banner */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="relative z-20 flex flex-col items-center gap-3 px-6 py-4 rounded-3xl bg-slate-950/90 border border-emerald-500/60 shadow-[0_0_50px_rgba(16,185,129,0.4)] backdrop-blur-2xl text-center"
            >
              {/* Rotating Sci-Fi Energy Ring Icon */}
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="w-14 h-14 rounded-full border-2 border-dashed border-emerald-400 flex items-center justify-center"
                />
                <Cpu className="w-7 h-7 text-emerald-400 absolute inset-0 m-auto animate-pulse" />
              </div>

              {/* Holographic Text */}
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-[11px] font-black uppercase tracking-widest text-emerald-300">
                  <Activity className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                  <span>BHARGAV TECH 4.0</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-white via-emerald-200 to-cyan-300 bg-clip-text text-transparent tracking-tight">
                  QUANTUM CORE ACTIVATED
                </h3>
                <p className="text-xs font-mono text-emerald-300/80 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>System Status: 100% Operational</span>
                  <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                </p>
              </div>

              {/* Sci-Fi Loading Wave Bar */}
              <div className="w-48 h-1.5 bg-emerald-950 rounded-full overflow-hidden border border-emerald-500/30">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  className="w-full h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-teal-300 shadow-[0_0_12px_#10b981]"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
