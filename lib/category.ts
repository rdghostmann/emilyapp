"use server";
import Category from "@/models/Category";
import { connectToDB } from "./connectDB";

export async function getCategoryBySlug(slug: string) {
    await connectToDB();
    return Category.findOne({ slug }).lean();
}


export async function getSubcategoriesByCategory(categorySlug: string) {
    await connectToDB();
      const category = await Category.findOne({ slug: categorySlug }).lean();
    if (Array.isArray(category)) {
        return [];
    }
    return category?.subCategories || [];
}
