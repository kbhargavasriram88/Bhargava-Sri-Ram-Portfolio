import mongoose, { Schema, Document } from "mongoose";

export interface ISettings extends Document {
  hero: {
    heading: string;
    subheading: string;
    description: string;
    resumeUrl: string;
    profileImageUrl: string;
    backgroundImageUrl: string;
    availableForHire: boolean;
  };
  about: {
    journey: string;
    careerGoals: string;
    education: Array<{
      title: string;
      status: string;
    }>;
  };
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
    whatsapp: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema: Schema = new Schema(
  {
    hero: {
      heading: { type: String, default: "BHARGAVA SRI RAM" },
      subheading: { type: String, default: "Full-Stack Developer & AI/ML Enthusiast" },
      description: { type: String, default: "Building scalable web applications and intelligent digital experiences." },
      resumeUrl: { type: String, default: "" },
      profileImageUrl: { type: String, default: "/placeholder-profile.svg" },
      backgroundImageUrl: { type: String, default: "/hero-bg.jpg" },
      availableForHire: { type: Boolean, default: true },
    },
    about: {
      journey: { type: String, default: "Started coding out of curiosity, evolved into a passion. I specialize in full-stack development with a strong focus on modern JavaScript frameworks and scalable backend architectures. Always eager to explore AI/ML integrations." },
      careerGoals: { type: String, default: "My objective is to build impactful products that solve real-world problems. I am looking forward to collaborating with innovative teams, acquiring new skills, and contributing to open-source communities." },
      education: [
        {
          title: { type: String },
          status: { type: String }
        }
      ]
    },
    socialLinks: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      email: { type: String, default: "" },
      whatsapp: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

if (mongoose.models.Settings) {
  delete mongoose.models.Settings;
}

export default mongoose.model<ISettings>("Settings", SettingsSchema);
