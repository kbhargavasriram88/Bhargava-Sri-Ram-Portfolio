"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X, Sparkles, Copy, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface OfferBannerProps {
  offer?: {
    enabled?: boolean;
    title?: string;
    description?: string;
    badgeText?: string;
    buttonText?: string;
    buttonLink?: string;
    discountCode?: string;
  } | null;
}

export function OfferBanner({ offer }: OfferBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!offer?.enabled) {
      setIsVisible(false);
      return;
    }

    const isDismissed = sessionStorage.getItem("offer_banner_dismissed");
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, [offer]);

  if (!offer?.enabled || !isVisible) {
    return null;
  }

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("offer_banner_dismissed", "true");
  };

  const handleCopyCode = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (offer.discountCode) {
      navigator.clipboard.writeText(offer.discountCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative z-[60] w-full bg-gradient-to-r from-emerald-950/95 via-background/95 to-teal-950/95 border-b border-emerald-500/40 backdrop-blur-xl shadow-[0_4px_25px_-5px_rgba(16,185,129,0.25)] transition-all duration-300">
      {/* Top Animated Shimmer Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-emerald-500 via-teal-300 to-emerald-500 bg-[length:200%_auto] animate-pulse" />

      <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        
        {/* Left: Badge & Text */}
        <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start text-center sm:text-left">
          {offer.badgeText && (
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/25 text-emerald-300 border border-emerald-400/50 text-xs font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-[0_0_12px_rgba(16,185,129,0.3)] animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
              {offer.badgeText}
            </span>
          )}
          <span className="font-extrabold tracking-tight bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent text-base">
            {offer.title || "Special Offer!"}
          </span>
          {offer.description && (
            <span className="text-emerald-100/70 text-xs hidden lg:inline border-l border-emerald-500/30 pl-3">
              {offer.description}
            </span>
          )}
        </div>

        {/* Right: Actions & Close */}
        <div className="flex items-center gap-3 shrink-0">
          {offer.discountCode && (
            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-200 transition-all active:scale-95 shadow-sm"
              title="Click to copy promo code"
            >
              <span>CODE: <strong className="text-emerald-400 underline decoration-dotted">{offer.discountCode}</strong></span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-emerald-400/70 hover:text-emerald-300" />
              )}
            </button>
          )}

          <Link href={offer.buttonLink || "/#contact"}>
            <Button size="sm" className="h-9 px-4 text-xs font-extrabold rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all gap-1.5 hover:scale-105 active:scale-95">
              {offer.buttonText || "Claim Offer"}
              <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
            </Button>
          </Link>

          <button
            onClick={handleDismiss}
            className="p-1.5 text-emerald-300/70 hover:text-white rounded-full hover:bg-emerald-500/20 transition-colors ml-1"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
