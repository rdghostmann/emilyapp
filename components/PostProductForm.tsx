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

// ...categoryDetails, CategoryKey, categories, units as before...

export default function PostProductForm() {
  const [images, setImages] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | "">("")
  const [categoryProps, setCategoryProps] = useState<{ [key: string]: string }>({})
  const [features, setFeatures] = useState<string[]>([])
  const [newFeature, setNewFeature] = useState("")
  const [nutritionFacts, setNutritionFacts] = useState({
    calories: "",
    protein: "",
    carbs: "",
    fiber: "",
    vitaminC: "",
  })
  const [farmer, setFarmer] = useState({
    name: "",
    location: "",
    avatar: "",
    rating: "",
    totalReviews: "",
    verified: false,
    joinedDate: "",
    totalProducts: "",
    responseTime: "",
  })
  const [minOrder, setMinOrder] = useState("")
  const [maxOrder, setMaxOrder] = useState("")
  const [originalPrice, setOriginalPrice] = useState("")
  const [discount, setDiscount] = useState("")

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

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures((prev) => [...prev, newFeature.trim()])
      setNewFeature("")
    }
  }

  const removeFeature = (feature: string) => {
    setFeatures((prev) => prev.filter((f) => f !== feature))
  }

  const handleCategoryPropChange = (label: string, value: string) => {
    setCategoryProps((prev) => ({ ...prev, [label]: value }))
  }

  const handleNutritionChange = (field: string, value: string) => {
    setNutritionFacts((prev) => ({ ...prev, [field]: value }))
  }

  const handleFarmerChange = (field: string, value: string) => {
    setFarmer((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const productData: any = {
      title: formData.get("title"),
      category: selectedCategory,
      description: formData.get("description"),
      longDescription: formData.get("longDescription"),
      price: formData.get("price"),
      originalPrice: originalPrice || undefined,
      unit: formData.get("unit"),
      images,
      farmer: {
        name: farmer.name,
        location: farmer.location,
        avatar: farmer.avatar,
        rating: farmer.rating ? Number(farmer.rating) : undefined,
        totalReviews: farmer.totalReviews ? Number(farmer.totalReviews) : undefined,
        verified: farmer.verified,
        joinedDate: farmer.joinedDate,
        totalProducts: farmer.totalProducts ? Number(farmer.totalProducts) : undefined,
        responseTime: farmer.responseTime,
      },
      inStock: true,
      quantity: formData.get("quantity"),
      minOrder: minOrder ? Number(minOrder) : undefined,
      maxOrder: maxOrder ? Number(maxOrder) : undefined,
      postedAt: new Date().toISOString(),
      discount: discount ? Number(discount) : undefined,
      features,
      nutritionFacts: {
        calories: nutritionFacts.calories ? Number(nutritionFacts.calories) : undefined,
        protein: nutritionFacts.protein,
        carbs: nutritionFacts.carbs,
        fiber: nutritionFacts.fiber,
        vitaminC: nutritionFacts.vitaminC,
      },
      tags,
      phone: formData.get("phone"),
      email: formData.get("email"),
      ...categoryProps,
    };

    const result = await createProduct(productData);

    if (result.success) {
      alert("Product created successfully!");
      // Optionally reset form or redirect
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
              <Input id="title" name="title" placeholder="e.g., Fresh Organic Tomatoes" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select required value={selectedCategory} onValueChange={value => setSelectedCategory(value as CategoryKey)}>
                <SelectTrigger>
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
              name="description"
              placeholder="Describe your product, growing methods, quality, etc."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="longDescription">Long Description</Label>
            <Textarea
              id="longDescription"
              name="longDescription"
              placeholder="Detailed product information, features, storage instructions, etc."
              rows={4}
            />
          </div>

          {/* Pricing and Quantity */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" type="number" step="0.01" placeholder="0.00" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="originalPrice">Original Price</Label>
              <Input id="originalPrice" name="originalPrice" type="number" step="0.01" placeholder="(optional)" value={originalPrice} onChange={e => setOriginalPrice(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="discount">Discount (%)</Label>
              <Input id="discount" name="discount" type="number" step="1" placeholder="(optional)" value={discount} onChange={e => setDiscount(e.target.value)} />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Select required name="unit">
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
              <Input id="quantity" name="quantity" type="number" placeholder="100" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inStock">In Stock</Label>
              <Select name="inStock" defaultValue="true">
                <SelectTrigger>
                  <SelectValue placeholder="In Stock?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minOrder">Minimum Order</Label>
              <Input id="minOrder" name="minOrder" type="number" placeholder="(optional)" value={minOrder} onChange={e => setMinOrder(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxOrder">Maximum Order</Label>
              <Input id="maxOrder" name="maxOrder" type="number" placeholder="(optional)" value={maxOrder} onChange={e => setMaxOrder(e.target.value)} />
            </div>
          </div>

          {/* Farmer Info */}
          <div className="space-y-2">
            <Label>Farmer Information</Label>
            <div className="grid md:grid-cols-3 gap-4">
              <Input placeholder="Farmer Name" value={farmer.name} onChange={e => handleFarmerChange("name", e.target.value)} required />
              <Input placeholder="Location" value={farmer.location} onChange={e => handleFarmerChange("location", e.target.value)} required />
              <Input placeholder="Avatar URL" value={farmer.avatar} onChange={e => handleFarmerChange("avatar", e.target.value)} />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <Input placeholder="Rating" type="number" step="0.1" value={farmer.rating} onChange={e => handleFarmerChange("rating", e.target.value)} />
              <Input placeholder="Total Reviews" type="number" value={farmer.totalReviews} onChange={e => handleFarmerChange("totalReviews", e.target.value)} />
              <Input placeholder="Joined Date" value={farmer.joinedDate} onChange={e => handleFarmerChange("joinedDate", e.target.value)} />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <Input placeholder="Total Products" type="number" value={farmer.totalProducts} onChange={e => handleFarmerChange("totalProducts", e.target.value)} />
              <Input placeholder="Response Time" value={farmer.responseTime} onChange={e => handleFarmerChange("responseTime", e.target.value)} />
              <div className="flex items-center gap-2">
                <input type="checkbox" id="verified" checked={farmer.verified} onChange={e => handleFarmerChange("verified", e.target.checked)} />
                <Label htmlFor="verified">Verified</Label>
              </div>
            </div>
          </div>

          {/* Nutrition Facts */}
          <div className="space-y-2">
            <Label>Nutrition Facts</Label>
            <div className="grid md:grid-cols-5 gap-4">
              <Input placeholder="Calories" type="number" value={nutritionFacts.calories} onChange={e => handleNutritionChange("calories", e.target.value)} />
              <Input placeholder="Protein" value={nutritionFacts.protein} onChange={e => handleNutritionChange("protein", e.target.value)} />
              <Input placeholder="Carbs" value={nutritionFacts.carbs} onChange={e => handleNutritionChange("carbs", e.target.value)} />
              <Input placeholder="Fiber" value={nutritionFacts.fiber} onChange={e => handleNutritionChange("fiber", e.target.value)} />
              <Input placeholder="Vitamin C" value={nutritionFacts.vitaminC} onChange={e => handleNutritionChange("vitaminC", e.target.value)} />
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2">
            <Label>Features</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {features.map((feature) => (
                <Badge key={feature} variant="secondary" className="flex items-center gap-1">
                  {feature}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => removeFeature(feature)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add feature (e.g., Organic, Fresh)"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
              />
              <Button type="button" variant="outline" onClick={addFeature}>
                <Plus className="h-4 w-4" />
              </Button>
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
              <Input id="phone" name="phone" type="tel" placeholder="+234 801 234 5678" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="farmer@example.com" />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="cursor-pointer flex-1 bg-green-600 hover:bg-green-700">
              Post Product
            </Button>
            <Button type="button" variant="outline" className="cursor-pointer flex-1">
              Save as Draft
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}