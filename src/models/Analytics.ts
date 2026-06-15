import mongoose, { Schema, Document } from "mongoose";

export interface IAnalytics extends Document {
  pageViews: number;
  uniqueVisitors: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AnalyticsSchema: Schema = new Schema(
  {
    pageViews: { type: Number, default: 0 },
    uniqueVisitors: { type: Number, default: 0 },
    date: { type: Date, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.models.Analytics || mongoose.model<IAnalytics>("Analytics", AnalyticsSchema);
