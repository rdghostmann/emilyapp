"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Phone, Star, MapPin, Shield } from "lucide-react"
import { toast } from "sonner"

export default function ContactSellerPage({ params }: { params: { id: string } }) {
  const [message, setMessage] = useState("")

  // Mock seller data
  const seller = {
    name: "Adebayo Farms",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4.8,
    totalSales: 156,
    location: "Lagos, Nigeria",
    verified: true,
    responseTime: "2 hours",
    phone: "+234 800 123 4567",
  }

  const product = {
    title: "Premium Organic Rice - 50kg",
    price: "₦25,000",
    image: "/placeholder.svg?height=200&width=300",
    seller: {
      name: "Adebayo Farms",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4.8,
      totalSales: 156,
      location: "Lagos, Nigeria",
      verified: true,
      responseTime: "2 hours",
      phone: "+234 800 123 4567",
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    toast("Your message has been sent to the seller. They will respond soon.")
    setMessage("")
  }

  const handleCall = () => {
    window.location.href = `tel:${product?.seller.phone}`
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Contact Seller</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seller Information */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Seller Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={seller.avatar || "/placeholder.svg"} alt={seller.name} />
                    <AvatarFallback>AF</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-semibold">{seller.name}</h3>
                      {seller.verified && <Shield className="w-4 h-4 text-green-500 ml-1" />}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      {seller.rating} ({seller.totalSales} sales)
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                    {seller.location}
                  </div>
                  <div className="hidden items-center">
                    <MessageSquare className="w-4 h-4 text-gray-400 mr-2" />
                    Responds in {seller.responseTime}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Badge variant="secondary" className="mb-2">
                    Verified Seller
                  </Badge>
                  <p className="text-sm text-gray-600">This seller has been verified and has a good track record.</p>
                </div>
              </CardContent>
            </Card>

            {/* Product Summary */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Product</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-3">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-medium text-sm">{product.title}</h4>
                    <p className="text-lg font-bold text-green-600">{product.price}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Your Name *</Label>
                      <Input id="name" placeholder="Enter your name" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" type="tel" placeholder="+234 800 123 4567" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Inquiry about Premium Organic Rice" />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Hi, I'm interested in your Premium Organic Rice. Can you provide more details about the quality and delivery options?"
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                      Send Message
                    </Button>
                    <Button onClick={handleCall} type="button" variant="outline" className="flex items-center bg-transparent">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="hidden mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="flex flex-col items-center p-4 h-auto bg-transparent">
                    <MessageSquare className="w-6 h-6 mb-2" />
                    <span className="text-sm">WhatsApp</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center p-4 h-auto bg-transparent">
                    <Phone className="w-6 h-6 mb-2" />
                    <span className="text-sm">Call Direct</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center p-4 h-auto bg-transparent">
                    <Star className="w-6 h-6 mb-2" />
                    <span className="text-sm">Save Seller</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
