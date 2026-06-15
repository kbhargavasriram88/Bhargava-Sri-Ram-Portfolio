"use server";

import dbConnect from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

export async function submitContactForm(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    await dbConnect();

    // 1. Save to Database
    const newMessage = await ContactMessage.create(data);

    // 2. Send Email via Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: process.env.ADMIN_EMAIL || "admin@example.com",
        subject: `New Contact: ${data.subject}`,
        text: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
      });
    }

    return { success: true, messageId: newMessage._id.toString() };
  } catch (error: any) {
    console.error("Contact Form Error:", error);
    return { success: false, error: "Failed to submit message." };
  }
}
