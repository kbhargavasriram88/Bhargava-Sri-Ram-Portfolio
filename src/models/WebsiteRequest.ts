import mongoose, { Schema, Document } from "mongoose";

export interface IWebsiteRequest extends Document {
  name: string;
  email: string;
  phone?: string;
  serviceType: string;
  budget: string;
  timeline: string;
  description: string;
  status: "New" | "In Touch" | "Accepted" | "Completed" | "Archived";
  createdAt: Date;
  updatedAt: Date;
}

const WebsiteRequestSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    serviceType: { type: String, required: true, default: "Full-Stack Web App" },
    budget: { type: String, required: true, default: "₹15,000 - ₹35,000" },
    timeline: { type: String, default: "1-2 Weeks" },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["New", "In Touch", "Accepted", "Completed", "Archived"],
      default: "New",
    },
  },
  { timestamps: true }
);

export default mongoose.models.WebsiteRequest ||
  mongoose.model<IWebsiteRequest>("WebsiteRequest", WebsiteRequestSchema);
