// import mongoose, { Schema } from "mongoose";

// export const ReviewSchema = new Schema(
//   {
//     user: { type: String, required: true },
//     avatar: { type: String },
//     rating: { type: Number, required: true },
//     comment: { type: String, required: true },
//     date: { type: String, required: true },
//     verified: { type: Boolean, default: false },
//   },
//   { _id: false }
// );

// const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);
// export default Review;

import { Schema } from "mongoose";

export const ReviewSchema = new Schema(
  {
    user: { type: String, required: true },
    avatar: { type: String },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    date: { type: String, required: true },
    verified: { type: Boolean, default: false },
  },
  { _id: false }
);
