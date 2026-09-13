"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  step1ClientInfoSchema,
  step2BusinessSpecsSchema,
  step3FeaturesScopeSchema,
  step4TimelineBudgetSchema,
  step5AuthorizationSchema,
  fullWebsiteRequestSchema,
} from "@/lib/validation/website-request-schema";
import { submitFullWebsiteRequest } from "@/actions/websiteRequest";
import { ProgressStepper } from "./ProgressStepper";
import { StepClientInfo } from "./StepClientInfo";
import { StepBusinessSpecs } from "./StepBusinessSpecs";
import { StepFeaturesScope } from "./StepFeaturesScope";
import { StepTimelineBudget } from "./StepTimelineBudget";
import { StepAuthorization } from "./StepAuthorization";
import { TermsModal } from "./TermsModal";
import { SuccessState } from "./SuccessState";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Send,
  Loader2,
  AlertCircle,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface WebsiteRequestFormProps {
  initialPackage?: string;
}

export function WebsiteRequestForm({ initialPackage }: WebsiteRequestFormProps) {
  const formTopRef = useRef<HTMLDivElement>(null);

  // ── 1. Initial State Setup ──────────────────────────────────────────
  const getInitialStartDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const getInitialDeadline = () => {
    const d = new Date();
    d.setDate(d.getDate() + 14); // 2 weeks default
    return d.toISOString().split("T")[0];
  };

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState<string>("");
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  // Form Data State
  const [formData, setFormData] = useState({
    // Step 01
    client_name: "",
    contact_person: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: "",

    // Step 02 & 03
    business_type: "Startup",
    business_name: "",
    website_social: "",
    years_in_business: "",
    project_title: "",
    purpose_of_website: "Brand Awareness",
    business_description: "",

    // Step 04, 05, 06, 07
    website_type: ["Business Website"] as string[],
    website_type_other: "",
    reference_links: "",
    features: ["Home Page", "About Us", "Services / Products", "Contact Us"] as string[],
    other_features: "",
    design_preference: "No, I need suggestions from your team",
    color_preference: "",
    has_logo: "No" as "Yes" | "No",
    will_provide_content: "Yes, I will provide" as "Yes, I will provide" | "No, I need content support",
    content_provider: "Client" as "Client" | "Our Team (Additional Charges)" | "Partial (Client + Our Team)",
    pages_required: "",

    // Step 08, 09, 10
    start_date: getInitialStartDate(),
    expected_deadline: getInitialDeadline(),
    fixed_deadline: "No" as "Yes" | "No",
    fixed_deadline_details: "",
    budget_range: "₹25,000 - ₹50,000",
    has_domain: "No" as "Yes" | "No",
    has_hosting: "No" as "Yes" | "No",
    need_domain_hosting_help: "No" as "Yes" | "No",
    additional_notes: "",
    chk_correct: true,
    chk_non_final: true,
    chk_terms: true,
    chk_updates: true,

    // Step 05 / Authorization
    authorization_date: getInitialStartDate(),
    terms_and_conditions: true,
    client_signature: "",
    bot_field: "",
    package_preselected: initialPackage || "",
  });

  // ── 2. Handle Preselected Package from URL ───────────────────────────
  useEffect(() => {
    if (!initialPackage) return;
    const pkg = initialPackage.toLowerCase();

    if (pkg === "starter") {
      setFormData((prev) => ({
        ...prev,
        budget_range: "₹10,000 - ₹25,000",
        website_type: ["Landing Page"],
        project_title: prev.project_title || "Starter Website Package",
        package_preselected: "Starter Package",
      }));
    } else if (pkg === "business") {
      setFormData((prev) => ({
        ...prev,
        budget_range: "₹25,000 - ₹50,000",
        website_type: ["Business Website"],
        project_title: prev.project_title || "Business Website Package",
        package_preselected: "Business Package",
      }));
    } else if (pkg === "professional") {
      setFormData((prev) => ({
        ...prev,
        budget_range: "₹50,000 - ₹1,00,000",
        website_type: ["Web Application", "Business Website"],
        project_title: prev.project_title || "Professional Full-Stack Package",
        package_preselected: "Professional Package",
      }));
    } else if (pkg === "custom") {
      setFormData((prev) => ({
        ...prev,
        budget_range: "Custom Quote",
        project_title: prev.project_title || "Custom Enterprise Project",
        package_preselected: "Custom Package",
      }));
    }
  }, [initialPackage]);

  // ── 3. Field Change Handler ──────────────────────────────────────────
  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field-level error on change
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    setServerError("");
  };

  const scrollToTop = () => {
    if (formTopRef.current) {
      formTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

const getStepForField = (field: string): number => {
  const step1 = ["client_name", "contact_person", "email", "phone", "whatsapp", "address"];
  const step2 = ["business_type", "business_name", "website_social", "years_in_business", "project_title", "purpose_of_website", "business_description"];
  const step3 = ["website_type", "website_type_other", "reference_links", "features", "other_features", "design_preference", "color_preference", "has_logo", "will_provide_content", "content_provider", "pages_required"];
  const step4 = ["start_date", "expected_deadline", "fixed_deadline", "fixed_deadline_details", "budget_range", "has_domain", "has_hosting", "need_domain_hosting_help", "additional_notes", "chk_correct", "chk_non_final", "chk_terms", "chk_updates"];
  
  if (step1.includes(field)) return 1;
  if (step2.includes(field)) return 2;
  if (step3.includes(field)) return 3;
  if (step4.includes(field)) return 4;
  return 5;
};

  // ── 4. Step Validation Logic ─────────────────────────────────────────
  const validateStep = (stepNumber: number): boolean => {
    setErrors({});
    let schemaResult: any;

    if (stepNumber === 1) {
      schemaResult = step1ClientInfoSchema.safeParse(formData);
    } else if (stepNumber === 2) {
      schemaResult = step2BusinessSpecsSchema.safeParse(formData);
    } else if (stepNumber === 3) {
      schemaResult = step3FeaturesScopeSchema.safeParse(formData);
    } else if (stepNumber === 4) {
      schemaResult = step4TimelineBudgetSchema.safeParse(formData);
    } else if (stepNumber === 5) {
      schemaResult = step5AuthorizationSchema.safeParse(formData);
    }

    if (!schemaResult.success) {
      const issues: Record<string, string> = {};
      let firstInputId: string | null = null;
      let firstMsg = "";

      schemaResult.error.issues.forEach((issue: any) => {
        const pathKey = issue.path.join(".");
        if (!issues[pathKey]) {
          issues[pathKey] = issue.message;
          if (!firstInputId) {
            firstInputId = issue.path[0];
            firstMsg = issue.message;
          }
        }
      });

      setErrors(issues);
      setServerError(firstMsg || "Please check the highlighted required fields below.");

      // Autofocus first invalid input
      if (firstInputId) {
        setTimeout(() => {
          const el = document.getElementById(firstInputId!) || document.querySelector(`[name="${firstInputId}"]`);
          if (el && "focus" in el) {
            (el as HTMLElement).focus();
            (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 100);
      }

      return false;
    }

    return true;
  };

  // ── 5. Navigation Controls ───────────────────────────────────────────
  const handleNext = () => {
    const isValid = validateStep(currentStep);
    if (!isValid) return;

    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }

    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
      scrollToTop();
    }
  };

  const handlePrev = () => {
    setErrors({});
    setServerError("");
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      scrollToTop();
    }
  };

  const handleStepClick = (targetStep: number) => {
    // If moving backward, always allow
    if (targetStep < currentStep) {
      setErrors({});
      setServerError("");
      setCurrentStep(targetStep);
      scrollToTop();
      return;
    }
    // If moving forward, validate current step first
    const isValid = validateStep(currentStep);
    if (isValid) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps((prev) => [...prev, currentStep]);
      }
      setCurrentStep(targetStep);
      scrollToTop();
    }
  };

  // ── 6. Reset Form Handler ────────────────────────────────────────────
  const handleReset = () => {
    const isDirty = Boolean(
      formData.client_name ||
      formData.contact_person ||
      formData.email ||
      formData.project_title ||
      formData.business_description
    );

    if (isDirty) {
      const confirmReset = window.confirm(
        "Are you sure you want to reset the form? All entered information will be cleared."
      );
      if (!confirmReset) return;
    }

    setFormData({
      client_name: "",
      contact_person: "",
      email: "",
      phone: "",
      whatsapp: "",
      address: "",
      business_type: "Startup",
      business_name: "",
      website_social: "",
      years_in_business: "",
      project_title: "",
      purpose_of_website: "Brand Awareness",
      business_description: "",
      website_type: ["Business Website"],
      website_type_other: "",
      reference_links: "",
      features: ["Home Page", "About Us", "Services / Products", "Contact Us"],
      other_features: "",
      design_preference: "No, I need suggestions from your team",
      color_preference: "",
      has_logo: "No",
      will_provide_content: "Yes, I will provide",
      content_provider: "Client",
      pages_required: "",
      start_date: getInitialStartDate(),
      expected_deadline: getInitialDeadline(),
      fixed_deadline: "No",
      fixed_deadline_details: "",
      budget_range: "₹25,000 - ₹50,000",
      has_domain: "No",
      has_hosting: "No",
      need_domain_hosting_help: "No",
      additional_notes: "",
      chk_correct: true,
      chk_non_final: true,
      chk_terms: true,
      chk_updates: true,
      authorization_date: getInitialStartDate(),
      terms_and_conditions: true,
      client_signature: "",
      bot_field: "",
      package_preselected: initialPackage || "",
    });

    setErrors({});
    setServerError("");
    setCompletedSteps([]);
    setCurrentStep(1);
    setIsSubmitted(false);
    scrollToTop();
  };

  // ── 7. Final Form Submission ─────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    // 1. Validate Step 5
    const isStep5Valid = validateStep(5);
    if (!isStep5Valid) {
      return;
    }

    // 2. Validate full canonical schema across all steps
    const fullResult = fullWebsiteRequestSchema.safeParse(formData);
    if (!fullResult.success) {
      const issues: Record<string, string> = {};
      let firstErrorField = "";
      let firstErrorMessage = "";

      fullResult.error.issues.forEach((issue: any) => {
        const pathKey = issue.path.join(".");
        if (!issues[pathKey]) {
          issues[pathKey] = issue.message;
          if (!firstErrorField) {
            firstErrorField = pathKey;
            firstErrorMessage = issue.message;
          }
        }
      });

      setErrors(issues);

      // Identify which step contains the invalid field
      const targetStep = getStepForField(firstErrorField);
      const stepNames = [
        "Client Info",
        "Business & Specs",
        "Features & Scope",
        "Timeline & Budget",
        "Authorization",
      ];
      const stepName = stepNames[targetStep - 1] || "Form";

      setServerError(
        `Action needed on Step 0${targetStep} (${stepName}): ${firstErrorMessage}`
      );

      // Automatically switch to the step that needs attention
      if (targetStep !== currentStep) {
        setCurrentStep(targetStep);
      }

      // Smooth scroll to the invalid field and autofocus it
      setTimeout(() => {
        const el =
          document.getElementById(firstErrorField) ||
          document.querySelector(`[name="${firstErrorField}"]`);
        if (el && "focus" in el) {
          (el as HTMLElement).focus();
          (el as HTMLElement).scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        } else {
          scrollToTop();
        }
      }, 150);

      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitFullWebsiteRequest(formData);

      if (response.success) {
        setIsSubmitted(true);
        setReferenceId(response.referenceId || "WR-PROJ");
        setCompletedSteps([1, 2, 3, 4, 5]);
        scrollToTop();
      } else {
        setServerError(
          response.error || "Failed to submit requirement. Please check your data and try again."
        );
        if (response.fieldErrors) {
          setErrors(response.fieldErrors);
          const firstField = Object.keys(response.fieldErrors)[0];
          if (firstField) {
            const targetStep = getStepForField(firstField);
            if (targetStep !== currentStep) {
              setCurrentStep(targetStep);
            }
          }
        }
      }
    } catch (err: any) {
      setServerError("A network or server error occurred. Your entered data is safe, please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── 8. Success State Render ──────────────────────────────────────────
  if (isSubmitted) {
    return (
      <SuccessState
        referenceId={referenceId}
        clientName={formData.client_name || formData.contact_person}
        projectTitle={formData.project_title}
        onReset={handleReset}
      />
    );
  }

  return (
    <div ref={formTopRef} className="w-full max-w-5xl mx-auto space-y-6">
      {/* ── Package Preselected Notification (if active) ──────────── */}
      {formData.package_preselected && (
        <div className="flex items-center justify-between p-3 px-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-xs text-emerald-800 dark:text-emerald-200 animate-in fade-in-50">
          <div className="flex items-center gap-2 font-medium">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Preselected Package: <strong>{formData.package_preselected}</strong></span>
          </div>
          <span className="text-[11px] text-muted-foreground">Tailored parameters pre-filled</span>
        </div>
      )}

      {/* ── 5-Step Progress Stepper ───────────────────────────────── */}
      <ProgressStepper
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepClick={handleStepClick}
      />

      {/* ── Server Error Alert Banner ─────────────────────────────── */}
      {serverError && (
        <div className="p-4 rounded-2xl border border-destructive/40 bg-destructive/10 text-destructive text-sm flex items-center gap-3 animate-in shake">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="font-medium">{serverError}</p>
        </div>
      )}

      {/* ── Main Form Card ────────────────────────────────────────── */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="rounded-3xl border border-border/80 bg-card/85 backdrop-blur-2xl p-6 sm:p-10 shadow-xl transition-all">
          {/* Step 01: Client Info */}
          {currentStep === 1 && (
            <StepClientInfo
              formData={formData}
              onChange={handleFieldChange}
              errors={errors}
            />
          )}

          {/* Step 02: Business & Project Info */}
          {currentStep === 2 && (
            <StepBusinessSpecs
              formData={formData}
              onChange={handleFieldChange}
              errors={errors}
            />
          )}

          {/* Step 03: Features & Scope */}
          {currentStep === 3 && (
            <StepFeaturesScope
              formData={formData}
              onChange={handleFieldChange}
              errors={errors}
            />
          )}

          {/* Step 04: Timeline & Budget */}
          {currentStep === 4 && (
            <StepTimelineBudget
              formData={formData}
              onChange={handleFieldChange}
              errors={errors}
              onOpenTerms={() => setIsTermsOpen(true)}
            />
          )}

          {/* Step 05: Authorization */}
          {currentStep === 5 && (
            <StepAuthorization
              formData={formData}
              onChange={handleFieldChange}
              errors={errors}
              onOpenTerms={() => setIsTermsOpen(true)}
            />
          )}

          {/* Direct Error Banner right above action buttons for immediate visibility */}
          {serverError && (
            <div className="mt-8 p-4 rounded-2xl border border-destructive/40 bg-destructive/10 text-destructive text-sm flex items-center gap-3 animate-in shake">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-bold text-xs uppercase tracking-wider">Submission Alert</p>
                <p className="text-xs sm:text-sm font-medium">{serverError}</p>
              </div>
            </div>
          )}

          {/* ── Action Buttons Footer ───────────────────────────────── */}
          <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left Controls: Reset */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-xs text-muted-foreground hover:text-foreground h-9 px-3 rounded-full"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Reset Form
            </Button>

            {/* Right Controls: Previous & Next / Submit */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrev}
                  className="rounded-full px-5 h-11 border-border font-medium flex-1 sm:flex-initial"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                </Button>
              )}

              {currentStep < 5 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-7 h-11 shadow-md shadow-emerald-600/20 flex-1 sm:flex-initial"
                >
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 h-11 shadow-lg shadow-emerald-600/25 flex-1 sm:flex-initial"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting Request…
                    </>
                  ) : (
                    <>
                      Submit Requirement Form <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </form>

      {/* ── Terms & Conditions Modal ───────────────────────────────── */}
      <TermsModal open={isTermsOpen} onOpenChange={setIsTermsOpen} />
    </div>
  );
}
