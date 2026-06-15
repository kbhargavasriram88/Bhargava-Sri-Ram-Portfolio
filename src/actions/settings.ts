"use server";

import dbConnect from "@/lib/mongodb";
import Settings, { ISettings } from "@/models/Settings";
import { revalidatePath } from "next/cache";

export async function getSettings() {
  try {
    await dbConnect();
    let settings = await Settings.findOne({});
    
    // If no settings exist yet, create a default document
    if (!settings) {
      settings = await Settings.create({
        hero: {
          heading: "BHARGAVA SRI RAM",
          subheading: "Full-Stack Developer & AI/ML Enthusiast",
          description: "Building scalable web applications and intelligent digital experiences.",
          resumeUrl: "#",
          profileImageUrl: "/placeholder-profile.svg",
          availableForHire: true
        },
        about: {
          journey: "Started coding out of curiosity, evolved into a passion. I specialize in full-stack development with a strong focus on modern JavaScript frameworks and scalable backend architectures. Always eager to explore AI/ML integrations.",
          careerGoals: "My objective is to build impactful products that solve real-world problems. I am looking forward to collaborating with innovative teams, acquiring new skills, and contributing to open-source communities.",
          education: [
            { title: "B.Tech CSE AI & ML", status: "Present" },
            { title: "Intermediate", status: "Completed" },
            { title: "SSC", status: "Completed" }
          ]
        },
        socialLinks: {
          github: "https://github.com/kbhargavasriram88",
          linkedin: "https://linkedin.com",
          email: "hello@example.com",
          whatsapp: ""
        }
      });
    }

    return { success: true, data: JSON.parse(JSON.stringify(settings)) };
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return { success: false, error: "Failed to fetch settings" };
  }
}

export async function updateSettings(data: Partial<ISettings>) {
  try {
    await dbConnect();
    const settings = await Settings.findOne({});
    
    if (!settings) {
      return { success: false, error: "Settings not found" };
    }

    const updated = await Settings.findByIdAndUpdate(settings._id, data, { new: true });
    
    revalidatePath("/");
    revalidatePath("/admin/settings");
    
    return { success: true, data: JSON.parse(JSON.stringify(updated)) };
  } catch (error) {
    console.error("Failed to update settings:", error);
    return { success: false, error: "Failed to update settings" };
  }
}
