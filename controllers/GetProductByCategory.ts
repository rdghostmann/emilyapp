"use server";

import { connectToDB } from "@/lib/connectDB";
import Product from "@/models/Product";

export default async function getProductsByCategory(category: string) {
  await connectToDB();

  const products = await Product.find({ category }).populate("farmer").lean();

  return products.map((product: any) => ({
    id: product._id.toString(),
    title: product.title,
    longDescription: product.longDescription || "",
    description: product.description,
    price: product.price,
    unit: product.unit,
    images: product.images,
    image: product.images?.[0] || "/placeholder.svg",
    farmer: product.farmer
      ? {
          id: product.farmer._id?.toString?.() || "",
          username: product.farmer.username || "",
          avatar: product.farmer.avatar || "/placeholder-user.jpg",
          location: `${product.farmer.state || ""}, ${product.farmer.country || ""}`.trim(),
          rating: product.farmer.rating || 0,
          verified: product.farmer.status === "active",
        }
      : null,
    nutritionFacts: {
      calories: product.nutritionFacts?.calories || 0,
      protein: product.nutritionFacts?.protein || "",
      carbs: product.nutritionFacts?.carbs || "",
      fiber: product.nutritionFacts?.fiber || "",
      vitaminC: product.nutritionFacts?.vitaminC || "",
    },
    category: product.category,
    inStock: product.inStock,
    quantity: product.quantity,
    reviews: product.reviews?.map((review: any) => ({
      user: review.user || "Anonymous",
      avatar: review.avatar || "/placeholder-user.jpg",
      rating: review.rating || 0,
      comment: review.comment || "",
      date: review.date || new Date().toISOString(),
      verified: review.verified || false,
    })) || [],
    postedAt: product.postedAt || product.createdAt?.toISOString?.() || "",
    features: product.features || [],
    tags: product.tags || [],
    createdAt: product.createdAt?.toISOString?.() || "",
    updatedAt: product.updatedAt?.toISOString?.() || "",
  }));
}
