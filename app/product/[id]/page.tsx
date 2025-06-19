import ProductDetails from "@/components/ProductDetails"

type Props = {
  params: { id: string }
}

export default function ProductPage({ params }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProductDetails productId={params.id} />
    </div>
  )
}