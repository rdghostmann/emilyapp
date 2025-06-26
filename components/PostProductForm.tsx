"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Plus } from "lucide-react"
import createProduct from "@/controllers/CreateProduct"

// Move this to a shared file if needed
const categoryDetails = {
  "equipment-machines": {
    title: "Equipment & Machines",
    properties: [
      { label: "Condition", values: ["New", "Used"] },
      { label: "Machine Type", values: ["Tractor", "Sheller", "Sprayer", "Other"] },
      { label: "Fuel Type", values: ["Diesel", "Petrol", "Manual"] },
      { label: "Brand", values: [] },
    ],
  },
  "fertilizers": {
    title: "Fertilizers",
    properties: [
      { label: "Fertilizer Type", values: ["NPK", "Urea", "Organic"] },
      { label: "Application Use", values: ["Soil", "Foliar"] },
      { label: "Pack Size", values: [] },
    ],
  },
  "chemicals-insecticides-pesticides": {
    title: "Chemicals / Insecticides & Pesticides",
    properties: [
      { label: "Chemical Type", values: ["Herbicides", "Insecticides", "Fungicides"] },
      { label: "Application Type", values: [] },
    ],
  },
  "fruits-vegetables": {
    title: "Fruits & Vegetables",
    properties: [
      { label: "Type", values: ["Fruit", "Vegetable"] },
      { label: "Form", values: ["Fresh", "Dried", "Packaged"] },
      { label: "Harvest Date", values: [] },
    ],
  },
  "livestock-pets": {
    title: "Livestock & Pets",
    properties: [
      { label: "Animal Type", values: ["Poultry", "Cattle", "Goat", "Other"] },
      { label: "Breed", values: [] },
      { label: "Age Range", values: [] },
      { label: "Health Status / Vaccination", values: [] },
    ],
  },
  "animal-mating": {
    title: "Animal Mating",
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
    properties: [],
  },
  seedlings: {
    title: "Seedlings",
    properties: [
      { label: "Crop Type", values: ["Maize", "Tomatoes", "Cocoa", "Other"] },
      { label: "Seedlings Age", values: ["1 week", "2 weeks", "3 weeks"] },
      { label: "Type", values: ["Hybrid", "Open-pollination"] },
    ],
  },
  services: {
    title: "Services",
    properties: [
      { label: "Service Type", values: ["Tractor Hiring", "Farm Setup", "Veterinary"] },
      { label: "Area Coverage", values: ["Local", "State Wide", "National Wide"] },
      { label: "Availability", values: ["On-demand", "Booking"] },
    ],
  },
  "animal-pharmacy": {
    title: "Animal Pharmacy",
    properties: [
      { label: "Type of Animal", values: [] },
      { label: "Use", values: ["Preventive", "Curative", "Supplement"] },
      { label: "Product Form", values: ["Powder", "Injectable", "Oral"] },
    ],
  },
  "animal-accessories": {
    title: "Animal Accessories",
    properties: [
      { label: "Accessories", values: ["Poultry Drinkers", "Bird Cage", "Other"] },
      { label: "Animal Type", values: ["Dog", "Pig", "Other"] },
      { label: "Use", values: ["Feeding", "Transporting", "Housing"] },
    ],
  },
  "animal-feeds": {
    title: "Animal Feeds",
    properties: [
      { label: "Animal Type", values: [] },
      { label: "Feed Type", values: [] },
      { label: "Bag Size", values: ["10kg", "25kg", "50kg"] },
      { label: "Brand", values: ["Top Feeds", "Vital", "Other"] },
    ],
  },
  "agro-insurance": {
    title: "Agro Insurance",
    properties: [],
  },
};

type CategoryKey = keyof typeof categoryDetails;

const categories = Object.entries(categoryDetails).map(([id, cat]) => ({
  id,
  name: cat.title,
}));

const units = ["kg", "lbs", "tons", "pieces", "dozens", "liters", "gallons"]

export default function PostProductForm() {
  const [images, setImages] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | "">("")
  const [categoryProps, setCategoryProps] = useState<{ [key: string]: string }>({})

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags((prev) => [...prev, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag))
  }

  const handleCategoryPropChange = (label: string, value: string) => {
    setCategoryProps((prev) => ({ ...prev, [label]: value }))
  }
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Gather form data
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);

  // Build product data object
  const productData: any = {
    title: formData.get("title"),
    category: selectedCategory,
    description: formData.get("description"),
    price: formData.get("price"),
    unit: formData.get("unit"),
    quantity: formData.get("quantity"),
    location: formData.get("location"),
    harvestDate: formData.get("harvest-date"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    tags,
    images,
    ...categoryProps,
  };

  // Call server action
  const result = await createProduct(productData);

  if (result.success) {
    // Optionally redirect or show success message
    alert("Product created successfully!");
    // Reset form or navigate as needed
  } else {
    alert(result.error || "Failed to create product");
  }
};

  const selectedCategoryDetails =
    selectedCategory && selectedCategory in categoryDetails
      ? categoryDetails[selectedCategory as CategoryKey]
      : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Images */}
          <div className="space-y-2">
            <Label>Product Images</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Product ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-green-500 transition-colors">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Upload Images</span>
                <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Product Title</Label>
              <Input id="title" placeholder="e.g., Fresh Organic Tomatoes" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select required value={selectedCategory} onValueChange={value => setSelectedCategory(value as CategoryKey)}>                <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Dynamic Category Properties */}
          {selectedCategoryDetails && selectedCategoryDetails.properties.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4">
              {selectedCategoryDetails.properties.map((prop) => (
                <div className="space-y-2" key={prop.label}>
                  <Label>{prop.label}</Label>
                  {prop.values.length > 0 ? (
                    <Select
                      value={categoryProps[prop.label] || ""}
                      onValueChange={(value) => handleCategoryPropChange(prop.label, value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={`Select ${prop.label}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {prop.values.map((value) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      placeholder={`Enter ${prop.label}`}
                      value={categoryProps[prop.label] || ""}
                      onChange={(e) => handleCategoryPropChange(prop.label, e.target.value)}
                      required
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your product, growing methods, quality, etc."
              rows={4}
              required
            />
          </div>

          {/* Pricing and Quantity */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" step="0.01" placeholder="0.00" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      per {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Available Quantity</Label>
              <Input id="quantity" type="number" placeholder="100" required />
            </div>
          </div>

          {/* Location */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="City, State" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="harvest-date">Harvest/Production Date</Label>
              <Input id="harvest-date" type="date" />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => removeTag(tag)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add tags (e.g., organic, fresh, local)"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
              <Button type="button" variant="outline" onClick={addTag}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+234 801 234 5678" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="farmer@example.com" />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="cursor-pointerflex-1 bg-green-600 hover:bg-green-700">
              Post Product
            </Button>
            <Button type="button" variant="outline" className="cursor-pointerflex-1">
              Save as Draft
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}