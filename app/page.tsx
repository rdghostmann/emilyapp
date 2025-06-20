import CategoryGrid from "@/components/CategoryGrid"
import FeaturedProducts from "@/components/FeaturedProducts"
import FeaturedServices from "@/components/FeaturedServices"
import HeroSection from "@/components/HeroSection"
import ProductFeed from "@/components/ProductFeed"
import { Suspense } from "react"


export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <div className="px-4 py-6 space-y-8">
        <CategoryGrid />
        <FeaturedServices />
        <FeaturedProducts />
        <Suspense fallback={<div className="text-center py-8">Loading products...</div>}>
          <ProductFeed />
        </Suspense>
      </div>
    </div>
  )
}
