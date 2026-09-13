"use client";

import React from "react";
import { Briefcase, Globe, Calendar, FolderKanban, Target, AlignLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const BUSINESS_TYPES = [
  "Startup",
  "E-Commerce",
  "Educational Institute",
  "Corporate / Enterprise",
  "Agency / Services",
  "Non-Profit",
  "Other",
];

const WEBSITE_PURPOSES = [
  "Brand Awareness",
  "Lead Generation",
  "Online Store / Sales",
  "Educational Portal",
  "SaaS Platform",
  "Other",
];

interface StepBusinessSpecsProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export function StepBusinessSpecs({
  formData,
  onChange,
  errors,
}: StepBusinessSpecsProps) {
  const descLength = (formData.business_description || "").length;

  return (
    <div className="space-y-8">
      {/* ── Section 02: Business Information ───────────────────────── */}
      <div className="space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border/70">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm shadow-sm">
            02
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              Business Information
            </h3>
            <p className="text-xs text-muted-foreground">
              Tell me about your business model and operational background.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Business Type */}
          <div className="space-y-2">
            <Label htmlFor="business_type" className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Business / Organization Type <span className="text-destructive">*</span>
            </Label>
            <select
              id="business_type"
              name="business_type"
              value={formData.business_type || ""}
              onChange={(e) => onChange("business_type", e.target.value)}
              className={`w-full h-10 px-3 rounded-xl border bg-card text-foreground text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.business_type ? "border-destructive ring-destructive" : "border-border"
              }`}
            >
              <option value="" disabled>Select business type</option>
              {BUSINESS_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.business_type && (
              <p className="text-xs font-medium text-destructive">{errors.business_type}</p>
            )}
          </div>

          {/* Business Name */}
          <div className="space-y-2">
            <Label htmlFor="business_name" className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Business / Organization Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="business_name"
              name="business_name"
              type="text"
              placeholder="Enter your registered or brand name"
              value={formData.business_name || ""}
              onChange={(e) => onChange("business_name", e.target.value)}
              className={`rounded-xl border-border bg-card transition-all ${
                errors.business_name ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-emerald-500"
              }`}
            />
            {errors.business_name && (
              <p className="text-xs font-medium text-destructive">{errors.business_name}</p>
            )}
          </div>

          {/* Website / Social Media */}
          <div className="space-y-2">
            <Label htmlFor="website_social" className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Existing Website / Social Media <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
            </Label>
            <Input
              id="website_social"
              name="website_social"
              type="text"
              placeholder="e.g., https://yourbrand.com or Instagram handle"
              value={formData.website_social || ""}
              onChange={(e) => onChange("website_social", e.target.value)}
              className="rounded-xl border-border bg-card focus-visible:ring-emerald-500"
            />
          </div>

          {/* Years in Business */}
          <div className="space-y-2">
            <Label htmlFor="years_in_business" className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Years in Business <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
            </Label>
            <Input
              id="years_in_business"
              name="years_in_business"
              type="text"
              placeholder="e.g., Brand new, 1-2 years, 5+ years"
              value={formData.years_in_business || ""}
              onChange={(e) => onChange("years_in_business", e.target.value)}
              className="rounded-xl border-border bg-card focus-visible:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* ── Section 03: Project Information ────────────────────────── */}
      <div className="space-y-5 pt-2">
        <div className="flex items-center gap-3 pb-4 border-b border-border/70">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm shadow-sm">
            03
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              Project Information
            </h3>
            <p className="text-xs text-muted-foreground">
              Clarify your product goals, branding intent, and target customer profile.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Project Title / Website Name */}
          <div className="space-y-2">
            <Label htmlFor="project_title" className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <FolderKanban className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Project Title / Website Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="project_title"
              name="project_title"
              type="text"
              placeholder="e.g., Apex Logistics Customer Portal"
              value={formData.project_title || ""}
              onChange={(e) => onChange("project_title", e.target.value)}
              className={`rounded-xl border-border bg-card transition-all ${
                errors.project_title ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-emerald-500"
              }`}
            />
            {errors.project_title && (
              <p className="text-xs font-medium text-destructive">{errors.project_title}</p>
            )}
          </div>

          {/* Purpose of Website */}
          <div className="space-y-2">
            <Label htmlFor="purpose_of_website" className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Purpose of Website <span className="text-destructive">*</span>
            </Label>
            <select
              id="purpose_of_website"
              name="purpose_of_website"
              value={formData.purpose_of_website || ""}
              onChange={(e) => onChange("purpose_of_website", e.target.value)}
              className={`w-full h-10 px-3 rounded-xl border bg-card text-foreground text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.purpose_of_website ? "border-destructive ring-destructive" : "border-border"
              }`}
            >
              <option value="" disabled>Select main purpose</option>
              {WEBSITE_PURPOSES.map((purpose) => (
                <option key={purpose} value={purpose}>
                  {purpose}
                </option>
              ))}
            </select>
            {errors.purpose_of_website && (
              <p className="text-xs font-medium text-destructive">{errors.purpose_of_website}</p>
            )}
          </div>
        </div>

        {/* Brief Description About Business / Project with character counter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="business_description" className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <AlignLeft className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Brief Description About Business / Project <span className="text-destructive">*</span>
            </Label>
            <span className={`text-xs font-mono ${descLength > 2400 ? "text-destructive font-bold" : "text-muted-foreground"}`}>
              {descLength} / 2500
            </span>
          </div>
          <Textarea
            id="business_description"
            name="business_description"
            rows={4}
            placeholder="Describe your business, services, target audience, core deliverables, and goals…"
            value={formData.business_description || ""}
            onChange={(e) => onChange("business_description", e.target.value)}
            className={`rounded-2xl border-border bg-card resize-y min-h-[110px] transition-all ${
              errors.business_description ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-emerald-500"
            }`}
          />
          {errors.business_description && (
            <p className="text-xs font-medium text-destructive">{errors.business_description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
