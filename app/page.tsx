import CategoryGrid from "@/components/CategoryGrid"
import FeaturedProducts from "@/components/FeaturedProducts"
import FeaturedServices from "@/components/FeaturedServices"
import HeroSection from "@/components/HeroSection"
import MobileTabNavigation from "@/components/MobileTabNavigation"
import ProductFeed from "@/components/ProductFeed"
import TopNavigation from "@/components/TopNavigation"
import { Suspense } from "react"
import Loading from "./loading"


export default function HomePage() {
  return (
    <>
      <TopNavigation />
      <div className="min-h-screen bg-gray-50">
        <HeroSection />
        <div className="px-4 py-6 space-y-8">
          <CategoryGrid />
          <FeaturedServices />
          <FeaturedProducts />
          <Suspense fallback={<Loading />}>
            {/* ProductFeed is a lazy-loaded component */}
            <ProductFeed />
          </Suspense>
        </div>
      </div>
      <MobileTabNavigation />
    </>
  )
}
