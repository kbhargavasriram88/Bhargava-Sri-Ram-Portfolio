import mongoose, { Schema, Document } from "mongoose";

export interface ISkill extends Document {
  name: string;
  category: "Frontend" | "Backend" | "Database" | "AI/ML" | "Hosting" | "Deployment" | "Version Control";
  icon?: string;
  progress: number; // 0-100
  yearsOfExperience: number;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["Frontend", "Backend", "Database", "AI/ML", "Hosting", "Deployment", "Version Control"],
      required: true,
    },
    icon: { type: String }, // Can be a Lucide icon name or image URL
    progress: { type: Number, required: true, min: 0, max: 100 },
    yearsOfExperience: { type: Number, required: true },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      required: true,
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Clear cached model to fix Next.js hot-reloading issues with enum updates
if (mongoose.models.Skill) {
  delete mongoose.models.Skill;
}

export default mongoose.model<ISkill>("Skill", SkillSchema);
