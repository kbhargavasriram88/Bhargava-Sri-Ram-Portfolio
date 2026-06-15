"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

export async function getTestimonials() {
  await dbConnect();
  const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 });
  return JSON.parse(JSON.stringify(testimonials));
}

export async function createTestimonial(data: any) {
  await dbConnect();
  await Testimonial.create(data);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}

export async function updateTestimonial(id: string, data: any) {
  await dbConnect();
  await Testimonial.findByIdAndUpdate(id, data);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}

export async function deleteTestimonial(id: string) {
  await dbConnect();
  await Testimonial.findByIdAndDelete(id);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}
