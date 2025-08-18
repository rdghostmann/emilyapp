// components/SubcategoriesGrid.tsx
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Subcategory {
  _id: string
  name: string
  slug: string
  image?: string
  description?: string
  productCount?: number
}

interface SubcategoriesGridProps {
  subcategories: Subcategory[]
  onSelect?: (slug: string) => void // New prop
  selectedSlug?: string
}

export default function SubcategoriesGrid({ subcategories, onSelect, selectedSlug }: SubcategoriesGridProps) {
  if (!subcategories || subcategories.length === 0) return null

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Browse Subcategories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {subcategories.map((subcategory) => (
          <Card
            key={subcategory._id}
            className={`hover:shadow-lg transition-shadow cursor-pointer group ${
              selectedSlug === subcategory.slug ? "border-2 border-green-600" : ""
            }`}
            onClick={() => onSelect?.(subcategory.slug)}
          >
            <CardContent className="p-4 text-center">
              <div className="mb-4">
                <Image
                  src={subcategory.image || "/placeholder.svg"}
                  alt={subcategory.name}
                  width={96}
                  height={96}
                  className="w-24 h-24 border-2 border-gray-200 mx-auto object-cover bg-center rounded-full mb-3 group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{subcategory.name}</h3>
              {subcategory.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{subcategory.description}</p>
              )}
              {subcategory.productCount !== undefined && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {subcategory.productCount} products
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
