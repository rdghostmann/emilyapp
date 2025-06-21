"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, MessageCircle, Star, MapPin, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

const favouriteProducts = [
  {
    id: "1",
    title: "Organic Tomatoes",
    price: 4.99,
    unit: "per kg",
    image: "/placeholder.svg?height=100&width=100",
    farmer: "John Smith",
    location: "California",
    rating: 4.8,
    inStock: true,
    addedDate: "2 days ago",
  },
  {
    id: "2",
    title: "Fresh Apples",
    price: 5.99,
    unit: "per kg",
    image: "/placeholder.svg?height=100&width=100",
    farmer: "Sarah Wilson",
    location: "Washington",
    rating: 4.9,
    inStock: true,
    addedDate: "1 week ago",
  },
  {
    id: "3",
    title: "Farm Eggs",
    price: 6.99,
    unit: "per dozen",
    image: "/placeholder.svg?height=100&width=100",
    farmer: "David Johnson",
    location: "Iowa",
    rating: 4.7,
    inStock: false,
    addedDate: "3 days ago",
  },
]

export default function FavouritesList() {
  const [favourites, setFavourites] = useState(favouriteProducts)
  const router = useRouter()

  const removeFavourite = (id: string) => {
    setFavourites(favourites.filter((product) => product.id !== id))
  }

  const addToCart = (id: string) => {
    console.log("Added to cart:", id)
    // Handle add to cart logic
  }

  const contactSeller = (product: any) => {
    const conversationData = {
      sellerId: product.farmer.toLowerCase().replace(" ", "-"),
      sellerName: product.farmer,
      sellerAvatar: "/user/client-4.jpg",
      productId: product.id,
      productTitle: product.title,
      productImage: product.image,
      productPrice: product.price,
      productUnit: product.unit,
    }

    router.push(`/messages?conversation=${encodeURIComponent(JSON.stringify(conversationData))}`)
  }

  if (favourites.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No favourites yet</h3>
        <p className="text-gray-600 mb-6">Start adding products to your favourites to see them here</p>
        <Button className="bg-green-600 hover:bg-green-700">Browse Products</Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {favourites.map((product) => (
        <Card key={product.id} className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex space-x-4">
              <div className="relative">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 bg-white shadow-md hover:bg-red-50"
                  onClick={() => removeFavourite(product.id)}
                >
                  <Trash2 className="h-3 w-3 text-red-500" />
                </Button>
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{product.title}</h4>
                    <p className="text-sm text-gray-600">by {product.farmer}</p>
                  </div>
                  <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                </div>

                <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{product.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{product.rating}</span>
                  </div>
                  <span>Added {product.addedDate}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-green-600">${product.price}</span>
                    <span className="text-sm text-gray-500">{product.unit}</span>
                    <Badge variant={product.inStock ? "default" : "secondary"} className="text-xs">
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                </div>

                <div className="flex space-x-2 mt-3">
                  <Button
                    size="sm"
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    disabled={!product.inStock}
                    onClick={() => addToCart(product.id)}
                  >
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Add to Cart
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => contactSeller(product)}>
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Contact
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
