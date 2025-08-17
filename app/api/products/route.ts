// app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server"
import { connectToDB } from "@/lib/connectDB"
import { Product } from "@/models/Product"

export async function GET(req: NextRequest) {
  try {
    await connectToDB()

    const { searchParams } = new URL(req.url)
    const subcategory = searchParams.get("subcategory")
    const searchQuery = searchParams.get("search") || ""
    const sortBy = searchParams.get("sortBy") || "newest"

    if (!subcategory) {
      return NextResponse.json({ products: [] })
    }

    // Build query
    const query: any = {
      subcategory,
      name: { $regex: searchQuery, $options: "i" }, // case-insensitive search by name
    }

    // Build sort
    let sortOption: any = { createdAt: -1 } // newest first by default
    if (sortBy === "price-low") sortOption = { price: 1 }
    else if (sortBy === "price-high") sortOption = { price: -1 }
    else if (sortBy === "rating") sortOption = { "stats.views": -1 } // example: using views as pseudo-rating

    const products = await Product.find(query).sort(sortOption).limit(50) // limit to 50 for performance

    return NextResponse.json({ products })
  } catch (error: any) {
    console.error("Error fetching products:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
