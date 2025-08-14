"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  MapPin,
  Phone,
  MessageSquare,
  Shield,
  Calendar,
  Package,
  TrendingUp,
  Eye,
  Heart,
  Share2,
  Flag,
  CheckCircle,
} from "lucide-react"

// Mock seller data
const getSellerById = (id: string) => {
  const sellers = {
    seller_1: {
      id: "seller_1",
      name: "Adebayo Farms",
      avatar: "/placeholder.svg?height=120&width=120&text=AF",
      coverImage: "/placeholder.svg?height=300&width=800&text=Farm+Cover",
      verified: true,
      rating: 4.8,
      totalReviews: 156,
      totalSales: 234,
      responseTime: "Within 2 hours",
      phone: "+234 800 123 4567",
      email: "info@adebayofarms.com",
      location: "Ikorodu, Lagos State",
      joinedDate: "2022-03-15",
      memberSince: "March 2022",
      totalAds: 24,
      activeAds: 18,
      profileViews: 1234,
      description:
        "Adebayo Farms is a leading organic rice producer in Lagos State with over 10 years of experience in sustainable farming. We specialize in premium quality rice varieties and are committed to providing the best products to our customers across Nigeria.",
      specialties: ["Organic Rice", "Sustainable Farming", "Premium Grains"],
      businessHours: "Monday - Saturday: 8:00 AM - 6:00 PM",
      certifications: ["Organic Certified", "NAFDAC Approved", "ISO 9001"],
      socialMedia: {
        facebook: "adebayofarms",
        instagram: "adebayofarms",
        twitter: "adebayofarms",
      },
      stats: {
        followers: 567,
        following: 89,
      },
      products: [
        {
          id: "1",
          title: "Premium Organic Rice - 50kg",
          price: 25000,
          image: "/placeholder.svg?height=200&width=300&text=Premium+Rice",
          boosted: true,
          views: 234,
          favorites: 45,
          postedDate: "2024-01-15",
        },
        {
          id: "2",
          title: "Brown Rice - 25kg",
          price: 18000,
          image: "/placeholder.svg?height=200&width=300&text=Brown+Rice",
          boosted: false,
          views: 156,
          favorites: 23,
          postedDate: "2024-01-10",
        },
        {
          id: "3",
          title: "Jasmine Rice - 50kg",
          price: 22000,
          image: "/placeholder.svg?height=200&width=300&text=Jasmine+Rice",
          boosted: false,
          views: 189,
          favorites: 34,
          postedDate: "2024-01-08",
        },
      ],
      reviews: [
        {
          id: "1",
          reviewer: "John Okafor",
          avatar: "/placeholder.svg?height=40&width=40&text=JO",
          rating: 5,
          comment: "Excellent quality rice! Fast delivery and great customer service.",
          date: "2024-01-10",
          verified: true,
        },
        {
          id: "2",
          reviewer: "Mary Adamu",
          avatar: "/placeholder.svg?height=40&width=40&text=MA",
          rating: 4,
          comment: "Good product quality. Will definitely order again.",
          date: "2024-01-05",
          verified: true,
        },
        {
          id: "3",
          reviewer: "Ibrahim Hassan",
          avatar: "/placeholder.svg?height=40&width=40&text=IH",
          rating: 5,
          comment: "Best rice supplier in Lagos. Highly recommended!",
          date: "2023-12-28",
          verified: true,
        },
      ],
    },
  }

  return sellers[id as keyof typeof sellers] || null
}

export default function SellerProfilePage({ params }: { params: { id: string } }) {
  const [seller, setSeller] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    const fetchSeller = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const sellerData = getSellerById(params.id)
      setSeller(sellerData)
      setLoading(false)
    }

    fetchSeller()
  }, [params.id])

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: seller?.name,
        text: `Check out ${seller?.name} on EmilyAgros`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200"></div>
          <div className="container mx-auto px-4 py-8">
            <div className="bg-gray-200 h-8 w-1/3 mb-4 rounded"></div>
            <div className="bg-gray-200 h-4 w-2/3 mb-8 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-200 h-64 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!seller) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Seller Not Found</h1>
          <p className="text-gray-600 mb-8">The seller profile you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/marketplace">Back to Marketplace</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="relative h-64 bg-gradient-to-r from-green-400 to-green-600">
        <Image
          src={seller.coverImage || "/placeholder.svg"}
          alt={`${seller.name} cover`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <div className="relative -mt-16 mb-8">
          <Card className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                <AvatarImage src={seller.avatar || "/placeholder.svg"} alt={seller.name} />
                <AvatarFallback className="text-2xl">AF</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{seller.name}</h1>
                  {seller.verified && (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <Shield className="w-4 h-4 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold">{seller.rating}</span>
                    <span className="text-gray-600 ml-1">({seller.totalReviews} reviews)</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {seller.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    Member since {seller.memberSince}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {seller.specialties.map((specialty: string) => (
                    <Badge key={specialty} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                <p className="text-gray-700 mb-4">{seller.description}</p>

                <div className="flex flex-wrap gap-3">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact Seller
                  </Button>
                  <Button variant="outline" onClick={handleFollow} className="bg-transparent">
                    <Heart className={`w-4 h-4 mr-2 ${isFollowing ? "fill-current text-red-500" : ""}`} />
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button variant="outline" onClick={handleShare} className="bg-transparent">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    <Flag className="w-4 h-4 mr-2" />
                    Report
                  </Button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{seller.totalSales}</div>
                  <div className="text-sm text-gray-600">Total Sales</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{seller.activeAds}</div>
                  <div className="text-sm text-gray-600">Active Ads</div>
                </Card>
              </div>
            </div>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="products" className="mb-8">
          <TabsList className="grid w-full grid-cols-4 bg-white">
            <TabsTrigger value="products">Products ({seller.activeAds})</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({seller.totalReviews})</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seller.products.map((product: any) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
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
                      <p className="text-2xl font-bold text-green-600 mb-3">₦{product.price.toLocaleString()}</p>

                      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {product.views} views
                        </div>
                        <div className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {product.favorites} likes
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
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {seller.reviews.map((review: any) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.reviewer} />
                        <AvatarFallback>{review.reviewer.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-gray-900">{review.reviewer}</h4>
                            {review.verified && (
                              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Business Hours:</span>
                    <span className="font-medium">{seller.businessHours}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response Time:</span>
                    <span className="font-medium">{seller.responseTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Products:</span>
                    <span className="font-medium">{seller.totalAds}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Profile Views:</span>
                    <span className="font-medium">{seller.profileViews.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {seller.certifications.map((cert: string) => (
                      <div key={cert} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{seller.phone}</p>
                      <p className="text-sm text-gray-600">Primary Phone</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{seller.email}</p>
                      <p className="text-sm text-gray-600">Email Address</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{seller.location}</p>
                      <p className="text-sm text-gray-600">Business Location</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Phone className="w-4 h-4 mr-2" />
                    Call {seller.phone}
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Package className="w-4 h-4 mr-2" />
                    View All Products
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
