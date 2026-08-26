import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LoaderInit } from "@/components/LoaderInit";
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
        {/* ── Futuristic Splash Loader — static server HTML, JS runs client-only via next/script ── */}
        <div
          id="fl-root"
          style={{
            position: "fixed", inset: 0, zIndex: 999999,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            background: "#020617", overflow: "hidden",
            transition: "opacity .6s ease, transform .6s ease, filter .6s ease",
          }}
        >
          {/* Grid */}
          <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(to right,#10b98115 1px,transparent 1px),linear-gradient(to bottom,#10b98115 1px,transparent 1px)", backgroundSize:"40px 40px" }} />
          {/* Ambient glow */}
          <div style={{ position:"absolute", width:500, height:500, background:"radial-gradient(circle,rgba(16,185,129,.18) 0%,rgba(6,182,212,.12) 50%,transparent 80%)", borderRadius:"50%", pointerEvents:"none" }} />
          {/* Traveling Laser Scanline */}
          <div id="fl-scanline" />
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
              <span id="fl-num" suppressHydrationWarning style={{ fontSize:"3rem", fontWeight:900, letterSpacing:"-.05em", background:"linear-gradient(90deg,#fff 0%,#a7f3d0 50%,#67e8f9 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>00</span>
              <span style={{ fontSize:"1.25rem", fontWeight:700, color:"#34d399" }}>%</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8, padding:"4px 12px", borderRadius:999, background:"rgba(16,185,129,.1)", border:"1px solid rgba(16,185,129,.3)", color:"#6ee7b7", fontSize:11, fontFamily:"monospace", letterSpacing:".12em", textTransform:"uppercase" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fl-pulse-dot"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9c3.9 3.9 3.9 10.3 0 14.2"/></svg>
              <span id="fl-txt" suppressHydrationWarning>INITIALIZING BHARGAV TECH...</span>
            </div>
            <div style={{ width:260, height:8, background:"#0f172a", borderRadius:999, overflow:"hidden", border:"1px solid rgba(16,185,129,.4)", padding:2 }}>
              <div id="fl-bar" style={{ height:"100%", borderRadius:999, background:"linear-gradient(90deg,#10b981,#2dd4bf,#22d3ee)", boxShadow:"0 0 15px #10b981", width:"0%", transition:"width .15s ease" }} />
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:16, fontSize:10, color:"rgba(110,231,183,.6)", fontFamily:"monospace", textTransform:"uppercase", letterSpacing:".1em", marginTop:8 }}>
              <span style={{ display:"flex", alignItems:"center", gap:4 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg> BHARGAV TECH 4.0
              </span>
              <span>•</span>
              <span style={{ display:"flex", alignItems:"center", gap:4 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg> SECURE V1.0
              </span>
            </div>
          </div>
        </div>

        {/* Client-only animation runner — renders null on server, runs after hydration */}
        <LoaderInit />

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
