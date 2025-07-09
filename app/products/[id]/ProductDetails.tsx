"use client"

import { useState, useEffect } from "react"
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
import getAllProducts from "@/controllers/GetAllProducts" // or a getProductById action
import Loading from "./loading"

export default function ProductDetails({ productId }: { productId: string }) {
  const router = useRouter()
  const { addToCart, cartItems } = useCart()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [product, setProduct] = useState<any>(null)

  useEffect(() => {
    async function fetchProduct() {
      // Replace with a getProductById(productId) if available for efficiency
      const products = await getAllProducts()
      const found = products.find((p: any) => p.id === productId)
      setProduct(found)
    }
    fetchProduct()
  }, [productId])


  // console.log("Product Details:", product)

  if (!product) {
    return <Loading />
  }

const handleAddToCart: () => void = () => {
  addToCart({
    id: product.id,
    title: product.title,
    price: product.price,
    unit: product.unit,
    image: product.images?.[0] || "/placeholder.svg",
    farmer: product.farmer?.name,
    quantity: quantity,
    inStock: product.inStock,
  })
}

  const handleContactSeller = () => {
    const conversationData = {
      sellerId: product.farmer?.id,
      sellerName: product.farmer?.name,
      sellerAvatar: product.farmer?.avatar,
      productId: product.id,
      productTitle: product.title,
      productImage: product.images?.[0] || "/placeholder.svg",
      productPrice: product.price,
      productUnit: product.unit,
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
            src={product.images[selectedImageIndex] || "/placeholder.svg"}
            alt={product.title}
            width={400}
            height={400}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* Discount Badge */}
        {product.discount > 0 && (
          <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">-{product.discount}% OFF</Badge>
        )}

        {/* Image Thumbnails */}
        <div className="flex space-x-2 p-4 overflow-x-auto">
          {product.images.map((image: string, index: number) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${selectedImageIndex === index ? "border-green-600" : "border-gray-200"
                }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${product.title} ${index + 1}`}
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
            <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
            <Badge className="bg-green-100 text-green-800">{product.category}</Badge>
          </div>

          <div className="flex items-center space-x-2 mb-3">
            {product.features?.map((feature: string) => (
              <Badge key={feature} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-3xl font-bold text-green-600">${product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
            )}
            <span className="text-gray-600">{product.unit}</span>
          </div>

          <p className="text-sm text-gray-600 mt-1">{product.quantity} kg available</p>
        </div>

        {/* Farmer Info */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={product.farmer?.avatar || "/placeholder.svg"} alt={product.farmer?.name} />
                <AvatarFallback>
                  {product.farmer?.name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900">{product.farmer?.username}</h3>
                  {product.farmer?.verified && <CheckCircle className="h-4 w-4 text-blue-500" />}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{product.farmer?.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>
                      {product.farmer?.rating} ({product.farmer?.totalReviews})
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{product.farmer?.responseTime}</p>
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
                  Min: {product.minOrder} kg, Max: {product.maxOrder} kg
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(product.minOrder, quantity - 1))}
                  disabled={quantity <= product.minOrder}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.maxOrder, quantity + 1))}
                  disabled={quantity >= product.maxOrder}
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
                  <p className="text-gray-700 whitespace-pre-line">{product.longDescription}</p>
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
                  <span className="font-semibold">{product.nutritionFacts?.calories}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Protein</span>
                  <span className="font-semibold">{product.nutritionFacts?.protein}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Carbohydrates</span>
                  <span className="font-semibold">{product.nutritionFacts?.carbs}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Fiber</span>
                  <span className="font-semibold">{product.nutritionFacts?.fiber}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Vitamin C</span>
                  <span className="font-semibold">{product.nutritionFacts?.vitaminC}</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-4">
            <div className="space-y-4">
              {product.reviews?.map((review: any, idx: number) => (
                <Card key={review.id || idx} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.user} />
                        <AvatarFallback>
                          {review.user
                            .split(" ")
                            .map((n: string) => n[0])
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
      <div className="border w-full fixed bottom-0 left-0 bg-white border-t p-2 z-50">
        <div className="flex items-center justify-center space-x-1 md:px-4">
          <Button variant="outline" className="text-xs mx-2" onClick={handleContactSeller}>
            <MessageCircle className="h-4 w-4 mr-2" />
            Contact Seller
          </Button>
          <Button
            className="text-xs mx-2 bg-green-600 hover:bg-green-700"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart • ${(product.price * quantity).toFixed(2)}
          </Button>
        </div>
      </div>
    </div>
  )
}