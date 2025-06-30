"use client"
import Link from "next/link"
import {
  Wrench, Leaf, SprayCan, Apple, Beef, HeartHandshake, Flower, TreePine,
  Handshake, Pill, PawPrint, Drumstick, ShieldCheck
} from "lucide-react"

const categories = [
  {
    id: "equipment-machines",
    name: "Equipment & Machines",
    icon: Wrench,
    color: "bg-gray-100 text-gray-600",
    count: 45,
  },
  {
    id: "fertilizers",
    name: "Fertilizers",
    icon: Leaf,
    color: "bg-green-100 text-green-600",
    count: 30,
  },
  {
    id: "chemicals-insecticides-pesticides",
    name: "Chemicals & Pesticides",
    // name: "Chemicals / Insecticides & Pesticides",
    icon: SprayCan,
    color: "bg-yellow-100 text-yellow-600",
    count: 28,
  },
  {
    id: "fruits-vegetables",
    name: "Fruits & Vegetables",
    icon: Apple,
    color: "bg-red-100 text-red-600",
    count: 320,
  },
  {
    id: "livestock-pets",
    name: "Livestock & Pets",
    icon: Beef,
    color: "bg-purple-100 text-purple-600",
    count: 80,
  },
  {
    id: "animal-mating",
    name: "Animal Mating",
    icon: HeartHandshake,
    color: "bg-pink-100 text-pink-600",
    count: 12,
  },
  {
    id: "ornamental-crops",
    name: "Ornamental Crops",
    icon: Flower,
    color: "bg-pink-50 text-pink-400",
    count: 20,
  },
  {
    id: "seedlings",
    name: "Seedlings",
    icon: TreePine,
    color: "bg-green-50 text-green-500",
    count: 60,
  },
  {
    id: "services",
    name: "Services",
    icon: Handshake,
    color: "bg-blue-100 text-blue-600",
    count: 18,
  },
  {
    id: "animal-pharmacy",
    name: "Animal Pharmacy",
    icon: Pill,
    color: "bg-indigo-100 text-indigo-600",
    count: 10,
  },
  {
    id: "animal-accessories",
    name: "Animal Accessories",
    icon: PawPrint,
    color: "bg-orange-100 text-orange-600",
    count: 15,
  },
  {
    id: "animal-feeds",
    name: "Animal Feeds",
    icon: Drumstick,
    color: "bg-amber-100 text-amber-600",
    count: 25,
  },
  {
    id: "agro-insurance",
    name: "Agro Insurance",
    icon: ShieldCheck,
    color: "bg-teal-100 text-teal-600",
    count: 5,
  },
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="bg-white rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow block"
            >
              <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center mx-auto mb-2`}>
                <Icon className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium text-gray-900 mb-1">{category.name}</p>
              <p className="hidden text-xs text-gray-500">{category.count} items</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}