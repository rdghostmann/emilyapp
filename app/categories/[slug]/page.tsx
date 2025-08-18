// /categories/[slug]/page.tsx
import React from "react"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { ChevronRight } from "lucide-react"
import { getCategoryBySlug, getSubcategoriesByCategory } from "@/controllers/categories"
import dynamic from "next/dynamic"

// Dynamically import category page component based on slug
const categoryComponents: Record<string, any> = {
  "animal-feed": dynamic(() => import("@/app/category/animal-feed/AnimalFeed")),
  "animal-mating": dynamic(() => import("@/app/category/animal-mating/AnimalMatingPage")),
  "animal-pharmacy": dynamic(() => import("@/app/category/animal-pharmacy/AnimalPharmacyPage")),
  "livestock-pets": dynamic(() => import("@/app/category/livestock-pets/LivestockPetsPage")),
  "food-fruits-vegetables": dynamic(() => import("@/app/category/food-fruits-vegetable/FoodFruitsVegPage")),
}

interface PageProps {
  params: { slug: string }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = params

  // Fetch category
  const category = await getCategoryBySlug(slug)
  if (!category) return <p>Category not found</p>

  // Fetch subcategories
  const subcategories = await getSubcategoriesByCategory(slug)

  // Determine the component for this category
  const CategoryComponent = categoryComponents[slug]
  if (!CategoryComponent) return <p>Category page component not found</p>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">

        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="hover:text-green-600">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator><ChevronRight className="w-4 h-4" /></BreadcrumbSeparator>

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/categories" className="hover:text-green-600">All Categories</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator><ChevronRight className="w-4 h-4" /></BreadcrumbSeparator>

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <span className="text-gray-800">{category.name}</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Category Header */}
        <div className="mb-8 flex items-center gap-3">
          {category.icon && <span className="text-4xl"><category.icon /></span>}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{category.name}</h1>
            <p className="text-gray-600">{category.description}</p>
          </div>
        </div>

        {/* Category-specific page */}
        <CategoryComponent subcategories={subcategories} />

      </div>
    </div>
  )
}
