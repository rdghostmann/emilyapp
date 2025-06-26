"use client"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide"

const featuredProducts = [
  {
    id: "1",
    title: "Organic Tomatoes",
    price: 4.99,
    originalPrice: 6.99,
    unit: "per kg",
    image: "/product/organic-tomatoes.jpg",
    rating: 4.8,
    discount: 30,
    farmer: "John Smith",
    badge: "Best Seller",
  },
  {
    id: "2",
    title: "Fresh Apples",
    price: 5.99,
    originalPrice: 7.99,
    unit: "per kg",
    image: "/product/fresh-apples.jpg",
    rating: 4.9,
    discount: 25,
    farmer: "Sarah Wilson",
    badge: "Premium",
  },
  {
    id: "3",
    title: "Farm Eggs",
    price: 6.99,
    originalPrice: 8.99,
    unit: "per dozen",
    image: "/product/farm-eggs.jpg",
    rating: 4.7,
    discount: 22,
    farmer: "David Johnson",
    badge: "Fresh",
  },
]

export default function FeaturedProducts() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Featured Products</h2>
        <Link href="/products" className="text-green-600 text-sm font-medium">
          See All
        </Link>
      </div>

      <Splide
        options={{
          type: "loop",
          perPage: 2,
          gap: "1rem",
          pauseOnHover: true,
          arrows: false,
          pagination: false,
          drag: "free",
          breakpoints: {
            1024: { perPage: 2 },
            640: { perPage: 2 },
          },
        }}
        aria-label="Featured Products"
        className="mb-4"
      >
        {featuredProducts.map((product) => (
          <SplideSlide key={product.id}>
            <Card className="flex-shrink-0 w-48 border-0 shadow-sm">
              <CardContent className="p-3">
                <div className="relative mb-3">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    width={200}
                    height={150}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs">
                    -{product.discount}%
                  </Badge>
                  <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-700 text-xs">
                    {product.badge}
                  </Badge>
                </div>

                <h3 className="font-semibold text-gray-900 mb-1 text-sm">{product.title}</h3>
                <p className="text-xs text-gray-600 mb-2">by {product.farmer}</p>

                <div className="flex items-center space-x-1 mb-2">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-600">{product.rating}</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="font-bold text-green-600">${product.price}</span>
                    <span className="text-xs text-gray-500 line-through ml-1">${product.originalPrice}</span>
                    <p className="text-xs text-gray-600">{product.unit}</p>
                  </div>
                </div>

                <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 h-8">
                  <Plus className="h-3 w-3 mr-1" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  )
}
