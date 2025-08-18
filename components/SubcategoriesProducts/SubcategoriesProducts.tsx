// components/SubcategoriesProducts.tsx
"use client"

import { useEffect, useState } from "react"
import { fetchProductsBySubcategory } from "@/controllers/products"
import { ProductInterface } from "@/types/product"
import { Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "../ProductCard/ProductCard"
import Loading from "../Loading/loading"

interface SubcategoriesProductsProps {
  subcategorySlug: string
  sortBy?: "newest" | "price-low" | "price-high" | "rating"
  searchQuery?: string
}

export default function SubcategoriesProducts({
  subcategorySlug,
  sortBy = "newest",
  searchQuery = "",
}: SubcategoriesProductsProps) {
  const [products, setProducts] = useState<ProductInterface[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      try {
        const results = await fetchProductsBySubcategory({ subcategory: subcategorySlug, sortBy, searchQuery })
        setProducts(results)
      } catch (err) {
        console.error("Failed to fetch products:", err)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [subcategorySlug, sortBy, searchQuery])

  if (loading) return <Loading />
  if (!loading && products.length === 0) return <p className="font-semibold">No products found.</p>

  return (
    <div>
      {/* View Mode Toggle */}
      <div className="flex justify-end mb-4">
        <div className="flex border rounded-lg bg-white">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Products */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        }
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}
