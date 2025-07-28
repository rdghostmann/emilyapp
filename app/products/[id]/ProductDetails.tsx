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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
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
  Eye,
  Clock,
  ChevronDown,
  ChevronUp,
  Flag,
  Twitter,
  Mail,
  Store,
  AlertTriangle,
} from "lucide-react"
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlinePhoneCallback } from "react-icons/md";
import moment from "moment";
import { useCart } from "@/hooks/useCart"
import getAllProducts from "@/controllers/GetAllProducts"
import Loading from "./loading"
import Link from "next/link"

export default function ProductDetails({ productId }: { productId: string }) {
  const router = useRouter()
  const { addToCart, cartItems } = useCart()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showMoreAttributes, setShowMoreAttributes] = useState(false)
  const [showStoreDetails, setShowStoreDetails] = useState(false)
  const [showPhone, setShowPhone] = useState(false);

  function ContactToggleButton({ productId }: { productId: string }) {
    const [showPhone, setShowPhone] = useState(false);

    return (
      <Button
        className="w-full bg-green-600 hover:bg-green-700 text-white"
        onClick={() => setShowPhone((prev) => !prev)}
      >
        <Phone className="h-4 w-4 mr-2" />
        {showPhone ? product.phone : "Show contact"}
      </Button>
    );
  }
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        const products = await getAllProducts()
        const found = products.find((p: any) => p.id === productId)
        setProduct(found || products[0]) // Fallback to first product if not found
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [productId])

  if (loading) {
    return <Loading />
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
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

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = product.title

    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
        break
      case "twitter":
        window.open(
          `https://twitter.com/share?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
          "_blank",
        )
        break
      case "whatsapp":
        window.open(`whatsapp://send?text=${encodeURIComponent(url)}`, "_blank")
        break
      case "email":
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`, "_blank")
        break
    }
  }

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="pb-20 bg-gray-50">
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

      {/* Promoted Badge & Stats */}
      <div className="bg-white px-4 py-3 border-b">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <Badge className="bg-orange-500 hover:bg-orange-600 text-white">Promoted</Badge>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{product.farmer?.location}, 2 hours ago</span>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Eye className="h-3 w-3 mr-1" />
            <span>134 views</span>
          </div>
        </div>
      </div>

      {/* Product Images */}
      <div className="relative bg-white">
        <div className="aspect-square">
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
      <div className="bg-white px-4 py-6 space-y-6 mb-4">
        {/* Title and Category */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-900 flex-1 mr-2">{product.title}</h1>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={() => setIsLiked(!isLiked)}>
                <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
              </Button>
              <span className="text-sm text-gray-500">5</span>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800 mb-3">{product.category}</Badge>
          <div className="flex items-center space-x-2 mb-3">
            {product.features?.map((feature: string) => (
              <Badge key={feature} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* Product Attributes */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <Collapsible open={showMoreAttributes} onOpenChange={setShowMoreAttributes}>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{product.category}</div>
                    <div className="text-xs text-gray-500">Type</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">New</div>
                    <div className="text-xs text-gray-500">Condition</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{product.quantity} kg</div>
                    <div className="text-xs text-gray-500">Available</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Organic</div>
                    <div className="text-xs text-gray-500">Certification</div>
                  </div>
                </div>
                <CollapsibleContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">Fresh</div>
                      <div className="text-xs text-gray-500">Quality</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Farm Direct</div>
                      <div className="text-xs text-gray-500">Source</div>
                    </div>
                  </div>
                </CollapsibleContent>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-center text-green-600 hover:text-green-700">
                    {showMoreAttributes ? (
                      <>
                        Hide details <ChevronUp className="h-4 w-4 ml-2" />
                      </>
                    ) : (
                      <>
                        Show more <ChevronDown className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </CollapsibleTrigger>
              </div>
            </Collapsible>
          </CardContent>
        </Card>

        {/* Store Address */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <Collapsible open={showStoreDetails} onOpenChange={setShowStoreDetails}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Store className="h-5 w-5 mr-2 text-gray-700" />
                  <span className="font-medium text-gray-900">Store address</span>
                </div>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                    Show 1 options <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="space-y-3">
                <div className="pl-7">
                  <div className="flex items-center text-sm text-gray-700 mb-2">
                    <MapPin className="h-3 w-3 mr-2" />
                    {product.farmer?.location}
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    Farm location: {product.farmer?.address || "Direct from farm"}
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-3 w-3 mr-2 text-gray-500" />
                    <span className="text-red-600 mr-2">Available now</span>
                    <span className="text-gray-500">• Mon - Sat, 08:00-18:00</span>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>

        {/* Description */}
        <div>
          <p className="text-gray-700 leading-relaxed">{product.longDescription}</p>

          <ContactToggleButton productId={product.phone} />

        </div>


      </div>

      {/* Price and Seller Info */}
      <div className="bg-white px-4 py-6 space-y-6 mb-4">
        {/* Top Grid: Price + Request */}
        <div className="grid grid-cols-2 gap-4">
          {/* Price Display */}
          <div className="text-center p-4 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-1">
              ₦{product.price}
              {product.originalPrice > product.price && (
                <span className="text-lg text-gray-500 line-through ml-2">
                  ₦{product.originalPrice}
                </span>
              )}
            </div>
            <div className="text-sm text-gray-600">{product.unit}</div>
            {/* Request Callback Button */}
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-3">
              Request call back
            </Button>
          </div>
          {/* Social Sharing */}
          <div className="flex flex-wrap items-center justify-center md:justify-between md:px-6 space-x-4 mb-4">
            <span className="text-sm font-medium text-gray-700">Share this product:</span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                onClick={() => handleShare("facebook")}
              >
                <FaFacebookF className="h-3 w-3" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-blue-400 text-white border-blue-400 hover:bg-blue-500"
                onClick={() => handleShare("twitter")}
              >
                <FaXTwitter className="h-3 w-3" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-green-500 text-white border-green-500 hover:bg-green-600"
                onClick={() => handleShare("whatsapp")}
              >
                <MessageCircle className="h-3 w-3" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => handleShare("email")}
              >
                <Mail className="h-3 w-3" />
              </Button>
            </div>
          </div>

        </div>

        {/* Seller Info and Feedback */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Seller Info */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={product.farmer?.avatar || "/placeholder.svg"}
                    alt={product.farmer?.lastName || product.farmer?.username}
                  />
                  <AvatarFallback>
                    {product.farmer?.username
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900">
                      {product.farmer?.username}
                    </h3>
                    {product.farmer?.verified && (
                      <div className="flex items-center text-blue-600">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        <span className="text-xs">Verified ID</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div className="flex items-center">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      <span>Typically replies within an hour</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>
                        Joined {moment(product.farmer?.joinDate).fromNow()} on platform
                        {/* Joined on {moment(product.farmer?.joinDate).format("MMMM D, YYYY")} */}

                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href={`tel:${product.phone}`}
                >
                  <Button className="cursor-pointer w-full bg-green-600 hover:bg-green-700 text-white"            >
                    <MdOutlinePhoneCallback className="h-5 w-5 mr-2" />
                    Contact Seller
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  className="cursor-pointer w-full bg-transparent mt-2 text-white bg-blue-700 hover:bg-blue-800 hover:text-white"
                  onClick={handleContactSeller}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Start chat
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {/* Feedback */}
            <Card className="border-0 shadow-sm h-fit">
              <CardContent className="">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-orange-400 mr-2" />
                    <span className="font-medium">30 Feedback</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-orange-500 hover:text-orange-600"
                  >
                    view all <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="cursor-pointer border border-blue-500 text-blue-500 hover:text-blue-600 w-full bg-transparent">
                Mark unavailable
              </Button>
              <Button
                variant="outline"
                className="cursor-pointer w-full border border-red-600 text-red-600 hover:text-red-700 bg-transparent"
              >
                <Flag className="h-4 w-4 mr-2" />
                Report Abuse
              </Button>
            </div>
          </div>

        </div>

        {/* Safety Tips */}
        <Card className="border-0 shadow-sm bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Safety tips</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Avoid paying in advance, even for delivery</li>
                  <li>• Meet with the seller at a safe public place</li>
                  <li>• First, check what you're going to buy to make sure it's what you need</li>
                  <li>• Only pay if you're satisfied</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Post Similar Ad */}
        <Link href="/post-product" className="block">
          <Button variant="outline" className="w-full bg-transparent">
            Post Ad Like This
          </Button>
        </Link>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 z-50">
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="flex-1 bg-green-600 text-white border-green-600 hover:bg-green-700"
            onClick={handleContactSeller}
          >
            Make an offer
          </Button>
          <Button
            className="flex-1 bg-green-600 hover:bg-green-700"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart • ₦{(product.price * quantity).toFixed(2)}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="hidden bg-white px-4 py-6">
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


    </div>
  )
}
