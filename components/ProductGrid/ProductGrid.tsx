// ProductGrid Component
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, TrendingUp } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  image?: string;
  boosted?: boolean;
  location?: string;
  seller?: string;
  rating?: number;
  description?: string;
}

interface ProductGridProps {
  products: Product[];
  viewMode?: "grid" | "list";
}

export default function ProductGrid({ products, viewMode = "grid" }: ProductGridProps) {
  if (!products || products.length === 0) {
    return <p className="text-gray-500">No products found for this category.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Products</h2>

      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        }
      >
        {products.map((product) => (
          <Card key={product._id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              {viewMode === "grid" ? (
                <>
                  <div className="relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {product.boosted && (
                      <Badge className="absolute top-2 left-2 bg-orange-500">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Boosted
                      </Badge>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-2xl font-bold text-green-600 mb-2">
                      ₦{product.price.toLocaleString()}
                    </p>

                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {product.location}
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">{product.seller}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm">{product.rating}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button asChild size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                        <Link href={`/product/${product.slug}`}>View Details</Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/contact-seller/${product.slug}`}>Contact</Link>
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex p-4 space-x-4">
                  <div className="relative flex-shrink-0">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={120}
                      height={120}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    {product.boosted && (
                      <Badge className="absolute -top-1 -right-1 bg-orange-500 text-xs">
                        Boosted
                      </Badge>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                    <p className="text-xl font-bold text-green-600 mb-2">
                      ₦{product.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        {product.location}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm">{product.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button asChild size="sm">
                      <Link href={`/product/${product.slug}`}>View</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/contact-seller/${product.slug}`}>Contact</Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
