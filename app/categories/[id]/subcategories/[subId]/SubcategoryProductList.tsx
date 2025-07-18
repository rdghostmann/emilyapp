"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import getProductsByCategory from "@/controllers/GetProductByCategory";
import ProductCard from "@/components/ProductCard";
import Loading from "../../loading";
import Head from "next/head";
import Link from "next/link";
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";


export default function SubcategoryProductList() {
  const { id, subId } = useParams<{ id: string; subId: string }>();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const formattedSubId = subId?.replace(/-/g, " ").toLowerCase();
  const capitalized = (s: string) =>
    s?.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const data = await getProductsByCategory(id);

        const matched = data.filter((product) =>
          Object.values(product).some((field) => {
            if (typeof field === "string") {
              return field.toLowerCase().includes(formattedSubId);
            }
            if (Array.isArray(field)) {
              return field
                .map((item) => String(item).toLowerCase())
                .some((val) => val.includes(formattedSubId));
            }
            return false;
          })
        );

        setFilteredProducts(matched);
      } catch (err) {
        console.error("Error fetching products:", err);
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    }

    if (id && subId) fetchProducts();
  }, [id, subId]);

  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Head>
        <title>{capitalized(subId)} Products - Agro Marketplace</title>
        <meta
          name="description"
          content={`Find the best ${formattedSubId} products under ${id} category.`}
        />
      </Head>

      {/* ✅ Breadcrumb */}
      <div className="px-4 pt-4">
        <BreadcrumbList className="text-sm text-gray-600 space-x-1">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/categories/${id}`}>{capitalized(id)}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <span className="font-medium">{capitalized(subId)}</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </div>

      {/* ✅ Subcategory Header */}
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold capitalize mb-2">
          {capitalized(subId)}
        </h1>
        <p className="text-gray-500">
          Discover high-quality {formattedSubId} under {capitalized(id)}.
        </p>
      </div>

      {/* ✅ Product List */}
      <div className="px-4 pb-8">
        {isLoading ? (
          <Loading />
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            No products found for this subcategory.
          </p>
        )}
      </div>
    </>
  );
}
