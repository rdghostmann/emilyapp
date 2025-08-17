// app/product/[id]/page.tsx
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Star, MapPin, Phone, TrendingUp, Shield, Clock, Eye, ChevronRight,
} from "lucide-react"
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbSeparator, BreadcrumbPage
} from "@/components/ui/breadcrumb"
import { ProductInterface } from "@/types/product"
import { getProductById } from "@/controllers/products"

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product: ProductInterface | null = await getProductById(params.id)

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">
            The product you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
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
            <BreadcrumbSeparator><ChevronRight className="w-4 h-4" /></BreadcrumbSeparator>

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/marketplace">All categories</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator><ChevronRight className="w-4 h-4" /></BreadcrumbSeparator>

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/category/${product.category}`}>{product.category}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {product.subcategory && (
              <>
                <BreadcrumbSeparator><ChevronRight className="w-4 h-4" /></BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>{product.subcategory}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Product content */}
        <div className="bg-white rounded-lg shadow-sm mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
            {/* Product Images */}
            <div className="lg:col-span-2 relative">
              <Image
                src={product.images?.[0] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={500}
                className="w-full h-[500px] object-cover rounded-lg"
              />
              {product.boosted && (
                <Badge className="absolute top-4 left-4 bg-orange-500">
                  <TrendingUp className="w-3 h-3 mr-1" /> Promoted
                </Badge>
              )}
            </div>

            {/* Info */}
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>
              <p className="text-3xl font-bold text-green-600">₦{product.price.toLocaleString()}</p>
              <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4">
                {product.location && (
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" /> {product.location}
                  </span>
                )}
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" /> {new Date(product.createdAt).toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" /> {product.stats?.views || 0} views
                </span>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg">
                <Phone className="w-5 h-5 mr-2" /> Call Seller
              </Button>

              {/* Seller info */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>SL</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{product.seller?.name || "Unknown Seller"}</h3>
                      {product.seller?.rating !== undefined && (
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          {product.seller.rating}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Product details */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Product details</h3>
                  <div className="text-sm space-y-1">
                    <p>Condition: {product.condition || "N/A"}</p>
                    <p>Category: {product.category}</p>
                    <p>Subcategory: {product.subcategory || "N/A"}</p>
                    <p>Ad ID: {product.stats?.adId || "N/A"}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Description */}
          <div className="border-t p-6">
            <h2 className="text-xl font-bold mb-3">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
