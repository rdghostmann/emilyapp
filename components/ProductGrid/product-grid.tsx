"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, TrendingUp, Heart } from "lucide-react"

const products = [
  {
    id: "1",
    title: "Premium Organic Rice - 50kg",
    price: 25000,
    location: "Lagos, Nigeria",
    seller: "Adebayo Farms",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
    boosted: true,
    category: "Grains",
    timePosted: "2 hours ago",
  },
  {
    id: "2",
    title: "Fresh Tomatoes - 50kg",
    price: 15000,
    location: "Kano, Nigeria",
    seller: "Musa Agriculture",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300",
    boosted: true,
    category: "Vegetables",
    timePosted: "5 hours ago",
  },
  {
    id: "3",
    title: "Hybrid Maize Seeds - 10kg",
    price: 8500,
    location: "Kaduna, Nigeria",
    seller: "Green Valley Seeds",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300",
    boosted: false,
    category: "Seeds",
    timePosted: "1 day ago",
  },
  {
    id: "4",
    title: "Dairy Cow - Holstein",
    price: 450000,
    location: "Plateau, Nigeria",
    seller: "Cattle Ranch Ltd",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
    boosted: false,
    category: "Livestock",
    timePosted: "2 days ago",
  },
  {
    id: "5",
    title: "Organic Cassava Flour - 25kg",
    price: 12000,
    location: "Ogun, Nigeria",
    seller: "Cassava Processing Co.",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300",
    boosted: false,
    category: "Processed Foods",
    timePosted: "3 days ago",
  },
  {
    id: "6",
    title: "Broiler Chickens - Live (10 pieces)",
    price: 35000,
    location: "Oyo, Nigeria",
    seller: "Poultry Farm Ltd",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
    boosted: false,
    category: "Poultry",
    timePosted: "4 days ago",
  },
]

export default function ProductGrid() {
  const [sortBy, setSortBy] = useState("newest")
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
      default:
        return new Date(b.timePosted).getTime() - new Date(a.timePosted).getTime()
    }
  })

  return (
    <div className="space-y-6">
      {/* Sort and Results Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <p className="text-gray-600">{products.length} products found</p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow group">
            <CardContent className="p-0">
              <div className="relative">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />

                {/* Badges */}
                <div className="absolute top-2 left-2 flex gap-2">
                  {product.boosted && (
                    <Badge className="bg-orange-500">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Boosted
                    </Badge>
                  )}
                  <Badge variant="secondary">{product.category}</Badge>
                </div>

                {/* Favorite Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                    }`}
                  />
                </Button>
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
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Products
        </Button>
      </div>
    </div>
  )
}
