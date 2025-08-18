// models/Product.ts
import mongoose, { Schema, Document } from "mongoose";

// Base Product interface
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  location: string;
  seller: mongoose.Types.ObjectId;
  images: string[];
  category: string;
  subcategory?: string;
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
  details: ICategoryDetails;

  
  createdAt: Date;
  updatedAt: Date;
}

// Category-specific details type (union)
export type ICategoryDetails = | IAnimalMatingDetails | IAnimalPharmacyDetails | IAnimalFeedDetails | ILivestockPetDetails | IFoodFruitVegDetails;

// Example detail interfaces
export interface IAnimalMatingDetails {
  species: string;
  breed: string;
  age?: number;
  healthStatus?: string;
  matingType?: string;
  availabilityDates?: { start: Date; end: Date };
  eggFertilityRate?: number;
  quantityAvailable?: number;
  collectionDate?: Date;
}

export interface IAnimalPharmacyDetails {
  drugType: string;
  dosageForm: string;
  targetSpecies: string[];
  activeIngredients: string[];
  expiryDate: Date;
  storageConditions: string;
}

export interface IAnimalFeedDetails {
  feedType: string;
  species: string[];
  weight: string;
  ingredients: string[];
  nutritionalContent: {
    protein: string;
    fiber: string;
    fat: string;
  };
  expiryDate: Date;
}

export interface ILivestockPetDetails {
  species: string;
  breed: string;
  age: string;
  gender: string;
  healthStatus: string;
}

export interface IFoodFruitVegDetails {
  foodType: string;
  variety: string;
  quantity: string;
  harvestDate: Date;
  shelfLife: string;
}

// Mongoose Schema
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
      adId: { type: String },
    },

    // Flexible category-specific details
    details: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export const Product =  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
