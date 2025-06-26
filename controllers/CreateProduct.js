"use server";
import { revalidatePath } from "next/cache";
import { connectToDB } from "@/lib/connectDB";
import Product from "@/models/Product";

export default async function createProduct(productData) {
  try {
    await connectToDB();
    const product = await Product.create(productData);
    // Optionally revalidate a path if using Next.js ISR/SSG
    revalidatePath("/products");
    return { success: true, product };
  } catch (error) {
    return { success: false, error: error.message || "Failed to create product" };
  }
}