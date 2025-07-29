"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Star, MapPin, TrendingUp, Search, ChevronRight, Grid, List } from "lucide-react"

// Enhanced mock data with subcategories and products
const categoryData = {
  grains: {
    name: "Grains & Cereals",
    description: "High-quality grains and cereals from verified farmers across Nigeria",
    icon: "🌾",
    subcategories: [
      {
        id: "rice",
        name: "Rice",
        description: "Premium rice varieties",
        productCount: 45,
        image: "/placeholder.svg?height=120&width=120&text=Rice",
      },
      {
        id: "wheat",
        name: "Wheat",
        description: "Quality wheat grains",
        productCount: 23,
        image: "/placeholder.svg?height=120&width=120&text=Wheat",
      },
      {
        id: "corn",
        name: "Corn",
        description: "Fresh and dried corn",
        productCount: 67,
        image: "/placeholder.svg?height=120&width=120&text=Corn",
      },
      {
        id: "barley",
        name: "Barley",
        description: "Premium barley grains",
        productCount: 12,
        image: "/placeholder.svg?height=120&width=120&text=Barley",
      },
      {
        id: "oats",
        name: "Oats",
        description: "Nutritious oat varieties",
        productCount: 8,
        image: "/placeholder.svg?height=120&width=120&text=Oats",
      },
      {
        id: "millet",
        name: "Millet",
        description: "Traditional millet grains",
        productCount: 15,
        image: "/placeholder.svg?height=120&width=120&text=Millet",
      },
    ],
    products: {
      rice: [
        {
          id: "1",
          title: "Premium Organic Rice - 50kg",
          price: 25000,
          location: "Lagos, Nigeria",
          seller: "Adebayo Farms",
          rating: 4.8,
          image: "/placeholder.svg?height=200&width=300&text=Premium+Rice",
          boosted: true,
          subcategory: "rice",
          description: "High-quality organic rice grown without pesticides",
          condition: "New",
          postedDate: "2024-01-15",
        },
        {
          id: "2",
          title: "Jasmine Rice - 25kg",
          price: 18000,
          location: "Ogun, Nigeria",
          seller: "Rice Masters Ltd",
          rating: 4.6,
          image: "/placeholder.svg?height=200&width=300&text=Jasmine+Rice",
          boosted: false,
          subcategory: "rice",
          description: "Aromatic jasmine rice perfect for special occasions",
          condition: "New",
          postedDate: "2024-01-14",
        },
        {
          id: "3",
          title: "Brown Rice - 50kg",
          price: 22000,
          location: "Kebbi, Nigeria",
          seller: "Healthy Grains Co",
          rating: 4.7,
          image: "/placeholder.svg?height=200&width=300&text=Brown+Rice",
          boosted: false,
          subcategory: "rice",
          description: "Nutritious brown rice with natural fiber",
          condition: "New",
          postedDate: "2024-01-13",
        },
      ],
      wheat: [
        {
          id: "4",
          title: "Hard Red Wheat - 100kg",
          price: 35000,
          location: "Kaduna, Nigeria",
          seller: "Northern Wheat Farms",
          rating: 4.5,
          image: "/placeholder.svg?height=200&width=300&text=Hard+Wheat",
          boosted: false,
          subcategory: "wheat",
          description: "Premium hard red wheat for flour production",
          condition: "New",
          postedDate: "2024-01-12",
        },
        {
          id: "5",
          title: "Soft White Wheat - 50kg",
          price: 28000,
          location: "Plateau, Nigeria",
          seller: "Highland Grains",
          rating: 4.4,
          image: "/placeholder.svg?height=200&width=300&text=Soft+Wheat",
          boosted: true,
          subcategory: "wheat",
          description: "Soft white wheat ideal for pastries and cakes",
          condition: "New",
          postedDate: "2024-01-11",
        },
      ],
      corn: [
        {
          id: "6",
          title: "Yellow Corn - 100kg",
          price: 18000,
          location: "Kano, Nigeria",
          seller: "Northern Grains Co.",
          rating: 4.6,
          image: "/placeholder.svg?height=200&width=300&text=Yellow+Corn",
          boosted: false,
          subcategory: "corn",
          description: "Fresh yellow corn suitable for animal feed and processing",
          condition: "New",
          postedDate: "2024-01-10",
        },
        {
          id: "7",
          title: "White Corn - 50kg",
          price: 16000,
          location: "Benue, Nigeria",
          seller: "Middle Belt Farms",
          rating: 4.3,
          image: "/placeholder.svg?height=200&width=300&text=White+Corn",
          boosted: false,
          subcategory: "corn",
          description: "Quality white corn for food processing",
          condition: "New",
          postedDate: "2024-01-09",
        },
      ],
    },
  },
  fruits: {
    name: "Fruits & Vegetables",
    description: "Fresh fruits and vegetables harvested daily from local farms",
    icon: "🍎",
    subcategories: [
      {
        id: "fresh-fruits",
        name: "Fresh Fruits",
        description: "Seasonal fresh fruits",
        productCount: 89,
        image: "/placeholder.svg?height=120&width=120&text=Fruits",
      },
      {
        id: "vegetables",
        name: "Vegetables",
        description: "Farm-fresh vegetables",
        productCount: 156,
        image: "/placeholder.svg?height=120&width=120&text=Vegetables",
      },
      {
        id: "herbs",
        name: "Herbs",
        description: "Aromatic cooking herbs",
        productCount: 34,
        image: "/placeholder.svg?height=120&width=120&text=Herbs",
      },
      {
        id: "spices",
        name: "Spices",
        description: "Traditional spices",
        productCount: 67,
        image: "/placeholder.svg?height=120&width=120&text=Spices",
      },
    ],
    products: {
      vegetables: [
        {
          id: "8",
          title: "Fresh Tomatoes - 50kg",
          price: 15000,
          location: "Kano, Nigeria",
          seller: "Musa Agriculture",
          rating: 4.6,
          image: "/placeholder.svg?height=200&width=300&text=Fresh+Tomatoes",
          boosted: true,
          subcategory: "vegetables",
          description: "Farm-fresh tomatoes harvested daily",
          condition: "New",
          postedDate: "2024-01-15",
        },
      ],
    },
  },
  livestock: {
    name: "Livestock & Dairy",
    description: "Quality livestock and dairy products from certified farms",
    icon: "🐄",
    subcategories: [
      {
        id: "cattle",
        name: "Cattle",
        description: "Beef and dairy cattle",
        productCount: 78,
        image: "/placeholder.svg?height=120&width=120&text=Cattle",
      },
      {
        id: "poultry",
        name: "Poultry",
        description: "Chickens, ducks, and more",
        productCount: 234,
        image: "/placeholder.svg?height=120&width=120&text=Poultry",
      },
      {
        id: "goats",
        name: "Goats",
        description: "Meat and dairy goats",
        productCount: 45,
        image: "/placeholder.svg?height=120&width=120&text=Goats",
      },
      {
        id: "sheep",
        name: "Sheep",
        description: "Quality sheep breeds",
        productCount: 67,
        image: "/placeholder.svg?height=120&width=120&text=Sheep",
      },
    ],
    products: {
      cattle: [
        {
          id: "9",
          title: "Holstein Dairy Cow",
          price: 450000,
          location: "Plateau, Nigeria",
          seller: "Cattle Ranch Ltd",
          rating: 4.7,
          image: "/placeholder.svg?height=200&width=300&text=Holstein+Cow",
          boosted: false,
          subcategory: "cattle",
          description: "Healthy Holstein dairy cow with excellent milk production",
          condition: "New",
          postedDate: "2024-01-14",
        },
      ],
    },
  },
}

export default function CategoryPage({ params }: { params: { id: string } }) {
  const [category, setCategory] = useState<any>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [productsLoading, setProductsLoading] = useState(false)
  const [sortBy, setSortBy] = useState<string>("newest")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Fetch category data
  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const categoryInfo = categoryData[params.id as keyof typeof categoryData]
      if (categoryInfo) {
        setCategory(categoryInfo)
      }
      setLoading(false)
    }

    fetchCategory()
  }, [params.id])

  // Fetch products when subcategory is selected
  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedSubcategory || !category) return

      setProductsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 800))

      const subcategoryProducts = category.products[selectedSubcategory] || []
      let filtered = [...subcategoryProducts]

      // Filter by search query
      if (searchQuery) {
        filtered = filtered.filter(
          (product: any) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      }

      // Sort products
      filtered.sort((a: any, b: any) => {
        switch (sortBy) {
          case "price-low":
            return a.price - b.price
          case "price-high":
            return b.price - a.price
          case "rating":
            return b.rating - a.rating
          case "newest":
          default:
            return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
        }
      })

      setProducts(filtered)
      setProductsLoading(false)
    }

    fetchProducts()
  }, [selectedSubcategory, category, searchQuery, sortBy])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="animate-pulse">
            <Skeleton className="h-8 w-1/3 mb-4" />
            <Skeleton className="h-4 w-2/3 mb-8" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Skeleton key={i} className="h-32 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-8">The category you're looking for doesn't exist.</p>
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
          <Link href="/" className="hover:text-green-600">
            EmilyAgros
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/marketplace" className="hover:text-green-600">
            All categories
          </Link>
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
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{category.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{category.name}</h1>
              <p className="text-gray-600">{category.description}</p>
            </div>
          </div>

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
        </div>

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
                    <div className="mb-4">
                      <Image
                        src={subcategory.image || "/placeholder.svg"}
                        alt={subcategory.name}
                        width={120}
                        height={120}
                        className="w-full h-24 object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform"
                      />
                    </div>
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

            {/* Products Loading */}
            {productsLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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

            {/* Products Grid */}
            {!productsLoading && products.length > 0 && (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
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
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Boosted
                              </Badge>
                            )}
                          </div>

                          <div className="p-4">
                            <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.title}</h3>
                            <p className="text-2xl font-bold text-green-600 mb-2">₦{product.price.toLocaleString()}</p>

                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <MapPin className="w-4 h-4 mr-1" />
                              {product.location}
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

                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-sm text-gray-600">
                                <MapPin className="w-4 h-4 mr-1" />
                                {product.location}
                              </div>
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                                <span className="text-sm">{product.rating}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <Button asChild size="sm">
                              <Link href={`/product/${product.id}`}>View</Link>
                            </Button>
                            <Button asChild variant="outline" size="sm">
                              <Link href={`/contact-seller/${product.id}`}>Contact</Link>
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* No Products Found */}
            {!productsLoading && products.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery
                    ? `No products match "${searchQuery}" in this subcategory.`
                    : "No products available in this subcategory yet."}
                </p>
                <div className="flex gap-4 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                    }}
                  >
                    Clear Search
                  </Button>
                  <Button asChild>
                    <Link href="/post-product">Post Your Product</Link>
                  </Button>
                </div>
              </div>
            )}

            {/* Load More */}
            {!productsLoading && products.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Products
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
