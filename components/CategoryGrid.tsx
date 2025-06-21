import Link from "next/link"
import { Apple, Wheat, Carrot, Milk, Egg, Flower, TreePine, Beef, Wrench } from "lucide-react"

const categories = [
  { id: "fruits", name: "Fruits", icon: Apple, color: "bg-red-100 text-red-600", count: 320 },
  { id: "vegetables", name: "Vegetables", icon: Carrot, color: "bg-orange-100 text-orange-600", count: 290 },
  { id: "grains", name: "Grains", icon: Wheat, color: "bg-yellow-100 text-yellow-600", count: 180 },
  { id: "dairy", name: "Dairy", icon: Milk, color: "bg-blue-100 text-blue-600", count: 150 },
  { id: "poultry", name: "Poultry", icon: Egg, color: "bg-amber-100 text-amber-600", count: 95 },
  { id: "flowers", name: "Flowers", icon: Flower, color: "bg-pink-100 text-pink-600", count: 75 },
  { id: "herbs", name: "Herbs", icon: TreePine, color: "bg-green-100 text-green-600", count: 60 },
  { id: "livestock", name: "Livestock", icon: Beef, color: "bg-purple-100 text-purple-600", count: 80 },
  { id: "equipment", name: "Equipment", icon: Wrench, color: "bg-gray-100 text-gray-600", count: 45 },
]

export default function CategoryGrid() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Categories</h2>
        <Link href="/#categories" className="text-green-600 text-sm font-medium">
          See All
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {categories.slice(0, 9).map((category) => {
          const Icon = category.icon
          return (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="bg-white rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center mx-auto mb-2`}>
                <Icon className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium text-gray-900 mb-1">{category.name}</p>
              <p className="text-xs text-gray-500">{category.count} items</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
