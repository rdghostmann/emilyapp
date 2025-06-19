import ProductDetails from "@/app/components/ProductDetails"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProductDetails productId={params.id} />
    </div>
  )
}
