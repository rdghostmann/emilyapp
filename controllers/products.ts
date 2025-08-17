// controllers/products.ts
"use server";

import mongoose from "mongoose";
import { connectToDB } from "@/lib/connectDB";
import { ProductInterface } from "@/types/product";
import { IProduct, Product } from "@/models/Product";
import { SubcategoryDTO } from "./categories";
import { Category } from "@/models/Category";

// Map a product document to ProductInterface
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

export async function findProductsBySubcategorySlug(subcategorySlug: string): Promise<ProductInterface[]> {
  // Connect to DB
  await connectToDB();

  // Find products by subcategory
  const products = await Product.find({ subcategory: subcategorySlug })
    .populate("seller", "_id name rating")
    .lean();

  return Promise.all(products.map(mapProductDocToInterface));
}

// Fetch products by subcategory, search, and sort
export async function getProductsBySubcategory(
  subcategoryId: string,
  searchQuery: string = "",
  sortBy: string = "newest"
) {
  await connectToDB();

  const filter: any = { subcategory: subcategoryId };
  if (searchQuery) {
    filter.name = { $regex: searchQuery, $options: "i" }; // case-insensitive search
  }

  let sortOption: any = { createdAt: -1 }; // default newest
  if (sortBy === "price-low") sortOption = { price: 1 };
  else if (sortBy === "price-high") sortOption = { price: -1 };
  else if (sortBy === "rating") sortOption = { "seller.rating": -1 };

  const products = await Product.find(filter)
    .limit(50)
    .sort(sortOption)
    .populate("seller", "_id name rating")
    .lean();

  return Promise.all(products.map(mapProductDocToInterface));
}

// Get products by subcategory
export async function getProduct(subcategoryId: string): Promise<ProductInterface[]> {
  await connectToDB();

  const productDocs = await Product.find({ subcategory: subcategoryId })
    .limit(50)
    .populate("seller", "_id name rating")
    .lean();

  const products = await Promise.all(productDocs.map(p => mapProductDocToInterface(p)));
  return products;
}

// Get product by ID
export async function getProductById(id: string): Promise<ProductInterface | null> {
  await connectToDB();
  if (!mongoose.Types.ObjectId.isValid(id)) return null;

  const p = await Product.findById(id)
    .populate("seller", "_id name rating")
    .lean();

  return p ? await mapProductDocToInterface(p) : null;
}

// Get subcategory by ID including products
export async function getSubcategoryById(id: string): Promise<SubcategoryDTO | null> {
  await connectToDB();

  const category = await Category.findOne({ "subcategories._id": id }).lean() as {
    _id: any;
    name: string;
    slug: string;
    subcategories: any[];
  } | null;

  if (!category) return null;

  const sub = category.subcategories.find(sub => (sub._id as any).toString() === id);
  if (!sub) return null;

  const products: ProductInterface[] = await getProduct(sub._id.toString());

  return {
    id: (sub._id as any).toString(),
    name: sub.name,
    description: sub.description,
    image: sub.image || "/placeholder.jpg",
    productCount: sub.productCount || 0,
    categoryName: category.name,
    subcategorySlug: sub.slug || sub._id.toString(), // ✅ use subcategorySlug
    products,
  };
}
