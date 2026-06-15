"use server";

import dbConnect from "@/lib/mongodb";
import Certificate from "@/models/Certificate";
import { revalidatePath } from "next/cache";

export async function getCertificates() {
  await dbConnect();
  const certs = await Certificate.find().sort({ issueDate: -1 }).lean();
  return JSON.parse(JSON.stringify(certs));
}

export async function createCertificate(data: any) {
  await dbConnect();
  await Certificate.create(data);
  revalidatePath("/admin/certificates");
  revalidatePath("/#certifications");
  return { success: true };
}

export async function updateCertificate(id: string, data: any) {
  await dbConnect();
  await Certificate.findByIdAndUpdate(id, data);
  revalidatePath("/admin/certificates");
  revalidatePath("/#certifications");
  return { success: true };
}

export async function deleteCertificate(id: string) {
  await dbConnect();
  await Certificate.findByIdAndDelete(id);
  revalidatePath("/admin/certificates");
  revalidatePath("/#certifications");
  return { success: true };
}
