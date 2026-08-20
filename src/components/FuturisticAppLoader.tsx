"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { SplashScreen } from "@capacitor/splash-screen";

export function FuturisticAppLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING BHARGAV TECH...");
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    SplashScreen.hide().catch(() => {});

    const maxTimer = setTimeout(() => {
      dismiss();
    }, 5000);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(dismiss, 700);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 3) + 2;
        const cur = next >= 100 ? 100 : next;
        if (cur < 30) setStatusText("INITIALIZING QUANTUM CORE...");
        else if (cur < 65) setStatusText("LOADING CYBER MESH & ASSETS...");
        else if (cur < 99) setStatusText("ESTABLISHING NEURAL LINK...");
        else setStatusText("SYSTEM 100% READY");
        return cur;
      });
    }, 100);

    function dismiss() {
      clearInterval(interval);
      clearTimeout(maxTimer);
      setExiting(true);
      setTimeout(() => setIsLoading(false), 600);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(maxTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <>
      <style>{`
        @keyframes _spin_cw  { to { transform: rotate(360deg);  } }
        @keyframes _spin_ccw { to { transform: rotate(-360deg); } }
        @keyframes _pulse_ring { 0%,100%{ opacity:.5; transform:scale(.95); } 50%{ opacity:1; transform:scale(1.08); } }
        @keyframes _fade_out  { to { opacity:0; transform:scale(1.06); filter:blur(10px); } }
        @keyframes _logo_in   { from{ opacity:0; transform:scale(.8); } to{ opacity:1; transform:scale(1); } }
        @keyframes _pulse_dot { 0%,100%{ opacity:1; } 50%{ opacity:.3; } }

        .fl-wrap {
          position: fixed; inset: 0; z-index: 999999;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          background: #020617; overflow: hidden; user-select: none; cursor: pointer;
        }
        .fl-wrap.fl-exit { animation: _fade_out .6s ease forwards; }

        .fl-grid {
          position: absolute; inset: 0;
          background-image: linear-gradient(to right,#10b98115 1px,transparent 1px),
                            linear-gradient(to bottom,#10b98115 1px,transparent 1px);
          background-size: 40px 40px;
        }
        .fl-glow {
          position: absolute;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(16,185,129,.18) 0%, rgba(6,182,212,.12) 50%, transparent 80%);
          border-radius: 50%; pointer-events: none;
        }
        .fl-rings { position: relative; display: flex; align-items: center; justify-content: center; margin-bottom: 40px; }
        .fl-ring-outer {
          position: absolute; width: 256px; height: 256px; border-radius: 50%;
          border: 2px dashed rgba(16,185,129,.5);
          box-shadow: 0 0 40px rgba(16,185,129,.3);
          animation: _spin_cw 12s linear infinite;
        }
        .fl-ring-inner {
          position: absolute; width: 208px; height: 208px; border-radius: 50%;
          border: 2px dashed rgba(6,182,212,.6);
          box-shadow: 0 0 30px rgba(6,182,212,.3);
          animation: _spin_ccw 8s linear infinite;
        }
        .fl-ring-pulse {
          position: absolute; width: 160px; height: 160px; border-radius: 50%;
          border: 1px solid rgba(52,211,153,.8);
          box-shadow: 0 0 50px #10b981;
          animation: _pulse_ring 2.5s ease-in-out infinite;
        }
        .fl-logo-card {
          position: relative; z-index: 10;
          padding: 16px; border-radius: 24px;
          background: rgba(15,23,42,.9);
          border: 1px solid rgba(16,185,129,.5);
          box-shadow: 0 0 45px rgba(16,185,129,.4);
          animation: _logo_in .6s ease forwards;
        }
        .fl-logo-card img { border-radius: 16px; display: block; }

        .fl-hud { position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .fl-percent { display: flex; align-items: baseline; gap: 4px; font-family: monospace; }
        .fl-num {
          font-size: 3rem; font-weight: 900; letter-spacing: -.05em;
          background: linear-gradient(90deg, #fff 0%, #a7f3d0 50%, #67e8f9 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .fl-pct { font-size: 1.25rem; font-weight: 700; color: #34d399; }
        .fl-status {
          display: flex; align-items: center; gap: 8px;
          padding: 4px 12px; border-radius: 999px;
          background: rgba(16,185,129,.1); border: 1px solid rgba(16,185,129,.3);
          color: #6ee7b7; font-size: 11px; font-family: monospace; letter-spacing: .12em; text-transform: uppercase;
        }
        .fl-dot { width: 8px; height: 8px; border-radius: 50%; background: #67e8f9; animation: _pulse_dot 1s ease-in-out infinite; }
        .fl-bar-wrap {
          width: 260px; height: 8px; background: #0f172a; border-radius: 999px;
          overflow: hidden; border: 1px solid rgba(16,185,129,.4); padding: 2px;
        }
        .fl-bar { height: 100%; border-radius: 999px; background: linear-gradient(90deg,#10b981,#2dd4bf,#22d3ee); box-shadow: 0 0 15px #10b981; transition: width .15s ease; }
        .fl-meta { display: flex; align-items: center; gap: 16px; font-size: 10px; color: rgba(110,231,183,.6); font-family: monospace; text-transform: uppercase; letter-spacing: .1em; margin-top: 8px; }
      `}</style>

      <div className={`fl-wrap${exiting ? " fl-exit" : ""}`} onClick={() => { setExiting(true); setTimeout(() => setIsLoading(false), 600); }}>
        <div className="fl-grid" />
        <div className="fl-glow" />

        <div className="fl-rings">
          <div className="fl-ring-outer" />
          <div className="fl-ring-inner" />
          <div className="fl-ring-pulse" />
          <div className="fl-logo-card">
            <Image src="/logo.webp" alt="Bhargav Tech" width={80} height={80} priority />
          </div>
        </div>

        <div className="fl-hud">
          <div className="fl-percent">
            <span className="fl-num">{progress < 10 ? `0${progress}` : progress}</span>
            <span className="fl-pct">%</span>
          </div>
          <div className="fl-status">
            <div className="fl-dot" />
            <span>{statusText}</span>
          </div>
          <div className="fl-bar-wrap">
            <div className="fl-bar" style={{ width: `${progress}%` }} />
          </div>
          <div className="fl-meta">
            <span>⬡ BHARGAV TECH 4.0</span>
            <span>•</span>
            <span>✦ SECURE V1.0</span>
          </div>
        </div>
      </div>
    </>
  );
}
