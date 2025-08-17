// app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server"
import { connectToDB } from "@/lib/connectDB"
import { Product } from "@/models/Product"
import { Types } from "mongoose";


export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const subcategory = searchParams.get("subcategory");
    const searchQuery = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "newest";

    if (!subcategory) {
      return NextResponse.json({ products: [] });
    }

    const query: any = {
      subcategory,
      name: { $regex: searchQuery, $options: "i" },
    };

    let sortOption: any = { createdAt: -1 };
    if (sortBy === "price-low") sortOption = { price: 1 };
    else if (sortBy === "price-high") sortOption = { price: -1 };
    else if (sortBy === "rating") sortOption = { "stats.views": -1 }; // or actual rating

    const products = await Product.find(query)
      .sort(sortOption)
      .limit(50)
      .lean();

    // Convert _id to string
    const mappedProducts = products.map((p: any) => ({
      ...p,
      _id: (p._id as Types.ObjectId).toString(),
    }));
    return NextResponse.json({ products: mappedProducts });
  } catch (error: any) {
    console.error("Error fetching products:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Utility function for server-side fetching
export async function getProduct(categorySlug: string, subcategoryId: string) {
  await connectToDB();
  const products = await Product.find({ subcategory: subcategoryId })
    .limit(50)
    .lean();

  return products.map(p => ({
    ...p,
    _id: (p._id as Types.ObjectId).toString(),
  }));
}
