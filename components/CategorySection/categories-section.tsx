import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { categories } from "@/constants/categories"
import { Package } from "lucide-react"

export default function CategoriesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Browse Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover a wide range of agricultural products and services from trusted farmers and suppliers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon || Package
            return (
              <Link key={category.id} href={`/category/${category.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {/* <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mr-4`}>
                        <IconComponent className="w-6 h-6" />
                      </div> */}
                      {category.image && (
                        <Image
                          src={category.image}
                          alt={category.name}
                          width={60}
                          height={60}
                          className={`${category.color} rounded-md object-cover mr-4`}
                        />
                      )}
                      <h3 className="text-md md:text-lg font-semibold text-gray-800">{category.name}</h3>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-2">
                      {category.subcategories.map((sub) => (
                        <span key={sub} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {sub}
                        </span>
                      ))}
                    </div>


                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
