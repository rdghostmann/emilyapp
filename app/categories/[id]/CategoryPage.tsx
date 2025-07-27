"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import getProductsByCategory from "@/controllers/GetProductByCategory";
import TopNavigation from "@/components/TopNavigation";
import MobileTabNavigation from "@/components/MobileTabNavigation";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  categoryDetails,
  CategoryDetail,
  CategoryValue,
} from "@/constants/categoryDetails";

export default function CategoryPage({ username }: { username: any }) {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [details, setDetails] = useState<CategoryDetail | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fallbackTitle = id.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

    const category = categoryDetails[id] ?? {
      title: fallbackTitle,
      description: "Browse items in this category.",
      properties: [],
      icon: () => null,
      image: "",
      color: "",
      count: 0,
    };

    setDetails(category);
  }, [id]);

  const filtersFromQuery = useMemo(() => {
    const result: Record<string, string[]> = {};
    for (const [key, value] of searchParams.entries()) {
      result[key] = value.split(",");
    }
    return result;
  }, [searchParams]);

  useEffect(() => {
    setSelectedFilters(filtersFromQuery);
  }, [filtersFromQuery]);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const data = await getProductsByCategory(id);
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) fetchProducts();
  }, [id]);

  useEffect(() => {
    const filtered = products.filter((product) =>
      Object.entries(selectedFilters).every(([key, values]) =>
        values.some((filterVal) => {
          const field = product[key];
          return typeof field === "string"
            ? field.toLowerCase().includes(filterVal.toLowerCase())
            : Array.isArray(field)
              ? field.map(String).some((val) => val.toLowerCase().includes(filterVal.toLowerCase()))
              : false;
        })
      )
    );

    setFilteredProducts(filtered);

    const query = new URLSearchParams();
    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (values.length > 0) query.set(key, values.join(","));
    });

    router.replace(`${window.location.pathname}?${query.toString()}`, { scroll: false });
  }, [selectedFilters, products]);

  const firstSubcategory = details?.properties[0];

  return (
    <div className="w-full mx-auto">
      <TopNavigation username={username} />

      <div className="max-w-full px-4 py-4">
        {/* ✅ Breadcrumb Navigation */}
        <BreadcrumbList className="text-sm text-gray-600 mb-4">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <span className="capitalize">{id.replace(/-/g, " ")}</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>

        {/* ✅ Heading */}
        <h1 className="text-2xl font-bold mb-2">
          {firstSubcategory?.label.split(" ")[0] || details?.title}
        </h1>

        <p className="text-gray-500 mb-6">{details?.description}</p>

        {/* ✅ Subcategory Value Thumbnails */}
        <div className="mb-6">
          <ul className="space-y-2">
            {Array.isArray(firstSubcategory?.values) && firstSubcategory.values.length > 0 ? (
              firstSubcategory.values.map((val, idx) => {
                // Ensure val is a CategoryValue object
                if (typeof val === "string" || !val?.label) return null;

                const slug = val.label.toLowerCase().replace(/\s+/g, "-");
                const imageUrl = val.image || "/placeholder.png";

                return (
                  <li
                    key={val.label + idx}
                    className="flex items-center p-3 bg-white rounded shadow-sm border border-gray-200 hover:bg-gray-50 transition-all"
                  >
                    <Link
                      href={`/categories/${id}/subcategories/${slug}`}
                      className="flex items-center w-full"
                    >
                      <div className="flex-shrink-0 mr-4">
                        <img
                          src={imageUrl}
                          alt={val.label}
                          width={48}
                          height={48}
                          className="rounded object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-base font-medium text-gray-800">{val.label}</span>
                        <span className="text-sm text-gray-500">View products</span>
                      </div>
                    </Link>
                  </li>
                );
              })
            ) : (
              <span className="text-gray-400">No subcategories available.</span>
            )}
          </ul>
        </div>

      </div>

      <MobileTabNavigation />
    </div>
  );
}
