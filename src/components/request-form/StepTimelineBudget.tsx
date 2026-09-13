"use client";

import React from "react";
import {
  Calendar,
  Clock,
  Coins,
  Server,
  FileCheck,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const BUDGET_OPTIONS = [
  "₹10,000 - ₹25,000",
  "₹25,000 - ₹50,000",
  "₹50,000 - ₹1,00,000",
  "₹1,00,000+",
  "Custom Quote",
];

interface StepTimelineBudgetProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
  onOpenTerms: () => void;
}

export function StepTimelineBudget({
  formData,
  onChange,
  errors,
  onOpenTerms,
}: StepTimelineBudgetProps) {
  return (
    <div className="space-y-10">
      {/* ── Section 08: Timeline & Deadline ────────────────────────── */}
      <div className="space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border/70">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm shadow-sm">
            08
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              Timeline &amp; Deadline
            </h3>
            <p className="text-xs text-muted-foreground">
              Share your delivery schedule, launch targets, and urgent milestones.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Start Date */}
          <div className="space-y-2">
            <Label htmlFor="start_date" className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Expected Project Start Date <span className="text-destructive">*</span>
            </Label>
            <Input
              id="start_date"
              name="start_date"
              type="date"
              value={formData.start_date || ""}
              onChange={(e) => onChange("start_date", e.target.value)}
              className={`rounded-xl border-border bg-card transition-all ${
                errors.start_date ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-emerald-500"
              }`}
            />
            {errors.start_date && (
              <p className="text-xs font-medium text-destructive">{errors.start_date}</p>
            )}
          </div>

          {/* Expected Deadline */}
          <div className="space-y-2">
            <Label htmlFor="expected_deadline" className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Expected Deadline <span className="text-destructive">*</span>
            </Label>
            <Input
              id="expected_deadline"
              name="expected_deadline"
              type="date"
              value={formData.expected_deadline || ""}
              onChange={(e) => onChange("expected_deadline", e.target.value)}
              className={`rounded-xl border-border bg-card transition-all ${
                errors.expected_deadline ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-emerald-500"
              }`}
            />
            {errors.expected_deadline && (
              <p className="text-xs font-medium text-destructive">{errors.expected_deadline}</p>
            )}
          </div>
        </div>

        {/* Fixed Deadline Toggle */}
        <div className="pt-2 space-y-3">
          <Label className="text-sm font-medium text-foreground">
            Is there a strict, non-negotiable deadline (e.g. event or product launch)?
          </Label>
          <div className="flex gap-4">
            {["No", "Yes"].map((choice) => (
              <label
                key={choice}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border cursor-pointer text-xs font-medium transition-all ${
                  (formData.fixed_deadline || "No") === choice
                    ? "bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300"
                    : "bg-card border-border hover:border-emerald-500/30 text-foreground"
                }`}
              >
                <input
                  type="radio"
                  name="fixed_deadline"
                  value={choice}
                  checked={(formData.fixed_deadline || "No") === choice}
                  onChange={() => onChange("fixed_deadline", choice)}
                  className="accent-emerald-600"
                />
                <span>{choice === "Yes" ? "Yes, fixed deadline" : "No, flexible schedule"}</span>
              </label>
            ))}
          </div>

          {/* Conditional Fixed Deadline Details */}
          {formData.fixed_deadline === "Yes" && (
            <div className="pt-2 animate-in fade-in-50 duration-200">
              <Label htmlFor="fixed_deadline_details" className="text-xs font-medium text-foreground">
                Please specify the deadline reason or launch date details <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="fixed_deadline_details"
                name="fixed_deadline_details"
                rows={2}
                placeholder="Mention why this deadline is critical (e.g., product launch on Nov 15th, investor pitch)..."
                value={formData.fixed_deadline_details || ""}
                onChange={(e) => onChange("fixed_deadline_details", e.target.value)}
                className={`rounded-2xl border-border bg-card mt-1.5 resize-y transition-all ${
                  errors.fixed_deadline_details ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-emerald-500"
                }`}
              />
              {errors.fixed_deadline_details && (
                <p className="text-xs font-medium text-destructive mt-1">{errors.fixed_deadline_details}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Section 09: Budget & Infrastructure ─────────────────────── */}
      <div className="space-y-5 pt-2">
        <div className="flex items-center gap-3 pb-4 border-b border-border/70">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm shadow-sm">
            09
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              Budget &amp; Infrastructure
            </h3>
            <p className="text-xs text-muted-foreground">
              Select your targeted investment tier and existing domain/hosting readiness.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="budget_range" className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Estimated Budget Range <span className="text-destructive">*</span>
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {BUDGET_OPTIONS.map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => onChange("budget_range", tier)}
                  className={`p-3 rounded-2xl border text-center transition-all text-xs font-semibold ${
                    formData.budget_range === tier
                      ? "bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/20 scale-[1.02]"
                      : "bg-card border-border hover:border-emerald-500/40 text-foreground"
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
            {errors.budget_range && (
              <p className="text-xs font-medium text-destructive mt-1">{errors.budget_range}</p>
            )}
          </div>

          {/* Infrastructure Radios */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {/* Domain */}
            <div className="space-y-2 p-3.5 rounded-2xl border border-border bg-card/50">
              <span className="text-xs font-medium text-foreground flex items-center gap-1">
                <Server className="w-3 h-3 text-emerald-500" /> Do you own a domain?
              </span>
              <div className="flex gap-2">
                {["Yes", "No"].map((opt) => (
                  <label
                    key={opt}
                    className={`flex-1 flex items-center justify-center py-1.5 rounded-lg border text-xs cursor-pointer font-medium transition-all ${
                      (formData.has_domain || "No") === opt
                        ? "bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    <input
                      type="radio"
                      name="has_domain"
                      value={opt}
                      checked={(formData.has_domain || "No") === opt}
                      onChange={() => onChange("has_domain", opt)}
                      className="sr-only"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Hosting */}
            <div className="space-y-2 p-3.5 rounded-2xl border border-border bg-card/50">
              <span className="text-xs font-medium text-foreground flex items-center gap-1">
                <Server className="w-3 h-3 text-emerald-500" /> Do you have hosting?
              </span>
              <div className="flex gap-2">
                {["Yes", "No"].map((opt) => (
                  <label
                    key={opt}
                    className={`flex-1 flex items-center justify-center py-1.5 rounded-lg border text-xs cursor-pointer font-medium transition-all ${
                      (formData.has_hosting || "No") === opt
                        ? "bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    <input
                      type="radio"
                      name="has_hosting"
                      value={opt}
                      checked={(formData.has_hosting || "No") === opt}
                      onChange={() => onChange("has_hosting", opt)}
                      className="sr-only"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Support */}
            <div className="space-y-2 p-3.5 rounded-2xl border border-border bg-card/50">
              <span className="text-xs font-medium text-foreground flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Need setup help?
              </span>
              <div className="flex gap-2">
                {["Yes", "No"].map((opt) => (
                  <label
                    key={opt}
                    className={`flex-1 flex items-center justify-center py-1.5 rounded-lg border text-xs cursor-pointer font-medium transition-all ${
                      (formData.need_domain_hosting_help || "No") === opt
                        ? "bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    <input
                      type="radio"
                      name="need_domain_hosting_help"
                      value={opt}
                      checked={(formData.need_domain_hosting_help || "No") === opt}
                      onChange={() => onChange("need_domain_hosting_help", opt)}
                      className="sr-only"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 10: Additional Notes & Checklist ─────────────────── */}
      <div className="space-y-5 pt-2">
        <div className="flex items-center gap-3 pb-4 border-b border-border/70">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm shadow-sm">
            10
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              Additional Notes &amp; Checklist
            </h3>
            <p className="text-xs text-muted-foreground">
              Any special ideas, extra requests, and mandatory acknowledgment checkboxes.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="additional_notes" className="text-sm font-medium text-foreground">
              Additional Notes / Special Requests <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
            </Label>
            <Textarea
              id="additional_notes"
              name="additional_notes"
              rows={3}
              placeholder="Any other features, tech stacks, or specific requests you would like to include…"
              value={formData.additional_notes || ""}
              onChange={(e) => onChange("additional_notes", e.target.value)}
              className="rounded-2xl border-border bg-card resize-y focus-visible:ring-emerald-500"
            />
          </div>

          {/* Submission Checklist Card */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/20 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
              <FileCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Submission Checklist
            </div>

            <div className="space-y-2.5">
              {/* Check 1 */}
              <label className="flex items-start gap-3 cursor-pointer text-xs leading-relaxed text-foreground select-none">
                <input
                  type="checkbox"
                  name="chk_correct"
                  checked={formData.chk_correct !== false}
                  onChange={(e) => onChange("chk_correct", e.target.checked)}
                  className="accent-emerald-600 w-4 h-4 mt-0.5 rounded"
                />
                <span>
                  I confirm that all the information provided above is accurate and up-to-date. <span className="text-destructive">*</span>
                </span>
              </label>
              {errors.chk_correct && (
                <p className="text-xs font-medium text-destructive ml-7">{errors.chk_correct}</p>
              )}

              {/* Check 2 */}
              <label className="flex items-start gap-3 cursor-pointer text-xs leading-relaxed text-foreground select-none">
                <input
                  type="checkbox"
                  name="chk_non_final"
                  checked={formData.chk_non_final !== false}
                  onChange={(e) => onChange("chk_non_final", e.target.checked)}
                  className="accent-emerald-600 w-4 h-4 mt-0.5 rounded"
                />
                <span>
                  I understand that submitting this requirements form initiates a project assessment and does not constitute a final binding contract. <span className="text-destructive">*</span>
                </span>
              </label>
              {errors.chk_non_final && (
                <p className="text-xs font-medium text-destructive ml-7">{errors.chk_non_final}</p>
              )}

              {/* Check 3 */}
              <label className="flex items-start gap-3 cursor-pointer text-xs leading-relaxed text-foreground select-none">
                <input
                  type="checkbox"
                  name="chk_terms"
                  checked={formData.chk_terms !== false}
                  onChange={(e) => onChange("chk_terms", e.target.checked)}
                  className="accent-emerald-600 w-4 h-4 mt-0.5 rounded"
                />
                <span>
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      onOpenTerms();
                    }}
                    className="text-emerald-600 dark:text-emerald-400 underline font-semibold inline-flex items-center gap-0.5 hover:opacity-80"
                  >
                    Terms &amp; Conditions <ExternalLink className="w-3 h-3" />
                  </button>{" "}
                  governing freelance engagement and confidentiality. <span className="text-destructive">*</span>
                </span>
              </label>
              {errors.chk_terms && (
                <p className="text-xs font-medium text-destructive ml-7">{errors.chk_terms}</p>
              )}

              {/* Check 4 (Optional) */}
              <label className="flex items-start gap-3 cursor-pointer text-xs leading-relaxed text-muted-foreground select-none">
                <input
                  type="checkbox"
                  name="chk_updates"
                  checked={formData.chk_updates !== false}
                  onChange={(e) => onChange("chk_updates", e.target.checked)}
                  className="accent-emerald-600 w-4 h-4 mt-0.5 rounded"
                />
                <span>
                  I want to receive priority proposal notifications and status updates via email and WhatsApp.
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
