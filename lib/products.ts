"use server";

import BaseProduct from "@/models/baseProduct";
import { connectToDB } from "./connectDB";

/**
 * Fetch all products for a given category ID.
 * Works regardless of category-specific model,
 * since all extend BaseProduct.
 */
export async function getProductsByCategory(categoryId: string) {
  await connectToDB();
  return BaseProduct.find({ category: categoryId })
    .populate("seller", "name") // optional: get seller name
    .lean();
}
