"use client"

import React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ProductInterface } from "@/types/product"

interface SimilarProductsProps {
  products: ProductInterface[]
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({ products }) => {
  if (!products || products.length === 0) return null

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Similar products you may like</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map((product) => (
          <Card key={product._id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-0">
              <Image
                src={product.images?.[0] || "/placeholder.svg"}
                alt={product.name}
                width={200}
                height={150}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              <div className="p-3">
                <h3 className="font-medium text-sm text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-green-600 font-bold text-sm">₦{product.price.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">{product.location || "N/A"}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default SimilarProducts
