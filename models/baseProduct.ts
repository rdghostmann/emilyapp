import mongoose from "mongoose";
const { Schema } = mongoose;


const statsSchema = new Schema(
  {
    views: { type: Number, default: 0 },
    favorites: { type: Number, default: 0 },
    adId: String,
  },
  { _id: false }
);

// Base product schema
export const baseProductSchema = new Schema(
  {
    name: { type: String, required: true }, // or title
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: Number,
    negotiable: { type: Boolean, default: false },
    condition: { type: String, enum: ["New", "Used"], default: "New" },
    location: { type: String, required: true },
    boosted: { type: Boolean, default: false },

    // Relationships
    category: { type: String, required: true },
    subcategory: { type: String },

    images: [{ type: String }],

 seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },    stats: statsSchema,

    attributes: Schema.Types.Mixed, // category-specific attributes
  },
  { timestamps: true }
);


const BaseProduct =  mongoose.models.BaseProduct || mongoose.model("BaseProduct", baseProductSchema);

export default BaseProduct;