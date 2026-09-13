"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Mail,
  Phone,
  ExternalLink,
  Calendar,
  Clock,
  Coins,
  Building,
  Briefcase,
  Globe,
  Layers,
  Sparkles,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  ShieldCheck,
  MessageSquare,
  PenTool,
  Server,
  Share2,
  FolderKanban,
  FileCheck,
  User,
  MapPin,
  HelpCircle,
} from "lucide-react";

interface ClientRequirementDetailModalProps {
  request: any | null;
  open: boolean;
  onClose: () => void;
  onStatusChange: (id: string, newStatus: string) => void;
  getStatusBadge: (status: string) => React.ReactNode;
}

export function ClientRequirementDetailModal({
  request,
  open,
  onClose,
  onStatusChange,
  getStatusBadge,
}: ClientRequirementDetailModalProps) {
  const [copiedRef, setCopiedRef] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  if (!request) return null;

  // Extract all fields with comprehensive fallbacks for legacy/new schemas
  const referenceId = request.reference_id || `WR-${request._id?.slice(-8).toUpperCase()}`;
  const clientName = request.client_name || request.name || "Client";
  const contactPerson = request.contact_person || request.name || "";
  const email = request.email || "";
  const phone = request.phone || "";
  const whatsapp = request.whatsapp || request.phone || "";
  const address = request.address || "";

  const businessName = request.business_name || request.name || "";
  const businessType = request.business_type || "Startup";
  const yearsInBusiness = request.years_in_business || "";
  const websiteSocial = request.website_social || "";
  const projectTitle = request.project_title || request.serviceType || "Custom Website Project";
  const purpose = request.purpose_of_website || "Brand Awareness";
  const description =
    request.business_description ||
    request.description ||
    "No additional detailed requirements provided.";

  const websiteTypes: string[] = Array.isArray(request.website_type)
    ? request.website_type
    : request.serviceType
    ? [request.serviceType]
    : ["Business Website"];

  const websiteTypeOther = request.website_type_other || "";
  const features: string[] = Array.isArray(request.features) ? request.features : [];
  const otherFeatures = request.other_features || "";
  const referenceLinks = request.reference_links || "";

  const designPreference = request.design_preference || "Standard Consultation";
  const colorPreference = request.color_preference || "";
  const hasLogo = request.has_logo || "No";
  const willProvideContent = request.will_provide_content || "Yes, I will provide";
  const contentProvider = request.content_provider || "Client";
  const pagesRequired = request.pages_required || "";

  const budget = request.budget_range || request.budget || "₹25,000 - ₹50,000";
  const startDate = request.start_date || "";
  const expectedDeadline = request.expected_deadline || request.timeline || "Flexible";
  const fixedDeadline = request.fixed_deadline || "No";
  const fixedDeadlineDetails = request.fixed_deadline_details || "";

  const hasDomain = request.has_domain || "No";
  const hasHosting = request.has_hosting || "No";
  const needHostingHelp = request.need_domain_hosting_help || "No";
  const additionalNotes = request.additional_notes || "";

  const authorizationDate = request.authorization_date || "";
  const termsAccepted = request.terms_and_conditions !== false;
  const signature = request.client_signature || "";

  // Clean phone numbers for tel: and wa.me
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const cleanWhatsApp = whatsapp.replace(/[^0-9]/g, "") || cleanPhone;

  const whatsappMessage = encodeURIComponent(
    `Hello ${contactPerson || clientName}, this is Bhargava Sri Ram regarding your website inquiry for "${projectTitle}" (Ref: ${referenceId}). Let's discuss your project scope!`
  );

  const handleCopyRef = () => {
    navigator.clipboard.writeText(referenceId);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleCopySummary = () => {
    const summaryText = `
=== CLIENT REQUIREMENT SUMMARY ===
Reference ID: ${referenceId}
Status: ${request.status}
Date: ${new Date(request.createdAt).toLocaleString()}

CLIENT DETAILS:
- Client / Org: ${clientName}
- Contact Person: ${contactPerson}
- Email: ${email}
- Phone: ${phone}
- WhatsApp: ${whatsapp}
- Address: ${address || "N/A"}

BUSINESS DETAILS:
- Business Name: ${businessName}
- Type: ${businessType}
- Years in Business: ${yearsInBusiness || "N/A"}
- Existing Web/Social: ${websiteSocial || "N/A"}

PROJECT SPECIFICATIONS:
- Project Title: ${projectTitle}
- Purpose: ${purpose}
- Website Type: ${websiteTypes.join(", ")} ${websiteTypeOther ? `(${websiteTypeOther})` : ""}
- Budget: ${budget}
- Timeline: ${startDate ? `Start: ${startDate} | ` : ""}Deadline: ${expectedDeadline} ${fixedDeadline === "Yes" ? `(Fixed: ${fixedDeadlineDetails})` : ""}
- Description: ${description}

SCOPE & FEATURES:
- Features: ${features.length > 0 ? features.join(", ") : "Standard Core Pages"}
- Other Features: ${otherFeatures || "None"}
- Reference Links: ${referenceLinks || "None"}

DESIGN & CONTENT:
- Design Preference: ${designPreference}
- Color Preference: ${colorPreference || "N/A"}
- Has Logo: ${hasLogo}
- Content Provider: ${contentProvider} (${willProvideContent})
- Pages Required: ${pagesRequired || "Standard"}

INFRASTRUCTURE:
- Has Domain: ${hasDomain}
- Has Hosting: ${hasHosting}
- Needs Help: ${needHostingHelp}
- Additional Notes: ${additionalNotes || "None"}

AUTHORIZATION:
- Date: ${authorizationDate}
- Terms Accepted: ${termsAccepted ? "Yes" : "No"}
- Signature: ${signature ? (signature.startsWith("data:image/") ? "[Image Signature Provided]" : signature) : "Pending"}
`.trim();

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[96vw] sm:max-w-3xl md:max-w-4xl lg:max-w-5xl max-h-[92vh] overflow-y-auto overflow-x-hidden bg-background/95 backdrop-blur-2xl border-emerald-500/30 p-5 sm:p-7 rounded-3xl shadow-[0_20px_70px_rgba(16,185,129,0.18)]">
        {/* ── Dialog Header with Reference & Quick Actions ──────────── */}
        <DialogHeader className="space-y-3 pb-4 border-b border-border/70">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <FileText className="w-5 h-5" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    {referenceId}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyRef}
                    className="text-[11px] text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
                    title="Copy Reference ID"
                  >
                    {copiedRef ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-500" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Copy Ref
                      </>
                    )}
                  </button>
                </div>
                <DialogTitle className="text-xl sm:text-2xl font-black text-foreground mt-0.5">
                  {projectTitle}
                </DialogTitle>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {getStatusBadge(request.status)}
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopySummary}
                className="h-8 text-xs font-semibold rounded-full border-border gap-1.5 hover:bg-emerald-500/10 hover:text-emerald-500 transition-all"
              >
                {copiedSummary ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" /> Summary Copied!
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" /> Export Summary
                  </>
                )}
              </Button>
            </div>
          </div>

          <DialogDescription className="text-xs text-muted-foreground flex flex-wrap items-center gap-2">
            <span>Submitted on {new Date(request.createdAt).toLocaleString(undefined, { dateStyle: "full", timeStyle: "medium" })}</span>
            {request.package_preselected && (
              <>
                <span>•</span>
                <span className="text-emerald-500 font-semibold inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Preselected Package: {request.package_preselected}
                </span>
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-3 text-xs sm:text-sm">
          {/* ── Key Metrics Ribbon ────────────────────────────────────── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl border border-border/80 bg-card/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-emerald-500" /> Budget Range
              </span>
              <p className="text-sm sm:text-base font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 truncate font-mono">
                {budget}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl border border-border/80 bg-card/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-500" /> Delivery Deadline
              </span>
              <p className="text-sm sm:text-base font-extrabold text-foreground mt-1 truncate">
                {expectedDeadline}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl border border-border/80 bg-card/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-500" /> Primary Type
              </span>
              <p className="text-sm sm:text-base font-extrabold text-foreground mt-1 truncate">
                {websiteTypes[0] || "Custom Web"}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl border border-border/80 bg-card/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-emerald-500" /> Business Type
              </span>
              <p className="text-sm sm:text-base font-extrabold text-foreground mt-1 truncate">
                {businessType}
              </p>
            </div>
          </div>

          {/* ── Section 1: Client & Organization Contact ──────────────── */}
          <div className="rounded-2xl border border-border/80 bg-card/40 p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border/60">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-500" /> Client &amp; Organization Identity
              </h4>
              <div className="flex items-center gap-2">
                {cleanPhone && (
                  <a
                    href={`tel:${cleanPhone}`}
                    className="p-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                    title="Direct Phone Call"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call
                  </a>
                )}
                {cleanWhatsApp && (
                  <a
                    href={`https://wa.me/${cleanWhatsApp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold inline-flex items-center gap-1 transition-colors"
                    title="Open WhatsApp Chat"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <span className="text-[11px] font-semibold text-muted-foreground block">Client / Organization</span>
                <p className="font-bold text-foreground mt-0.5">{clientName}</p>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-muted-foreground block">Contact Person</span>
                <p className="font-semibold text-foreground mt-0.5">{contactPerson || "—"}</p>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-muted-foreground block">Email Address</span>
                <a
                  href={`mailto:${email}`}
                  className="font-medium text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 mt-0.5"
                >
                  <Mail className="w-3.5 h-3.5" /> {email}
                </a>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-muted-foreground block">Phone Number</span>
                <a href={`tel:${cleanPhone}`} className="font-mono font-medium text-foreground hover:underline mt-0.5 block">
                  {phone || "—"}
                </a>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-muted-foreground block">WhatsApp Number</span>
                <p className="font-mono font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {whatsapp || phone || "—"}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-muted-foreground block">Business Location / Address</span>
                <p className="text-muted-foreground mt-0.5 truncate flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" /> {address || "Remote / Online"}
                </p>
              </div>
            </div>
          </div>

          {/* ── Section 2: Business & Project Scope ───────────────────── */}
          <div className="rounded-2xl border border-border/80 bg-card/40 p-4 sm:p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2 pb-2 border-b border-border/60">
              <FolderKanban className="w-4 h-4 text-emerald-500" /> Business Specs &amp; Project Requirements
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <span className="text-[11px] font-semibold text-muted-foreground block">Registered Business Name</span>
                <p className="font-bold text-foreground mt-0.5">{businessName}</p>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-muted-foreground block">Website Purpose</span>
                <p className="font-medium text-foreground mt-0.5">{purpose}</p>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-muted-foreground block">Years Active in Business</span>
                <p className="font-medium text-foreground mt-0.5">{yearsInBusiness || "New Venture"}</p>
              </div>
            </div>

            {websiteSocial && (
              <div>
                <span className="text-[11px] font-semibold text-muted-foreground block">Existing Website / Social Media</span>
                <a
                  href={websiteSocial.startsWith("http") ? websiteSocial : `https://${websiteSocial}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-primary hover:underline inline-flex items-center gap-1 mt-0.5"
                >
                  <Globe className="w-3.5 h-3.5" /> {websiteSocial} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {/* Detailed Description */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-muted-foreground block mb-1">
                Detailed Business &amp; Project Description
              </span>
              <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/20 text-foreground whitespace-pre-wrap leading-relaxed font-sans text-xs sm:text-sm">
                {description}
              </div>
            </div>
          </div>

          {/* ── Section 3: Website Types & Feature Scope ─────────────── */}
          <div className="rounded-2xl border border-border/80 bg-card/40 p-4 sm:p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2 pb-2 border-b border-border/60">
              <Sparkles className="w-4 h-4 text-emerald-500" /> Website Types &amp; Selected Feature Scope
            </h4>

            {/* Website Type Badges */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-muted-foreground block">Website Architecture Type:</span>
              <div className="flex flex-wrap gap-2">
                {websiteTypes.map((type, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-bold text-xs"
                  >
                    {type}
                  </span>
                ))}
                {websiteTypeOther && (
                  <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold text-xs">
                    Other: {websiteTypeOther}
                  </span>
                )}
              </div>
            </div>

            {/* 18 Features Grid */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[11px] font-semibold text-muted-foreground block">
                Selected Features &amp; Modules ({features.length}):
              </span>
              {features.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-card border border-border/90 text-foreground font-medium text-xs inline-flex items-center gap-1.5 shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      {feature}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground italic">Standard informational web scope selected.</p>
              )}
            </div>

            {otherFeatures && (
              <div className="pt-2">
                <span className="text-[11px] font-semibold text-muted-foreground block">Additional Custom Features Requested:</span>
                <p className="font-medium text-foreground text-xs mt-0.5 p-2.5 rounded-lg bg-muted/40 border border-border/60">
                  {otherFeatures}
                </p>
              </div>
            )}

            {referenceLinks && (
              <div className="pt-1">
                <span className="text-[11px] font-semibold text-muted-foreground block">Inspiration / Competitor Reference Websites:</span>
                <p className="font-mono text-xs text-primary mt-0.5 break-all p-2.5 rounded-lg bg-muted/40 border border-border/60">
                  {referenceLinks}
                </p>
              </div>
            )}
          </div>

          {/* ── Section 4: Design, Content & Infrastructure ──────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Design & Content */}
            <div className="rounded-2xl border border-border/80 bg-card/40 p-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2 pb-2 border-b border-border/60">
                <PenTool className="w-4 h-4 text-emerald-500" /> Design &amp; Content Readiness
              </h4>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-muted-foreground block">Design Preference:</span>
                  <span className="font-semibold text-foreground">{designPreference}</span>
                </div>
                {colorPreference && (
                  <div>
                    <span className="text-muted-foreground block">Color / Aesthetic Preference:</span>
                    <span className="font-semibold text-foreground">{colorPreference}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Logo Available:</span>
                  <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${hasLogo === "Yes" ? "bg-emerald-500/20 text-emerald-500" : "bg-muted text-muted-foreground"}`}>
                    {hasLogo}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Content Provider:</span>
                  <span className="font-semibold text-foreground">{contentProvider}</span>
                </div>
                {pagesRequired && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Pages Needed:</span>
                    <span className="font-semibold text-foreground">{pagesRequired}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Infrastructure & Dates */}
            <div className="rounded-2xl border border-border/80 bg-card/40 p-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2 pb-2 border-b border-border/60">
                <Server className="w-4 h-4 text-emerald-500" /> Timeline &amp; Hosting Setup
              </h4>
              <div className="space-y-2 text-xs">
                {startDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Expected Start Date:</span>
                    <span className="font-semibold text-foreground">{startDate}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Expected Deadline:</span>
                  <span className="font-semibold text-foreground">{expectedDeadline}</span>
                </div>
                {fixedDeadline === "Yes" && (
                  <div>
                    <span className="text-muted-foreground block">Strict Fixed Deadline:</span>
                    <span className="font-semibold text-amber-500">{fixedDeadlineDetails || "Yes (Hard Deadline)"}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Domain Status:</span>
                  <span className="font-medium text-foreground">{hasDomain === "Yes" ? "Already Owned" : "Not Owned"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Hosting Status:</span>
                  <span className="font-medium text-foreground">{hasHosting === "Yes" ? "Already Configured" : "Needs Provisioning"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Needs Domain/Hosting Assistance:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{needHostingHelp}</span>
                </div>
              </div>
            </div>
          </div>

          {additionalNotes && (
            <div className="p-4 rounded-2xl border border-border/80 bg-card/40 space-y-1">
              <span className="text-[11px] font-semibold text-muted-foreground block">Special Instructions / Additional Notes:</span>
              <p className="text-foreground text-xs leading-relaxed">{additionalNotes}</p>
            </div>
          )}

          {/* ── Section 5: Authorization & Verified Signature ────────── */}
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/20 p-4 sm:p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 flex items-center gap-2 pb-2 border-b border-emerald-500/20">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Legal Authorization &amp; Client Signature
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Authorization Date:</span>
                  <span className="font-semibold text-foreground">{authorizationDate || "Verified on Submit"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Terms &amp; Conditions Accepted:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Accepted &amp; Authorized
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Data Accuracy Confirmed:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed by Client
                  </span>
                </div>
              </div>

              {/* Signature Preview */}
              <div>
                <span className="text-[11px] font-semibold text-muted-foreground block mb-1">
                  Recorded Signature / Digital Authorization:
                </span>
                {signature ? (
                  signature.startsWith("data:image/") ? (
                    <div className="p-3 rounded-xl border border-border/80 bg-white dark:bg-neutral-900 inline-block shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={signature}
                        alt="Client Signature"
                        className="max-h-16 object-contain"
                      />
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 text-xs font-mono font-semibold flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{signature}</span>
                    </div>
                  )
                ) : (
                  <p className="text-xs text-muted-foreground italic p-2.5 rounded-lg border border-border/60 bg-card">
                    Signed via electronic timestamp authorization.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ── Section 6: Workflow Status Change Controls ───────────── */}
          <div className="pt-4 border-t border-border/80 space-y-2.5">
            <span className="text-xs font-bold text-foreground uppercase tracking-wider block">
              Update Request Workflow Status:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: "New", color: "hover:border-blue-500" },
                { label: "In Touch", color: "hover:border-amber-500" },
                { label: "Accepted", color: "hover:border-emerald-500" },
                { label: "In Progress", color: "hover:border-teal-500" },
                { label: "Completed", color: "hover:border-green-500" },
                { label: "Archived", color: "hover:border-zinc-500" },
              ].map(({ label }) => {
                const isCurrent =
                  request.status?.toLowerCase() === label.toLowerCase() ||
                  (request.status === "pending" && label === "New");

                return (
                  <Button
                    key={label}
                    type="button"
                    variant={isCurrent ? "default" : "outline"}
                    size="sm"
                    onClick={() => onStatusChange(request._id, label)}
                    className={`text-xs font-bold rounded-full transition-all ${
                      isCurrent
                        ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30"
                        : "border-border/80 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isCurrent && <Check className="w-3.5 h-3.5 mr-1" />}
                    {label}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
