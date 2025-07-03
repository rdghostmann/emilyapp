"use server";
import { revalidatePath } from "next/cache";
import { connectToDB } from "@/lib/connectDB";
import Product from "@/models/Product";

export default async function createProduct(productData: any) {
  try {
    await connectToDB();
    const product = await Product.create(productData);
    revalidatePath("/products");
    return { success: true, product };
  } catch (error) {
    let message = "Failed to create product";
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === "string") {
      message = error;
    }
    return { success: false, error: message };
  }
}