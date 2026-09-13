"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export interface WebsiteRequestDialogProps {
  trigger?: React.ReactElement;
  requestForm?: {
    enabled?: boolean;
    title?: string;
    description?: string;
    badgeText?: string;
    buttonText?: string;
    budgetOptions?: string[];
    timelineOptions?: string[];
  } | null;
  packageParam?: string;
}

export function WebsiteRequestDialog({ trigger, requestForm, packageParam }: WebsiteRequestDialogProps) {
  const router = useRouter();

  if (requestForm?.enabled === false) {
    return null;
  }

  const href = packageParam 
    ? `/request-website?package=${encodeURIComponent(packageParam)}` 
    : "/request-website";

  if (trigger) {
    return (
      <span 
        onClick={(e) => {
          e.preventDefault();
          router.push(href);
        }} 
        className="cursor-pointer inline-flex w-full sm:w-auto"
      >
        {trigger}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center px-4 py-2 text-sm font-extrabold rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black shadow-lg shadow-emerald-500/20 gap-2 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
    >
      <Sparkles className="w-4 h-4" />
      <span>{requestForm?.buttonText || "Request a Website"}</span>
    </Link>
  );
}
