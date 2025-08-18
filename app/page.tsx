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
        <Suspense
          fallback={
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
              {Array.from({ length: 16 }).map((_, idx) => (
                <div
                  key={idx}
                  className="animate-pulse bg-gray-200 rounded-lg h-32 w-full"
                />
              ))}
            </div>
          }
        >
          <CategoriesGrid />
        </Suspense>

        <Suspense
          fallback={
            <div className="grid grid-cols-2  md:grid-cols-3 gap-4 p-4">
              {Array.from({ length: 16 }).map((_, idx) => (
                <div
                  key={idx}
                  className="animate-pulse bg-gray-200 rounded-lg h-32 w-full"
                />
              ))}
            </div>
          }
        >          <TrendingProducts />
        </Suspense>
        
        <Suspense
          fallback={
            <div className="grid grid-cols-2  md:grid-cols-3 gap-4 p-4">
              {Array.from({ length: 16 }).map((_, idx) => (
                <div
                  key={idx}
                  className="animate-pulse bg-gray-200 rounded-lg h-32 w-full"
                />
              ))}
            </div>
          }
        >          
        
          <FeaturedProducts />
        </Suspense>


      </div>
    </div>
  );
}
