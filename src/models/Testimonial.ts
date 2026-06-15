import mongoose, { Schema, Document } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  role: string;
  type: "Client" | "Colleague" | "Mentor";
  content: string;
  rating: number;
  imageUrl: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    type: { type: String, enum: ["Client", "Colleague", "Mentor"], required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true, default: 5 },
    imageUrl: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
