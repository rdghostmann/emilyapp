"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import getProductsByCategory from "@/controllers/GetProductByCategory";
import ProductCard from "@/components/ProductCard";
import Loading from "./loading";
import TopNavigation from "@/components/TopNavigation";
import MobileTabNavigation from "@/components/MobileTabNavigation";

type CategoryProperty = {
  label: string;
  values: string[];
};

type CategoryDetail = {
  title: string;
  description: string;
  properties: CategoryProperty[];
};

type CategoryDetailsMap = {
  [key: string]: CategoryDetail;
};

const categoryDetails: CategoryDetailsMap = {
  "equipment-machines": {
    title: "Equipment & Machines",
    description: "Find new and used tractors, shellers, sprayers, and more.",
    properties: [
      { label: "Condition", values: ["New", "Used"] },
      { label: "Machine Type", values: ["Tractor", "Sheller", "Sprayer", "Other"] },
      { label: "Fuel Type", values: ["Diesel", "Petrol", "Manual"] },
      { label: "Brand", values: [] },
    ],
  },
  "fertilizers": {
    title: "Fertilizers",
    description: "Browse a variety of fertilizers for your crops.",
    properties: [
      { label: "Fertilizer Type", values: ["NPK", "Urea", "Organic"] },
      { label: "Application Use", values: ["Soil", "Foliar"] },
      { label: "Pack Size", values: [] },
    ],
  },
  "chemicals-insecticides-pesticides": {
    title: "Chemicals / Insecticides & Pesticides",
    description: "Find herbicides, insecticides, fungicides and more.",
    properties: [
      { label: "Chemical Type", values: ["Herbicides", "Insecticides", "Fungicides"] },
      { label: "Application Type", values: [] },
    ],
  },
  "fruits-vegetables": {
    title: "Fruits & Vegetables",
    description: "Fresh and dried fruits and vegetables.",
    properties: [
      { label: "Type", values: ["Fruit", "Vegetable"] },
      { label: "Form", values: ["Fresh", "Dried", "Packaged"] },
      { label: "Harvest Date", values: [] },
    ],
  },
  "livestock-pets": {
    title: "Livestock & Pets",
    description: "Find poultry, cattle, and other animals.",
    properties: [
      { label: "Animal Type", values: ["Poultry", "Cattle", "Goat", "Other"] },
      { label: "Breed", values: [] },
      { label: "Age Range", values: [] },
      { label: "Health Status / Vaccination", values: [] },
    ],
  },
  "animal-mating": {
    title: "Animal Mating",
    description: "Animal mating and insemination services.",
    properties: [
      { label: "Animal Type", values: ["Dog", "Goat", "Pig"] },
      { label: "Insemination Services", values: ["Mobile AI Service"] },
      { label: "Breed Type", values: [] },
      { label: "Age", values: [] },
      { label: "Service Type", values: ["Natural", "Artificial"] },
    ],
  },
  "ornamental-crops": {
    title: "Ornamental Crops",
    description: "Browse ornamental crops and flowers.",
    properties: [],
  },
  seedlings: {
    title: "Seedlings",
    description: "Browse a variety of seedlings for your farm.",
    properties: [
      { label: "Crop Type", values: ["Maize", "Tomatoes", "Cocoa", "Other"] },
      { label: "Seedlings Age", values: ["1 week", "2 weeks", "3 weeks"] },
      { label: "Type", values: ["Hybrid", "Open-pollination"] },
    ],
  },
  services: {
    title: "Services",
    description: "Find agricultural services.",
    properties: [
      { label: "Service Type", values: ["Tractor Hiring", "Farm Setup", "Veterinary"] },
      { label: "Area Coverage", values: ["Local", "State Wide", "National Wide"] },
      { label: "Availability", values: ["On-demand", "Booking"] },
    ],
  },
  "animal-pharmacy": {
    title: "Animal Pharmacy",
    description: "Animal health and pharmacy products.",
    properties: [
      { label: "Type of Animal", values: [] },
      { label: "Use", values: ["Preventive", "Curative", "Supplement"] },
      { label: "Product Form", values: ["Powder", "Injectable", "Oral"] },
    ],
  },
  "animal-accessories": {
    title: "Animal Accessories",
    description: "Accessories for animals and pets.",
    properties: [
      { label: "Accessories", values: ["Poultry Drinkers", "Bird Cage", "Other"] },
      { label: "Animal Type", values: ["Dog", "Pig", "Other"] },
      { label: "Use", values: ["Feeding", "Transporting", "Housing"] },
    ],
  },
  "animal-feeds": {
    title: "Animal Feeds",
    description: "Animal feeds for all types of livestock.",
    properties: [
      { label: "Animal Type", values: [] },
      { label: "Feed Type", values: [] },
      { label: "Bag Size", values: ["10kg", "25kg", "50kg"] },
      { label: "Brand", values: ["Top Feeds", "Vital", "Other"] },
    ],
  },
  "agro-insurance": {
    title: "Agro Insurance",
    description: "Insurance products for agriculture.",
    properties: [],
  },
};

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const details = categoryDetails[id] || {
    title: id?.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    description: "Browse items in this category.",
    properties: [],
  };

  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(true); // ✅ added loading state


  // Load filters from query string on initial render
  useEffect(() => {
    const filtersFromQuery: Record<string, string[]> = {};
    for (const [key, value] of searchParams.entries()) {
      filtersFromQuery[key] = value.split(",");
    }
    setSelectedFilters(filtersFromQuery);
  }, []);

  // Fetch and set products

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true); // ✅ Start loading
      try {
        const data = await getProductsByCategory(id);
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setIsLoading(false); // ✅ Stop loading
      }
    }
    if (id) fetchProducts();
  }, [id]);

  // Filter products when filters change
  useEffect(() => {
    const filtered = products.filter((product) =>
      Object.entries(selectedFilters).every(([key, values]) =>
        values.some((filterVal) =>
          typeof product[key] === "string" &&
          product[key].toLowerCase().includes(filterVal.toLowerCase())
        )
      )
    );
    setFilteredProducts(filtered);

    // Update query string in URL
    const query = new URLSearchParams();
    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (values.length > 0) query.set(key, values.join(","));
    });
    router.replace(`?${query.toString()}`, { scroll: false });
  }, [selectedFilters, products]);

  const toggleFilter = (label: string, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[label] || [];
      const exists = current.includes(value);
      const updated = exists
        ? current.filter((v) => v !== value)
        : [...current, value];

      const result = { ...prev, [label]: updated };
      if (updated.length === 0) delete result[label];
      return result;
    });
  };


  return (
    <div className="max-w-5xl mx-auto p-6">
      <TopNavigation />

      {/* Product Feed */}
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Loading />
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-2">{details.title}</h1>
          <p className="mb-4 text-gray-600">{details.description}</p>

          {details.properties.length > 0 && (
            <div className="mb-6 space-y-4">
              {details.properties.map((prop) => (
                <div key={prop.label}>
                  <div className="font-semibold mb-1">{prop.label}:</div>
                  <div className="flex flex-wrap gap-2">
                    {prop.values.length > 0 ? (
                      prop.values.map((val) => {
                        const isActive = selectedFilters[prop.label]?.includes(val);
                        return (
                          <button
                            key={val}
                            className={`px-3 py-1 text-sm rounded border ${isActive
                              ? "bg-green-600 text-white border-green-700"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                              }`}
                            onClick={() => toggleFilter(prop.label, val)}
                          >
                            {val}
                          </button>
                        );
                      })
                    ) : (
                      <span className="text-gray-400">Any</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-400">
                No products found for selected filters.
              </p>
            )}
          </div>
        </>
      )}
      <MobileTabNavigation />
    </div>
  );

}