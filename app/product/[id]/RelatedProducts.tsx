// app/product/[id]/RelatedProducts.tsx
import { fetchProductsBySubcategory } from "@/controllers/products"
import ProductCard from "@/components/ProductCard/ProductCard"
import { ProductInterface } from "@/types/product"

interface RelatedProductsProps {
  subcategory?: string
  currentProductId: string
}

export default async function RelatedProducts({
  subcategory,
  currentProductId,
}: RelatedProductsProps) {
  if (!subcategory) return null // No subcategory → skip

  const products: ProductInterface[] = await fetchProductsBySubcategory({
    subcategory,
    sortBy: "newest",
  })

  const filtered = products.filter((p) => p._id !== currentProductId)

  if (filtered.length === 0) return null

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Related Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  )
}