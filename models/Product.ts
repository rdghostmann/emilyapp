import mongoose, { Schema, Document, Types } from "mongoose";
import { ReviewSchema } from "./Review";
import { NutritionFactsSchema } from "./NutritionFacts";

/** Embedded Schemas Types **/
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

/** Main Product Interface **/
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
  createdAt?: Date;
  updatedAt?: Date;
}

/** Product Schema **/
const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    longDescription: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
    unit: { type: String, required: true, trim: true },
    images: { type: [String], default: [] },

    farmer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: { type: String, required: true, trim: true },
    inStock: { type: Boolean, default: true },
    quantity: { type: Schema.Types.Mixed, required: true },
    minOrder: { type: Number, min: 0 },
    maxOrder: { type: Number, min: 0 },

    postedAt: {
      type: Date,
      default: Date.now,
    },

    discount: { type: Number, min: 0, max: 100 },
    features: { type: [String], default: [] },
    nutritionFacts: {
      type: NutritionFactsSchema,
      default: {},
    },
    tags: { type: [String], default: [] },
    phone: { type: String, trim: true },
    email: { type: String, trim: true },

    reviews: {
      type: [ReviewSchema],
      default: [],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

/** Avoid model overwrite in dev **/
const Product =  mongoose.models.Product ||  mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
