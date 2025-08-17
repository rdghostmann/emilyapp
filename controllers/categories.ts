// controllers/categories.ts
"use server";
import { Types } from "mongoose";
import { connectToDB } from "@/lib/connectDB";
import { Category, ICategory } from "@/models/Category";
import { ProductInterface } from "@/types/product";

export interface SubcategoryDTO {
  id: string;
  name: string;
  description?: string;
  image?: string;
  productCount?: number;
  categoryName: string;
  categorySlug: string;
  products?: ProductInterface[];
}

export interface CategoryDTO {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  href?: string;
  icon?: string;
  subcategories?: SubcategoryDTO[];
}

// Get all categories
export async function getAllCategories(): Promise<CategoryDTO[]> {
  await connectToDB();
  const categories = await Category.find({}).lean();

  return categories.map((cat: any) => ({
    id: (cat._id as Types.ObjectId).toString(),
    name: cat.name,
    slug: cat.slug,
    image: cat.image || "/placeholder.jpg",
    href: cat.href || `/category/${cat.slug}`,
    icon: cat.icon || "",
    subcategories: cat.subcategories?.map((sub: any) => ({
      id: (sub._id as Types.ObjectId).toString(),
      name: sub.name,
      description: sub.description,
      image: sub.image || "/placeholder.jpg",
      productCount: sub.productCount || 0,
      categoryName: cat.name,
      categorySlug: cat.slug,
    })) || [],
  }));
}

// Get a single category by slug
export async function getCategoryBySlug(slug: string): Promise<CategoryDTO | null> {
  await connectToDB();

  const category = await Category.findOne({ slug }).lean<ICategory>();
  if (!category) return null;

  return {
    id: (category._id as Types.ObjectId).toString(),
    name: category.name,
    slug: category.slug,
    image: category.image || "/placeholder.jpg",
    icon: category.icon || "",
    href: category.href || `/category/${category.slug}`,
    subcategories: category.subcategories?.map(sub => ({
      id: (sub._id as Types.ObjectId).toString(),
      name: sub.name,
      description: sub.description,
      image: sub.image || "/placeholder.jpg",
      productCount: sub.productCount || 0,
      categoryName: category.name,
      categorySlug: category.slug,
    })) || [],
  };
}
