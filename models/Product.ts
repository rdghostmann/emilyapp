// models/Product.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  location: string;
  seller: mongoose.Types.ObjectId;
  images: string[];
  category: string;     // e.g. "animal-mating"
  subcategory?: string; // e.g. "goat"
  boosted?: boolean;
  // Common fields
  condition?: string;
  negotiable?: boolean;
  stats?: {
    views: number;
    favorites: number;
    adId: string;
  };

  // Category-specific fields
  details: Record<string, any>;

  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    location: String,
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
    images: [String],
    category: { type: String, required: true },
    subcategory: String,
    boosted: { type: Boolean, default: false },

    condition: String,
    negotiable: { type: Boolean, default: false },
    stats: {
      views: { type: Number, default: 0 },
      favorites: { type: Number, default: 0 },
      adId: { type: String, unique: true },
    },

    // Flexible category-specific details
    details: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);



const Product = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
