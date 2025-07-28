import ProductFeed from '@/components/ProductFeed'
import ProductDetails from './ProductDetails'

export default async function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const id = params.id

  if (!id) {
    return (
      <div className="p-8 text-center text-red-500">
        Product ID not found.
      </div>
    )
  }

  return (
    <div>
      <ProductDetails productId={id} />
      <ProductFeed />
    </div>
  )
}
