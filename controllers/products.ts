// controllers/products.ts
"use server"

import mongoose from "mongoose"
import { connectToDB } from "@/lib/connectDB"
import { ProductInterface } from "@/types/product"
import { isValidCategory } from "@/lib/categoryValidation"
import { Product } from "@/models/Product"

export async function mapProductDocToInterface(p: any): Promise<ProductInterface> {
  return {
    _id: p._id.toString(),
    name: p.name,
    description: p.description,
    price: p.price,
    location: p.location,
    seller: {
      _id: p.seller?._id?.toString() || "",
      name: p.seller?.name || "Seller",
      rating: p.seller?.rating || 0,
    },
    images: p.images || [],
    category: p.category,
    subcategory: p.subcategory,
    boosted: p.boosted,
    condition: p.condition,
    negotiable: p.negotiable,
    stats: p.stats,
    details: p.details || {},
    createdAt: new Date(p.createdAt),
    updatedAt: new Date(p.updatedAt),
  }
}

/**
 * ✅ Get products by category/subcategory
 */
export async function getProduct(
  category?: string,
  subcategory?: string
): Promise<ProductInterface[]> {
  await connectToDB()
  const filter: Record<string, any> = {}
  if (category) filter.category = category
  if (subcategory) filter.subcategory = subcategory

  const docs = await Product.find(filter)
    .populate("seller", "name rating")
    .sort({ createdAt: -1 })
    .lean()

return await Promise.all(docs.map(mapProductDocToInterface))
}

/**
 * ✅ Get product by ID
 */
export async function getProductById(id: string): Promise<ProductInterface | null> {
  await connectToDB()
  if (!mongoose.Types.ObjectId.isValid(id)) return null

  const p = await Product.findById(id)
    .populate("seller", "name rating")
    .lean()

  return p ? mapProductDocToInterface(p) : null
}
