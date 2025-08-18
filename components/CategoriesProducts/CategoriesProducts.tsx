// components/CategoriesProducts.tsx
"use client"

import { useEffect, useState } from "react"
import { fetchProductsByCategory } from "@/controllers/products"
import { ProductInterface } from "@/types/product"
import { Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "../ProductCard/ProductCard"

interface CategoriesProductsProps {
  categorySlug: string
  sortBy?: "newest" | "price-low" | "price-high" | "rating"
  searchQuery?: string
}

export default function CategoriesProducts({
  categorySlug,
  sortBy = "newest",
  searchQuery = "",
}: CategoriesProductsProps) {
  const [products, setProducts] = useState<ProductInterface[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      try {
        const results = await fetchProductsByCategory({ categorySlug, sortBy, searchQuery })
        setProducts(results)
      } catch (err) {
        console.error("Failed to fetch products:", err)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [categorySlug, sortBy, searchQuery])

  if (loading) return <p>Loading products...</p>
  if (!loading && products.length === 0) return <p>No products found in this category.</p>

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
