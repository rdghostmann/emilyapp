// /controllers/findProductsByCategory.ts
import { connectToDB } from "@/lib/connectDB"
import { Product } from "@/models/Product"

interface FindProductsParams {
  categoryName: string
  subcategoryId?: string
  searchQuery?: string
  sortBy?: "newest" | "price-low" | "price-high" | "rating"
}

// Server Action
export async function findProductsByCategory(params: FindProductsParams) {
  const { categoryName, subcategoryId, searchQuery, sortBy = "newest" } = params

  await connectToDB()

  // Build query
  const query: any = { categoryName }
  if (subcategoryId) query.subcategoryId = subcategoryId
  if (searchQuery) query.name = { $regex: searchQuery, $options: "i" }

  // Build sort
  let sortOption: any = { createdAt: -1 } // newest default
  if (sortBy === "price-low") sortOption = { price: 1 }
  if (sortBy === "price-high") sortOption = { price: -1 }
  if (sortBy === "rating") sortOption = { rating: -1 }

  // Fetch products
  const products = await Product.find(query).sort(sortOption).lean()

  return products
}
