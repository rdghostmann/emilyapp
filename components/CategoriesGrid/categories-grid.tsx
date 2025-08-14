import Link from "next/link"
import Image from "next/image";
import { categories } from "@/constants/categories"


export default function CategoriesGrid() {
  return (
  <section className="py-6">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Categories</h2>
          <Link
            href="/categories"
            className="hidden lg:block text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
          >
            View All Categories
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href ?? `/categories/${category.id}`}
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
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
              </div>

     
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
