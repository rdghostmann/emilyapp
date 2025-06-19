import { Suspense } from "react"
import HeroSection from "./components/HeroSection"
import CategoryGrid from "./components/CategoryGrid"
import FeaturedServices from "./components/FeaturedServices"
import FeaturedProducts from "./components/FeaturedProducts"
import ProductFeed from "./components/ProductFeed"

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
