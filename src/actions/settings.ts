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
        },
        offer: {
          enabled: false,
          title: "🔥 Special Offer: 20% Off Web Development Services",
          description: "Get a custom, high-converting portfolio or business website built in 5 days.",
          badgeText: "Limited Offer",
          buttonText: "Claim Offer",
          buttonLink: "/#contact",
          discountCode: "DEV20"
        }
      });
    }

    if (settings && !settings.offer) {
      settings.offer = {
        enabled: false,
        title: "🔥 Special Offer: 20% Off Web Development Services",
        description: "Get a custom, high-converting portfolio or business website built in 5 days.",
        badgeText: "Limited Offer",
        buttonText: "Claim Offer",
        buttonLink: "/#contact",
        discountCode: "DEV20"
      };
    }

    if (settings && !settings.requestForm) {
      settings.requestForm = {
        enabled: true,
        title: "Request a Custom Website",
        description: "Tell me about your idea, requirements, and budget to get a custom proposal within 24 hours.",
        badgeText: "Start Your Project",
        buttonText: "Request a Website",
        budgetOptions: ["$200 - $500", "$500 - $1,000", "$1,000 - $2,500", "$2,500+"],
        timelineOptions: ["Urgent (1-3 Days)", "1-2 Weeks", "3-4 Weeks", "Flexible"]
      };
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
    
    revalidatePath("/", "layout");
    revalidatePath("/admin/settings");
    
    return { success: true, data: JSON.parse(JSON.stringify(updated)) };
  } catch (error) {
    console.error("Failed to update settings:", error);
    return { success: false, error: "Failed to update settings" };
  }
}
