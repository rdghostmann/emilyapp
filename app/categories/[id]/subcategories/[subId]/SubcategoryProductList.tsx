"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import getProductsByCategory from "@/controllers/GetProductByCategory";
import ProductCard from "@/components/ProductCard";
import Head from "next/head";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Loading from "../loading";

import { capitalizeWords } from "@/lib/utils";
import { categoryDetails } from "@/constants/categoryDetails";

export default function SubcategoryProductList() {
  const { id, subId } = useParams() as { id: string; subId: string };
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const formattedSubId = decodeURIComponent(subId).replace(/-/g, " ").toLowerCase();
  const capitalizedSubId = capitalizeWords(formattedSubId);

  const categoryDetail = categoryDetails[id];
  const filterProperties = categoryDetail?.properties?.slice(1) || [];

  // Collect all filter options from properties[1] onward
  const filterOptions = filterProperties.flatMap((prop) => prop.values || []);
  const filterLabel = filterProperties[0]?.label ?? "Filter";

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const data = await getProductsByCategory(id);

        const matched = data.filter((product: Record<string, any>) => {
          const matchesSubcategory = Object.values(product).some((field) => {
            if (typeof field === "string") {
              return field.toLowerCase().includes(formattedSubId);
            }
            if (Array.isArray(field)) {
              return field
                .map((item) => String(item).toLowerCase())
                .some((val) => val.includes(formattedSubId));
            }
            return false;
          });

          const matchesFilter =
            !selectedFilter ||
            Object.entries(product).some(([_, value]) => {
              if (typeof value === "string") {
                return value.toLowerCase().includes(selectedFilter.toLowerCase());
              }
              if (Array.isArray(value)) {
                return value
                  .map((v) => v.toLowerCase())
                  .includes(selectedFilter.toLowerCase());
              }
              return false;
            });

          return matchesSubcategory && matchesFilter;
        });

        setFilteredProducts(matched);
      } catch (err) {
        console.error("Error fetching products:", err);
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    }

    if (id && subId) {
      fetchProducts();
    }
  }, [id, subId, selectedFilter]);

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* SEO Metadata */}
      <Head>
        <title>{capitalizedSubId} | Agro Marketplace</title>
        <meta
          name="description"
          content={`Explore the best deals on ${capitalizedSubId} in the ${capitalizeWords(id)} category.`}
        />
      </Head>

      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/categories/${id}`}>
              {capitalizeWords(id)}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/categories/${id}/subcategories/${subId}`}>
              {capitalizedSubId}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Title */}
      <h1 className="text-xl font-bold my-4">{capitalizedSubId}</h1>

      {/* Filter Buttons */}
      {filterOptions.length > 0 && (
        <div className="pb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Filter by {filterLabel}:
          </h3>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option, index) => {
              const isSelected = selectedFilter === option;
              return (
                <button
                  key={`${option}-${index}`}  // ✅ Now always unique
                  className={`px-3 py-1 text-sm rounded border transition ${isSelected
                    ? "bg-green-600 text-white border-green-700"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                    }`}
                  onClick={() => setSelectedFilter(isSelected ? null : option)}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Product Grid */}
      {isLoading ? (
        <Loading />
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product._id ?? index} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No products found in this subcategory.</p>
      )}
    </div>
  );
}
