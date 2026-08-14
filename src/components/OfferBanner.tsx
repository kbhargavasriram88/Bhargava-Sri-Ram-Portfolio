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
    <div className="relative z-[60] w-full bg-gradient-to-r from-emerald-950/90 via-background/95 to-teal-950/90 border-b border-emerald-500/30 backdrop-blur-xl shadow-lg transition-all duration-300">
      <div className="container mx-auto px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        
        {/* Left: Badge & Text */}
        <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start text-center sm:text-left">
          {offer.badgeText && (
            <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              {offer.badgeText}
            </span>
          )}
          <span className="font-semibold text-foreground tracking-tight">
            {offer.title || "Special Offer!"}
          </span>
          {offer.description && (
            <span className="text-muted-foreground text-xs hidden md:inline border-l border-border/60 pl-3">
              {offer.description}
            </span>
          )}
        </div>

        {/* Right: Actions & Close */}
        <div className="flex items-center gap-3 shrink-0">
          {offer.discountCode && (
            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-muted/80 hover:bg-muted border border-border text-foreground transition-all active:scale-95"
              title="Click to copy promo code"
            >
              <span>Code: <strong>{offer.discountCode}</strong></span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-muted-foreground" />
              )}
            </button>
          )}

          <Link href={offer.buttonLink || "/#contact"}>
            <Button size="sm" className="h-8 text-xs font-semibold rounded-full bg-emerald-500 hover:bg-emerald-400 text-black shadow-md shadow-emerald-500/20 transition-all gap-1">
              {offer.buttonText || "Claim Offer"}
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>

          <button
            onClick={handleDismiss}
            className="p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted/50 transition-colors ml-1"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
