"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  MapPin,
  CheckCircle,
  Plus,
  Minus,
  ShoppingCart,
  MessageCircle,
  Phone,
  Truck,
  Shield,
  Award,
} from "lucide-react"
import { useCart } from "@/hooks/useCart"

// Mock product data - in a real app, this would be fetched based on the ID
const mockProduct = {
  id: "1",
  title: "Fresh Organic Tomatoes",
  description:
    "Premium quality organic tomatoes, freshly harvested from our farm. Perfect for cooking and salads. These tomatoes are grown using sustainable farming practices without any harmful pesticides or chemicals.",
  longDescription: `Our organic tomatoes are carefully cultivated in nutrient-rich soil and harvested at peak ripeness to ensure maximum flavor and nutritional value. 

Key Features:
• 100% Organic - No pesticides or chemicals
• Vine-ripened for optimal taste
• Rich in vitamins A, C, and K
• Perfect for salads, cooking, and sauces
• Freshly harvested daily
• Sustainable farming practices

Storage Instructions:
Store at room temperature for best flavor. Refrigerate only when fully ripe to extend shelf life.`,
  price: 4.99,
  originalPrice: 6.99,
  unit: "per kg",
  images: [
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
  ],
  farmer: {
    id: "john-smith",
    name: "John Smith",
    location: "California, USA",
    avatar: "/placeholder-user.jpg",
    rating: 4.8,
    totalReviews: 156,
    verified: true,
    joinedDate: "2020",
    totalProducts: 24,
    responseTime: "Usually responds within 2 hours",
  },
  category: "Vegetables",
  inStock: true,
  quantity: 500,
  minOrder: 1,
  maxOrder: 100,
  postedAt: "2 hours ago",
  discount: 30,
  features: ["Organic", "Fresh", "Local", "Pesticide-free"],
  nutritionFacts: {
    calories: 18,
    protein: "0.9g",
    carbs: "3.9g",
    fiber: "1.2g",
    vitaminC: "28% DV",
  },
  reviews: [
    {
      id: "1",
      user: "Maria Garcia",
      avatar: "/placeholder-user.jpg",
      rating: 5,
      comment: "Excellent quality tomatoes! Very fresh and tasty. Will definitely order again.",
      date: "2 days ago",
      verified: true,
    },
    {
      id: "2",
      user: "David Wilson",
      avatar: "/placeholder-user.jpg",
      rating: 4,
      comment: "Good quality, delivered on time. Slightly expensive but worth it for organic produce.",
      date: "1 week ago",
      verified: true,
    },
    {
      id: "3",
      user: "Sarah Johnson",
      avatar: "/placeholder-user.jpg",
      rating: 5,
      comment: "Amazing tomatoes! Perfect for my restaurant. John is very professional and reliable.",
      date: "2 weeks ago",
      verified: true,
    },
  ],
}

export default function ProductDetails({ productId }: { productId: string }) {
  const router = useRouter()
  const { addToCart, cartItems } = useCart()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)

  const handleAddToCart = () => {
    addToCart({
      id: mockProduct.id,
      title: mockProduct.title,
      price: mockProduct.price,
      unit: mockProduct.unit,
      image: mockProduct.images[0],
      farmer: mockProduct.farmer.name,
      quantity: quantity,
      inStock: mockProduct.inStock,
    })
  }

  const handleContactSeller = () => {
    const conversationData = {
      sellerId: mockProduct.farmer.id,
      sellerName: mockProduct.farmer.name,
      sellerAvatar: mockProduct.farmer.avatar,
      productId: mockProduct.id,
      productTitle: mockProduct.title,
      productImage: mockProduct.images[0],
      productPrice: mockProduct.price,
      productUnit: mockProduct.unit,
    }

    router.push(`/messages?conversation=${encodeURIComponent(JSON.stringify(conversationData))}`)
  }

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => setIsLiked(!isLiked)}>
              <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative" onClick={() => router.push("/cart")}>
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-green-600 text-xs p-0 flex items-center justify-center">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Product Images */}
      <div className="relative">
        <div className="aspect-square bg-white">
          <Image
            src={mockProduct.images[selectedImageIndex] || "/placeholder.svg"}
            alt={mockProduct.title}
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Discount Badge */}
        {mockProduct.discount > 0 && (
          <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">-{mockProduct.discount}% OFF</Badge>
        )}

        {/* Image Thumbnails */}
        <div className="flex space-x-2 p-4 overflow-x-auto">
          {mockProduct.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${selectedImageIndex === index ? "border-green-600" : "border-gray-200"
                }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${mockProduct.title} ${index + 1}`}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="px-4 py-6 space-y-6">
        {/* Title and Price */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{mockProduct.title}</h1>
            <Badge className="bg-green-100 text-green-800">{mockProduct.category}</Badge>
          </div>

          <div className="flex items-center space-x-2 mb-3">
            {mockProduct.features.map((feature) => (
              <Badge key={feature} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-3xl font-bold text-green-600">${mockProduct.price}</span>
            {mockProduct.originalPrice > mockProduct.price && (
              <span className="text-lg text-gray-500 line-through">${mockProduct.originalPrice}</span>
            )}
            <span className="text-gray-600">{mockProduct.unit}</span>
          </div>

          <p className="text-sm text-gray-600 mt-1">{mockProduct.quantity} kg available</p>
        </div>

        {/* Farmer Info */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={mockProduct.farmer.avatar || "/placeholder.svg"} alt={mockProduct.farmer.name} />
                <AvatarFallback>
                  {mockProduct.farmer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900">{mockProduct.farmer.name}</h3>
                  {mockProduct.farmer.verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{mockProduct.farmer.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>
                      {mockProduct.farmer.rating} ({mockProduct.farmer.totalReviews})
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{mockProduct.farmer.responseTime}</p>
              </div>
              <div className="flex flex-col space-y-2">
                <Button size="sm" variant="outline" onClick={handleContactSeller}>
                  <MessageCircle className="h-3 w-3 mr-1" />
                  Chat
                </Button>
                <Button size="sm" variant="outline">
                  <Phone className="h-3 w-3 mr-1" />
                  Call
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quantity Selector */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Quantity</h3>
                <p className="text-sm text-gray-600">
                  Min: {mockProduct.minOrder} kg, Max: {mockProduct.maxOrder} kg
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(mockProduct.minOrder, quantity - 1))}
                  disabled={quantity <= mockProduct.minOrder}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(mockProduct.maxOrder, quantity + 1))}
                  disabled={quantity >= mockProduct.maxOrder}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Features */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Truck className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-xs font-medium">Fast Delivery</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-xs font-medium">Quality Assured</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Award className="h-6 w-6 text-orange-600" />
            </div>
            <p className="text-xs font-medium">Certified Organic</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-4">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 whitespace-pre-line">{mockProduct.longDescription}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nutrition" className="mt-4">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Nutrition Facts (per 100g)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Calories</span>
                  <span className="font-semibold">{mockProduct.nutritionFacts.calories}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Protein</span>
                  <span className="font-semibold">{mockProduct.nutritionFacts.protein}</span>
                </div>
                <div className="flex justify-between">
                  <span>Carbohydrates</span>
                  <span className="font-semibold">{mockProduct.nutritionFacts.carbs}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fiber</span>
                  <span className="font-semibold">{mockProduct.nutritionFacts.fiber}</span>
                </div>
                <div className="flex justify-between">
                  <span>Vitamin C</span>
                  <span className="font-semibold">{mockProduct.nutritionFacts.vitaminC}</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-4">
            <div className="space-y-4">
              {mockProduct.reviews.map((review) => (
                <Card key={review.id} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.user} />
                        <AvatarFallback>
                          {review.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm">{review.user}</span>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-3 w-3 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-sm text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">
        <div className="flex space-x-3">
          <Button variant="outline" className="flex-1" onClick={handleContactSeller}>
            <MessageCircle className="h-4 w-4 mr-2" />
            Contact Seller
          </Button>
          <Button
            className="flex-1 bg-green-600 hover:bg-green-700"
            onClick={handleAddToCart}
            disabled={!mockProduct.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart • ${(mockProduct.price * quantity).toFixed(2)}
          </Button>
        </div>
      </div>
    </div>
  )
}
