// controllers/categories.ts
"use server"
import { Types } from "mongoose";
import { connectToDB } from "@/lib/connectDB"
import { Category, ICategory } from "@/models/Category";

export interface CategoryDTO {
   id: string
  name: string
  description?: string // <-- add this
  image?: string
  href?: string
  subcategories?: any[]
  icon?: string
}

export async function getAllCategories(): Promise<CategoryDTO[]> {
  try {
    await connectToDB()

    // Use lean() -> returns plain JS objects
    const categories = await Category.find({}).lean()

    return categories.map((cat: any) => ({
      id: cat._id.toString(),
      name: cat.name,
      image: cat.image || "/placeholder.jpg",
      href: cat.href || `/category/${cat.name.toLowerCase().replace(/\s+/g, "-")}`,
      subcategories: cat.subcategories || [],
      icon: cat.icon || "",
    }))
  } catch (error) {
    console.error("❌ Error fetching categories:", error)
    return []
  }
}

export async function getCategoryBySlug(slug: string): Promise<CategoryDTO | null> {
  await connectToDB();

  const name = slug.replace(/-/g, " "); // convert slug back to name

  // cast result to ICategory | null
  const category = await Category.findOne({ name }).lean<ICategory>();

  if (!category) return null;

  return {
    id: category._id instanceof Types.ObjectId
      ? category._id.toString()
      : String(category._id), // safely convert unknown ObjectId to string
    name: category.name,
    image: category.image || "/placeholder.jpg",
    subcategories: category.subcategories || [],
    icon: category.icon || "",
    href: category.href || `/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`,
  };
}
