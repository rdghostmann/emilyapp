import mongoose, { Schema, Document, models } from "mongoose";

// Category type for frontend and schema typing
export interface Category {
  name: string;
  subcategories: string[];
}

// Product document interface
export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  negotiable: boolean;
  condition: "New" | "Old" | "inStock" | "";
  location: string;
  category: string;
  subcategory: string;
  boosted: boolean;
  images: string[];
  seller: mongoose.Types.ObjectId;
  stats: mongoose.Types.ObjectId;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String },
    description: { type: String },
    price: { type: Number, default: 0 },
    originalPrice: { type: Number, default: 0 },
    negotiable: { type: Boolean, default: false },
    condition: {
      type: String,
      enum: ["New", "Old", "inStock"],
      default: "",
    },
    location: { type: String, default: "" },
    category: { type: String, default: "" },
    subcategory: { type: String, default: "" },
    boosted: { type: Boolean, default: false },
    images: [{ type: String }],
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    stats: { type: mongoose.Schema.Types.ObjectId, ref: "Stat" },
  },
  { timestamps: true }
);

// Prevent model overwrite in dev mode
const Product =  models?.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
