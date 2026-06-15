"use server";

import dbConnect from "@/lib/mongodb";
import Service from "@/models/Service";
import { revalidatePath } from "next/cache";

export async function getServices() {
  await dbConnect();
  const services = await Service.find().lean();
  return JSON.parse(JSON.stringify(services));
}

export async function createService(data: any) {
  await dbConnect();
  await Service.create(data);
  revalidatePath("/admin/services");
  revalidatePath("/#services");
  return { success: true };
}

export async function updateService(id: string, data: any) {
  await dbConnect();
  await Service.findByIdAndUpdate(id, data);
  revalidatePath("/admin/services");
  revalidatePath("/#services");
  return { success: true };
}

export async function deleteService(id: string) {
  await dbConnect();
  await Service.findByIdAndDelete(id);
  revalidatePath("/admin/services");
  revalidatePath("/#services");
  return { success: true };
}
