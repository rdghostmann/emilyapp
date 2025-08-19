// controllers/products.ts
"use server";

import mongoose from "mongoose";
import { connectToDB } from "@/lib/connectDB";
import { ProductInterface } from "@/types/product";
import { Product } from "@/models/Product";

// Define DTO if you want a lightweight structure
export type ProductDTO = ProductInterface

interface FetchProductsOptions {
  subcategory: string;
  sortBy?: "newest" | "price-low" | "price-high" | "rating";
  searchQuery?: string;
}


// ---------- Helper ----------
export async function mapProductDocToInterface(p: any): Promise<ProductInterface> {
  return {
    _id: p._id.toString(),
    name: p.name,
    description: p.description,
    price: p.price,
    location: p.location || "N/A",
    seller: p.seller
      ? {
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
      : {
          _id: "",
          name: "Unknown",
          rating: 0,
          phone: "N/A",
          avatar: "/default-avatar.png",
          verified: false,
          totalSales: 0,
          totalAds: 0,
          memberSince: new Date().toISOString(),
        },
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


export async function fetchProductsBySubcategory({
  subcategory,
  sortBy = "newest",
  searchQuery = "",
}: FetchProductsOptions): Promise<ProductInterface[]> {
  await connectToDB();

  let query: any = { subcategory };
  if (searchQuery) {
    query.name = { $regex: searchQuery, $options: "i" }; // case-insensitive search
  }

  let sort: any = {};
  switch (sortBy) {
    case "newest":
      sort = { createdAt: -1 };
      break;
    case "price-low":
      sort = { price: 1 };
      break;
    case "price-high":
      sort = { price: -1 };
      break;
    case "rating":
      sort = { "seller.rating": -1 };
      break;
    default:
      sort = { createdAt: -1 };
  }

  const productsDocs = await Product.find(query).sort(sort).lean();
  const products: ProductInterface[] = await Promise.all(
    productsDocs.map((p) => mapProductDocToInterface(p))
  );

  return products;
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
