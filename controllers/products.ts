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
    seller: p.seller
      ? {
          _id: p.seller._id.toString(),
          name: p.seller.name,
          rating: p.seller.rating || 0,
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


export async function getAllProducts(): Promise<ProductDTO[]> {
  await connectToDB()

  const products = await Product.find({})
    .sort({ createdAt: -1 }) // latest first
    .limit(20) // only latest 20
    .populate("seller", "_id name rating")
    .lean()

  return Promise.all(products.map(mapProductDocToInterface))
}

// ---------- Subcategory ----------
export async function getSubcategoryById(id: string): Promise<SubcategoryDTO | null> {
  await connectToDB();

  const category = await Category.findOne({ "subcategories._id": id }).lean() as {
    _id: any;
    name: string;
    slug: string;
    subcategories: any[];
  } | null;

  if (!category) return null;

  const sub = category.subcategories.find(s => (s._id as any).toString() === id);
  if (!sub) return null;

  // Use unified fetch
  const products = await fetchProductsBySubcategory({ subcategory: sub.subcategorySlug });

  return {
    id: (sub._id as any).toString(),
    name: sub.name,
    description: sub.description,
    image: sub.image || "/placeholder.jpg",
    productCount: products.length,
    categoryName: category.name,
    subcategorySlug: sub.subcategorySlug || sub._id.toString(),
    products,
  };
}

// ---------- Products ----------
interface FetchProductsParams {
  subcategory: string;
  sortBy?: "newest" | "price-low" | "price-high" | "rating";
  searchQuery?: string;
}

export async function fetchProductsBySubcategory({
  subcategory,
  sortBy = "newest",
  searchQuery = "",
}: FetchProductsParams): Promise<ProductInterface[]> {
  await connectToDB();

  const filter: any = { subcategory };
  if (searchQuery) {
    filter.name = { $regex: searchQuery, $options: "i" };
  }

  let sort: any = { createdAt: -1 };
  if (sortBy === "price-low") sort = { price: 1 };
  if (sortBy === "price-high") sort = { price: -1 };
  if (sortBy === "rating") sort = { "seller.rating": -1 };

  const products = await Product.find(filter)
    .limit(50)
    .sort(sort)
    .populate("seller", "_id name rating")
    .lean();

  return Promise.all(products.map(mapProductDocToInterface));
}

// Fetch all products under a category (across its subcategories)
interface FetchProductsByCategoryInput {
  categorySlug: string;
  searchQuery?: string;
  sortBy?: "newest" | "price-low" | "price-high" | "rating";
}

export async function fetchProductsByCategory({
  categorySlug,
  searchQuery = "",
  sortBy = "newest",
}: FetchProductsByCategoryInput): Promise<ProductInterface[]> {
  await connectToDB();

  const filter: any = { category: categorySlug };
  if (searchQuery) {
    filter.name = { $regex: searchQuery, $options: "i" };
  }

  let sort: any = { createdAt: -1 };
  if (sortBy === "price-low") sort = { price: 1 };
  if (sortBy === "price-high") sort = { price: -1 };
  if (sortBy === "rating") sort = { "seller.rating": -1 };

  const products = await Product.find(filter)
    .limit(50)
    .sort(sort)
    .populate("seller", "_id name rating")
    .lean();

  return Promise.all(products.map(mapProductDocToInterface));
}

// Single product
export async function getProductById(id: string): Promise<ProductInterface | null> {
  await connectToDB();
  if (!mongoose.Types.ObjectId.isValid(id)) return null;

  const p = await Product.findById(id).populate("seller", "_id name rating").lean();
  return p ? await mapProductDocToInterface(p) : null;
}
