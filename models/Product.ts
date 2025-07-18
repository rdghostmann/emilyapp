import mongoose, { Schema, Document, Types } from "mongoose";
import { ReviewSchema } from "./Review";
import { NutritionFactsSchema } from "./NutritionFacts";

export interface IReview {
  user: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
  verified?: boolean;
}

export interface INutritionFacts {
  calories?: number;
  protein?: string;
  carbs?: string;
  fiber?: string;
  vitaminC?: string;
}

export interface IProduct extends Document {
  title: string;
  description: string;
  longDescription?: string;
  price: number;
  originalPrice?: number;
  unit: string;
  images: string[];
  farmer: Types.ObjectId;
  category: string;
  inStock: boolean;
  quantity: number | string;
  minOrder?: number;
  maxOrder?: number;
  postedAt?: Date | string;
  discount?: number;
  features?: string[];
  nutritionFacts?: INutritionFacts;
  tags?: string[];
  phone?: string;
  email?: string;
  reviews?: IReview[];
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    unit: { type: String, required: true },
    images: { type: [String], default: [] },
    farmer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    quantity: { type: Schema.Types.Mixed, required: true },
    minOrder: { type: Number },
    maxOrder: { type: Number },
    postedAt: { type: Schema.Types.Mixed, default: Date.now },
    discount: { type: Number , required: false },
    features: { type: [String], default: [] },
    nutritionFacts: { type: NutritionFactsSchema, default: {}, required: false },
    tags: { type: [String], default: [] , required: false },
    phone: { type: String },
    email: { type: String },
    reviews: { type: [ReviewSchema], default: [] },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
