// /category/[slug]/CategoryPageClient.tsx
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Star, ChevronRight, Search, Grid, List, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { CategoryDTO } from "@/controllers/categories"

interface CategoryPageClientProps {
  initialCategory: CategoryDTO
}

export default function CategoryPageClient({ initialCategory }: CategoryPageClientProps) {
  const [category] = useState<CategoryDTO>(initialCategory)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [products, setProducts] = useState<any[]>(initialCategory.products || [])
  const [productsLoading, setProductsLoading] = useState(false)
  const [sortBy, setSortBy] = useState<string>("newest")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Fetch products when subcategory/search/sort changes
  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedSubcategory) return

      setProductsLoading(true)
      try {
        const res = await fetch(
          `/api/products?subcategory=${selectedSubcategory}&search=${searchQuery}&sortBy=${sortBy}`
        )
        const data = await res.json()
        setProducts(data.products)
      } catch (err) {
        console.error("Error fetching products:", err)
      } finally {
        setProductsLoading(false)
      }
    }

    fetchProducts()
  }, [selectedSubcategory, searchQuery, sortBy])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-green-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/marketplace" className="hover:text-green-600">All categories</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-800">{category.name}</span>
          {selectedSubcategory && (
            <>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-800">
                {category.subcategories?.find(sub => sub.id === selectedSubcategory)?.name}
              </span>
            </>
          )}
        </nav>

        {/* Category Header */}
        <div className="mb-8 flex items-center gap-3">
          {category.icon && <span className="text-4xl"><category.icon /></span>}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{category.name}</h1>
            <p className="text-gray-600">{category.description}</p>
          </div>
        </div>

        {/* Subcategories Grid */}
        {!selectedSubcategory && category.subcategories?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Browse Subcategories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {category.subcategories?.map(sub => (
                <Card
                  key={sub.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedSubcategory(sub.id)}
                >
                  <CardContent className="p-4 text-center">
                    <Image
                      src={sub.image || "/placeholder.svg"}
                      alt={sub.name}
                      width={120}
                      height={120}
                      className="w-full h-24 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-gray-800 mb-2">{sub.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{sub.description}</p>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {sub.productCount} products
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Products Section */}
        {selectedSubcategory && (
          <div>
            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white"
                />
              </div>
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 bg-white"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-lg bg-white">
                  <Button variant={viewMode === "grid" ? "default" : "ghost"} size="icon" onClick={() => setViewMode("grid")}>
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button variant={viewMode === "list" ? "default" : "ghost"} size="icon" onClick={() => setViewMode("list")}>
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products */}
            {productsLoading && <p>Loading products...</p>}
            {!productsLoading && products.length === 0 && <p>No products found.</p>}
            {!productsLoading && products.length > 0 && (
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
                {products.map(p => (
                  <Card key={p.id} className="hover:shadow-lg transition-shadow">
                    <CardContent>
                      <Link href={`/product/${p.id}`}>
                        <Image src={p.images?.[0] || "/placeholder.svg"} alt={p.name} width={300} height={200} className="rounded-t-lg" />
                        <h3 className="font-semibold text-gray-800 mt-2">{p.name}</h3>
                        <p className="text-2xl font-bold text-green-600">₦{p.price.toLocaleString()}</p>
                        <span className="text-sm text-gray-600">{p.seller?.username || "Seller"}</span>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
