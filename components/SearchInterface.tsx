"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, SlidersHorizontal, X, MapPin, Star } from "lucide-react"
import Image from "next/image"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

const recentSearches = ["Organic tomatoes", "Fresh apples", "Farm eggs", "Wheat grain"]

const searchResults = [
  {
    id: "1",
    title: "Organic Tomatoes",
    price: 4.99,
    unit: "per kg",
    image: "/product/organic-tomatoes.jpg",
    farmer: "John Smith",
    location: "California",
    rating: 4.8,
    distance: "2.5 km",
    inStock: true,
  },
  {
    id: "2",
    title: "Fresh Apples",
    price: 5.99,
    unit: "per kg",
    image: "/product/fresh-apples.jpg",
    farmer: "Sarah Wilson",
    location: "Washington",
    rating: 4.9,
    distance: "3.2 km",
    inStock: true,
  },
  {
    id: "3",
    title: "Farm Eggs",
    price: 6.99,
    unit: "per dozen",
    image: "/product/farm-eggs.jpg",
    farmer: "David Johnson",
    location: "Iowa",
    rating: 4.7,
    distance: "1.8 km",
    inStock: false,
  },
]

const categories = ["Fruits", "Vegetables", "Grains", "Dairy", "Poultry"]
const sortOptions = ["Relevance", "Price: Low to High", "Price: High to Low", "Rating", "Distance"]

export default function SearchInterface() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 100])
  const [sortBy, setSortBy] = useState("Relevance")
  const [showResults, setShowResults] = useState(false)

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowResults(true)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setShowResults(false)
  }

  return (
    <div className="px-4 py-6">
      {/* Search Header */}
      <div className="mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search for products, farmers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10 pr-12 h-12 rounded-xl border-gray-200"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Filter and Sort */}
        <div className="flex items-center space-x-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex-1">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <SheetHeader>
                <SheetTitle>Filter Products</SheetTitle>
              </SheetHeader>
              <div className="py-6 space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="font-semibold mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCategories([...selectedCategories, category])
                            } else {
                              setSelectedCategories(selectedCategories.filter((c) => c !== category))
                            }
                          }}
                        />
                        <label htmlFor={category} className="text-sm">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <div className="px-2">
                    <Slider value={priceRange} onValueChange={setPriceRange} max={100} step={1} className="mb-2" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700">Apply Filters</Button>
              </div>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex-1">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[50vh]">
              <SheetHeader>
                <SheetTitle>Sort By</SheetTitle>
              </SheetHeader>
              <div className="py-6 space-y-2">
                {sortOptions.map((option) => (
                  <Button
                    key={option}
                    variant={sortBy === option ? "default" : "ghost"}
                    className={`w-full justify-start ${sortBy === option ? "bg-green-600 hover:bg-green-700" : ""}`}
                    onClick={() => setSortBy(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Recent Searches */}
      {!showResults && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Recent Searches</h3>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search) => (
              <Badge
                key={search}
                variant="secondary"
                className="cursor-pointer hover:bg-green-100"
                onClick={() => {
                  setSearchQuery(search)
                  setShowResults(true)
                }}
              >
                {search}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      {showResults && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">
              {searchResults.length} results for "{searchQuery}"
            </h3>
          </div>

          <div className="space-y-4">
            {searchResults.map((product) => (
              <Card key={product.id} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex space-x-4">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{product.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">by {product.farmer}</p>

                      <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>
                            {product.location} • {product.distance}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{product.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-green-600">${product.price}</span>
                          <span className="text-sm text-gray-500 ml-1">{product.unit}</span>
                        </div>
                        <Badge variant={product.inStock ? "default" : "secondary"}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
