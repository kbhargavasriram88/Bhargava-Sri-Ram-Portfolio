import * as z from "zod";

// Helper regex for basic phone validation (allowing digits, spaces, dashes, parentheses, +)
const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,20}$/;

// ── Step 01: Client Information ────────────────────────────────────────
export const step1ClientInfoSchema = z.object({
  client_name: z
    .string()
    .trim()
    .min(2, "Please enter your full name or organization name."),
  contact_person: z
    .string()
    .trim()
    .min(2, "Please enter the contact person's name."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .refine((val) => phoneRegex.test(val), {
      message: "Please enter a valid phone format (e.g., +91 8332924488).",
    }),
  whatsapp: z.string().trim().optional().or(z.literal("")),
  address: z.string().trim().optional().or(z.literal("")),
});

// ── Step 02: Business & Project Information ─────────────────────────────
export const step2BusinessSpecsSchema = z.object({
  business_type: z.string().min(1, "Please select your business type."),
  business_name: z
    .string()
    .trim()
    .min(2, "Please enter your business or organization name."),
  website_social: z.string().trim().optional().or(z.literal("")),
  years_in_business: z.string().trim().optional().or(z.literal("")),
  project_title: z
    .string()
    .trim()
    .min(2, "Please enter a project title or website name."),
  purpose_of_website: z.string().min(1, "Please select the main purpose of your website."),
  business_description: z
    .string()
    .trim()
    .min(10, "Please describe your business/goals (at least 10 characters).")
    .max(2500, "Description cannot exceed 2500 characters."),
});

// ── Step 03: Features & Scope ──────────────────────────────────────────
export const step3FeaturesScopeSchema = z
  .object({
    website_type: z
      .array(z.string())
      .min(1, "Please select at least one website type."),
    website_type_other: z.string().trim().optional().or(z.literal("")),
    reference_links: z.string().trim().optional().or(z.literal("")),
    features: z.array(z.string()).default([]),
    other_features: z.string().trim().optional().or(z.literal("")),
    design_preference: z.string().min(1, "Please select a design preference."),
    color_preference: z.string().trim().optional().or(z.literal("")),
    has_logo: z.enum(["Yes", "No"]).default("No"),
    will_provide_content: z
      .enum(["Yes, I will provide", "No, I need content support"])
      .default("Yes, I will provide"),
    content_provider: z
      .enum(["Client", "Our Team (Additional Charges)", "Partial (Client + Our Team)"])
      .default("Client"),
    pages_required: z.string().trim().optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.website_type.includes("Other")) {
        return Boolean(data.website_type_other && data.website_type_other.trim().length > 0);
      }
      return true;
    },
    {
      message: "Please specify the other website type.",
      path: ["website_type_other"],
    }
  );

// ── Step 04: Timeline & Budget ─────────────────────────────────────────
export const step4TimelineBudgetSchema = z
  .object({
    start_date: z.string().min(1, "Please specify an expected start date."),
    expected_deadline: z.string().min(1, "Please specify an expected deadline."),
    fixed_deadline: z.enum(["Yes", "No"]).default("No"),
    fixed_deadline_details: z.string().trim().optional().or(z.literal("")),
    budget_range: z.string().min(1, "Please select an estimated budget range."),
    has_domain: z.enum(["Yes", "No"]).default("No"),
    has_hosting: z.enum(["Yes", "No"]).default("No"),
    need_domain_hosting_help: z.enum(["Yes", "No"]).default("No"),
    additional_notes: z.string().trim().optional().or(z.literal("")),
    chk_correct: z.boolean().refine((val) => val === true, {
      message: "You must confirm that the provided information is correct.",
    }),
    chk_non_final: z.boolean().refine((val) => val === true, {
      message: "You must acknowledge that this form is an initial requirement inquiry.",
    }),
    chk_terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the Terms & Conditions.",
    }),
    chk_updates: z.boolean().default(true),
  })
  .refine(
    (data) => {
      if (data.start_date && data.expected_deadline) {
        return new Date(data.expected_deadline) >= new Date(data.start_date);
      }
      return true;
    },
    {
      message: "Expected deadline cannot be earlier than the project start date.",
      path: ["expected_deadline"],
    }
  )
  .refine(
    (data) => {
      if (data.fixed_deadline === "Yes") {
        return Boolean(data.fixed_deadline_details && data.fixed_deadline_details.trim().length > 0);
      }
      return true;
    },
    {
      message: "Please specify why or what the fixed deadline is.",
      path: ["fixed_deadline_details"],
    }
  );

// ── Step 05: Authorization ─────────────────────────────────────────────
export const step5AuthorizationSchema = z.object({
  authorization_date: z.string().min(1, "Please specify the authorization date."),
  terms_and_conditions: z.boolean().refine((val) => val === true, {
    message: "You must accept the Terms & Conditions to submit.",
  }),
  client_signature: z.string().optional().or(z.literal("")),
  bot_field: z.string().optional().or(z.literal("")),
});

// ── Full Canonical Submission Schema ───────────────────────────────────
export const fullWebsiteRequestSchema = z
  .object({
    // Step 01
    client_name: z.string().trim().min(2, "Please enter your full name or organization name."),
    contact_person: z.string().trim().min(2, "Please enter the contact person's name."),
    email: z.string().trim().email("Please enter a valid email address."),
    phone: z.string().trim().min(7, "Please enter a valid phone number."),
    whatsapp: z.string().trim().optional().or(z.literal("")),
    address: z.string().trim().optional().or(z.literal("")),

    // Step 02
    business_type: z.string().min(1, "Please select your business type."),
    business_name: z.string().trim().min(2, "Please enter your business or organization name."),
    website_social: z.string().trim().optional().or(z.literal("")),
    years_in_business: z.string().trim().optional().or(z.literal("")),
    project_title: z.string().trim().min(2, "Please enter a project title or website name."),
    purpose_of_website: z.string().min(1, "Please select the main purpose of your website."),
    business_description: z.string().trim().min(10, "Please describe your business/goals."),

    // Step 03
    website_type: z.array(z.string()).min(1, "Please select at least one website type."),
    website_type_other: z.string().trim().optional().or(z.literal("")),
    reference_links: z.string().trim().optional().or(z.literal("")),
    features: z.array(z.string()).default([]),
    other_features: z.string().trim().optional().or(z.literal("")),
    design_preference: z.string().min(1, "Please select a design preference."),
    color_preference: z.string().trim().optional().or(z.literal("")),
    has_logo: z.enum(["Yes", "No"]).default("No"),
    will_provide_content: z.enum(["Yes, I will provide", "No, I need content support"]).default("Yes, I will provide"),
    content_provider: z.enum(["Client", "Our Team (Additional Charges)", "Partial (Client + Our Team)"]).default("Client"),
    pages_required: z.string().trim().optional().or(z.literal("")),

    // Step 04
    start_date: z.string().min(1, "Please specify an expected start date."),
    expected_deadline: z.string().min(1, "Please specify an expected deadline."),
    fixed_deadline: z.enum(["Yes", "No"]).default("No"),
    fixed_deadline_details: z.string().trim().optional().or(z.literal("")),
    budget_range: z.string().min(1, "Please select an estimated budget range."),
    has_domain: z.enum(["Yes", "No"]).default("No"),
    has_hosting: z.enum(["Yes", "No"]).default("No"),
    need_domain_hosting_help: z.enum(["Yes", "No"]).default("No"),
    additional_notes: z.string().trim().optional().or(z.literal("")),
    chk_correct: z.boolean().refine((val) => val === true, "Must confirm accuracy of information."),
    chk_non_final: z.boolean().refine((val) => val === true, "Must acknowledge non-final agreement."),
    chk_terms: z.boolean().refine((val) => val === true, "Must agree to Terms & Conditions."),
    chk_updates: z.boolean().default(true),

    // Step 05
    authorization_date: z.string().min(1, "Please confirm the authorization date."),
    terms_and_conditions: z.boolean().refine((val) => val === true, "Must accept terms and conditions."),
    client_signature: z.string().optional().or(z.literal("")),
    bot_field: z.string().optional().or(z.literal("")),
    package_preselected: z.string().optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.website_type.includes("Other")) {
        return Boolean(data.website_type_other && data.website_type_other.trim().length > 0);
      }
      return true;
    },
    {
      message: "Please specify the other website type.",
      path: ["website_type_other"],
    }
  )
  .refine(
    (data) => {
      if (data.start_date && data.expected_deadline) {
        return new Date(data.expected_deadline) >= new Date(data.start_date);
      }
      return true;
    },
    {
      message: "Expected deadline cannot be earlier than the project start date.",
      path: ["expected_deadline"],
    }
  );

export type WebsiteRequestFormData = z.infer<typeof fullWebsiteRequestSchema>;
