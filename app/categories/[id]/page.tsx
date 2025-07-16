"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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
      { label: "Machine Type", values: ["Tractor", "Sheller", "Sprayer", "Other"] },
      { label: "Condition", values: ["New", "Used"] },
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
      { label: "AnimalType", values: ["Poultry", "Cattle", "Goat", "Other"] },
      { label: "Breed", values: [] },
      { label: "Age Range", values: [] },
      { label: "Health Status / Vaccination", values: [] },
    ],
  },
  "animal-mating": {
    title: "Animal Mating",
    description: "Animal mating and insemination services.",
    properties: [
      { label: "AnimalType", values: ["Dog", "Goat", "Pig"] },
      { label: "Insemination Services", values: ["Mobile AI Service"] },
      { label: "Breed Type", values: [] },
      { label: "Age", values: [] },
      { label: "Service Type", values: ["Natural", "Artificial"] },
    ],
  },
  "ornamental-crops": {
    title: "Ornamental Crops",
    description: "Browse ornamental crops and flowers.",
    properties: [
      { label: "OrnamentalType", values: ["Maize", "Tomatoes", "Cocoa", "Other"] },

    ],
  },
  "seedlings": {
    title: "Seedlings",
    description: "Browse a variety of seedlings for your farm.",
    properties: [
      { label: "seedlingsType", values: ["Maize", "Tomatoes", "Cocoa", "Other"] },
      { label: "Seedlings Age", values: ["1 week", "2 weeks", "3 weeks"] },
      { label: "Type", values: ["Hybrid", "Open-pollination"] },
    ],
  },
  "services": {
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

// Get all properties arrays from all categories as a flat array
const allProperties = Object.values(categoryDetails).flatMap((category) => category.properties);

// subCategories[0] is the first property object in the array
const subCategory0 = allProperties[0]; // { label: string, values: string[] }


export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [details, setDetails] = useState<CategoryDetail | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(true);

 // Handle details safely (avoid hydration issues)
  useEffect(() => {
    if (!id) return;
    const fallbackTitle = id.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    const category = categoryDetails[id] || {
      title: fallbackTitle,
      description: "Browse items in this category.",
      properties: [],
    };
    setDetails(category);
  }, [id]);

  // Load filters from URL on mount
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

  // Fetch products
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

  // Filter when selectedFilters change
  useEffect(() => {
    const filtered = products.filter((product) =>
      Object.entries(selectedFilters).every(([key, values]) =>
        values.some((filterVal) => {
          const field = product[key];
          return typeof field === "string"
            ? field.toLowerCase().includes(filterVal.toLowerCase())
            : Array.isArray(field)
            ? field.map(String).some(val => val.toLowerCase().includes(filterVal.toLowerCase()))
            : false;
        })
      )
    );
    setFilteredProducts(filtered);

    // Update URL query string
    const query = new URLSearchParams();
    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (values.length > 0) query.set(key, values.join(","));
    });

    router.replace(`${window.location.pathname}?${query.toString()}`, { scroll: false });
  }, [selectedFilters, products]);

  const toggleFilter = (label: string, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[label] || [];
      const exists = current.includes(value);
      const updated = exists ? current.filter((v) => v !== value) : [...current, value];

      const result = { ...prev, [label]: updated };
      if (updated.length === 0) delete result[label];
      return result;
    });
  };

 return (
    <div className="w-full mx-auto">
      <TopNavigation />

      <div className="max-w-full px-4 py-8">
        <h1 className="text-2xl font-bold mb-2">
          {subCategory0?.label}
        </h1>
        <div className="mb-6 space-y-4">
          <div>
            <div className="font-semibold mb-1">Values:</div>
            <div className="flex flex-wrap gap-2">
              {subCategory0?.values && subCategory0.values.length > 0 ? (
                subCategory0.values.map((val) => (
                  <span
                    key={val}
                    className="px-3 py-1 text-sm rounded border bg-white text-gray-700 border-gray-300"
                  >
                    {val}
                  </span>
                ))
              ) : (
                <span className="text-gray-400">No values</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <MobileTabNavigation />
    </div>
  );
}

