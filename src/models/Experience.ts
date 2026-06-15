import mongoose, { Schema, Document } from "mongoose";

export interface IExperience extends Document {
  title: string;
  organization: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  type: "Internship" | "Leadership" | "Work" | "Education";
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    organization: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: ["Internship", "Leadership", "Work", "Education"],
      required: true,
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Experience || mongoose.model<IExperience>("Experience", ExperienceSchema);
