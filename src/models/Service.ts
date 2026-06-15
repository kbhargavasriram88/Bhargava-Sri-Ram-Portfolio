import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  title: string;
  description: string;
  features: string[];
  basePrice: number;
  icon?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    features: [{ type: String }],
    basePrice: { type: Number, default: 0 },
    icon: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

if (mongoose.models.Service) {
  delete mongoose.models.Service;
}

export default mongoose.model<IService>("Service", ServiceSchema);
