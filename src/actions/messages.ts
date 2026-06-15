"use server";

import dbConnect from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";
import { revalidatePath } from "next/cache";

export async function getMessages() {
  await dbConnect();
  const messages = await ContactMessage.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(messages));
}

export async function markMessageRead(id: string) {
  await dbConnect();
  await ContactMessage.findByIdAndUpdate(id, { read: true });
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteMessage(id: string) {
  await dbConnect();
  await ContactMessage.findByIdAndDelete(id);
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
  return { success: true };
}
