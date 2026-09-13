"use client";

import React from "react";
import {
  ShieldCheck,
  Lock,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Zap,
  Building,
  FolderKanban,
  Clock,
  Coins,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignatureUploader } from "./SignatureUploader";

interface StepAuthorizationProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
  onOpenTerms: () => void;
}

export function StepAuthorization({
  formData,
  onChange,
  errors,
  onOpenTerms,
}: StepAuthorizationProps) {
  return (
    <div className="space-y-8">
      {/* ── Section Header ────────────────────────────────────────── */}
      <div className="flex items-center gap-3 pb-4 border-b border-border/70">
        <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm shadow-sm">
          05
        </div>
        <div>
          <h3 className="text-xl font-bold tracking-tight text-foreground">
            Authorization &amp; Submission
          </h3>
          <p className="text-xs text-muted-foreground">
            Sign and review your project specifications before sending them directly to Bhargava Sri Ram.
          </p>
        </div>
      </div>

      {/* ── Summary Snapshot Card ──────────────────────────────────── */}
      <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/20 p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" /> Project Requirement Snapshot
          </span>
          <span className="text-xs text-muted-foreground">Ready for Dispatch</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-muted-foreground flex items-center gap-1">
              <Building className="w-3 h-3 text-emerald-500" /> Client
            </span>
            <p className="font-semibold text-foreground truncate">
              {formData.client_name || "—"}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-muted-foreground flex items-center gap-1">
              <FolderKanban className="w-3 h-3 text-emerald-500" /> Project Title
            </span>
            <p className="font-semibold text-foreground truncate">
              {formData.project_title || "—"}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-muted-foreground flex items-center gap-1">
              <Coins className="w-3 h-3 text-emerald-500" /> Budget Range
            </span>
            <p className="font-semibold text-emerald-600 dark:text-emerald-400 truncate">
              {formData.budget_range || "—"}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3 text-emerald-500" /> Deadline
            </span>
            <p className="font-semibold text-foreground truncate">
              {formData.expected_deadline || "Flexible"}
            </p>
          </div>
        </div>
      </div>

      {/* ── Legal Declaration Statement ────────────────────────────── */}
      <div className="p-5 rounded-2xl border border-border bg-card/60 space-y-3">
        <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
          &ldquo;I hereby confirm that the information provided above is true to the best of my knowledge and I authorize the developer to contact me regarding my website request.&rdquo;
        </p>

        {/* Date Field */}
        <div className="pt-2 max-w-xs space-y-2">
          <Label htmlFor="authorization_date" className="text-xs font-medium text-foreground flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Authorization Date <span className="text-destructive">*</span>
          </Label>
          <Input
            id="authorization_date"
            name="authorization_date"
            type="date"
            value={formData.authorization_date || ""}
            onChange={(e) => onChange("authorization_date", e.target.value)}
            className={`rounded-xl border-border bg-card transition-all ${
              errors.authorization_date ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-emerald-500"
            }`}
          />
          {errors.authorization_date && (
            <p className="text-xs font-medium text-destructive">{errors.authorization_date}</p>
          )}
        </div>
      </div>

      {/* ── Signature Uploader ─────────────────────────────────────── */}
      <div className="p-5 rounded-2xl border border-border bg-card/60">
        <SignatureUploader
          clientName={formData.client_name || formData.contact_person || ""}
          signatureValue={formData.client_signature || ""}
          onSignatureChange={(val) => onChange("client_signature", val)}
        />
      </div>

      {/* ── Terms & Conditions Checkbox ─────────────────────────────── */}
      <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/20">
        <label className="flex items-start gap-3 cursor-pointer text-xs sm:text-sm leading-relaxed text-foreground select-none">
          <input
            type="checkbox"
            id="terms_and_conditions"
            name="terms_and_conditions"
            checked={Boolean(formData.terms_and_conditions)}
            onChange={(e) => onChange("terms_and_conditions", e.target.checked)}
            className="accent-emerald-600 w-4 h-4 mt-0.5 rounded"
          />
          <span>
            I accept and agree to the{" "}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onOpenTerms();
              }}
              className="text-emerald-600 dark:text-emerald-400 font-semibold underline inline-flex items-center gap-0.5 hover:opacity-80"
            >
              Terms &amp; Conditions <ExternalLink className="w-3 h-3" />
            </button>{" "}
            and Privacy Policy for this project requirements submission. <span className="text-destructive">*</span>
          </span>
        </label>
        {errors.terms_and_conditions && (
          <p className="text-xs font-medium text-destructive ml-7 mt-1">{errors.terms_and_conditions}</p>
        )}
      </div>

      {/* ── Trust Indicators ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className="flex items-center gap-2.5 p-3 rounded-2xl border border-border/80 bg-card/40 text-xs text-muted-foreground">
          <div className="w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
            <Lock className="w-3.5 h-3.5" />
          </div>
          <span className="font-medium">256-Bit SSL Encrypted Submission</span>
        </div>

        <div className="flex items-center gap-2.5 p-3 rounded-2xl border border-border/80 bg-card/40 text-xs text-muted-foreground">
          <div className="w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
            <Zap className="w-3.5 h-3.5" />
          </div>
          <span className="font-medium">Direct Developer Dispatch</span>
        </div>

        <div className="flex items-center gap-2.5 p-3 rounded-2xl border border-border/80 bg-card/40 text-xs text-muted-foreground">
          <div className="w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <span className="font-medium">NDA &amp; Privacy Guaranteed</span>
        </div>
      </div>
    </div>
  );
}
