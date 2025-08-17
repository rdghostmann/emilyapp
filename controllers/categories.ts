"use server"

import { connectToDB } from "@/lib/connectDB"
import { Category } from "@/models/Category"

export interface CategoryDTO {
  id: string
  name: string
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
