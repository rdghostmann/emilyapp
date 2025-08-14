"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, MapPin, Phone, Mail, Star, Package, Heart, Settings, LogOut, Edit, Shield, Wallet } from "lucide-react"

export default function ProfilePage() {
  const user = {
    name: "Alfred Okonkwo",
    email: "alfred@example.com",
    phone: "+234 800 123 4567",
    location: "Lagos, Nigeria",
    avatar: "/placeholder.svg?height=100&width=100&text=AO",
    verified: true,
    rating: 4.8,
    totalSales: 45,
    totalPurchases: 23,
    memberSince: "March 2023",
    favoriteCount: 12,
    activeAds: 8,
  }

  const menuItems = [
    { icon: Package, label: "My Products", count: user.activeAds },
    { icon: Heart, label: "Favorites", count: user.favoriteCount },
    { icon: Wallet, label: "Wallet", count: null },
    { icon: Settings, label: "Settings", count: null },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-xl">AO</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                  {user.verified && <Shield className="w-5 h-5 text-green-500" />}
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  {user.rating} rating • {user.totalSales} sales
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  {user.location}
                </div>
              </div>
              <Button variant="outline" size="icon">
                <Edit className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">{user.totalSales}</p>
                <p className="text-sm text-gray-600">Sales</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{user.totalPurchases}</p>
                <p className="text-sm text-gray-600">Purchases</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">{user.activeAds}</p>
                <p className="text-sm text-gray-600">Active Ads</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{user.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{user.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">Member since {user.memberSince}</span>
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <div className="space-y-3 mb-6">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.label} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">{item.label}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.count !== null && <Badge variant="secondary">{item.count}</Badge>}
                      <span className="text-gray-400">›</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Logout Button */}
        <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
