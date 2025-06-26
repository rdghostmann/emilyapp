"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Star, CheckCircle, Calendar, Package, MessageSquare, Edit, Phone, Mail } from "lucide-react"
import ProductCard from "./ProductCard"
import LogoutButton from "@/components/Logout-button/logout-button"


const mockUserProducts = [
  {
    id: "1",
    title: "Fresh Organic Tomatoes",
    description: "Premium quality organic tomatoes, freshly harvested from our farm.",
    price: 4.99,
    unit: "per kg",
    image: "/product/fresh-organic-tomatoes.jpg",
    farmer: {
      name: "John Doe",
      location: "California, USA",
      avatar: "/user/client-2.jpg",
      rating: 4.8,
      verified: true,
    },
    category: "Vegetables",
    inStock: true,
    quantity: "500 kg available",
    postedAt: "2 hours ago",
  },
]

export default function UserProfile({user:any}) {
  const [isEditing, setIsEditing] = useState(false)

  const userStats = {
    totalProducts: 24,
    totalSales: 156,
    rating: 4.8,
    reviews: 89,
    joinDate: "January 2023",
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder-user.jpg" alt="John Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h1 className="text-2xl font-bold">John Doe</h1>
                <Badge className="bg-green-600 hover:bg-green-700">Verified Farmer</Badge>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>California, USA</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {userStats.joinDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>
                    {userStats.rating} ({userStats.reviews} reviews)
                  </span>
                </div>
              </div>

              <p className="text-gray-700 mb-4">
                Organic farmer specializing in fresh vegetables and fruits. Committed to sustainable farming practices
                and delivering the highest quality produce.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{userStats.totalProducts}</div>
                  <div className="text-sm text-gray-600">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{userStats.totalSales}</div>
                  <div className="text-sm text-gray-600">Sales</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{userStats.rating}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
              <LogoutButton />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>Contact Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-gray-500" />
              <span>john.doe@example.com</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Specialties</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Organic Vegetables</Badge>
              <Badge variant="secondary">Fresh Fruits</Badge>
              <Badge variant="secondary">Herbs</Badge>
              <Badge variant="secondary">Sustainable Farming</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Products and Reviews */}
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products">My Products</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Active Products</h3>
            <Button className="bg-green-600 hover:bg-green-700">
              <Package className="h-4 w-4 mr-2" />
              Add New Product
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockUserProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <h3 className="text-lg font-semibold">Customer Reviews</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((review) => (
              <Card key={review}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder-user.jpg" alt="Reviewer" />
                      <AvatarFallback>R{review}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">Customer {review}</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Excellent quality products and fast delivery. Highly recommended!
                      </p>
                      <span className="text-xs text-gray-500">2 days ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <div className="space-y-3">
            {[
              "Posted new product: Fresh Organic Tomatoes",
              "Received 5-star review from Maria Garcia",
              "Completed sale of Premium Wheat",
              "Updated profile information",
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="h-2 w-2 bg-green-600 rounded-full"></div>
                <span className="text-sm">{activity}</span>
                <span className="text-xs text-gray-500 ml-auto">
                  {index + 1} day{index !== 0 ? "s" : ""} ago
                </span>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
