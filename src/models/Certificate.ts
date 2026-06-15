import mongoose, { Schema, Document } from "mongoose";

export interface ICertificate extends Document {
  title: string;
  issuer: string;
  date: Date;
  imageUrl: string;
  certificateUrl?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CertificateSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    date: { type: Date, required: true },
    imageUrl: { type: String, required: true },
    certificateUrl: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Certificate || mongoose.model<ICertificate>("Certificate", CertificateSchema);
