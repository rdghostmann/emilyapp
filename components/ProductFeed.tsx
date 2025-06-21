"use client"

import ProductCard from "./ProductCard"
import { useState } from "react"
import { Button } from "@/components/ui/button"

// Mock data - in a real app, this would come from your database
const mockProducts = [
  {
    id: "1",
    title: "Fresh Organic Tomatoes",
    description: "Premium quality organic tomatoes, freshly harvested from our farm. Perfect for cooking and salads.",
    price: 4.99,
    unit: "per kg",
    image: "/product/fresh-organic-tomatoes.jpg",
    farmer: {
      name: "John Smith",
      location: "California, USA",
      avatar: "/user/client-1.jpg",
      rating: 4.8,
      verified: true,
    },
    category: "Vegetables",
    inStock: true,
    quantity: "500 kg available",
    postedAt: "2 hours ago",
  },
  {
    id: "2",
    title: "Premium Wheat Grain",
    description: "High-quality wheat grain, perfect for flour production. Grown using sustainable farming practices.",
    price: 2.5,
    unit: "per kg",
    image: "/product/premium-wheat-grain.jpg",
    farmer: {
      name: "Maria Garcia",
      location: "Texas, USA",
      avatar: "/user/client-4.jpg",
      rating: 4.9,
      verified: true,
    },
    category: "Grains",
    inStock: true,
    quantity: "2000 kg available",
    postedAt: "5 hours ago",
  },
  {
    id: "3",
    title: "Fresh Farm Eggs",
    description: "Free-range chicken eggs from happy, healthy chickens. Rich in nutrients and perfect for any meal.",
    price: 6.99,
    unit: "per dozen",
    image: "/product/fresh-farm-eggs.jpg",
    farmer: {
      name: "David Johnson",
      location: "Iowa, USA",
      avatar: "/user/client-2.jpg",
      rating: 4.7,
      verified: true,
    },
    category: "Poultry",
    inStock: true,
    quantity: "200 dozens available",
    postedAt: "1 day ago",
  },
  {
    id: "4",
    title: "Organic Apples",
    description: "Sweet and crispy organic apples. No pesticides used. Great for eating fresh or making juice.",
    price: 5.99,
    unit: "per kg",
    image: "/product/organic-apples.jpg",
    farmer: {
      name: "Ben Wilson",
      location: "Washington, USA",
      avatar: "/user/client-3.jpg",
      rating: 4.8,
      verified: true,
    },
    category: "Fruits",
    inStock: true,
    quantity: "800 kg available",
    postedAt: "3 hours ago",
  },
  {
    id: "5",
    title: "Fresh Milk",
    description: "Pure, fresh milk from grass-fed cows. Rich in calcium and perfect for the whole family.",
    price: 3.99,
    unit: "per liter",
    image: "/product/fresh-milk.jpg",
    farmer: {
      name: "Robert Brown",
      location: "Wisconsin, USA",
      avatar: "/user/client-5.jpg",
      rating: 4.9,
      verified: true,
    },
    category: "Dairy",
    inStock: true,
    quantity: "500 liters available",
    postedAt: "4 hours ago",
  },
  {
    id: "6",
    title: "Organic Carrots",
    description: "Fresh, crunchy organic carrots. Perfect for cooking, juicing, or eating raw as a healthy snack.",
    price: 3.49,
    unit: "per kg",
    image: "/product/organic-carrots.jpg",
    farmer: {
      name: "Lisa Anderson",
      location: "Oregon, USA",
      avatar: "/user/client-4.jpg",
      rating: 4.6,
      verified: true,
    },
    category: "Vegetables",
    inStock: true,
    quantity: "300 kg available",
    postedAt: "6 hours ago",
  },
]

export default function ProductFeed() {
  const [showAll, setShowAll] = useState(false)
  const displayedProducts = showAll ? mockProducts : mockProducts.slice(0, 4)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Latest Products</h2>
        <p className="text-gray-600">{mockProducts.length} products found</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {!showAll && mockProducts.length > 4 && (
        <div className="text-center mt-6">
          <Button variant="outline" onClick={() => setShowAll(true)} className="w-full sm:w-auto">
            Load More Products
          </Button>
        </div>
      )}
    </div>
  )
}
