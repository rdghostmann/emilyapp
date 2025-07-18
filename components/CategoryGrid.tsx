"use client"
import Link from "next/link"
import Image from "next/image"
import {
  Wrench, Leaf, SprayCan, Apple, Beef, HeartHandshake, Flower, TreePine,
  Handshake, Pill, PawPrint, Drumstick, ShieldCheck
} from "lucide-react"

const categories = [
  {
    id: "equipment-machines",
    name: "Equipment & Machines",
    icon: Wrench,
    image: "/icons/equipments-machines.jpg",
    color: "bg-gray-100 text-gray-600",
    count: 45,
  },
  {
    id: "fertilizers",
    name: "Fertilizers",
    icon: Leaf,
    image: "/icons/fertilizers.jpg",
    color: "bg-green-100 text-green-600",
    count: 30,
  },
  {
    id: "chemicals-insecticides-pesticides",
    name: "Chemicals & Pesticides",
    icon: SprayCan,
    image: "/icons/chemicals-insecticides-pesticides.jpg",
    color: "bg-yellow-100 text-yellow-600",
    count: 28,
  },
  {
    id: "fruits-vegetables",
    name: "Fruits & Vegetables",
    icon: Apple,
    image: "/icons/food-fruits-vegetables.jpg",
    color: "bg-red-100 text-red-600",
    count: 320,
  },
  {
    id: "livestock-pets",
    name: "Livestock & Pets",
    icon: Beef,
    image: "/icons/livestock-pets.jpg",
    color: "bg-purple-100 text-purple-600",
    count: 80,
  },
  {
    id: "animal-mating",
    name: "Animal Mating",
    icon: HeartHandshake,
    image: "/icons/animal-mating.jpg",
    color: "bg-pink-100 text-pink-600",
    count: 12,
  },
  {
    id: "ornamental-crops",
    name: "Ornamental Crops",
    icon: Flower,
    image: "/icons/ornamental-crops.jpg",
    color: "bg-pink-50 text-pink-400",
    count: 20,
  },
  {
    id: "seedlings",
    name: "Seedlings",
    icon: TreePine,
    image: "/icons/seedlings.jpg",
    color: "bg-green-50 text-green-500",
    count: 60,
  },
  {
    id: "services",
    name: "Services",
    icon: Handshake,
    image: "/icons/services.jpg",
    color: "bg-blue-100 text-blue-600",
    count: 18,
  },
  {
    id: "animal-pharmacy",
    name: "Animal Pharmacy",
    icon: Pill,
    image: "/icons/animal-pharmacy.jpg",
    color: "bg-indigo-100 text-indigo-600",
    count: 10,
  },
  {
    id: "animal-accessories",
    name: "Animal Accessories",
    icon: PawPrint,
    image: "/icons/animal-accessories.jpg",
    color: "bg-orange-100 text-orange-600",
    count: 15,
  },
  {
    id: "animal-feeds",
    name: "Animal Feeds",
    icon: Drumstick,
    image: "/icons/animal-feeds.jpg",
    color: "bg-amber-100 text-amber-600",
    count: 25,
  },
  {
    id: "agro-insurance",
    name: "Agro Insurance",
    icon: ShieldCheck,
    image: "/icons/agro-insurance.jpg",
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((category) => {
          const { id, name, color, count, icon: Icon, image } = category

          return (
            <Link
              key={id}
              href={`/categories/${id}`}
              className="bg-white rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow block"
            >
              <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mx-auto mb-2`}>
                {image ? (
                  <Image
                    src={image}
                    alt={name}
                    width={48}
                    height={48}
                    className="rounded-lg object-cover w-10 h-10"
                  />
                ) : (
                  <Icon className="h-6 w-6" />
                )}
              </div>
              <p className="text-sm font-medium text-gray-900 mb-1">{name}</p>
              <p className="text-xs text-gray-500">{count} items</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}


// import { categories } from "@/constants/categoryDetails";
// import Image from "next/image";
// import Link from "next/link";

// export function CategoryGrid() {
//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//       {categories.map((category) => (
//         <Link
//           key={category.id}
//           href={`/categories/${category.id}`}
//           className="group relative overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg"
//         >
//           <div className="relative aspect-square">
//             <Image
//               src={category.image}
//               alt={category.name}
//               fill
//               className="object-cover transition-all group-hover:scale-105"
//               sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
//             />
//             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
//           </div>
//           <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
//             <h3 className="font-semibold text-lg">{category.name}</h3>
//             <p className="text-sm opacity-90">
//               {category.count} {category.count === 1 ? "item" : "items"}
//             </p>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// }