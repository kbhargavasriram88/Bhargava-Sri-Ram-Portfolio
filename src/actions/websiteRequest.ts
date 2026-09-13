"use server";

import dbConnect from "@/lib/mongodb";
import WebsiteRequest from "@/models/WebsiteRequest";
import { fullWebsiteRequestSchema } from "@/lib/validation/website-request-schema";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

export async function submitFullWebsiteRequest(rawData: unknown) {
  try {
    // 1. Server-side Zod validation
    const parseResult = fullWebsiteRequestSchema.safeParse(rawData);
    if (!parseResult.success) {
      const fieldErrors: Record<string, string> = {};
      parseResult.error.issues.forEach((issue) => {
        const pathKey = issue.path.join(".");
        if (!fieldErrors[pathKey]) {
          fieldErrors[pathKey] = issue.message;
        }
      });
      return {
        success: false,
        error: "Validation failed. Please check the highlighted fields.",
        fieldErrors,
      };
    }

    const validData = parseResult.data;

    // 3. Generate human-readable unique Reference ID (e.g., WR-20260913-4821)
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `WR-${dateStr}-${randomSuffix}`;

    // 4. Connect to MongoDB and save
    await dbConnect();

    const newRequest = await WebsiteRequest.create({
      ...validData,
      reference_id: referenceId,
      status: "pending",
      // Populate legacy compatibility fields
      name: validData.client_name || validData.contact_person,
      serviceType: validData.website_type?.join(", ") || validData.project_title,
      budget: validData.budget_range,
      timeline: validData.expected_deadline,
      description: validData.business_description,
    });

    // 5. Send Email Alert via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const adminEmail = process.env.ADMIN_EMAIL || "k.bhargavasriram88@gmail.com";
        await resend.emails.send({
          from: "Website Requests <onboarding@resend.dev>",
          to: adminEmail,
          subject: `🚀 New Website Request: ${validData.project_title} [${referenceId}]`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #16a34a; border-radius: 12px; background-color: #f8faf8;">
              <h2 style="color: #166534; margin-top: 0;">🚀 New Project Requirement Received</h2>
              <p style="font-size: 14px; color: #475569;">A prospective client just submitted the full Website Request Form on your portfolio.</p>
              
              <div style="background: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #dce7df; margin: 15px 0;">
                <p><strong>Reference ID:</strong> <span style="color: #16a34a; font-weight: bold;">${referenceId}</span></p>
                <p><strong>Client / Org:</strong> ${validData.client_name} (${validData.contact_person})</p>
                <p><strong>Email:</strong> <a href="mailto:${validData.email}">${validData.email}</a></p>
                <p><strong>Phone:</strong> <a href="tel:${validData.phone}">${validData.phone}</a></p>
                ${validData.whatsapp ? `<p><strong>WhatsApp:</strong> ${validData.whatsapp}</p>` : ""}
                <p><strong>Business Type:</strong> ${validData.business_type} - ${validData.business_name}</p>
                <p><strong>Project Title:</strong> ${validData.project_title}</p>
                <p><strong>Website Type:</strong> ${validData.website_type.join(", ")}</p>
                <p><strong>Budget Range:</strong> ${validData.budget_range}</p>
                <p><strong>Timeline:</strong> ${validData.start_date} to ${validData.expected_deadline}</p>
              </div>

              <div style="background: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #dce7df; margin: 15px 0;">
                <h4 style="margin-top: 0; color: #0f172a;">Project Summary:</h4>
                <p style="color: #334155; line-height: 1.5;">${validData.business_description}</p>
              </div>

              <p style="font-size: 12px; color: #64748b;">You can review full specifications, manage statuses, and respond in your <a href="https://bhargava-portfolio.vercel.app/admin/requests" style="color: #16a34a;">Admin Panel</a>.</p>
            </div>
          `,
        });
      } catch (mailErr) {
        console.warn("Resend email dispatch error (non-blocking):", mailErr);
      }
    }

    revalidatePath("/admin/requests");
    revalidatePath("/admin/freelance");
    revalidatePath("/admin");

    return {
      success: true,
      referenceId,
      data: JSON.parse(JSON.stringify(newRequest)),
    };
  } catch (error: any) {
    console.error("Failed to submit full website request:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred while saving your request.",
    };
  }
}

// ── Legacy Modal Submission (Preserved for backward compatibility) ─────
export async function submitWebsiteRequest(data: {
  name: string;
  email: string;
  phone?: string;
  serviceType: string;
  budget: string;
  timeline: string;
  description: string;
}) {
  try {
    await dbConnect();
    const newRequest = await WebsiteRequest.create({
      ...data,
      client_name: data.name,
      contact_person: data.name,
      business_name: data.name,
      project_title: data.serviceType || "Custom Project",
      business_description: data.description,
      budget_range: data.budget,
      expected_deadline: data.timeline,
      start_date: new Date().toISOString().split("T")[0],
      authorization_date: new Date().toISOString().split("T")[0],
      status: "New",
    });

    revalidatePath("/admin/requests");
    revalidatePath("/admin");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newRequest)),
    };
  } catch (error: any) {
    console.error("Failed to submit website request:", error);
    return {
      success: false,
      error: error.message || "Failed to submit request.",
    };
  }
}

export async function getWebsiteRequests() {
  try {
    await dbConnect();
    const requests = await WebsiteRequest.find().sort({ createdAt: -1 }).lean();
    return {
      success: true,
      data: JSON.parse(JSON.stringify(requests)),
    };
  } catch (error: any) {
    console.error("Failed to fetch website requests:", error);
    return {
      success: false,
      data: [],
      error: error.message || "Failed to fetch website requests.",
    };
  }
}

export async function updateWebsiteRequestStatus(id: string, status: string) {
  try {
    await dbConnect();
    const updated = await WebsiteRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    revalidatePath("/admin/requests");
    revalidatePath("/admin/freelance");
    revalidatePath("/admin");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(updated)),
    };
  } catch (error: any) {
    console.error("Failed to update request status:", error);
    return {
      success: false,
      error: error.message || "Failed to update status.",
    };
  }
}

export async function deleteWebsiteRequest(id: string) {
  try {
    await dbConnect();
    await WebsiteRequest.findByIdAndDelete(id);

    revalidatePath("/admin/requests");
    revalidatePath("/admin/freelance");
    revalidatePath("/admin");

    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete website request:", error);
    return {
      success: false,
      error: error.message || "Failed to delete request.",
    };
  }
}
