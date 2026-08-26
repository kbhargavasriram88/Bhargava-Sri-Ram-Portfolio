"use client";
import { useEffect } from "react";
import { SplashScreen } from "@capacitor/splash-screen";

/** Runs the #fl-root splash loader animation client-side after hydration. */
export function LoaderInit() {
  useEffect(() => {
    SplashScreen.hide().catch(() => {});

    const el = document.getElementById("fl-root") as HTMLElement | null;
    const num = document.getElementById("fl-num") as HTMLElement | null;
    const bar = document.getElementById("fl-bar") as HTMLElement | null;
    const txt = document.getElementById("fl-txt") as HTMLElement | null;
    if (!el) return;

    let prog = 0;
    let dismissed = false;

    function dismiss() {
      if (dismissed) return;
      dismissed = true;
      clearInterval(iv);
      clearTimeout(maxTimer);
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "scale(1.06)";
      el.style.filter = "blur(10px)";
      setTimeout(() => { if (el) el.style.display = "none"; }, 650);
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
      if (prog >= 100) { clearInterval(iv); setTimeout(dismiss, 700); }
    }, 100);

    const maxTimer = setTimeout(dismiss, 5000);

    return () => { clearInterval(iv); clearTimeout(maxTimer); };
  }, []);

  return null;
}
