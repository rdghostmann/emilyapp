// FeaturedProduct.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProductCard from "../ProductCard/ProductCard"
import { getAllProducts, ProductDTO } from "@/controllers/getAllProducts"

export default async function FeaturedProducts() {
  const featuredProducts: ProductDTO[] = await getAllProducts()

  console.log("featuredProducts:", featuredProducts);
  
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
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
