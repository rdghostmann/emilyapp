// /controllers/getAllProducts.ts
"use server"

import mongoose from "mongoose"
import { connectToDB } from "@/lib/connectDB"
import { Product, IProduct } from "@/models/Product"

export interface ProductDTO {
 _id: string;
  name: string;
  description?: string;
  price: number;
  location: string;
  images: string[];
  category: string;
  subcategory?: string;
  boosted?: boolean;
  seller: {
    _id: string;
    name: string;   // ✅ changed from name -> username
    rating?: number;
  };
  details: IProduct["details"] ;  // include details
  createdAt: Date;
  updatedAt: Date;
}

export async function getAllProducts(): Promise<ProductDTO[]> {
  try {
    await connectToDB()

    const products = await Product.find({})
    .populate("seller", "_id username rating")
    .lean<IProduct & { seller?: { _id: mongoose.Types.ObjectId; username: string; rating?: number } }[]>()

    return products.map((prod: any) => ({
      _id: prod._id.toString(),
      name: prod.name,
      description: prod.description,
      price: prod.price,
      location: prod.location || "N/A",
      images: prod.images || [],
      category: prod.category,
      subcategory: prod.subcategory,
      boosted: prod.boosted || false,
      seller: {
        _id: prod.seller?._id?.toString() || "",
        name: prod.seller?.username || "Unknown",  // ✅ pass username
        rating: prod.seller?.rating || 0,
      },
      details: prod.details || {},
      createdAt: prod.createdAt,
      updatedAt: prod.updatedAt,
    }))
  } catch (error) {
    console.error("❌ Error fetching products:", error)
    return []
  }
}

