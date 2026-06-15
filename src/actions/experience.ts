"use server";

import dbConnect from "@/lib/mongodb";
import Experience from "@/models/Experience";
import { revalidatePath } from "next/cache";

export async function getExperience() {
  await dbConnect();
  const exp = await Experience.find().sort({ startDate: -1 }).lean();
  return JSON.parse(JSON.stringify(exp));
}

export async function createExperience(data: any) {
  await dbConnect();
  await Experience.create(data);
  revalidatePath("/admin/experience");
  revalidatePath("/#experience");
  return { success: true };
}

export async function updateExperience(id: string, data: any) {
  await dbConnect();
  await Experience.findByIdAndUpdate(id, data);
  revalidatePath("/admin/experience");
  revalidatePath("/#experience");
  return { success: true };
}

export async function deleteExperience(id: string) {
  await dbConnect();
  await Experience.findByIdAndDelete(id);
  revalidatePath("/admin/experience");
  revalidatePath("/#experience");
  return { success: true };
}
