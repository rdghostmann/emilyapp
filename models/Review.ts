import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  reviewer: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
  verifiedBy?: mongoose.Types.ObjectId;
}

const ReviewSchema = new Schema<IReview>(
  {
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      trim: true,
      default: "",
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Review =  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);

export default Review;
