// app/category/[slug]/CategoryPageClient.tsx

"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { ChevronRight } from "lucide-react"
import { CategoryDTO } from "@/controllers/categories"
import SubcategoriesProducts from "@/components/SubcategoriesProducts/SubcategoriesProducts"
import CategoriesProducts from "@/components/CategoriesProducts/CategoriesProducts"

interface CategoryPageClientProps {
  initialCategory: CategoryDTO
}

export default function CategoryPageClient({ initialCategory }: CategoryPageClientProps) {
  const [category] = useState<CategoryDTO>(initialCategory)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)

  const subcategories = category.subcategories || []

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
                <Link href={`/category/${category.slug}`} className="text-gray-800">{category.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {selectedSubcategory && (
              <>
                <BreadcrumbSeparator><ChevronRight className="w-4 h-4" /></BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <span className="text-gray-800">
                      {category.subcategories?.find(sub => sub.subcategorySlug === selectedSubcategory)?.name}
                    </span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
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

        {/* Subcategories Grid */}
        {!selectedSubcategory && subcategories.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Browse Subcategories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {subcategories.map(sub => (
                <Card
                  key={sub.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedSubcategory(sub.subcategorySlug)}
                >
                  <CardContent className="p-4 text-center">
                    <Image
                      src={sub.image || "/placeholder.svg"}
                      alt={sub.name}
                      width={120}
                      height={120}
                      className="w-full h-24 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-gray-800 mb-2">{sub.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{sub.description}</p>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {sub.productCount} products
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Products Section */}
        {selectedSubcategory ? (
          <SubcategoriesProducts subcategorySlug={selectedSubcategory} />
        ) : (
          <CategoriesProducts categorySlug={category.slug} />
        )}
      </div>
    </div>
  )
}
