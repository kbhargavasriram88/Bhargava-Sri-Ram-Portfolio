import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import { getSettings } from "@/actions/settings";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Bhargava Sri Ram - Portfolio",
  description: "Full-Stack Developer & AI/ML Enthusiast Portfolio",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settingsRes = await getSettings();
  const settings = settingsRes.success ? settingsRes.data : null;

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`} id="top">
        {/* ── Futuristic Splash Loader: pure inline HTML/CSS/JS — renders before any React JS ── */}
        <div
          id="fl-root"
          style={{
            position: "fixed", inset: 0, zIndex: 999999,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            background: "#020617", overflow: "hidden",
            transition: "opacity .6s ease, transform .6s ease, filter .6s ease",
          }}
        >
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes fl-cw  { to { transform: rotate(360deg);  } }
            @keyframes fl-ccw { to { transform: rotate(-360deg); } }
            @keyframes fl-pr  { 0%,100%{ opacity:.5; transform:scale(.95); } 50%{ opacity:1; transform:scale(1.08); } }
            @keyframes fl-pd  { 0%,100%{ opacity:1; } 50%{ opacity:.3; } }
            #fl-r1 { position:absolute; width:256px; height:256px; border-radius:50%; border:2px dashed rgba(16,185,129,.5); box-shadow:0 0 40px rgba(16,185,129,.3); animation:fl-cw 12s linear infinite; }
            #fl-r2 { position:absolute; width:208px; height:208px; border-radius:50%; border:2px dashed rgba(6,182,212,.6); box-shadow:0 0 30px rgba(6,182,212,.3); animation:fl-ccw 8s linear infinite; }
            #fl-r3 { position:absolute; width:160px; height:160px; border-radius:50%; border:1px solid rgba(52,211,153,.8); box-shadow:0 0 50px #10b981; animation:fl-pr 2.5s ease-in-out infinite; }
            #fl-dot { width:8px; height:8px; border-radius:50%; background:#67e8f9; animation:fl-pd 1s ease-in-out infinite; flex-shrink:0; }
          ` }} />
          {/* Grid */}
          <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(to right,#10b98115 1px,transparent 1px),linear-gradient(to bottom,#10b98115 1px,transparent 1px)", backgroundSize:"40px 40px" }} />
          {/* Ambient glow */}
          <div style={{ position:"absolute", width:500, height:500, background:"radial-gradient(circle,rgba(16,185,129,.18) 0%,rgba(6,182,212,.12) 50%,transparent 80%)", borderRadius:"50%", pointerEvents:"none" }} />
          {/* Rings + logo */}
          <div style={{ position:"relative", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:40, width:280, height:280 }}>
            <div id="fl-r1" />
            <div id="fl-r2" />
            <div id="fl-r3" />
            <div style={{ position:"relative", zIndex:10, padding:16, borderRadius:24, background:"rgba(15,23,42,.9)", border:"1px solid rgba(16,185,129,.5)", boxShadow:"0 0 45px rgba(16,185,129,.4)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.webp" alt="Bhargav Tech" width={80} height={80} style={{ borderRadius:16, display:"block" }} />
            </div>
          </div>
          {/* HUD */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12, zIndex:10 }}>
            <div style={{ display:"flex", alignItems:"baseline", gap:4, fontFamily:"monospace" }}>
              <span id="fl-num" style={{ fontSize:"3rem", fontWeight:900, letterSpacing:"-.05em", background:"linear-gradient(90deg,#fff 0%,#a7f3d0 50%,#67e8f9 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>00</span>
              <span style={{ fontSize:"1.25rem", fontWeight:700, color:"#34d399" }}>%</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8, padding:"4px 12px", borderRadius:999, background:"rgba(16,185,129,.1)", border:"1px solid rgba(16,185,129,.3)", color:"#6ee7b7", fontSize:11, fontFamily:"monospace", letterSpacing:".12em", textTransform:"uppercase" }}>
              <div id="fl-dot" />
              <span id="fl-txt">INITIALIZING BHARGAV TECH...</span>
            </div>
            <div style={{ width:260, height:8, background:"#0f172a", borderRadius:999, overflow:"hidden", border:"1px solid rgba(16,185,129,.4)", padding:2 }}>
              <div id="fl-bar" style={{ height:"100%", borderRadius:999, background:"linear-gradient(90deg,#10b981,#2dd4bf,#22d3ee)", boxShadow:"0 0 15px #10b981", width:"0%", transition:"width .15s ease" }} />
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:16, fontSize:10, color:"rgba(110,231,183,.6)", fontFamily:"monospace", textTransform:"uppercase", letterSpacing:".1em", marginTop:8 }}>
              <span>⬡ BHARGAV TECH 4.0</span><span>•</span><span>✦ SECURE V1.0</span>
            </div>
          </div>
        </div>
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            var prog=0, el=document.getElementById('fl-root'),
                num=document.getElementById('fl-num'), bar=document.getElementById('fl-bar'),
                txt=document.getElementById('fl-txt');
            if(!el) return;
            el.addEventListener('click', dismiss);
            var iv = setInterval(function(){
              prog += Math.floor(Math.random()*3)+2;
              if(prog>=100){ prog=100; clearInterval(iv); setTimeout(dismiss,700); }
              if(num) num.textContent = prog<10?'0'+prog:prog;
              if(bar) bar.style.width = prog+'%';
              if(txt){
                if(prog<30) txt.textContent='INITIALIZING QUANTUM CORE...';
                else if(prog<65) txt.textContent='LOADING CYBER MESH & ASSETS...';
                else if(prog<99) txt.textContent='ESTABLISHING NEURAL LINK...';
                else txt.textContent='SYSTEM 100% READY';
              }
            }, 100);
            setTimeout(dismiss, 5000);
            function dismiss(){
              clearInterval(iv);
              if(!el) return;
              el.style.opacity='0'; el.style.transform='scale(1.06)'; el.style.filter='blur(10px)';
              setTimeout(function(){ el.style.display='none'; }, 650);
            }
          })();
        ` }} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar offer={settings?.offer} requestForm={settings?.requestForm} />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
