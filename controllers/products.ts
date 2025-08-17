// controllers/products.ts
"use server"

import mongoose from "mongoose"
import { connectToDB } from "@/lib/connectDB"
import { ProductInterface } from "@/types/product"
import { IProduct, Product } from "@/models/Product"
import { SubcategoryDTO } from "./categories"
import { Category } from "@/models/Category"

export async function mapProductDocToInterface(p: any): Promise<ProductInterface> {
  return {
    _id: p._id.toString(),
    name: p.name,
    description: p.description,
    price: p.price,
    location: p.location,
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
    boosted: p.boosted,
    condition: p.condition,
    negotiable: p.negotiable,
    stats: p.stats || { views: 0, favorites: 0, adId: "" },
    details: p.details || {},
    createdAt: new Date(p.createdAt),
    updatedAt: new Date(p.updatedAt),
  };
}

export async function getProduct(
  categorySlug: string,
  subcategoryId: string
): Promise<ProductInterface[]> {
  await connectToDB();

  const productDocs = await Product.find({ subcategory: subcategoryId })
    .limit(50)
    .populate("seller", "_id name rating")
    .lean(); // get plain JS objects


  // Use the mapping function
  const products = await Promise.all(
    productDocs.map(async (p) => await mapProductDocToInterface(p))
  );

  return products;
}



export async function getProductById(id: string): Promise<ProductInterface | null> {
  await connectToDB()
  if (!mongoose.Types.ObjectId.isValid(id)) return null

  const p = await Product.findById(id)
    .populate("seller", "name rating")
    .lean()

  return p ? await mapProductDocToInterface(p) : null;
}


export async function getSubcategoryById(id: string): Promise<SubcategoryDTO | null> {
  await connectToDB();

  const category = await Category.findOne({ "subcategories._id": id }).lean() as {
    _id: any;
    name: string;
    subcategories: any[];
  } | null;

  if (!category) return null;

  const sub = category.subcategories.find(sub => (sub._id as any).toString() === id);
  if (!sub) return null;

  // ✅ Use the properly typed getProduct
  const products: ProductInterface[] = await getProduct(category.name.toLowerCase(), sub._id.toString());

  return {
    id: (sub._id as any).toString(),
    name: sub.name,
    description: sub.description,
    image: sub.image || "/placeholder.jpg",
    productCount: sub.productCount || 0,
    categoryName: category.name,
    categorySlug: category.name.toLowerCase().replace(/\s+/g, "-"),
    products,
  };
}