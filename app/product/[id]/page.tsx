// app/product/[id]/ProductPage.tsx
import React from 'react'
import { getProductById } from "@/controllers/products"
import { ProductInterface } from "@/types/product"
import ProductPageClient from './ProductPageClient'


interface ProductPageProps {
  params: { id: string } | Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product: ProductInterface | null = await getProductById(id)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }
  return <ProductPageClient product={product} />
}