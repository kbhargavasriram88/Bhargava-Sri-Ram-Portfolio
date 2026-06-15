"use client";


import { motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import { SiNextdotjs, SiMongodb } from "react-icons/si";
import Link from "next/link";
import Image from "next/image";

interface HeroSectionProps {
  settings: any;
}

export function HeroSection({ settings }: HeroSectionProps) {
  const hero = settings?.hero || {
    heading: "BHARGAVA SRI RAM",
    subheading: "Full-Stack Developer & AI/ML Enthusiast",
    description: "Building scalable web applications and intelligent digital experiences.",
    resumeUrl: "",
    profileImageUrl: "/placeholder-profile.svg",
    backgroundImageUrl: "/hero-bg.jpg",
    availableForHire: true,
  };
  
  const socials = settings?.socialLinks || {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "mailto:contact@example.com",
  };

  const words = hero.heading.split(" ");
  const lastWords = words.length > 1 ? words.slice(words.length > 2 ? -2 : -1).join(" ") : "";
  const firstWords = words.length > 1 ? words.slice(0, words.length > 2 ? -2 : -1).join(" ") : words[0];

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden">
      
      {/* Ambient Light Mode Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] dark:opacity-0 pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] dark:opacity-0 pointer-events-none translate-x-1/3 translate-y-1/3" />
      
      {/* Network / Constellation Background Layer */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-40 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="network-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.5" className="fill-foreground/50" />
              <circle cx="80" cy="40" r="1" className="fill-foreground/30" />
              <circle cx="40" cy="80" r="2" className="fill-foreground/40" />
              <line x1="20" y1="20" x2="80" y2="40" stroke="currentColor" strokeWidth="0.5" className="text-foreground/10" />
              <line x1="80" y1="40" x2="40" y2="80" stroke="currentColor" strokeWidth="0.5" className="text-foreground/10" />
              <line x1="40" y1="80" x2="20" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-foreground/10" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#network-pattern)" />
        </svg>
      </div>

      {/* Full Background Image */}
      <div className="fixed top-0 left-0 w-screen h-screen z-[-1] pointer-events-none">
        <Image 
          src={hero.backgroundImageUrl || "/hero-bg.jpg"} 
          alt="Hero Background" 
          fill 
          priority
          className="object-cover dark:opacity-80"
          sizes="100vw"
        />
        {/* Gradient Overlays to blend with the theme and keep text readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-20 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 order-2 lg:order-1"
          >
            {hero.availableForHire && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/50 bg-muted/50 text-xs font-semibold text-muted-foreground w-fit shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Available for opportunities
              </div>
            )}
            
            <div className="space-y-1">
              <h2 className="text-base sm:text-lg md:text-xl text-primary font-medium flex items-center gap-2">
                Hi, I'm <span className="inline-block origin-bottom-right animate-[wave_2.5s_infinite]">👋</span>
              </h2>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
                <span className="block text-foreground">{firstWords}</span>
                <span className="block text-primary">{lastWords}</span>
              </h1>
              
              <div className="flex items-center mt-4 text-lg sm:text-xl md:text-2xl font-semibold text-foreground">
                <span>Full-Stack Developer & <span className="text-primary">AI/ML</span> Enthusiast</span>
                <motion.div 
                  animate={{ opacity: [1, 0] }} 
                  transition={{ repeat: Infinity, duration: 0.8 }} 
                  className="w-0.5 h-5 sm:h-6 bg-primary ml-1" 
                />
              </div>
            </div>

            <p className="max-w-md text-sm sm:text-base text-muted-foreground leading-relaxed">
              {hero.description}
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
              <Link href="#projects" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "rounded-lg border-border hover:bg-muted gap-2 h-12 px-6 text-sm font-semibold w-full sm:w-auto")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
                View Projects
              </Link>
              <Link href="#contact" className={cn(buttonVariants({ size: "lg" }), "rounded-lg gap-2 h-12 px-8 text-sm font-semibold shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] transition-all bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Hire Me
              </Link>
            </div>

            {/* Stats Panel */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4 w-full">
              <div className="flex items-center p-3 px-5 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm w-full sm:w-auto sm:min-w-[220px]">
                <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center text-background mr-4">
                  <FaGithub className="w-6 h-6" />
                </div>
                <div className="flex gap-4 divide-x divide-border">
                  <div className="pr-4">
                    <p className="text-xl font-bold flex items-start leading-none mb-1">20<span className="text-primary text-xs ml-0.5">+</span></p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Repositories</p>
                  </div>
                  <div className="pl-4">
                    <p className="text-xl font-bold flex items-start leading-none mb-1">10<span className="text-primary text-xs ml-0.5">+</span></p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Contributions</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center p-3 px-5 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm w-full sm:w-auto sm:min-w-[220px]">
                <div className="w-10 h-10 rounded-full bg-[#0077b5] flex items-center justify-center text-white mr-4">
                  <FaLinkedin className="w-5 h-5" />
                </div>
                <div className="flex gap-4 divide-x divide-border">
                  <div className="pr-4">
                    <p className="text-xl font-bold flex items-start leading-none mb-1">500<span className="text-primary text-xs ml-0.5">+</span></p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Connections</p>
                  </div>
                  <div className="pl-4">
                    <p className="text-xl font-bold flex items-start leading-none mb-1">15<span className="text-primary text-xs ml-0.5">+</span></p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Recommendations</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-6">
              <span className="text-xs text-muted-foreground mr-2">Let's connect on</span>
              {[
                { icon: FaGithub, href: socials.github },
                { icon: FaLinkedin, href: socials.linkedin },
                { icon: FaTwitter, href: socials.twitter },
                { icon: Mail, href: socials.email ? (socials.email.startsWith("mailto:") ? socials.email : `mailto:${socials.email}`) : "" },
              ].map((social, i) => social.href && (
                <Link key={i} href={social.href} target="_blank" className="p-2.5 rounded-full border border-border/50 bg-muted/30 text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                  <social.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Right Column (Visual) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex items-center justify-center h-[350px] sm:h-[450px] lg:h-[600px] w-full mt-10 lg:mt-0 order-1 lg:order-2"
          >
            {/* Scaling wrapper for mobile responsiveness */}
            <div className="relative flex items-center justify-center w-full h-full scale-[0.55] sm:scale-[0.75] lg:scale-100 origin-center pointer-events-none">
              
              {/* Background Glow */}
              <div className="absolute w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
              
              {/* Outer Orbit Rings */}
              <div className="absolute w-[480px] h-[480px] rounded-full border border-primary/30 pointer-events-none">
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(34,197,94,1)] -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-[10%] right-[10%] w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_rgba(34,197,94,1)]" />
                <div className="absolute top-[20%] left-[5%] w-1 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(34,197,94,1)]" />
              </div>
              
              <div className="absolute w-[380px] h-[380px] rounded-full border border-border/40 border-dashed pointer-events-none animate-[spin_60s_linear_infinite]" />

              {/* Central Profile Image Container - slightly overflowing top */}
              <div className="relative w-[340px] h-[340px] z-10 flex items-end justify-center pointer-events-auto">
                <div className="absolute inset-0 rounded-full border-2 border-background overflow-hidden" style={{ clipPath: "circle(50% at 50% 50%)" }}>
                   <Image
                      src={settings?.hero?.profileImageUrl || "/placeholder-profile.svg"}
                      alt="Profile Background"
                      fill
                      sizes="340px"
                      className="object-cover"
                   />
                </div>
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <Image
                    src={settings?.hero?.profileImageUrl || "/placeholder-profile.svg"}
                    alt="Profile"
                    fill
                    sizes="340px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Connecting Lines SVG */}
              <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px' }}>
                <path d="M300 300 L450 150" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-border/50" />
                <path d="M300 300 L150 180" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-border/50" />
                <path d="M300 300 L180 420" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-border/50" />
                <path d="M300 300 L480 320" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-border/50" />
                <path d="M300 300 L420 450" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-border/50" />
              </svg>

              {/* Tech Stack Floating Cards */}
              <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                
                {/* React (Top Right) */}
                <div className="absolute pointer-events-auto" style={{ transform: 'translate(150px, -150px)' }}>
                  <div className="bg-card border border-border/50 rounded-xl p-2.5 pr-4 flex items-center gap-3 shadow-lg">
                    <div className="w-8 h-8 rounded-lg bg-background border border-border/30 flex items-center justify-center text-[#61DAFB]">
                      <FaReact className="w-5 h-5 animate-[spin_10s_linear_infinite]" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-[13px] leading-tight">React</p>
                      <p className="text-[9px] text-muted-foreground leading-tight">Frontend Library</p>
                    </div>
                  </div>
                </div>

                {/* Node.js (Top Left) */}
                <div className="absolute pointer-events-auto" style={{ transform: 'translate(-150px, -120px)' }}>
                  <div className="bg-card border border-border/50 rounded-xl p-2.5 pr-4 flex items-center gap-3 shadow-lg">
                    <div className="w-8 h-8 rounded-lg bg-background border border-primary/30 flex items-center justify-center text-[#339933]">
                      <FaNodeJs className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-[13px] leading-tight">Node.js</p>
                      <p className="text-[9px] text-muted-foreground leading-tight">Backend Runtime</p>
                    </div>
                  </div>
                </div>

                {/* Python (Bottom Left) */}
                <div className="absolute pointer-events-auto" style={{ transform: 'translate(-120px, 120px)' }}>
                  <div className="bg-card border border-border/50 rounded-xl p-2.5 pr-4 flex items-center gap-3 shadow-lg">
                    <div className="w-8 h-8 rounded-lg bg-background border border-border/30 flex items-center justify-center text-[#3776AB]">
                      <FaPython className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-[13px] leading-tight">Python</p>
                      <p className="text-[9px] text-muted-foreground leading-tight">AI / ML</p>
                    </div>
                  </div>
                </div>

                {/* Next.js (Middle Right) */}
                <div className="absolute pointer-events-auto" style={{ transform: 'translate(180px, 20px)' }}>
                  <div className="bg-card border border-border/50 rounded-xl p-2.5 pr-4 flex items-center gap-3 shadow-lg">
                    <div className="w-8 h-8 rounded-lg bg-background border border-border/30 flex items-center justify-center text-foreground">
                      <SiNextdotjs className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-[13px] leading-tight">NEXT.js</p>
                      <p className="text-[9px] text-muted-foreground leading-tight">React Framework</p>
                    </div>
                  </div>
                </div>

                {/* MongoDB (Bottom Right) */}
                <div className="absolute pointer-events-auto" style={{ transform: 'translate(120px, 150px)' }}>
                  <div className="bg-card border border-primary/20 rounded-xl p-2.5 pr-4 flex items-center gap-3 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                    <div className="w-8 h-8 rounded-lg bg-background border border-border/30 flex items-center justify-center text-[#47A248]">
                      <SiMongodb className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-[13px] leading-tight">MongoDB</p>
                      <p className="text-[9px] text-muted-foreground leading-tight">Database</p>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <div className="w-5 h-8 rounded-full border-2 border-foreground/30 flex items-start justify-center p-1">
          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1.5 bg-foreground/60 rounded-full" 
          />
        </div>
        <span className="text-[9px] font-bold tracking-[0.2em] text-foreground/60 uppercase">Scroll Down</span>
      </div>
    </section>
  );
}
