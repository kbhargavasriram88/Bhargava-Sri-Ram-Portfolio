"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Copy, Check, ArrowLeft, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuccessStateProps {
  referenceId: string;
  clientName: string;
  projectTitle: string;
  onReset: () => void;
}

export function SuccessState({
  referenceId,
  clientName,
  projectTitle,
  onReset,
}: SuccessStateProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Bhargava! I just submitted a website request for "${projectTitle}" (Ref: ${referenceId}). Would love to connect regarding the project.`
  );

  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl border border-emerald-500/30 bg-card/80 backdrop-blur-2xl p-6 sm:p-10 text-center shadow-2xl space-y-6 animate-in fade-in-50 zoom-in-95 duration-400">
      {/* Success Icon */}
      <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
        <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11 stroke-[2.2]" />
      </div>

      {/* Heading & Subtitle */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> Requirement Ingestion Complete
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Request Submitted Successfully!
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          Thank you, <span className="font-semibold text-foreground">{clientName || "there"}</span>. I have received your specifications for <span className="font-semibold text-foreground">&ldquo;{projectTitle}&rdquo;</span> and will review your scope within 24 hours.
        </p>
      </div>

      {/* Reference ID Card */}
      <div className="rounded-2xl border border-border/80 bg-muted/40 p-4 max-w-md mx-auto flex items-center justify-between gap-3">
        <div className="text-left">
          <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider block">
            Project Reference ID
          </span>
          <span className="font-mono font-bold text-sm sm:text-base text-emerald-600 dark:text-emerald-400">
            {referenceId}
          </span>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleCopyId}
          className="rounded-xl text-xs h-8 px-3 border-emerald-500/30 hover:bg-emerald-500/10"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 mr-1 text-emerald-600 dark:text-emerald-400" /> Copied
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 mr-1" /> Copy ID
            </>
          )}
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
        <Link
          href="/"
          className="w-full sm:w-auto flex-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-md shadow-emerald-600/20 inline-flex items-center justify-center h-11 px-5 text-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portfolio
        </Link>

        <a
          href={`https://wa.me/918332924488?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto flex-1 rounded-full border border-emerald-500/40 hover:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-medium inline-flex items-center justify-center h-11 px-5 text-sm transition-all"
        >
          <MessageSquare className="w-4 h-4 mr-2" /> Chat on WhatsApp (+91 8332924488)
        </a>
      </div>

      <div className="pt-2 border-t border-border/60">
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
        >
          Submit another project requirement
        </button>
      </div>
    </div>
  );
}
