"use server";

import dbConnect from "@/lib/mongodb";
import WebsiteRequest, { IWebsiteRequest } from "@/models/WebsiteRequest";
import { revalidatePath } from "next/cache";

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
    const newRequest = await WebsiteRequest.create(data);

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
