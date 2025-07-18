"use client"
import Link from "next/link"
import Image from "next/image"
import { categories } from "@/constants/categoryDetails"

export default function CategoryGrid() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
        <Link 
          href="/categories" 
          className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
        >
          View All Categories
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300 aspect-square"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                priority={false}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
            
            {/* Content Overlay */}
            {/* <div className="relative z-10 h-full flex flex-col justify-end p-4">
              <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center mb-2`}>
                <category.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white drop-shadow-md">
                {category.name}
              </h3>
              <p className="text-sm text-white/90 drop-shadow-md">
                {category.count} {category.count === 1 ? 'item' : 'items'}
              </p>
            </div> */}
          </Link>
        ))}
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