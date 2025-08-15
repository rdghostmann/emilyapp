"use client";

import { useState } from "react";
import ProductGrid from "@/components/ProductGrid/ProductGrid";
import SubcategoriesGrid from "@/components/SubCategoriesGrid/SubcategoriesGrid";

interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  productCount?: number;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  image?: string;
}

interface CategoryStoreViewProps {
  category: {
    _id: string;
    name: string;
  };
  subcategories: Subcategory[];
  initialProducts: Product[];
}

export default function CategoryStoreView({
  category,
  subcategories,
  initialProducts,
}: CategoryStoreViewProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>(initialProducts);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">{category.name}</h1>

      {/* Pass ONLY the subcategories and optional callback */}
      <SubcategoriesGrid
        subcategories={subcategories}
        // onSelectSubcategory={setSelectedSubcategory} // optional
      />

      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
