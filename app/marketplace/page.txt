import { Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import MarketplaceFilters from "@/components/MarketplaceFilters/marketplace-filters"
import ProductGrid from "@/components/ProductGrid/ProductGrid"
import { Product } from "@/types/types";
import Loading from "../loading";


interface MarketplacePage {
  products: Product[];
  viewMode?: "grid" | "list";
}

export default function MarketplacePage() {

  const products = [] || null
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
            fallback={<Loading /> }
          >
            <MarketplaceFilters />
          </Suspense>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductGrid products={products} viewMode="grid" />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
