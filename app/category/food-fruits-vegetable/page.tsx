// /food-fruits-vegetables/page.tsx
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
import FoodFruitsVegPage from "./FoodFruitsVegPage"

export default async function Page() {
  const category = await getCategoryBySlug("food-fruits-vegetables")
  if (!category) return <p>Category not found</p>

  const subcategories = await getSubcategoriesByCategory(category.slug)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
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

        <div className="mb-8 flex items-center gap-3">
          {category.icon && <span className="text-4xl"><category.icon /></span>}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{category.name}</h1>
            <p className="text-gray-600">{category.description}</p>
          </div>
        </div>

        <FoodFruitsVegPage subcategories={subcategories} />
      </div>
    </div>
  )
}
