// /subcategory/[id]/SubcategoryPageClient.tsx

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, TrendingUp, Grid, List, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { SubcategoryDTO } from "@/controllers/categories";
import { ProductInterface } from "@/types/product";
import { findProductsBySubcategorySlug } from "@/controllers/products";

interface SubcategoryPageClientProps {
  subcategory: SubcategoryDTO;
  initialProducts: ProductInterface[];
}

export default function SubcategoryPageClient({ subcategory, initialProducts }: SubcategoryPageClientProps) {
  const [products, setProducts] = useState<ProductInterface[]>(initialProducts);
  const [productsLoading, setProductsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");





  useEffect(() => {
     // Server Action: Fetch products by subcategorySlug
  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const data = await findProductsBySubcategorySlug(subcategory.subcategorySlug);
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setProductsLoading(false);
    }
  };
  }, [subcategory.name, subcategory.categoryName, subcategory.subcategorySlug]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">

        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">EmilyAgros</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/marketplace">All Categories</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/category/${subcategory.subcategorySlug}`}>{subcategory.categoryName}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>

            <BreadcrumbItem>
              <span>{subcategory.name}</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Back to Category */}
        <div className="hidden my-4">
          <Button asChild variant="outline">
            <Link href={`/category/${subcategory.categoryName}`}>← Back to {subcategory.categoryName}</Link>
          </Button>
        </div>

        {/* Subcategory Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{subcategory.name}</h1>
          <p className="text-gray-600">{subcategory.description}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border rounded-lg bg-white">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products */}
        {productsLoading && <p>Loading products...</p>}
        {!productsLoading && products.length === 0 && <p>No products found.</p>}
        {!productsLoading && products.length > 0 && (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
            {products.map((p) => (
              <Card key={p._id} className="hover:shadow-lg transition-shadow">
                <CardContent>
                  <Link href={`/product/${p._id}`}>
                    <div className="relative">
                      <Image
                        src={p.images?.[0] || "/placeholder.svg"}
                        alt={p.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      {p.boosted && (
                        <Badge className="absolute top-2 left-2 bg-orange-500">
                          <TrendingUp className="w-3 h-3 mr-1" /> Boosted
                        </Badge>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{p.name}</h3>
                      <p className="text-2xl font-bold text-green-600 mb-2">₦{p.price.toLocaleString()}</p>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-1" /> {p.location}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{p.seller?.name || "Seller"}</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm">{p.seller?.rating || 0}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
