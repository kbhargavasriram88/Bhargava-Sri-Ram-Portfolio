"use client";
import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { SplashScreen } from "@capacitor/splash-screen";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Runs the #fl-root splash loader animation client-side after hydration. */
export function LoaderInit() {
  const pathname = usePathname();

  // Instantly suppress loader before paint when in admin panel
  useIsomorphicLayoutEffect(() => {
    const isAdmin = pathname?.startsWith("/admin") || (typeof window !== "undefined" && window.location.pathname.startsWith("/admin"));
    if (isAdmin) {
      const el = document.getElementById("fl-root");
      if (el) el.style.display = "none";
      document.body.style.overflow = "";
    }
  }, [pathname]);

  useEffect(() => {
    SplashScreen.hide().catch(() => {});

    const el = document.getElementById("fl-root") as HTMLElement | null;

    // Completely disable in admin panel
    const isAdmin = pathname?.startsWith("/admin") || (typeof window !== "undefined" && window.location.pathname.startsWith("/admin"));
    if (isAdmin) {
      if (el) el.style.display = "none";
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
      return;
    }

    // Lock body scroll during splash loader
    document.body.style.overflow = "hidden";

    const num = document.getElementById("fl-num") as HTMLElement | null;
    const bar = document.getElementById("fl-bar") as HTMLElement | null;
    const txt = document.getElementById("fl-txt") as HTMLElement | null;
    if (!el) {
      document.body.style.overflow = "";
      return;
    }

    let prog = 0;
    let dismissed = false;

    function dismiss() {
      if (dismissed) return;
      dismissed = true;
      clearInterval(iv);
      clearTimeout(maxTimer);
      if (!el) return;

      // Dispatch event to activate Screen 2 (Quantum Core Intro)
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("trigger-quantum-intro"));
      }

      el.style.opacity = "0";
      el.style.transform = "scale(1.04)";
      el.style.filter = "blur(8px)";
      setTimeout(() => {
        if (el) el.style.display = "none";
      }, 500);
    }

    el.addEventListener("click", dismiss);

    const iv = setInterval(() => {
      prog = Math.min(100, prog + Math.floor(Math.random() * 3) + 2);
      if (num) num.textContent = prog < 10 ? "0" + prog : String(prog);
      if (bar) bar.style.width = prog + "%";
      if (txt) {
        if (prog < 30) txt.textContent = "INITIALIZING QUANTUM CORE...";
        else if (prog < 65) txt.textContent = "LOADING CYBER MESH & ASSETS...";
        else if (prog < 99) txt.textContent = "ESTABLISHING NEURAL LINK...";
        else txt.textContent = "SYSTEM 100% READY";
      }
      if (prog >= 100) {
        clearInterval(iv);
        setTimeout(dismiss, 250);
      }
    }, 80);

    const maxTimer = setTimeout(dismiss, 4500);

    return () => {
      clearInterval(iv);
      clearTimeout(maxTimer);
    };
  }, []);

  return null;
}
