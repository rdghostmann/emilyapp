import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, MapPin, Star } from "lucide-react"

const trendingProducts = [
  {
    id: "1",
    title: "Premium Organic Rice",
    price: "₦25,000",
    location: "Lagos, Nigeria",
    seller: "Adebayo Farms",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=300",
    boosted: true,
    category: "Grains",
  },
  {
    id: "2",
    title: "Fresh Tomatoes - 50kg",
    price: "₦15,000",
    location: "Kano, Nigeria",
    seller: "Musa Agriculture",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=300",
    boosted: true,
    category: "Vegetables",
  },
  {
    id: "3",
    title: "Hybrid Maize Seeds",
    price: "₦8,500",
    location: "Kaduna, Nigeria",
    seller: "Green Valley Seeds",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=300",
    boosted: true,
    category: "Seeds",
  },
  {
    id: "4",
    title: "Dairy Cow - Holstein",
    price: "₦450,000",
    location: "Plateau, Nigeria",
    seller: "Cattle Ranch Ltd",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=300",
    boosted: false,
    category: "Livestock",
  },
]

export default function TrendingProducts() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <TrendingUp className="w-6 h-6 text-green-600 mr-2" />
            <h2 className="text-3xl font-bold text-gray-800">Trending Products</h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/marketplace?filter=trending">View All</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
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
