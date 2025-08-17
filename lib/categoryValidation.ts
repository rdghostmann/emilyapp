import { categories } from "@/constants/categories";

export function isValidCategory(cat: string, subcat?: string): boolean {
  const category = categories.find((c) => c.id === cat);
  if (!category) return false;
  if (subcat) {
    return category.subcategories.some((s) => s.id === subcat);
  }
  return true;
}
