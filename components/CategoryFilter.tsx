"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Apple, Wheat, Carrot, Milk, Egg, Flower, TreePine, Beef } from "lucide-react"

const categories = [
  { id: "all", name: "All Products", icon: null, count: 1250 },
  { id: "fruits", name: "Fruits", icon: Apple, count: 320 },
  { id: "grains", name: "Grains", icon: Wheat, count: 180 },
  { id: "vegetables", name: "Vegetables", icon: Carrot, count: 290 },
  { id: "dairy", name: "Dairy", icon: Milk, count: 150 },
  { id: "poultry", name: "Poultry", icon: Egg, count: 95 },
  { id: "flowers", name: "Flowers", icon: Flower, count: 75 },
  { id: "herbs", name: "Herbs", icon: TreePine, count: 60 },
  { id: "livestock", name: "Livestock", icon: Beef, count: 80 },
]

export default function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Browse by Category</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const Icon = category.icon
          const isSelected = selectedCategory === category.id

          return (
            <Button
              key={category.id}
              variant={isSelected ? "default" : "outline"}
              className={`flex items-center space-x-2 ${
                isSelected ? "bg-green-600 hover:bg-green-700" : "hover:bg-green-50"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {Icon && <Icon className="h-4 w-4" />}
              <span>{category.name}</span>
              <Badge variant="secondary" className="ml-1">
                {category.count}
              </Badge>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
