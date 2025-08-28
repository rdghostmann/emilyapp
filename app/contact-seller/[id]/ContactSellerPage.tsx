"use client"

import { useState } from "react"
import { toast } from "sonner"
import { formatDate } from "@/lib/formatDate"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Phone, Star, MapPin, Shield } from "lucide-react"
import type { SellerProfile } from "@/types/seller"
import type { ProductInterface } from "@/types/product"

interface ContactSellerPageProps {
  seller: SellerProfile
  product: ProductInterface
}

export default function ContactSellerPage({ seller, product }: ContactSellerPageProps) {
  const [message, setMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Your message has been sent to the seller.")
    setMessage("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Contact {seller.username}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seller Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" /> Seller Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={seller.avatar} alt={seller.username} />
                    <AvatarFallback>{seller.username?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="font-semibold">{seller.username}</h3>
                      {seller.verified && <Shield className="w-4 h-4 text-green-500" />}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      {seller.rating || 0} ({seller.stats.totalSales || 0} sales)
                    </div>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-600 gap-2">
                  {seller.location && <MapPin className="w-4 h-4" />}
                  {seller.location}
                </div>

                <p className="text-xs text-gray-500">
                  Member since {formatDate(seller.createdAt)}
                </p>

                <div className="pt-4 border-t">
                  <Badge variant="secondary">Verified Seller</Badge>
                  <p className="text-sm text-gray-600">
                    This seller has been verified and has a good track record.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Product Summary */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Product</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 items-center">
                  <img
                    src={product.images?.[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-medium text-sm">{product.name}</h4>
                    <p className="text-lg font-bold text-green-600">
                      ₦{product.price.toLocaleString()}
                    </p>
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
                  <input type="hidden" name="sellerId" value={seller._id} />
                  <input type="hidden" name="productId" value={product._id} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Your Name *</Label>
                      <Input id="name" name="name" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" name="phone" type="tel" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder={`Inquiry about ${product.name}`}
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      Send Message
                    </Button>
                    <Button asChild variant="outline" className="flex-1">
                      <a href={`tel:${seller.phone}`}>
                        <Phone className="w-4 h-4 mr-2" /> Call Now
                      </a>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
