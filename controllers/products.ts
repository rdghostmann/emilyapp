// controllers/products.ts
"use server";

import mongoose from "mongoose";
import { connectToDB } from "@/lib/connectDB";
import { ProductInterface } from "@/types/product";
import { Product } from "@/models/Product";
import { SubcategoryDTO } from "./categories";
import { Category } from "@/models/Category";

// Define DTO if you want a lightweight structure
export type ProductDTO = ProductInterface


// ---------- Helper ----------
export async function mapProductDocToInterface(p: any): Promise<ProductInterface> {
  return {
    _id: p._id.toString(),
    name: p.name,
    description: p.description,
    price: p.price,
    location: p.location || "N/A",
    seller: p.seller ? {
          _id: p.seller._id.toString(),
          name: p.seller.name,
          rating: p.seller.rating || 0,
          phone: p.seller.phone || "N/A",
          avatar: p.seller.avatar || "/default-avatar.png",
          verified: p.seller.verified || false,
          totalSales: p.seller.totalSales || 0,
          totalAds: p.seller.totalAds || 0,
          memberSince: p.seller.memberSince || new Date().toISOString(),
        }
      : { _id: "", name: "Unknown", rating: 0 },
    images: p.images || [],
    category: p.category,
    subcategory: p.subcategory,
    boosted: p.boosted || false,
    condition: p.condition,
    negotiable: p.negotiable,
    stats: p.stats || { views: 0, favorites: 0, adId: "" },
    details: p.details || {},
    createdAt: new Date(p.createdAt),
    updatedAt: new Date(p.updatedAt),
  };
}

// Fetch similar products by category, excluding the current product
export async function getProductsByCategory(category: string, excludeId: string) {
  return Product.find({ 
      category, 
      _id: { $ne: excludeId } 
    })
    .limit(6) // limit to 6 similar products
    .lean()
}

export async function getAllProducts(): Promise<ProductDTO[]> {
  await connectToDB()

  const products = await Product.find({})
    .sort({ createdAt: -1 }) // latest first
    .limit(20) // only latest 20
    .populate("seller", "_id name rating")
    .lean()

  return Promise.all(products.map(mapProductDocToInterface))
}


// Single product
export async function getProductById(id: string): Promise<ProductInterface | null> {
  await connectToDB();
  if (!mongoose.Types.ObjectId.isValid(id)) return null;

  const p = await Product.findById(id).populate("seller", "_id name rating").lean();
  return p ? await mapProductDocToInterface(p) : null;
}
