import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  longDescription?: string;
  price: number;
  originalPrice?: number;
  unit: string;
  images: string[];
  farmer: {
    id?: string;
    name: string;
    location: string;
    avatar?: string;
    rating?: number;
    totalReviews?: number;
    verified?: boolean;
    joinedDate?: string;
    totalProducts?: number;
    responseTime?: string;
  };
  category: string;
  inStock: boolean;
  quantity: number | string;
  minOrder?: number;
  maxOrder?: number;
  postedAt?: string | Date;
  discount?: number;
  features?: string[];
  nutritionFacts?: {
    calories?: number;
    protein?: string;
    carbs?: string;
    fiber?: string;
    vitaminC?: string;
  };
  tags?: string[];
  phone?: string;
  email?: string;
}

const FarmerSchema = new Schema(
  {
    id: { type: String },
    name: { type: String, required: true },
    location: { type: String, required: true },
    avatar: { type: String },
    rating: { type: Number },
    totalReviews: { type: Number },
    verified: { type: Boolean },
    joinedDate: { type: String },
    totalProducts: { type: Number },
    responseTime: { type: String },
  },
  { _id: false }
);

const NutritionFactsSchema = new Schema(
  {
    calories: Number,
    protein: String,
    carbs: String,
    fiber: String,
    vitaminC: String,
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    unit: { type: String, required: true },
    images: { type: [String], default: [] },
    farmer: { type: FarmerSchema, required: true },
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    quantity: { type: Schema.Types.Mixed, required: true },
    minOrder: { type: Number },
    maxOrder: { type: Number },
    postedAt: { type: Schema.Types.Mixed },
    discount: { type: Number },
    features: { type: [String], default: [] },
    nutritionFacts: { type: NutritionFactsSchema },
    tags: { type: [String], default: [] },
    phone: { type: String },
    email: { type: String },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;