"use server";
import { connectToDB } from "@/lib/connectDB";
import Product from "@/models/Product";

export default async function getProductsByCategory(category: string) {
  await connectToDB();
  const products = await Product.find({ category }).lean();
  return products.map((p: any) => ({
    id: p._id.toString(),
    title: p.title,
    description: p.description,
    price: p.price,
    unit: p.unit,
    images: p.images,
    inStock: p.inStock,
    quantity: p.quantity,
    farmer: p.farmer,
  }));
}