import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Clock } from "lucide-react"

const featuredProducts = [
  {
    id: "5",
    title: "Organic Cassava Flour - 25kg",
    price: "₦12,000",
    location: "Ogun, Nigeria",
    seller: "Cassava Processing Co.",
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=300",
    timePosted: "2 hours ago",
    category: "Processed Foods",
  },
  {
    id: "6",
    title: "Broiler Chickens - Live",
    price: "₦3,500",
    location: "Oyo, Nigeria",
    seller: "Poultry Farm Ltd",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
    timePosted: "5 hours ago",
    category: "Poultry",
  },
  {
    id: "7",
    title: "Palm Oil - 25 Litres",
    price: "₦18,000",
    location: "Cross River, Nigeria",
    seller: "Palm Oil Processors",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300",
    timePosted: "1 day ago",
    category: "Oil & Fats",
  },
  {
    id: "8",
    title: "Irrigation System - Complete",
    price: "₦85,000",
    location: "FCT, Nigeria",
    seller: "AgriTech Solutions",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300",
    timePosted: "3 days ago",
    category: "Equipment",
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Latest Products</h2>
          <Button asChild variant="outline">
            <Link href="/marketplace">View All Products</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
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
                  <Badge variant="secondary" className="absolute top-2 right-2">
                    {product.category}
                  </Badge>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.title}</h3>
                  <p className="text-2xl font-bold text-green-600 mb-2">{product.price}</p>

                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {product.location}
                  </div>

                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Clock className="w-4 h-4 mr-1" />
                    {product.timePosted}
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">{product.seller}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm">{product.rating}</span>
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
      </div>
    </section>
  )
}
