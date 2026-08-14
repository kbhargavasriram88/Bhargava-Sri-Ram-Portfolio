"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Copy, Check, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

import { WebsiteRequestDialog } from "@/components/WebsiteRequestDialog";

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
  requestForm?: any;
}

export function OfferBanner({ offer, requestForm }: OfferBannerProps) {
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

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("offer_banner_dismissed", "true");
  };

  const handleCopyCode = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (offer?.discountCode) {
      navigator.clipboard.writeText(offer.discountCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  if (!offer?.enabled) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          className="relative z-[60] w-full overflow-hidden bg-gradient-to-r from-emerald-950/95 via-slate-950/98 to-teal-950/95 border-b border-emerald-500/40 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(16,185,129,0.25)]"
        >
          {/* Animated Travelling Shimmer Line at Top */}
          <div className="absolute top-0 left-0 w-full h-[2px] overflow-hidden bg-emerald-900/40">
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
              className="w-full h-full bg-gradient-to-r from-transparent via-emerald-300 to-teal-300 shadow-[0_0_12px_#10b981]"
            />
          </div>

          {/* Ambient Glowing Particle Orbs in Background */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="pointer-events-none absolute -top-10 left-1/4 w-32 h-32 bg-emerald-500/15 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [1.2, 1, 1.2] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="pointer-events-none absolute -bottom-10 right-1/3 w-40 h-40 bg-teal-500/15 rounded-full blur-2xl"
          />

          <div className="container mx-auto px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm relative z-10">
            
            {/* Left: Badge & Title Info */}
            <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start text-center sm:text-left">
              {offer.badgeText && (
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-500/20 via-teal-500/25 to-emerald-500/20 text-emerald-300 border border-emerald-400/50 text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.35)]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  {offer.badgeText}
                </motion.span>
              )}

              <span className="font-extrabold tracking-tight bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent text-sm md:text-base flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-400 shrink-0 inline hidden xs:inline" />
                {offer.title || "Special Offer!"}
              </span>

              {offer.description && (
                <span className="text-emerald-100/75 text-xs hidden xl:inline border-l border-emerald-500/30 pl-3">
                  {offer.description}
                </span>
              )}
            </div>

            {/* Right: Copy Code, CTA & Dismiss */}
            <div className="flex items-center gap-2.5 shrink-0">
              {offer.discountCode && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCopyCode}
                  className="relative inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold rounded-lg bg-emerald-950/80 hover:bg-emerald-900/90 border border-emerald-500/40 text-emerald-200 shadow-inner transition-all group"
                  title="Click to copy promo code"
                >
                  <span>CODE: <strong className="text-emerald-400 underline decoration-dotted font-extrabold">{offer.discountCode}</strong></span>
                  {copied ? (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1 text-emerald-300 font-sans text-[11px]">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </motion.span>
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-emerald-400/70 group-hover:text-emerald-300 transition-colors" />
                  )}
                </motion.button>
              )}

              <WebsiteRequestDialog
                requestForm={requestForm}
                trigger={
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                    <Button
                      size="sm"
                      className="relative overflow-hidden h-8 md:h-9 px-4 text-xs font-extrabold rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 hover:from-emerald-300 hover:to-teal-300 text-black shadow-[0_0_20px_rgba(16,185,129,0.45)] transition-all gap-1.5 group cursor-pointer"
                    >
                      {/* Glossy sweep effect on hover */}
                      <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                      <span>{offer.buttonText || "Claim Offer"}</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[3] group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </motion.div>
                }
              />

              <motion.button
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDismiss}
                className="p-1 text-emerald-300/70 hover:text-white rounded-full hover:bg-emerald-500/20 transition-colors ml-0.5"
                aria-label="Dismiss banner"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
