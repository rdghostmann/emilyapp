import CategoryGrid from "@/components/CategoryGrid"
import FeaturedServices from "@/components/FeaturedServices"
import HeroSection from "@/components/HeroSection"
import MobileTabNavigation from "@/components/MobileTabNavigation"
import TopNavigation from "@/components/TopNavigation"
import { Suspense } from "react"
import Loading from "./loading"
import CallToAction from "@/components/CallToAction/CallToAction"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import TrendingProducts from "@/components/trending-products"
import FeaturedProducts from "@/components/featured-products"

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  const username = session?.user?.username || "Guest"

  return (
    <>
      <TopNavigation username={username} />
      <div className="min-h-screen bg-gray-50">
        <HeroSection />
        <CallToAction />
        <div className="px-4 py-6 space-y-8">
          <CategoryGrid />
          <FeaturedServices />
          <Suspense fallback={<Loading />}>
            <TrendingProducts />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <FeaturedProducts />
          </Suspense>

        </div>
      </div>
      <MobileTabNavigation />
    </>
  )
}
