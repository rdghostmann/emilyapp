import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { Suspense } from "react"
import HeroSection from "@/components/Hero/hero-section"
import CallToAction from "@/components/CallToAction/CallToAction"
import CategoriesGrid from "@/components/CategoriesGrid/categories-grid"
import FeaturedProducts from "@/components/FeaturedProducts/featured-products"
import TrendingProducts from "@/components/Trending/trending-products"
import Banner from "@/components/Banner/Banner"


export default async function HomePage() {
  const session = await getServerSession(authOptions)
  const username = session?.user?.username || "Guest"

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="hidden">
        <HeroSection />
      </div>
      <Banner />
      <CallToAction />
      <div className="px-4 py-6 space-y-8">
        {/* Categories Grid - Mobile First */}
        <Suspense fallback={<div>Loading categories...</div>}>
          <CategoriesGrid />
        </Suspense>

        <Suspense fallback={<div>Loading trending products...</div>}>
          <TrendingProducts />
        </Suspense>

        <Suspense fallback={<div>Loading featured products...</div>}>
          <FeaturedProducts />
        </Suspense>

      </div>
    </div>
  );
}
