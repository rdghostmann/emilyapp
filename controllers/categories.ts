// controllers/categories.ts
"use server"

import { categories } from "@/constants/categories"

export async function getSubcategoryById(id: string) {
  for (const category of categories) {
    const sub = category.subcategories.find((s) => s.id === id)
    if (sub) {
      return {
        ...sub,
        categoryId: category.id,
        categoryName: category.name,
        categorySlug: category.id, // assuming id doubles as slug
      }
    }
  }
  return null
}
