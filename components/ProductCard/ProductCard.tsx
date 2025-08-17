// ProductCard.jsx
"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Clock } from "lucide-react"
import { ProductInterface } from "@/types/product"
import { formatDate } from "@/lib/formatDate"

interface ProductCardProps {
    product: ProductInterface
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <Card key={product._id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative">
                    <Image
                        src={product.images?.[0] || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {product.boosted && (
                        <Badge variant="secondary" className="absolute top-2 right-2 bg-orange-500 text-white">
                            Featured
                        </Badge>
                    )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-2xl font-bold text-green-600 mb-2">₦{product.price.toLocaleString()}</p>

                    <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {product.location || "N/A"}
                    </div>

                    <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Clock className="w-4 h-4 mr-1" />
                        {formatDate(product.createdAt)}
                    </div>

                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-600">{product.seller.name}</span>
                        <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span className="text-sm">{product.seller.rating}</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                        <Button asChild size="sm" className="flex-1">
                            <Link href={`/product/${product._id}`}>View Details</Link>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                            <Link href={`/contact-seller/${product.seller._id}`}>Contact</Link>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProductCard
