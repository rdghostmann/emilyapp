"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, MapPin, Star, CheckCircle, Clock } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import TimeAgo from "./TimeAgo"

interface Product {
  id: string
  title: string
  description: string
  price: number
  unit: string
  image?: string
  images?: string[]
  farmer?: {
    name?: string
    location?: string
    avatar?: string
    rating?: number
    verified?: boolean
  }
  category: string
  inStock: boolean
  quantity: string
  postedAt: string
}

export default function ProductCard({ product }: { product: Product }) {
  const [isLiked, setIsLiked] = useState(false)
  const router = useRouter()

  // Defensive fallback for image and farmer
  const imageUrl =
    product.image ||
    (Array.isArray(product.images) && product.images.length > 0 && typeof product.images[0] === "string"
      ? product.images[0]
      : "/placeholder.svg")

  const farmer = product.farmer || {}
  const farmerName = farmer.name || "Unknown"
  const farmerAvatar = farmer.avatar || "/placeholder-user.jpg"
  const farmerLocation = farmer.location || "Unknown"
  const farmerRating = typeof farmer.rating === "number" ? farmer.rating : "-"
  const farmerVerified = !!farmer.verified

  const handleContactSeller = () => {
    // Create conversation data to pass to messages
    const conversationData = {
      sellerId: farmerName.toLowerCase().replace(" ", "-"),
      sellerName: farmerName,
      sellerAvatar: farmerAvatar,
      productId: product.id,
      productTitle: product.title,
      productImage: imageUrl,
      productPrice: product.price,
      productUnit: product.unit,
    }

    // Navigate to messages with conversation data
    router.push(`/messages?conversation=${encodeURIComponent(JSON.stringify(conversationData))}`)
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative">
          <Image
            src={imageUrl}
            alt={product.title}
            width={400}
            height={300}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 left-3">
            <Badge className="bg-green-600 hover:bg-green-700">{product.category}</Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/80 hover:bg-white"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
            </Button>
          </div>
          <div className="absolute bottom-3 right-3">
            <Badge variant="secondary" className="bg-white/90">
              <Clock className="h-3 w-3 mr-1" />
              {product.postedAt && <TimeAgo date={product.postedAt} />}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1">{product.title}</h3>
            <p className="text-gray-600 text-sm line-clamp-2 mt-1">{product.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-green-600">₦{product.price}</span>
              <span className="text-gray-500 text-sm ml-1">{product.unit}</span>
            </div>
            <Badge variant={product.inStock ? "default" : "secondary"} className="bg-green-100 text-green-800">
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>

          <p className="text-sm text-gray-600">{`${product.quantity} as Quantity`}</p>

          <div className="flex items-center space-x-2 pt-2 border-t">
            <Avatar className="h-8 w-8">
              <AvatarImage src={farmerAvatar} alt={farmerName} />
              <AvatarFallback>
                {farmerName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1">
                <p className="text-sm font-medium truncate">{farmerName}</p>
                {farmerVerified && <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />}
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{farmerLocation}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{farmerRating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 space-x-2">
        <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleContactSeller}>
          <MessageCircle className="h-4 w-4 mr-2" />
          Contact Seller
        </Button>
        <Button variant="outline" className="flex-1" onClick={() => router.push(`/products/${product.id}`)}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}