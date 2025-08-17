"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Star, TrendingUp, ChevronRight, Search, Grid, List } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { categories } from "@/constants/categories"
import { useParams } from "next/navigation"

export default function CategoryPageClient() {
  const params = useParams() // get dynamic slug param

  const [category, setCategory] = useState<any>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [productsLoading, setProductsLoading] = useState(false)
  const [sortBy, setSortBy] = useState<string>("newest")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Fetch category by slug
  useEffect(() => {
    setLoading(true)
    const cat = categories.find(c => c.id === params.slug)
    setCategory(cat || null)
    setLoading(false)
  }, [params.slug])

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedSubcategory) return

      setProductsLoading(true)
      const res = await fetch(
        `/api/products?subcategory=${selectedSubcategory}&search=${searchQuery}&sortBy=${sortBy}`
      )
      const data = await res.json()
      setProducts(data.products)
      setProductsLoading(false)
    }

    fetchProducts()
  }, [selectedSubcategory, searchQuery, sortBy])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading category...</p>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-8">
            The category you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button asChild>
            <Link href="/marketplace">Back to Marketplace</Link>
          </Button>
        </div>
      </div>
    )
  }

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
                {category.subcategories.find((sub: any) => sub.id === selectedSubcategory)?.name}
              </span>
            </>
          )}
        </nav>

        {/* Category Header */}
        <div className="mb-8 flex items-center gap-3">
          <span className="text-4xl">{category.icon && <category.icon />}</span>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{category.name}</h1>
            <p className="text-gray-600">{category.description}</p>
          </div>
        </div>

        {/* Back button for subcategory */}
        {selectedSubcategory && (
          <Button
            variant="outline"
            onClick={() => {
              setSelectedSubcategory(null)
              setProducts([])
            }}
            className="mb-4 bg-transparent"
          >
            ← Back to {category.name}
          </Button>
        )}

        {/* Subcategories Grid */}
        {!selectedSubcategory && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Browse Subcategories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {category.subcategories.map((subcategory: any) => (
                <Card
                  key={subcategory.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => setSelectedSubcategory(subcategory.id)}
                >
                  <CardContent className="p-4 text-center">
                    <Image
                      src={subcategory.image || "/placeholder.svg"}
                      alt={subcategory.name}
                      width={120}
                      height={120}
                      className="w-full h-24 object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform"
                    />
                    <h3 className="font-semibold text-gray-800 mb-2">{subcategory.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{subcategory.description}</p>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {subcategory.productCount} products
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
            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white"
                />
              </div>

              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-lg bg-white">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                {productsLoading ? "Loading..." : `${products.length} product${products.length !== 1 ? "s" : ""} found`}
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>

            {/* Products Loading Skeleton */}
            {productsLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-0">
                      <Skeleton className="w-full h-48 rounded-t-lg" />
                      <div className="p-4 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Products Grid/List */}
            {!productsLoading && products.length > 0 && (
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
                {products.map((product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      {viewMode === "grid" ? (
                        <>
                          <div className="relative">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.title}
                              width={300}
                              height={200}
                              className="w-full h-48 object-cover rounded-t-lg"
                            />
                            {product.boosted && (
                              <Badge className="absolute top-2 left-2 bg-orange-500">
                                <TrendingUp className="w-3 h-3 mr-1" /> Boosted
                              </Badge>
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.title}</h3>
                            <p className="text-2xl font-bold text-green-600 mb-2">₦{product.price.toLocaleString()}</p>
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <MapPin className="w-4 h-4 mr-1" /> {product.location}
                            </div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm text-gray-600">{product.seller}</span>
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                                <span className="text-sm">{product.rating}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button asChild size="sm" className="flex-1">
                                <Link href={`/product/${product.id}`}>View Details</Link>
                              </Button>
                              <Button asChild variant="outline" size="sm">
                                <Link href={`/contact-seller/${product.id}`}>Contact</Link>
                              </Button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex p-4 space-x-4">
                          <div className="relative flex-shrink-0">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.title}
                              width={120}
                              height={120}
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                            {product.boosted && (
                              <Badge className="absolute -top-1 -right-1 bg-orange-500 text-xs">Boosted</Badge>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 mb-1">{product.title}</h3>
                            <p className="text-xl font-bold text-green-600 mb-2">₦{product.price.toLocaleString()}</p>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <span>{product.seller}</span>
                              <span>{product.rating} <Star className="w-3 h-3 text-yellow-400 inline-block" /></span>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* No products */}
            {!productsLoading && products.length === 0 && (
              <p className="text-gray-600 mt-4">No products found in this subcategory.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
