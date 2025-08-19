// /ornamentals/OrnamentalPage.tsx
"use client"
import React, { useState } from "react"
import SubcategoriesGrid from "@/components/SubCategoriesGrid/SubcategoriesGrid"
import SubcategoriesProducts from "@/components/SubcategoriesProducts/SubcategoriesProducts"
import { SubcategoryDTO } from "@/controllers/categories"

interface OrnamentalPageProps {
  subcategories: SubcategoryDTO[]
}

export default function OrnamentalPage({ subcategories }: OrnamentalPageProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState(subcategories[0]?.subcategorySlug)

  // Map DTO to Grid's Subcategory type
  const gridSubcategories = subcategories.map((subcat) => ({
    _id: subcat._id.toString(),
    name: subcat.name,
    slug: subcat.subcategorySlug, // map for grid
    image: subcat.image,
    description: subcat.description,
    productCount: subcat.productCount,
  }))

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Subcategories Grid */}
      <SubcategoriesGrid
        subcategories={gridSubcategories}
        selectedSlug={selectedSubcategory}
        onSelect={(slug) => setSelectedSubcategory(slug)}
      />

      {/* Products Grid */}
      {selectedSubcategory && <SubcategoriesProducts subcategorySlug={selectedSubcategory} />}
    </div>
  )
}
