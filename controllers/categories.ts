// controllers/categories.ts
"use server";
import { Types } from "mongoose";
import { connectToDB } from "@/lib/connectDB";
import { ProductInterface } from "@/types/product";
import { Category, ICategory, ISubcategory } from "@/models/Category"
import { Product } from "@/models/Product"

export interface SubcategoryDTO {
  _id: string;
  name: string;
  slug: string;             // <-- add this for front-end components
  description?: string;
  image?: string;
  productCount?: number;
  categoryName: string;
  subcategorySlug: string;
  products?: ProductInterface[];
}


export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  productCount?: number;
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

interface SubcategoryWithProducts {
  _id: any;
  name: string;
  slug?: string;
  description: string;
  image: string;
  products?: {
    _id: any;
    name: string;
    price: number;
    images: string[];
    seller: any;
    category?: any;
    details?: Record<string, any>;
    createdAt?: Date;
    updatedAt?: Date;
  }[];
}

interface CategoryWithSubcategories {
  _id: any;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  image: string;
  subcategories?: SubcategoryWithProducts[];
}


// Fetch single category by slug
export async function getCategoryBySlug(slug: string): Promise<CategoryDTO | null> {
  await connectToDB();

  const category = await Category.findOne({ slug })
    .populate({
      path: "subcategories.products",
      model: "Product",
      populate: { path: "seller", select: "_id name rating" },
    })
    .lean() as CategoryWithSubcategories | null;

  if (!category) return null;

  return {
    id: category._id.toString(),
    name: category.name,
    slug: category.slug,
    description: category.description,
    icon: category.icon,
    image: category.image,
    href: `/category/${category.slug}`,
    subcategories: category.subcategories?.map(sub => ({
      _id: sub._id.toString(),                   // matches SubcategoryDTO._id
      name: sub.name,
      slug: sub.slug || sub._id.toString(),      // matches SubcategoryDTO.slug
      description: sub.description,
      image: sub.image,
      productCount: sub.products?.length || 0,
      categoryName: category.name,
      subcategorySlug: sub.slug || sub._id.toString(),
      products: sub.products?.map(p => ({
        _id: p._id.toString(),
        name: p.name,
        price: p.price,
        images: p.images,
        seller: p.seller,
        category: p.category?.toString() || category.slug,
        details: p.details || {},
        createdAt: p.createdAt || new Date(),
        updatedAt: p.updatedAt || new Date(),
      })) || [],
    })) || [],

  };
}

export async function getSubcategoriesByCategory(categorySlug: string): Promise<SubcategoryDTO[]> {
  await connectToDB();

  // Proper typing with lean()
  const category = await Category.findOne({ slug: categorySlug })
    .lean<{ subcategories: ISubcategory[] } & ICategory | null>();

  if (!category) return [];

  const subcategoriesWithCounts: SubcategoryDTO[] = await Promise.all(
    category.subcategories.map(async (subcat) => {
      const productCount = await Product.countDocuments({
        category: category.slug,
        subcategory: subcat.subcategorySlug,
      });

      return {
        _id: subcat._id.toString(),        // type-safe
        name: subcat.name,
        slug: subcat.subcategorySlug,      // required by SubcategoriesGrid
        description: subcat.description,
        image: subcat.image,
        categoryName: subcat.categoryName,
        subcategorySlug: subcat.subcategorySlug,
        productCount,
      };
    })
  );

  return subcategoriesWithCounts;
}


// Fetch all categories
export async function getAllCategories(): Promise<CategoryDTO[]> {
  await connectToDB();
  const categories = await Category.find({}).populate("subcategories").lean();

  return categories.map((cat: any) => ({
    id: (cat._id as Types.ObjectId).toString(),
    name: cat.name,
    slug: cat.slug,
    image: cat.image || "/placeholder.jpg",
    href: `/category/${cat.slug}`,
    icon: cat.icon || "",
    subcategories: cat.subcategories?.map((sub: any) => ({
      id: (sub._id as Types.ObjectId).toString(),
      name: sub.name,
      description: sub.description,
      image: sub.image || "/placeholder.jpg",
      productCount: sub.products?.length || 0,
      categoryName: cat.name,
      subcategorySlug: cat.slug,
      products: sub.products?.map((p: any) => ({
        _id: p._id.toString(),
        id: p._id.toString(),
        name: p.name,
        price: p.price,
        images: p.images,
        seller: p.seller,
        category: p.category?.toString() || cat.id,
        details: p.details || {},
        createdAt: p.createdAt || new Date(),
        updatedAt: p.updatedAt || new Date(),
      })),
    })) || [],
  }));
}
