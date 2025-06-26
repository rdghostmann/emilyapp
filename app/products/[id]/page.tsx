import ProductDetails from "@/components/ProductDetails"


export default function ProductPage({ params }: any) {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProductDetails productId={params.id} />
    </div>
  )
}