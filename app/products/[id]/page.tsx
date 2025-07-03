'use client'

import { useParams } from 'next/navigation'
import ProductDetails from './ProductDetails'

export default function ProductPage() {
  const params = useParams()
  const id = params?.id as string

  if (!id) {
    return (
      <div className="p-8 text-center text-red-500">
        Product ID not found.
      </div>
    )
  }

  return <ProductDetails productId={id} />
}
