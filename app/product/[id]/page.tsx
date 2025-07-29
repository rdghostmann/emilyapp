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
import { toast } from "sonner"

// Mock product data - in real app, this would come from API
const getProductById = (id: string) => {
  const products = {
    "1": {
      id: "1",
      title: "Premium Organic Rice - 50kg",
      description:
        "High-quality organic rice grown without pesticides in the fertile lands of Lagos. This premium variety is perfect for families, restaurants, and food processing companies. Our rice is carefully selected, cleaned, and packaged to maintain freshness and quality.\n\nGrown using sustainable farming practices, this rice offers excellent taste, aroma, and nutritional value. Each bag contains 50kg of premium long-grain rice.\n\nFeatures:\n• 100% Organic - No pesticides or chemicals\n• Long grain variety\n• 99.5% purity\n• Fresh harvest from December 2024\n• Properly cleaned and sorted\n• Moisture content: 14%\n\nIdeal for:\n• Households and families\n• Restaurants and catering\n• Food processing companies\n• Wholesale distribution",
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
      postedDate: "2024-01-15T10:30:00Z",
      lastUpdated: "2024-01-16T14:20:00Z",
    },
    "2": {
      id: "2",
      title: "Fresh Tomatoes - 50kg",
      description:
        "Farm-fresh tomatoes harvested daily from our fields in Kano. These juicy, ripe tomatoes are perfect for sauces, stews, and salads. Hand-picked to ensure the highest quality and freshness.\n\nFeatures:\n• Organically grown\n• Rich red color\n• Firm and juicy\n• Ideal for cooking and processing\n• Available in 50kg baskets\n\nIdeal for:\n• Restaurants and caterers\n• Food processing industries\n• Wholesale markets",
      price: 15000,
      originalPrice: 16500,
      negotiable: true,
      condition: "New",
      location: "Kano, Kano State",
      category: "Fruits & Vegetables",
      subcategory: "Vegetables",
      boosted: true,
      images: [
        "/placeholder.svg?height=500&width=500&text=Fresh+Tomatoes+Main",
        "/placeholder.svg?height=500&width=500&text=Fresh+Tomatoes+2",
        "/placeholder.svg?height=500&width=500&text=Fresh+Tomatoes+3",
      ],
      seller: {
        id: "seller_2",
        name: "Musa Agriculture",
        avatar: "/placeholder.svg?height=60&width=60&text=MA",
        rating: 4.6,
        totalSales: 89,
        verified: true,
        responseTime: "Within 3 hours",
        phone: "+234 800 123 4568",
        location: "Kano State",
        joinedDate: "2023-01-20",
        memberSince: "January 2023",
        totalAds: 15,
      },
      stats: {
        views: 180,
        favorites: 30,
        adId: "AD001234568",
      },
      postedDate: "2024-01-14T09:00:00Z",
      lastUpdated: "2024-01-15T11:00:00Z",
    },
    "3": {
      id: "3",
      title: "Hybrid Maize Seeds - 10kg",
      description:
        "High-yield hybrid maize seeds, perfect for commercial farming. These seeds are disease-resistant and adapted to various soil types, ensuring a bountiful harvest. Each 10kg bag is sufficient for a large plot.\n\nFeatures:\n• High germination rate\n• Disease and pest resistant\n• Suitable for various climates\n• Certified quality\n• Produces large, healthy cobs\n\nIdeal for:\n• Commercial farmers\n• Agricultural cooperatives\n• Research institutions",
      price: 8500,
      originalPrice: 9000,
      negotiable: false,
      condition: "New",
      location: "Zaria, Kaduna State",
      category: "Seeds & Fertilizers",
      subcategory: "Seeds",
      boosted: false,
      images: [
        "/placeholder.svg?height=500&width=500&text=Maize+Seeds+Main",
        "/placeholder.svg?height=500&width=500&text=Maize+Seeds+2",
        "/placeholder.svg?height=500&width=500&text=Maize+Seeds+3",
      ],
      seller: {
        id: "seller_3",
        name: "Green Valley Seeds",
        avatar: "/placeholder.svg?height=60&width=60&text=GV",
        rating: 4.9,
        totalSales: 234,
        verified: true,
        responseTime: "Within 1 hour",
        phone: "+234 800 123 4569",
        location: "Kaduna State",
        joinedDate: "2021-11-01",
        memberSince: "November 2021",
        totalAds: 30,
      },
      stats: {
        views: 300,
        favorites: 60,
        adId: "AD001234569",
      },
      postedDate: "2024-01-12T15:00:00Z",
      lastUpdated: "2024-01-13T10:00:00Z",
    },
    "4": {
      id: "4",
      title: "Dairy Cow - Holstein (Pregnant)",
      description:
        "Healthy Holstein dairy cow, 3 years old, currently pregnant with her second calf. Excellent milk production history (averaging 25 liters/day). Well-vaccinated and dewormed. Perfect for expanding your dairy farm.\n\nFeatures:\n• Proven breeder\n• High milk yield potential\n• Good temperament\n• Up-to-date vaccinations\n• Healthy and active\n\nIdeal for:\n• Dairy farmers\n• Livestock breeders\n• Agricultural investors",
      price: 450000,
      originalPrice: 480000,
      negotiable: true,
      condition: "Used",
      location: "Jos, Plateau State",
      category: "Livestock & Dairy",
      subcategory: "Cattle",
      boosted: false,
      images: [
        "/placeholder.svg?height=500&width=500&text=Holstein+Cow+Main",
        "/placeholder.svg?height=500&width=500&text=Holstein+Cow+2",
        "/placeholder.svg?height=500&width=500&text=Holstein+Cow+3",
      ],
      seller: {
        id: "seller_4",
        name: "Cattle Ranch Ltd",
        avatar: "/placeholder.svg?height=60&width=60&text=CR",
        rating: 4.7,
        totalSales: 45,
        verified: true,
        responseTime: "Within 4 hours",
        phone: "+234 800 123 4570",
        location: "Plateau State",
        joinedDate: "2022-08-01",
        memberSince: "August 2022",
        totalAds: 10,
      },
      stats: {
        views: 150,
        favorites: 20,
        adId: "AD001234570",
      },
      postedDate: "2024-01-10T11:00:00Z",
      lastUpdated: "2024-01-11T09:00:00Z",
    },
    "5": {
      id: "5",
      title: "Organic Cassava Flour - 25kg",
      description:
        "Finely milled organic cassava flour, perfect for baking and traditional African dishes like fufu and amala. Sourced from sustainably grown cassava, processed under hygienic conditions to ensure purity and quality.\n\nFeatures:\n• 100% Organic\n• Gluten-free\n• Smooth texture\n• Rich in carbohydrates\n• Ideal for various culinary uses\n\nIdeal for:\n• Households\n• Bakeries\n• Restaurants\n• Food manufacturers",
      price: 12000,
      originalPrice: 13000,
      negotiable: true,
      condition: "New",
      location: "Abeokuta, Ogun State",
      category: "Processed Foods",
      subcategory: "Flour",
      boosted: false,
      images: [
        "/placeholder.svg?height=500&width=500&text=Cassava+Flour+Main",
        "/placeholder.svg?height=500&width=500&text=Cassava+Flour+2",
      ],
      seller: {
        id: "seller_5",
        name: "Cassava Processing Co.",
        avatar: "/placeholder.svg?height=60&width=60&text=CP",
        rating: 4.5,
        totalSales: 70,
        verified: true,
        responseTime: "Within 6 hours",
        phone: "+234 800 123 4571",
        location: "Ogun State",
        joinedDate: "2023-05-10",
        memberSince: "May 2023",
        totalAds: 12,
      },
      stats: {
        views: 100,
        favorites: 15,
        adId: "AD001234571",
      },
      postedDate: "2024-01-08T13:00:00Z",
      lastUpdated: "2024-01-09T10:00:00Z",
    },
    "6": {
      id: "6",
      title: "Broiler Chickens - Live (10 pieces)",
      description:
        "Healthy, fast-growing broiler chickens available for sale. Raised in a clean environment with high-quality feed. Average weight 2.5kg per bird. Perfect for commercial poultry farming or personal consumption.\n\nFeatures:\n• Fast growth rate\n• Good meat conversion ratio\n• Vaccinated and healthy\n• Ready for slaughter or further rearing\n• Sold in batches of 10\n\nIdeal for:\n• Poultry farmers\n• Restaurants\n• Event caterers",
      price: 35000,
      originalPrice: 38000,
      negotiable: true,
      condition: "New",
      location: "Ibadan, Oyo State",
      category: "Livestock & Dairy",
      subcategory: "Poultry",
      boosted: true,
      images: [
        "/placeholder.svg?height=500&width=500&text=Broiler+Chickens+Main",
        "/placeholder.svg?height=500&width=500&text=Broiler+Chickens+2",
      ],
      seller: {
        id: "seller_6",
        name: "Poultry Farm Ltd",
        avatar: "/placeholder.svg?height=60&width=60&text=PF",
        rating: 4.8,
        totalSales: 120,
        verified: true,
        responseTime: "Within 2 hours",
        phone: "+234 800 123 4572",
        location: "Oyo State",
        joinedDate: "2022-01-01",
        memberSince: "January 2022",
        totalAds: 20,
      },
      stats: {
        views: 200,
        favorites: 40,
        adId: "AD001234572",
      },
      postedDate: "2024-01-07T10:00:00Z",
      lastUpdated: "2024-01-08T14:00:00Z",
    },
    "7": {
      id: "7",
      title: "Fresh Catfish - 1kg",
      description:
        "Freshly harvested catfish from our aquaculture farm. Perfect for grilling, frying, or making delicious soups. Sustainably farmed and delivered fresh to your doorstep.\n\nFeatures:\n• Farm-raised\n• High protein content\n• Cleaned and gutted (on request)\n• Available in various sizes\n\nIdeal for:\n• Households\n• Restaurants\n• Fish markets",
      price: 2500,
      originalPrice: 2800,
      negotiable: false,
      condition: "New",
      location: "Calabar, Cross River State",
      category: "Aquaculture",
      subcategory: "Fish",
      boosted: false,
      images: [
        "/placeholder.svg?height=500&width=500&text=Fresh+Catfish+Main",
        "/placeholder.svg?height=500&width=500&text=Fresh+Catfish+2",
      ],
      seller: {
        id: "seller_7",
        name: "Aqua Farms Nigeria",
        avatar: "/placeholder.svg?height=60&width=60&text=AFN",
        rating: 4.7,
        totalSales: 90,
        verified: true,
        responseTime: "Within 3 hours",
        phone: "+234 800 123 4573",
        location: "Cross River State",
        joinedDate: "2023-03-15",
        memberSince: "March 2023",
        totalAds: 18,
      },
      stats: {
        views: 120,
        favorites: 25,
        adId: "AD001234573",
      },
      postedDate: "2024-01-05T08:00:00Z",
      lastUpdated: "2024-01-06T12:00:00Z",
    },
    "8": {
      id: "8",
      title: "Tractor - John Deere 5075E",
      description:
        "Used John Deere 5075E tractor in excellent condition. Well-maintained and ready for heavy-duty farm work. Comes with a 6-month warranty on engine and transmission. Ideal for plowing, tilling, and hauling.\n\nFeatures:\n• 75 HP engine\n• 4WD\n• Low hours (500 hrs)\n• Recently serviced\n• Includes basic implements (plow, harrow)\n\nIdeal for:\n• Large-scale farmers\n• Agricultural contractors\n• Farm equipment rental businesses",
      price: 8500000,
      originalPrice: 9000000,
      negotiable: true,
      condition: "Used",
      location: "Abuja, FCT",
      category: "Farm Equipment",
      subcategory: "Tractors",
      boosted: true,
      images: [
        "/placeholder.svg?height=500&width=500&text=John+Deere+Tractor+Main",
        "/placeholder.svg?height=500&width=500&text=John+Deere+Tractor+2",
        "/placeholder.svg?height=500&width=500&text=John+Deere+Tractor+3",
      ],
      seller: {
        id: "seller_8",
        name: "AgriTech Solutions",
        avatar: "/placeholder.svg?height=60&width=60&text=AS",
        rating: 4.9,
        totalSales: 30,
        verified: true,
        responseTime: "Within 1 hour",
        phone: "+234 800 123 4574",
        location: "FCT",
        joinedDate: "2021-09-01",
        memberSince: "September 2021",
        totalAds: 5,
      },
      stats: {
        views: 500,
        favorites: 80,
        adId: "AD001234574",
      },
      postedDate: "2024-01-03T16:00:00Z",
      lastUpdated: "2024-01-04T10:00:00Z",
    },
    "9": {
      id: "9",
      title: "Organic Fertilizer - 50kg Bag",
      description:
        "Premium organic fertilizer made from composted plant and animal matter. Enhances soil fertility, promotes healthy plant growth, and improves crop yield. Safe for all types of crops and gardens.\n\nFeatures:\n• 100% Organic\n• Rich in essential nutrients\n• Improves soil structure\n• Eco-friendly\n• Easy to apply\n\nIdeal for:\n• Organic farms\n• Home gardens\n• Nurseries\n• Landscaping",
      price: 7500,
      originalPrice: 8000,
      negotiable: false,
      condition: "New",
      location: "Enugu, Enugu State",
      category: "Seeds & Fertilizers",
      subcategory: "Fertilizers",
      boosted: false,
      images: [
        "/placeholder.svg?height=500&width=500&text=Organic+Fertilizer+Main",
        "/placeholder.svg?height=500&width=500&text=Organic+Fertilizer+2",
      ],
      seller: {
        id: "seller_9",
        name: "Green Earth Organics",
        avatar: "/placeholder.svg?height=60&width=60&text=GEO",
        rating: 4.6,
        totalSales: 60,
        verified: true,
        responseTime: "Within 5 hours",
        phone: "+234 800 123 4575",
        location: "Enugu State",
        joinedDate: "2023-07-20",
        memberSince: "July 2023",
        totalAds: 10,
      },
      stats: {
        views: 90,
        favorites: 10,
        adId: "AD001234575",
      },
      postedDate: "2024-01-01T14:00:00Z",
      lastUpdated: "2024-01-02T11:00:00Z",
    },
    "10": {
      id: "10",
      title: "Hybrid Tomato Seedlings - Tray of 100",
      description:
        "High-quality hybrid tomato seedlings, ready for transplanting. These seedlings are resistant to common tomato diseases and promise high yields. Perfect for commercial tomato farming.\n\nFeatures:\n• Disease-resistant\n• High yield potential\n• Strong root system\n• Ready for transplant\n• Tray of 100 seedlings\n\nIdeal for:\n• Commercial vegetable farmers\n• Greenhouses\n• Agricultural projects",
      price: 10000,
      originalPrice: 11000,
      negotiable: true,
      condition: "New",
      location: "Owerri, Imo State",
      category: "Seedlings",
      subcategory: "Vegetable Seedlings",
      boosted: true,
      images: [
        "/placeholder.svg?height=500&width=500&text=Tomato+Seedlings+Main",
        "/placeholder.svg?height=500&width=500&text=Tomato+Seedlings+2",
      ],
      seller: {
        id: "seller_10",
        name: "Agro Nursery Hub",
        avatar: "/placeholder.svg?height=60&width=60&text=ANH",
        rating: 4.7,
        totalSales: 50,
        verified: true,
        responseTime: "Within 2 hours",
        phone: "+234 800 123 4576",
        location: "Imo State",
        joinedDate: "2023-09-01",
        memberSince: "September 2023",
        totalAds: 8,
      },
      stats: {
        views: 180,
        favorites: 35,
        adId: "AD001234576",
      },
      postedDate: "2024-01-01T09:00:00Z",
      lastUpdated: "2024-01-01T15:00:00Z",
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
    toast(isFavorite ? "Product removed from your favorites" : "Product added to your favorites")
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
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-green-600">
            EmilyAgros
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/marketplace" className="hover:text-green-600">
            All categories
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link
            href={`/category/${product.category.toLowerCase().replace(/\s+/g, "-")}`}
            className="hover:text-green-600"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-800">{product.subcategory}</span>
        </nav>

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
                      className={`relative rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? "border-green-500" : "border-gray-200 hover:border-gray-300"
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
                    <div className="flex justify-between">
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
