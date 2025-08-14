import { Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import MarketplaceFilters from "@/components/MarketplaceFilters/marketplace-filters"
import ProductGrid from "@/components/ProductGrid/product-grid"

export default function MarketplacePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Marketplace</h1>
        <p className="text-gray-600">Discover fresh products from verified farmers across Nigeria</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <Suspense
            fallback={
              <Card>
                <CardContent className="p-4">Loading filters...</CardContent>
              </Card>
            }
          >
            <MarketplaceFilters />
          </Suspense>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductGrid />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
