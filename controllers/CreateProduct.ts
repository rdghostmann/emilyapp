"use server";
import { revalidatePath } from "next/cache";
import { connectToDB } from "@/lib/connectDB";
import Product from "@/models/Product";

export default async function createProduct(productData: any) {
  try {
    await connectToDB();

    const cleanedData = {
      ...productData,
      price: Number(productData.price),
      quantity: productData.quantity,
      minOrder: productData.minOrder ? Number(productData.minOrder) : undefined,
      maxOrder: productData.maxOrder ? Number(productData.maxOrder) : undefined,
      discount: productData.discount ? Number(productData.discount) : undefined,
      nutritionFacts: productData.nutritionFacts || {},
    };

    const product = await Product.create(cleanedData);
    revalidatePath("/products");

    return { success: true, product };
  } catch (error) {
    console.error("Product creation error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create product",
    };
  }
}

