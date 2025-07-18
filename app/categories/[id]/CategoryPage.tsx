"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import getProductsByCategory from "@/controllers/GetProductByCategory";
import TopNavigation from "@/components/TopNavigation";
import MobileTabNavigation from "@/components/MobileTabNavigation";
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";


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

// 👇 Category configuration object
const categoryDetails: CategoryDetailsMap = {
    "equipment-machines": {
        title: "Equipment & Machines",
        description: "Find new and used tractors, shellers, sprayers, and more.",
        properties: [
            { label: "Machine Type", values: ["Tractor", "Sheller", "Sprayer", "Otibaco Shredder"] },
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
            { label: "Fruits&Vegetables", values: ["Fruit", "Vegetable"] },
            { label: "Form", values: ["Fresh", "Dried", "Packaged"] },
            { label: "Harvest Date", values: [] },
        ],
    },
    "livestock-pets": {
        title: "Livestock & Pets",
        description: "Find poultry, cattle, and other animals.",
        properties: [
            { label: "livestock-Pets", values: ["Poultry", "Cattle", "Goat", "Other"] },
            { label: "Breed", values: [] },
            { label: "Age Range", values: [] },
            { label: "Health Status / Vaccination", values: [] },
        ],
    },
    "animal-mating": {
        title: "Animal Mating",
        description: "Animal mating and insemination services.",
        properties: [
            { label: "Animal-Mating", values: ["Dog", "Goat", "Pig"] },
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
            { label: "Ornamental-Crops", values: ["Maize", "Tomatoes", "Cocoa", "Other"] },
        ],
    },
    "seedlings": {
        title: "Seedlings",
        description: "Browse a variety of seedlings for your farm.",
        properties: [
            { label: "Seedlings", values: ["Maize", "Tomatoes", "Cocoa", "Other"] },
            { label: "Seedlings Age", values: ["1 week", "2 weeks", "3 weeks"] },
            { label: "Type", values: ["Hybrid", "Open-pollination"] },
        ],
    },
    "services": {
        title: "Services",
        description: "Find agricultural services.",
        properties: [
            { label: "Services", values: ["Tractor Hiring", "Farm Setup", "Veterinary"] },
            { label: "Area Coverage", values: ["Local", "State Wide", "National Wide"] },
            { label: "Availability", values: ["On-demand", "Booking"] },
        ],
    },
    "animal-pharmacy": {
        title: "Animal Pharmacy",
        description: "Animal health and pharmacy products.",
        properties: [
            { label: "Animal-Pharmacy", values: [] },
            { label: "Use", values: ["Preventive", "Curative", "Supplement"] },
            { label: "Product Form", values: ["Powder", "Injectable", "Oral"] },
        ],
    },
    "animal-accessories": {
        title: "Animal Accessories",
        description: "Accessories for animals and pets.",
        properties: [
            { label: "Animal-Accessories", values: ["Poultry Drinkers", "Bird Cage", "Other"] },
            { label: "Animal Type", values: ["Dog", "Pig", "Other"] },
            { label: "Use", values: ["Feeding", "Transporting", "Housing"] },
        ],
    },
    "animal-feeds": {
        title: "Animal Feeds",
        description: "Animal feeds for all types of livestock.",
        properties: [
            { label: "Animal-Feeds", values: [] },
            { label: "Feed Type", values: [] },
            { label: "Bag Size", values: ["10kg", "25kg", "50kg"] },
            { label: "Brand", values: ["Top Feeds", "Vital", "Other"] },
        ],
    },
    "agro-insurance": {
        title: "Agro Insurance",
        description: "Insurance products for agriculture.",
        properties: [
            { label: "Animal-Insurance", values: [] },

        ],
    },
};

export default function CategoryPage() {
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
        const category = categoryDetails[id] || {
            title: fallbackTitle,
            description: "Browse items in this category.",
            properties: [],
        };
        setDetails(category);
    }, [id]);

    const subCategory0 = details?.properties[0]; // ✅ Now it's category-specific

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
                            ? field.map(String).some(val => val.toLowerCase().includes(filterVal.toLowerCase()))
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

  
    return (
        <div className="w-full mx-auto">
            <TopNavigation />

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

                {/* ✅ Page Heading */}
                <h1 className="text-2xl font-bold mb-2">
                    {/* {`${subCategory0?.label.split(" ")[0] || ""} Subcategories`} */}
                    {`${subCategory0?.label.split(" ")[0] || ""} `}
                </h1>

                <p className="text-gray-500 mb-6">{details?.description}</p>

                {/* ✅ Subcategory Value Links with Thumbnails */}
                <div className="mb-6">
                    <ul className="space-y-2">
                        {subCategory0?.values && subCategory0.values.length > 0 ? (
                            subCategory0.values.map((val) => {
                                const slug = val.toLowerCase().replace(/\s+/g, "-");
                                const imageUrl = `https://assets.jijistatic.net/art/attributes/categories/vehicles-x3.png`; // TODO: Replace with dynamic images

                                return (
                                    <li
                                        key={val}
                                        className="flex items-center p-3 bg-white rounded shadow-sm border border-gray-200 hover:bg-gray-50 transition-all"
                                    >
                                        <Link
                                            href={`/categories/${id}/subcategories/${slug}`}
                                            className="flex items-center w-full"
                                        >
                                            <div className="flex-shrink-0 mr-4">
                                                <img
                                                    src={imageUrl}
                                                    alt={val}
                                                    width={48}
                                                    height={48}
                                                    className="rounded object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-base font-medium text-gray-800">{val}</span>
                                                <span className="text-sm text-gray-500">View products</span>
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })
                        ) : (
                            <span className="text-gray-400">No values</span>
                        )}
                    </ul>
                </div>

            </div>

            <MobileTabNavigation />
        </div>
    );

}
