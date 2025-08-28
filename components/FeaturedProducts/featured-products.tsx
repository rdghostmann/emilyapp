// components/FeaturedProducts.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getAllProducts } from "@/controllers/getAllProducts"
import ProductCard from "../ProductCard/ProductCard"
import { ProductInterface } from "@/types/product"

export default async function FeaturedProducts() {
const featuredProducts = await getAllProducts()

   // Map ProductDTO to ProductInterface
  const products: ProductInterface[] = featuredProducts.map((product) => ({
    ...product,
    seller: {
      _id: product.seller._id,
      name: product.seller.name,
      rating: product.seller.rating,
      username: (product.seller as any).username ?? "", // fallback if missing
      phone: (product.seller as any).phone ?? "",       // fallback if missing
      avatar: (product.seller as any).avatar ?? undefined,
      verified: (product.seller as any).verified ?? undefined,
      totalSales: (product.seller as any).totalSales ?? undefined,
      totalAds: (product.seller as any).totalAds ?? undefined,
      memberSince: (product.seller as any).memberSince ?? undefined,
      location: (product.seller as any).location ?? undefined,
    },
  }));

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
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-gray-600">No products available.</p>
          )}
        </div>
      </div>
    </section>
  )
}

