"use client";

import React from "react";
import {
  Layers,
  Sparkles,
  Palette,
  FileCode,
  Link2,
  CheckSquare,
  HelpCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const WEBSITE_TYPES = [
  "Business Website",
  "E-Commerce Website",
  "Portfolio Website",
  "Blog / News Website",
  "School / College Website",
  "Landing Page",
  "Web Application",
  "Other",
];

const AVAILABLE_FEATURES = [
  "Home Page",
  "About Us",
  "Services / Products",
  "Gallery / Portfolio",
  "Blog / News",
  "Contact Us",
  "FAQ",
  "Testimonial / Reviews",
  "Team / Our Team",
  "Pricing / Plans",
  "Login / Register",
  "User Dashboard",
  "Admin Panel",
  "Booking / Appointment",
  "Payment Gateway",
  "Search / Filter",
  "Live Chat / WhatsApp",
  "Newsletter Subscription",
];

interface StepFeaturesScopeProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export function StepFeaturesScope({
  formData,
  onChange,
  errors,
}: StepFeaturesScopeProps) {
  const selectedTypes: string[] = Array.isArray(formData.website_type)
    ? formData.website_type
    : [];

  const selectedFeatures: string[] = Array.isArray(formData.features)
    ? formData.features
    : [];

  const toggleWebsiteType = (type: string) => {
    let updated: string[];
    if (selectedTypes.includes(type)) {
      updated = selectedTypes.filter((t) => t !== type);
    } else {
      updated = [...selectedTypes, type];
    }
    onChange("website_type", updated);
    // If deselected "Other", clear other text
    if (!updated.includes("Other")) {
      onChange("website_type_other", "");
    }
  };

  const toggleFeature = (feature: string) => {
    let updated: string[];
    if (selectedFeatures.includes(feature)) {
      updated = selectedFeatures.filter((f) => f !== feature);
    } else {
      updated = [...selectedFeatures, feature];
    }
    onChange("features", updated);
  };

  return (
    <div className="space-y-10">
      {/* ── Section 04: Website Requirements ───────────────────────── */}
      <div className="space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-border/70">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm shadow-sm">
            04
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              Website Requirements
            </h3>
            <p className="text-xs text-muted-foreground">
              Select one or more website types that best align with your planned deliverable.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            What type of website do you need? <span className="text-destructive">*</span>
          </Label>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {WEBSITE_TYPES.map((type) => {
              const checked = selectedTypes.includes(type);
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleWebsiteType(type)}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all text-xs font-medium ${
                    checked
                      ? "bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-sm"
                      : "bg-card border-border hover:border-emerald-500/40 text-foreground"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all ${
                      checked
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "border-muted-foreground/40 bg-transparent"
                    }`}
                  >
                    {checked && <span className="text-[10px] leading-none">✓</span>}
                  </div>
                  <span className="truncate">{type}</span>
                </button>
              );
            })}
          </div>

          {errors.website_type && (
            <p className="text-xs font-medium text-destructive mt-1">{errors.website_type}</p>
          )}

          {/* Conditional "Other" Input */}
          {selectedTypes.includes("Other") && (
            <div className="pt-2 animate-in fade-in-50 duration-200">
              <Label htmlFor="website_type_other" className="text-xs font-medium text-foreground">
                Please specify the other website type <span className="text-destructive">*</span>
              </Label>
              <Input
                id="website_type_other"
                name="website_type_other"
                type="text"
                placeholder="e.g., Custom AI SaaS Directory, Micro-SaaS Tool"
                value={formData.website_type_other || ""}
                onChange={(e) => onChange("website_type_other", e.target.value)}
                className={`rounded-xl border-border bg-card mt-1.5 transition-all ${
                  errors.website_type_other ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-emerald-500"
                }`}
              />
              {errors.website_type_other && (
                <p className="text-xs font-medium text-destructive mt-1">{errors.website_type_other}</p>
              )}
            </div>
          )}

          {/* Reference Websites */}
          <div className="pt-3 space-y-2">
            <Label htmlFor="reference_links" className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Do you have any reference websites? <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
            </Label>
            <Input
              id="reference_links"
              name="reference_links"
              type="text"
              placeholder="Enter reference website links (comma separated, e.g., stripe.com, vercel.com)"
              value={formData.reference_links || ""}
              onChange={(e) => onChange("reference_links", e.target.value)}
              className="rounded-xl border-border bg-card focus-visible:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* ── Section 05: Features & Functionality ─────────────────────── */}
      <div className="space-y-5 pt-2">
        <div className="flex items-center gap-3 pb-4 border-b border-border/70">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm shadow-sm">
            05
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              Features &amp; Functionality
            </h3>
            <p className="text-xs text-muted-foreground">
              Select all functional components and architectural integrations required for your site.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Select the features you need in your website:
          </Label>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {AVAILABLE_FEATURES.map((feature) => {
              const checked = selectedFeatures.includes(feature);
              return (
                <button
                  key={feature}
                  type="button"
                  onClick={() => toggleFeature(feature)}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all text-xs ${
                    checked
                      ? "bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-medium"
                      : "bg-card border-border hover:border-emerald-500/30 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-all flex-shrink-0 ${
                      checked
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "border-muted-foreground/40 bg-transparent"
                    }`}
                  >
                    {checked && <span className="text-[9px] leading-none">✓</span>}
                  </div>
                  <span className="truncate">{feature}</span>
                </button>
              );
            })}
          </div>

          {/* Other Features */}
          <div className="pt-3 space-y-2">
            <Label htmlFor="other_features" className="text-sm font-medium text-foreground">
              Other Custom Features <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
            </Label>
            <Input
              id="other_features"
              name="other_features"
              type="text"
              placeholder="e.g., Multi-currency switcher, AI Chatbot integration, Webhooks"
              value={formData.other_features || ""}
              onChange={(e) => onChange("other_features", e.target.value)}
              className="rounded-xl border-border bg-card focus-visible:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* ── Section 06: Design Preference ──────────────────────────── */}
      <div className="space-y-5 pt-2">
        <div className="flex items-center gap-3 pb-4 border-b border-border/70">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm shadow-sm">
            06
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              Design Preference
            </h3>
            <p className="text-xs text-muted-foreground">
              Specify your branding assets, color palette, and visual direction.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Design Preference Radio */}
          <div className="space-y-2.5">
            <Label className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Do you have a design preference? <span className="text-destructive">*</span>
            </Label>
            <div className="space-y-2">
              {[
                "Yes, I have a design in mind",
                "No, I need suggestions from your team",
              ].map((opt) => (
                <label
                  key={opt}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all text-xs font-medium ${
                    formData.design_preference === opt
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300"
                      : "bg-card border-border hover:border-emerald-500/30 text-foreground"
                  }`}
                >
                  <input
                    type="radio"
                    name="design_preference"
                    value={opt}
                    checked={formData.design_preference === opt}
                    onChange={() => onChange("design_preference", opt)}
                    className="accent-emerald-600 w-4 h-4"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
            {errors.design_preference && (
              <p className="text-xs font-medium text-destructive">{errors.design_preference}</p>
            )}
          </div>

          {/* Color Preference */}
          <div className="space-y-2">
            <Label htmlFor="color_preference" className="text-sm font-medium text-foreground">
              Color Preference <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
            </Label>
            <Input
              id="color_preference"
              name="color_preference"
              type="text"
              placeholder="e.g., Deep emerald, charcoal dark, gold accent"
              value={formData.color_preference || ""}
              onChange={(e) => onChange("color_preference", e.target.value)}
              className="rounded-xl border-border bg-card focus-visible:ring-emerald-500"
            />

            {/* Quick Radio Sub-options: Logo & Content */}
            <div className="grid grid-cols-2 gap-3 pt-3">
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-muted-foreground">Do you have a logo?</span>
                <div className="flex gap-2">
                  {["Yes", "No"].map((choice) => (
                    <label
                      key={choice}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg border text-xs cursor-pointer font-medium transition-all ${
                        (formData.has_logo || "No") === choice
                          ? "bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300"
                          : "bg-card border-border text-muted-foreground"
                      }`}
                    >
                      <input
                        type="radio"
                        name="has_logo"
                        value={choice}
                        checked={(formData.has_logo || "No") === choice}
                        onChange={() => onChange("has_logo", choice)}
                        className="sr-only"
                      />
                      <span>{choice}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-medium text-muted-foreground">Provide copy content?</span>
                <div className="flex gap-2">
                  {[
                    { label: "Yes", val: "Yes, I will provide" },
                    { label: "Need help", val: "No, I need content support" },
                  ].map((item) => (
                    <label
                      key={item.label}
                      className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg border text-xs cursor-pointer font-medium transition-all text-center ${
                        formData.will_provide_content === item.val
                          ? "bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300"
                          : "bg-card border-border text-muted-foreground"
                      }`}
                    >
                      <input
                        type="radio"
                        name="will_provide_content"
                        value={item.val}
                        checked={formData.will_provide_content === item.val}
                        onChange={() => onChange("will_provide_content", item.val)}
                        className="sr-only"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 07: Content Requirement ────────────────────────── */}
      <div className="space-y-5 pt-2">
        <div className="flex items-center gap-3 pb-4 border-b border-border/70">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm shadow-sm">
            07
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              Content Requirement
            </h3>
            <p className="text-xs text-muted-foreground">
              Outline page hierarchy, content authorship, and navigational structure.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Content will be provided by:
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: "Client", value: "Client" },
                { label: "Our Team (Additional Charges)", value: "Our Team (Additional Charges)" },
                { label: "Partial (Client + Our Team)", value: "Partial (Client + Our Team)" },
              ].map((prov) => (
                <label
                  key={prov.value}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all text-xs font-medium ${
                    formData.content_provider === prov.value
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300"
                      : "bg-card border-border hover:border-emerald-500/30 text-foreground"
                  }`}
                >
                  <input
                    type="radio"
                    name="content_provider"
                    value={prov.value}
                    checked={formData.content_provider === prov.value}
                    onChange={() => onChange("content_provider", prov.value)}
                    className="accent-emerald-600"
                  />
                  <span>{prov.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pages_required" className="text-sm font-medium text-foreground flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Pages / Sections Required <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
            </Label>
            <Textarea
              id="pages_required"
              name="pages_required"
              rows={3}
              placeholder="Please list the pages or sections you want in your website…"
              value={formData.pages_required || ""}
              onChange={(e) => onChange("pages_required", e.target.value)}
              className="rounded-2xl border-border bg-card resize-y focus-visible:ring-emerald-500"
            />
            <p className="text-[11px] text-muted-foreground">
              Example: Home, About, Services, Case Studies, Portfolio Gallery, Blog, Booking, Contact Form.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
