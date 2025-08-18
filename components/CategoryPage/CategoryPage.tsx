// components/CategoryPage.tsx
"use client"
import React, { useState } from "react"
import SubcategoriesGrid from "@/components/SubCategoriesGrid/SubcategoriesGrid"
import SubcategoriesProducts from "@/components/SubcategoriesProducts/SubcategoriesProducts"

interface SubcategoryDTO {
  _id: string
  name: string
  slug: string
  description?: string
  image?: string
  productCount?: number
}


interface CategoryPageProps {
  subcategories: SubcategoryDTO[]
}

export default function CategoryPage({ subcategories }: CategoryPageProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState(subcategories[0]?.slug)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Subcategories Grid */}
      <SubcategoriesGrid
        subcategories={subcategories}
        selectedSlug={selectedSubcategory}
        onSelect={(slug) => setSelectedSubcategory(slug)}
      />

      {/* Products Grid */}
      {selectedSubcategory && <SubcategoriesProducts subcategorySlug={selectedSubcategory} />}
    </div>
  )
}
