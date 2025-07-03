"use client"

import ProductCard from "./ProductCard"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import getAllProducts from "@/controllers/GetAllProducts"

export default function ProductFeed() {
    const [products, setProducts] = useState<any[]>([])
    const [showAll, setShowAll] = useState(false)
	
    useEffect(() => {
        async function fetchProducts() {
            const data = await getAllProducts()
            setProducts(data || [])
        }
        fetchProducts()
    }, [])

    const displayedProducts = showAll ? products : products.slice(0, 4)

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Latest Products</h2>
                <p className="text-gray-600">{products.length} products found</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {!showAll && products.length > 4 && (
                <div className="text-center mt-6">
                    <Button
                        variant="outline"
                        onClick={() => setShowAll(true)}
                        className="w-full sm:w-auto"
                    >
                        Load More Products
                    </Button>
                </div>
            )}
        </div>
    )
}