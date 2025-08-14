import CategoriesSection from "@/components/CategorySection/categories-section"
import { Suspense } from "react"

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">All Categories</h1>
          <p className="text-gray-600">
            Explore our wide range of agricultural categories and find exactly what you're looking for
          </p>
        </div>

        <Suspense fallback={<div>Loading categories...</div>}>
          <CategoriesSection />
        </Suspense>
      </div>
    </div>
  )
}
