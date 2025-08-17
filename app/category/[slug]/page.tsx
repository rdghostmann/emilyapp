// app/category/[slug]/page.tsx
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Star, TrendingUp, ChevronRight } from "lucide-react"

import { categories } from "@/constants/categories"
import { ProductInterface } from "@/types/product"
import { getProduct } from "@/controllers/products"

export default async function CategoryPage({ params }: { params: { slug: string } }) {
    // Fetch products in this category
 const { slug } = params

  // Now slug is safe
  const category = categories.find((c) => c.id === slug)
  const products: ProductInterface[] = await getProduct(slug)

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-8">
            The category you&apos;re looking for doesn&apos;t exist.
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
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-green-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/categories" className="hover:text-green-600">Categories</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-800">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            {category.icon && (
              <category.icon className="text-4xl text-green-600" />
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{category.name}</h1>
              <p className="text-gray-600">
                {category.subcategories.length} subcategories available
              </p>
            </div>
          </div>
        </div>

        {/* Subcategories */}
        <h2 className="text-xl font-bold text-gray-800 mb-6">Browse Subcategories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {category.subcategories.map((sub) => (
            <Card key={sub.id} className="hover:shadow-lg transition-shadow group">
              <Link href={`/subcategory/${sub.id}`}>
                <CardContent className="p-4 text-center">
                  <Image
                    src={sub.image || "/placeholder.svg"}
                    alt={sub.name}
                    width={120}
                    height={120}
                    className="w-full h-24 object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform"
                  />
                  <h3 className="font-semibold text-gray-800 mb-2">{sub.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{sub.description}</p>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {sub.productCount} products
                  </Badge>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {/* Products in this category */}
        <h2 className="text-xl font-bold text-gray-800 mb-6">Latest Products</h2>
        {products.length === 0 ? (
          <p className="text-gray-600">No products available in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => (
              <Card key={p._id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <Link href={`/product/${p._id}`}>
                    <div className="relative">
                      <Image
                        src={p.images?.[0] || "/placeholder.svg"}
                        alt={p.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      {p.boosted && (
                        <Badge className="absolute top-2 left-2 bg-orange-500">
                          <TrendingUp className="w-3 h-3 mr-1" /> Boosted
                        </Badge>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{p.name}</h3>
                      <p className="text-2xl font-bold text-green-600 mb-2">
                        ₦{p.price.toLocaleString()}
                      </p>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {p.location}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          {p.seller?.name || "Seller"}
                        </span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm">{p.seller?.rating || 0}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
