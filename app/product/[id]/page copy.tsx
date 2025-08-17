"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Star,
  MapPin,
  Phone,
  MessageSquare,
  Heart,
  Share2,
  TrendingUp,
  Shield,
  Clock,
  Eye,
  ChevronRight,
  User,
} from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { toast } from "sonner"

// Mock product data - in real app, this would come from API
const getProductById = (id: string) => {
  const products = {
    "1": {
      id: "1",
      title: "Premium Organic Rice - 50kg",
      description: "High-quality organic rice grown without pesticides in the fertile lands of Lagos. This premium variety is perfect for families, restaurants, and food processing companies. Our rice is carefully selected, cleaned, and packaged to maintain freshness and quality.\n\nGrown using sustainable farming practices, this rice offers excellent taste, aroma, and nutritional value. Each bag contains 50kg of premium long-grain rice.\n\nFeatures:\n• 100% Organic - No pesticides or chemicals\n• Long grain variety\n• 99.5% purity\n• Fresh harvest from December 2024\n• Properly cleaned and sorted\n• Moisture content: 14%\n\nIdeal for:\n• Households and families\n• Restaurants and catering\n• Food processing companies\n• Wholesale distribution",
      price: 25000,
      originalPrice: 30000,
      negotiable: true,
      condition: "New",
      location: "Ikorodu, Lagos State",
      category: "Grains & Cereals",
      subcategory: "Rice",
      boosted: true,
      images: [
        "/placeholder.svg?height=500&width=500&text=Premium+Rice+Main",
        "/placeholder.svg?height=500&width=500&text=Premium+Rice+2",
        "/placeholder.svg?height=500&width=500&text=Premium+Rice+3",
        "/placeholder.svg?height=500&width=500&text=Premium+Rice+4",
        "/placeholder.svg?height=500&width=500&text=Premium+Rice+5",
      ],
      seller: {
        id: "seller_1",
        name: "Adebayo Farms",
        avatar: "/placeholder.svg?height=60&width=60&text=AF",
        rating: 4.8,
        totalSales: 156,
        verified: true,
        responseTime: "Within 2 hours",
        phone: "+234 800 123 4567",
        location: "Lagos State",
        joinedDate: "2022-03-15",
        memberSince: "March 2022",
        totalAds: 24,
      },
      stats: {
        views: 234,
        favorites: 45,
        adId: "AD001234567",
      },
     
    },

  }

  return products[id as keyof typeof products] || null
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const productData = getProductById(params.id)
      setProduct(productData)
      setLoading(false)
    }

    fetchProduct()
  }, [params.id])

  const handleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast(isFavorite ? "Removed from favorites" : "Added to favorites")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.title,
        text: `Check out this product: ${product?.title}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast("Product link copied to clipboard")
    }
  }

  const handleCall = () => {
    window.location.href = `tel:${product?.seller.phone}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-6 w-1/2 mb-6 rounded"></div>
            <div className="bg-white rounded-lg p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="bg-gray-200 h-96 rounded-lg"></div>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="bg-gray-200 h-16 rounded"></div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-200 h-8 rounded"></div>
                  <div className="bg-gray-200 h-6 rounded w-1/3"></div>
                  <div className="bg-gray-200 h-20 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
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
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">EmilyAgros</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="w-4 h-4" />
            </BreadcrumbSeparator>

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/marketplace">All categories</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="w-4 h-4" />
            </BreadcrumbSeparator>

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/category/${product.category.toLowerCase().replace(/\s+/g, "-")}`}>
                  {product.category}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="w-4 h-4" />
            </BreadcrumbSeparator>

            <BreadcrumbItem>
              <BreadcrumbPage>{product.subcategory}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
            {/* Product Images */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={product.images[selectedImage] || "/placeholder.svg"}
                    alt={product.title}
                    width={600}
                    height={500}
                    className="w-full h-[500px] object-cover"
                  />
                  {product.boosted && (
                    <Badge className="absolute top-4 left-4 bg-orange-500 hover:bg-orange-600">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Promoted
                    </Badge>
                  )}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={handleFavorite}
                      className="bg-white/90 hover:bg-white shadow-sm"
                    >
                      <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={handleShare}
                      className="bg-white/90 hover:bg-white shadow-sm"
                    >
                      <Share2 className="w-4 h-4 text-gray-600" />
                    </Button>
                  </div>
                </div>

                {/* Thumbnail Images */}
                <div className="grid grid-cols-5 gap-2">
                  {product.images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? "border-green-500" : "border-gray-200 hover:border-gray-300"
                        }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.title} ${index + 1}`}
                        width={120}
                        height={80}
                        className="w-full h-16 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Title and Price */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.title}</h1>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl font-bold text-green-600">₦{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ₦{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {product.negotiable && (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Negotiable
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-600 gap-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {product.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(product.postedDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {product.stats.views} views
                  </div>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="space-y-3">
                <Button onClick={handleCall} className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg">
                  <Phone className="w-5 h-5 mr-2" />
                  Call {product.seller.phone}
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full h-12 text-lg border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                >
                  <Link href={`/contact-seller/${product.id}`}>
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Chat with seller
                  </Link>
                </Button>
              </div>

              {/* Seller Info */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={product.seller.avatar || "/placeholder.svg"} alt={product.seller.name} />
                      <AvatarFallback>AF</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{product.seller.name}</h3>
                        {product.seller.verified && <Shield className="w-4 h-4 text-green-500" />}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        {product.seller.rating} ({product.seller.totalSales} sales)
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Member since:</span>
                      <span>{product.seller.memberSince}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total ads:</span>
                      <span>{product.seller.totalAds}</span>
                    </div>
                    <div className="hidden justify-between">
                      <span>Response time:</span>
                      <span>{product.seller.responseTime}</span>
                    </div>
                  </div>

                  <Button asChild variant="outline" className="w-full mt-4 bg-transparent">
                    <Link href={`/seller/${product.seller.id}`}>
                      <User className="w-4 h-4 mr-2" />
                      View seller profile
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Product Details */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Product details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Condition:</span>
                      <span className="font-medium">{product.condition}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{product.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subcategory:</span>
                      <span className="font-medium">{product.subcategory}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ad ID:</span>
                      <span className="font-medium">{product.stats.adId}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Safety Tips */}
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-orange-800 mb-2">Safety tips</h3>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Meet in a public place</li>
                    <li>• Check the item before you buy</li>
                    <li>• Pay only after collecting item</li>
                    <li>• Report suspicious ads</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Description */}
          <div className="border-t p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Similar products you may like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <Image
                    src={`/placeholder.svg?height=150&width=200&text=Similar+${i}`}
                    alt={`Similar product ${i}`}
                    width={200}
                    height={150}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <div className="p-3">
                    <h3 className="font-medium text-sm text-gray-900 mb-1 line-clamp-2">Similar Product {i}</h3>
                    <p className="text-green-600 font-bold text-sm">₦{(20000 + i * 1000).toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Lagos, Nigeria</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
