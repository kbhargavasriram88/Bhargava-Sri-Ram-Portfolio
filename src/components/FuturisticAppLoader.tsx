"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, Cpu, Radio, Zap } from "lucide-react";
import { SplashScreen } from "@capacitor/splash-screen";

export function FuturisticAppLoader() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING BHARGAV TECH...");

  useEffect(() => {
    setMounted(true);

    // Hide native Capacitor Android static splash image immediately
    SplashScreen.hide().catch(() => {});

    // Safety fallback: ensure screen unlocks after 4.5s max
    const maxTimer = setTimeout(() => {
      setIsLoading(false);
    }, 4500);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 700);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 3) + 2;
        const currentProgress = next >= 100 ? 100 : next;

        if (currentProgress < 30) {
          setStatusText("INITIALIZING QUANTUM CORE...");
        } else if (currentProgress < 65) {
          setStatusText("LOADING CYBER MESH & ASSETS...");
        } else if (currentProgress < 99) {
          setStatusText("ESTABLISHING NEURAL LINK...");
        } else {
          setStatusText("SYSTEM 100% READY");
        }

        return currentProgress;
      });
    }, 100);

    return () => {
      clearInterval(interval);
      clearTimeout(maxTimer);
    };
  }, []);

  if (!mounted && isLoading) {
    return (
      <div className="fixed inset-0 w-full h-full min-h-screen z-[999999] flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden select-none">
        <div className="p-4 rounded-3xl bg-slate-900/90 border border-emerald-500/50">
          <Image src="/logo.webp" alt="Bhargav Tech Logo" width={80} height={80} priority className="w-20 h-20 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.08, filter: "blur(12px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => setIsLoading(false)}
          className="fixed inset-0 w-full h-full min-h-screen z-[999999] flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden select-none cursor-pointer"
        >
          {/* Cyber Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98115_1px,transparent_1px),linear-gradient(to_bottom,#10b98115_1px,transparent_1px)] bg-[size:40px_40px] opacity-80" />

          {/* Glowing Central Ambient Flare */}
          <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-emerald-500/20 via-cyan-500/20 to-teal-500/10 rounded-full blur-[120px] pointer-events-none" />



          {/* Main Futuristic Rotating HUD Rings & Center Logo Container */}
          <div className="relative flex items-center justify-center mb-10">
            {/* Outer Clockwise Rotating Dashed Tech Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              className="w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-dashed border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.3)] absolute"
            />

            {/* Inner Counter-Clockwise Segmented Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="w-52 h-52 sm:w-60 sm:h-60 rounded-full border-2 border-dashed border-cyan-400/60 shadow-[0_0_30px_rgba(6,182,212,0.3)] absolute"
            />

            {/* Pulsing Glowing Orbital Arc */}
            <motion.div
              animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="w-40 h-40 sm:w-44 sm:h-44 rounded-full border border-emerald-400/80 shadow-[0_0_50px_#10b981] absolute"
            />

            {/* Center Logo Card with Holographic Aura */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 p-3 sm:p-4 rounded-3xl bg-slate-900/90 border border-emerald-500/50 shadow-[0_0_45px_rgba(16,185,129,0.4)] backdrop-blur-2xl flex flex-col items-center justify-center"
            >
              <Image
                src="/logo.webp"
                alt="Bhargav Tech Logo"
                width={80}
                height={80}
                priority
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-2xl border border-emerald-400/40 shadow-inner"
              />
            </motion.div>
          </div>

          {/* Futuristic Percentage HUD Display */}
          <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center max-w-sm">
            {/* Percentage Number Display */}
            <div className="flex items-baseline gap-1 font-mono">
              <span className="text-4xl sm:text-5xl font-black tracking-tighter bg-gradient-to-r from-white via-emerald-200 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                {progress < 10 ? `0${progress}` : progress}
              </span>
              <span className="text-xl font-bold text-emerald-400">%</span>
            </div>

            {/* Status Label */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono tracking-widest uppercase">
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>{statusText}</span>
            </div>

            {/* Segmented Neon Progress Bar */}
            <div className="w-64 sm:w-80 h-2 bg-slate-900 rounded-full overflow-hidden border border-emerald-500/40 p-0.5 shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full shadow-[0_0_15px_#10b981]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              />
            </div>

            {/* Sci-Fi HUD Metadata Badges */}
            <div className="flex items-center gap-4 text-[10px] text-emerald-300/70 font-mono mt-2 uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <Cpu className="w-3 h-3 text-emerald-400" /> BHARGAV TECH 4.0
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-cyan-400" /> SECURE V1.0
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
