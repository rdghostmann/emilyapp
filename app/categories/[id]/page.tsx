"use client"

import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { ChevronDown, Filter, Grid, List, Search, X } from "lucide-react"
import getProductsByCategory from "@/controllers/GetProductByCategory"
import Loading from "./loading"
import TopNavigation from "@/components/TopNavigation"
import MobileTabNavigation from "@/components/MobileTabNavigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

type CategoryProperty = {
  label: string
  values: string[]
}

type CategoryDetail = {
  title: string
  description: string
  properties: CategoryProperty[]
}

type CategoryDetailsMap = {
  [key: string]: CategoryDetail
}

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
  fertilizers: {
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
    properties: [{ label: "OrnamentalType", values: ["Maize", "Tomatoes", "Cocoa", "Other"] }],
  },
  seedlings: {
    title: "Seedlings",
    description: "Browse a variety of seedlings for your farm.",
    properties: [
      { label: "seedlingsType", values: ["Maize", "Tomatoes", "Cocoa", "Other"] },
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
}

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const router = useRouter()

  const [details, setDetails] = useState<CategoryDetail | null>(null)
  const [products, setProducts] = useState<any[]>([])
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("newest")

  // Handle details safely (avoid hydration issues)
  useEffect(() => {
    if (!id) return
    const fallbackTitle = id.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    const category = categoryDetails[id] || {
      title: fallbackTitle,
      description: "Browse items in this category.",
      properties: [],
    }
    setDetails(category)
  }, [id])

  // Load filters from URL on mount
  const filtersFromQuery = useMemo(() => {
    const result: Record<string, string[]> = {}
    for (const [key, value] of searchParams.entries()) {
      if (key !== "search" && key !== "sort") {
        result[key] = value.split(",")
      }
    }
    return result
  }, [searchParams])

  useEffect(() => {
    setSelectedFilters(filtersFromQuery)
    setSearchQuery(searchParams.get("search") || "")
    setSortBy(searchParams.get("sort") || "newest")
  }, [filtersFromQuery, searchParams])

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true)
      try {
        const data = await getProductsByCategory(id)
        setProducts(data)
        setFilteredProducts(data)
      } catch (err) {
        console.error("Failed to fetch products", err)
        setProducts([])
        setFilteredProducts([])
      } finally {
        setIsLoading(false)
      }
    }
    if (id) fetchProducts()
  }, [id])

  // Filter and search when dependencies change
  useEffect(() => {
    let filtered = products

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply category filters
    filtered = filtered.filter((product) =>
      Object.entries(selectedFilters).every(
        ([key, values]) =>
          values.length === 0 ||
          values.some((filterVal) => {
            const field = product[key]
            return typeof field === "string"
              ? field.toLowerCase().includes(filterVal.toLowerCase())
              : Array.isArray(field)
                ? field.map(String).some((val) => val.toLowerCase().includes(filterVal.toLowerCase()))
                : false
          }),
      ),
    )

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (a.price || 0) - (b.price || 0)
        case "price-high":
          return (b.price || 0) - (a.price || 0)
        case "oldest":
          return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
        case "newest":
        default:
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      }
    })

    setFilteredProducts(filtered)

    // Update URL query string
    const query = new URLSearchParams()
    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (values.length > 0) query.set(key, values.join(","))
    })
    if (searchQuery.trim()) query.set("search", searchQuery)
    if (sortBy !== "newest") query.set("sort", sortBy)

    const queryString = query.toString()
    const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname
    router.replace(newUrl, { scroll: false })
  }, [selectedFilters, products, searchQuery, sortBy, router])

  const toggleFilter = (label: string, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[label] || []
      const exists = current.includes(value)
      const updated = exists ? current.filter((v) => v !== value) : [...current, value]
      const result = { ...prev, [label]: updated }
      if (updated.length === 0) delete result[label]
      return result
    })
  }

  const clearAllFilters = () => {
    setSelectedFilters({})
    setSearchQuery("")
  }

  const getActiveFiltersCount = () => {
    return Object.values(selectedFilters).reduce((count, values) => count + values.length, 0)
  }

  const FilterSection = () => (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900">Search</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Active Filters */}
      {getActiveFiltersCount() > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Active Filters</h3>
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-red-600 hover:text-red-700">
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(selectedFilters).map(([label, values]) =>
              values.map((value) => (
                <Badge
                  key={`${label}-${value}`}
                  variant="secondary"
                  className="cursor-pointer hover:bg-red-100"
                  onClick={() => toggleFilter(label, value)}
                >
                  {value}
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              )),
            )}
          </div>
        </div>
      )}

      {/* Category Filters */}
      {details?.properties.map((property) => (
        <Collapsible key={property.label} defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left">
            <h3 className="font-semibold text-gray-900">{property.label}</h3>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 pt-2">
            {property.values.length > 0 ? (
              property.values.map((value) => (
                <label key={value} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={selectedFilters[property.label]?.includes(value) || false}
                    onChange={() => toggleFilter(property.label, value)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">{value}</span>
                </label>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">No options available</p>
            )}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{details?.title}</h1>
          <p className="text-gray-600 mb-4">{details?.description}</p>

          {/* Results and Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? "result" : "results"} found
            </p>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              {/* View Mode */}
              <div className="flex border border-gray-300 rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="sm:hidden bg-transparent">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    {getActiveFiltersCount() > 0 && (
                      <Badge variant="destructive" className="ml-2">
                        {getActiveFiltersCount()}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>Filter products by your preferences</SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSection />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden sm:block w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                {getActiveFiltersCount() > 0 && <Badge variant="secondary">{getActiveFiltersCount()}</Badge>}
              </div>
              <FilterSection />
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                <Button onClick={clearAllFilters} variant="outline">
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-square bg-gray-100 relative">
                      <img
                        src={product.image || "/placeholder.svg?height=300&width=300"}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                      {product.condition && <Badge className="absolute top-2 left-2">{product.condition}</Badge>}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{product.title}</h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-green-600">
                          ₦{product.price?.toLocaleString() || "Contact for price"}
                        </span>
                        <span className="text-xs text-gray-500">{product.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <MobileTabNavigation />
    </div>
  )
}
