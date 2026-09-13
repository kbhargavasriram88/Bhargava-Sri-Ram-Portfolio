import type { Metadata } from "next";
import Image from "next/image";
import { WebsiteRequestForm } from "@/components/request-form/WebsiteRequestForm";
import { Sparkles, ShieldCheck, Clock, Leaf, Phone, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Website Request Form | Bhargava Sri Ram",
  description:
    "Specify your custom website or web application requirements. Direct freelance client intake and proposal evaluation.",
};

export default async function RequestWebsitePage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string }>;
}) {
  const resolvedParams = await searchParams;
  const initialPackage =
    typeof resolvedParams?.package === "string" ? resolvedParams.package : undefined;

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* ── Nature Forest & Mountain Ambient Background ──────────── */}
      <div className="fixed inset-0 z-[-2] pointer-events-none">
        <Image
          src="/mountain-trees.png"
          alt="Nature Forest Background"
          fill
          priority
          className="object-cover object-center opacity-25 dark:opacity-15 blur-[1px] scale-105"
        />
        {/* Soft emerald/dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/95 to-background" />
      </div>

      {/* Decorative ambient blurred glows */}
      <div className="fixed top-12 left-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none z-[-1]" />
      <div className="fixed bottom-12 right-1/4 w-96 h-96 bg-teal-500/10 dark:bg-teal-500/10 rounded-full blur-[140px] pointer-events-none z-[-1]" />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* ── Page Hero Header ────────────────────────────────────── */}
        <header className="text-center space-y-3 pt-2">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Leaf className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            LET’S WORK TOGETHER
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            Website Request Form
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? Fill out the form below and I’ll get back to you within 24 hours to discuss your requirements.
          </p>

          {/* Key Value Micro-Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3 text-xs text-muted-foreground font-medium">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-500" /> 24-Hour Scope Assessment
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Confidential &amp; Non-Binding
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> Tailored Architecture Proposal
            </span>
          </div>

          {/* Direct Instant Contact Strip */}
          <div className="pt-2 flex items-center justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 py-1.5 px-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-foreground shadow-sm">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-500" /> Quick Consultation:
              </span>
              <a href="tel:+918332924488" className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
                +91 8332924488
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href="https://wa.me/918332924488?text=Hi%20Bhargava%2C%20I%20have%20a%20query%20about%20a%20website%20project"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-600 dark:text-emerald-400 hover:underline font-bold inline-flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
              </a>
            </div>
          </div>
        </header>

        {/* ── Main Form System Component ───────────────────────────── */}
        <main>
          <WebsiteRequestForm initialPackage={initialPackage} />
        </main>
      </div>
    </div>
  );
}
