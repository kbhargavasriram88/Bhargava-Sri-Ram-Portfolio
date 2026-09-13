import mongoose, { Schema, Document } from "mongoose";

export interface IWebsiteRequest extends Document {
  // Legacy / Compatibility fields
  name?: string;
  serviceType?: string;
  budget?: string;
  timeline?: string;
  description?: string;

  // Step 01: Client Information
  client_name: string;
  contact_person: string;
  email: string;
  phone: string;
  whatsapp?: string;
  address?: string;

  // Step 02: Business Information
  business_type: string;
  business_name: string;
  website_social?: string;
  years_in_business?: string;

  // Step 03: Project Information
  project_title: string;
  purpose_of_website: string;
  business_description: string;

  // Step 04: Website Requirements
  website_type: string[];
  website_type_other?: string;
  reference_links?: string;

  // Step 05: Features & Functionality
  features?: string[];
  other_features?: string;

  // Step 06: Design Preference
  design_preference: string;
  color_preference?: string;
  has_logo?: string;
  will_provide_content?: string;

  // Step 07: Content Requirement
  content_provider?: string;
  pages_required?: string;

  // Step 08: Timeline & Deadline
  start_date: string;
  expected_deadline: string;
  fixed_deadline?: string;
  fixed_deadline_details?: string;

  // Step 09: Budget & Infrastructure
  budget_range: string;
  has_domain?: string;
  has_hosting?: string;
  need_domain_hosting_help?: string;

  // Step 10: Additional Notes & Checklist
  additional_notes?: string;
  chk_correct: boolean;
  chk_non_final: boolean;
  chk_terms: boolean;
  chk_updates?: boolean;

  // Step 11: Authorization & Submission
  authorization_date: string;
  terms_and_conditions: boolean;
  client_signature?: string;
  reference_id?: string;
  package_preselected?: string;

  status:
    | "pending"
    | "reviewing"
    | "contacted"
    | "approved"
    | "in-progress"
    | "completed"
    | "rejected"
    | "New"
    | "In Touch"
    | "Accepted"
    | "Archived";
  createdAt: Date;
  updatedAt: Date;
}

const WebsiteRequestSchema: Schema = new Schema(
  {
    // Legacy / Compatibility fields
    name: { type: String },
    serviceType: { type: String },
    budget: { type: String },
    timeline: { type: String },
    description: { type: String },

    // Step 01: Client Information
    client_name: { type: String, required: true },
    contact_person: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    whatsapp: { type: String, default: "" },
    address: { type: String, default: "" },

    // Step 02: Business Information
    business_type: { type: String, required: true, default: "Startup" },
    business_name: { type: String, required: true },
    website_social: { type: String, default: "" },
    years_in_business: { type: String, default: "" },

    // Step 03: Project Information
    project_title: { type: String, required: true },
    purpose_of_website: { type: String, required: true, default: "Brand Awareness" },
    business_description: { type: String, required: true },

    // Step 04: Website Requirements
    website_type: { type: [String], default: ["Business Website"] },
    website_type_other: { type: String, default: "" },
    reference_links: { type: String, default: "" },

    // Step 05: Features & Functionality
    features: { type: [String], default: [] },
    other_features: { type: String, default: "" },

    // Step 06: Design Preference
    design_preference: { type: String, required: true, default: "No, I need suggestions from your team" },
    color_preference: { type: String, default: "" },
    has_logo: { type: String, default: "No" },
    will_provide_content: { type: String, default: "Yes, I will provide" },

    // Step 07: Content Requirement
    content_provider: { type: String, default: "Client" },
    pages_required: { type: String, default: "" },

    // Step 08: Timeline & Deadline
    start_date: { type: String, required: true },
    expected_deadline: { type: String, required: true },
    fixed_deadline: { type: String, default: "No" },
    fixed_deadline_details: { type: String, default: "" },

    // Step 09: Budget & Infrastructure
    budget_range: { type: String, required: true, default: "₹25,000 - ₹50,000" },
    has_domain: { type: String, default: "No" },
    has_hosting: { type: String, default: "No" },
    need_domain_hosting_help: { type: String, default: "No" },

    // Step 10: Additional Notes & Checklist
    additional_notes: { type: String, default: "" },
    chk_correct: { type: Boolean, default: true },
    chk_non_final: { type: Boolean, default: true },
    chk_terms: { type: Boolean, default: true },
    chk_updates: { type: Boolean, default: true },

    // Step 11: Authorization & Meta
    authorization_date: { type: String, required: true },
    terms_and_conditions: { type: Boolean, required: true, default: true },
    client_signature: { type: String, default: "" },
    reference_id: { type: String, index: true },
    package_preselected: { type: String, default: "" },

    status: {
      type: String,
      enum: [
        "pending",
        "reviewing",
        "contacted",
        "approved",
        "in-progress",
        "completed",
        "rejected",
        "New",
        "In Touch",
        "Accepted",
        "Archived",
      ],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Pre-save hook to populate legacy fields for backwards compatibility with FreelanceManager and admin views
WebsiteRequestSchema.pre("save", function () {
  const doc = this as any;
  if (!doc.name) {
    doc.name = doc.client_name || doc.contact_person || "Client";
  }
  if (!doc.serviceType) {
    doc.serviceType = Array.isArray(doc.website_type) && doc.website_type.length > 0
      ? doc.website_type.join(", ")
      : doc.project_title || "Custom Website";
  }
  if (!doc.budget) {
    doc.budget = doc.budget_range || "Custom Quote";
  }
  if (!doc.timeline) {
    doc.timeline = doc.expected_deadline || "1-2 Weeks";
  }
  if (!doc.description) {
    doc.description = doc.business_description || doc.project_title || "";
  }
});

export default mongoose.models.WebsiteRequest ||
  mongoose.model<IWebsiteRequest>("WebsiteRequest", WebsiteRequestSchema);
