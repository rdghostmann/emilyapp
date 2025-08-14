"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, X, TrendingUp, CheckCircle, ImageIcon, Loader2, Save, Eye } from "lucide-react"
import { toast } from "sonner"
import { nigerianStates } from "@/constants/nigerianStates"
import { categories } from "@/constants/categories"

interface FormData {
    title: string
    category: string
    subcategory: string
    description: string
    price: string
    quantity: string
    state: string
    city: string
    phone: string
    whatsapp: boolean
}

interface FormErrors {
    [key: string]: string
}

type Category = {
  id: string;
  name: string;
  subcategories: string[];
};


export default function PostProductPage() {
    const [formData, setFormData] = useState<FormData>({
        title: "",
        category: "",
        subcategory: "",
        description: "",
        price: "",
        quantity: "",
        state: "",
        city: "",
        phone: "",
        whatsapp: false,
    })

    const [images, setImages] = useState<File[]>([])
    const [imagePreviews, setImagePreviews] = useState<string[]>([])
    const [errors, setErrors] = useState<FormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showBoostNotification, setShowBoostNotification] = useState(false)
    const [submitProgress, setSubmitProgress] = useState(0)
    const [isDraft, setIsDraft] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

    // Load draft from localStorage on component mount
    useEffect(() => {
        const savedDraft = localStorage.getItem("product-draft")
        if (savedDraft) {
            try {
                const parsedDraft = JSON.parse(savedDraft)
                setFormData(parsedDraft)
                setIsDraft(true)
            } catch (error) {
                console.error("Error loading draft:", error)
            }
        }
    }, [])

    // Save draft to localStorage
    const saveDraft = () => {
        localStorage.setItem("product-draft", JSON.stringify(formData))
        setIsDraft(true)
        toast("Your product draft has been saved locally.")
    }

    // Clear draft
    const clearDraft = () => {
        localStorage.removeItem("product-draft")
        setIsDraft(false)
    }

    const handleInputChange = (field: keyof FormData, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
        }
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])

        if (images.length + files.length > 5) {
            toast("You can upload maximum 5 images.")
            return
        }

        // Validate file types and sizes
        const validFiles = files.filter((file) => {
            if (!file.type.startsWith("image/")) {
                toast(`${file.name} is not an image file.`)
                return false
            }

            if (file.size > 5 * 1024 * 1024) {
                // 5MB limit
                toast(`${file.name} is larger than 5MB.`)
                return false
            }

            return true
        })

        if (validFiles.length > 0) {
            setImages((prev) => [...prev, ...validFiles])

            // Create previews
            validFiles.forEach((file) => {
                const reader = new FileReader()
                reader.onload = (e) => {
                    setImagePreviews((prev) => [...prev, e.target?.result as string])
                }
                reader.readAsDataURL(file)
            })
        }
    }

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index))
        setImagePreviews((prev) => prev.filter((_, i) => i !== index))
    }

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        if (!formData.title.trim()) newErrors.title = "Product title is required"
        if (!formData.category) newErrors.category = "Category is required"
        if (!formData.subcategory) newErrors.subcategory = "Subcategory is required"
        if (!formData.description.trim()) newErrors.description = "Description is required"
        if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
            newErrors.price = "Valid price is required"
        }
        if (!formData.state) newErrors.state = "State is required"
        if (!formData.city.trim()) newErrors.city = "City is required"
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required"

        // Phone validation
        const phoneRegex = /^(\+234|0)[789][01]\d{8}$/
        if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
            newErrors.phone = "Please enter a valid Nigerian phone number"
        }

        if (images.length === 0) {
            newErrors.images = "At least one product image is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const simulateUpload = async () => {
        for (let i = 0; i <= 100; i += 10) {
            setSubmitProgress(i)
            await new Promise((resolve) => setTimeout(resolve, 200))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            toast("Form validation failed. Please fix the errors and try again.")
            return
        }

        setIsSubmitting(true)
        setSubmitProgress(0)

        try {
            // Simulate form submission with progress
            await simulateUpload()

            // Clear draft after successful submission
            clearDraft()

            toast("Product Posted Successfully! Your product is now live on the marketplace.")

            // Show boost notification after successful post
            setTimeout(() => {
                setShowBoostNotification(true)
            }, 2000)

            // Reset form
            setFormData({
                title: "",
                category: "",
                subcategory: "",
                description: "",
                price: "",
                quantity: "",
                state: "",
                city: "",
                phone: "",
                whatsapp: false,
            })
            setImages([])
            setImagePreviews([])
        } catch (error) {
            toast("Submission failed. Something went wrong. Please try again.")
        } finally {
            setIsSubmitting(false)
            setSubmitProgress(0)
        }
    }

    //   const selectedCategory = formData.category ? categories[formData.category as keyof typeof categories] : null

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Post Your Product</h1>
                        <p className="text-gray-600 mt-2">Share your agricultural products with thousands of buyers</p>
                    </div>
                    {isDraft && (
                        <Alert className="w-auto">
                            <Save className="h-4 w-4" />
                            <AlertDescription>Draft saved</AlertDescription>
                        </Alert>
                    )}
                </div>

                {/* Progress Bar */}
                {isSubmitting && (
                    <Card className="mb-6">
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-4">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium mb-2">Uploading your product...</p>
                                    <Progress value={submitProgress} className="w-full" />
                                </div>
                                <span className="text-sm text-gray-600">{submitProgress}%</span>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Product Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <ImageIcon className="w-5 h-5 mr-2" />
                                Product Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="title">Product Title *</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g., Premium Organic Rice - 50kg"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange("title", e.target.value)}
                                    className={errors.title ? "border-red-500" : ""}
                                />
                                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="category">Category *</Label>
                                    <Select
                                        value={formData.category}
                                        onValueChange={(value: any) => {
                                            handleInputChange("category", value)
                                            handleInputChange("subcategory", "") // Reset subcategory
                                        }}
                                    >
                                        <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(categories).map(([key, category]) => (
                                                <SelectItem key={key} value={key}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="subcategory">Subcategory *</Label>
                                    <Select
                                        value={formData.subcategory}
                                        onValueChange={(value: string) => handleInputChange("subcategory", value)}
                                        disabled={!selectedCategory}
                                    >
                                        <SelectTrigger className={errors.subcategory ? "border-red-500" : ""}>
                                            <SelectValue placeholder="Select subcategory" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {selectedCategory?.subcategories.map((sub: string) => (
                                                <SelectItem key={sub} value={sub}>
                                                    {sub}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.subcategory && <p className="text-red-500 text-sm mt-1">{errors.subcategory}</p>}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe your product, quality, origin, farming methods, etc."
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => handleInputChange("description", e.target.value)}
                                    className={errors.description ? "border-red-500" : ""}
                                />
                                <p className="text-sm text-gray-500 mt-1">{formData.description.length}/500 characters</p>
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="price">Price (₦) *</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        placeholder="25000"
                                        value={formData.price}
                                        onChange={(e) => handleInputChange("price", e.target.value)}
                                        className={errors.price ? "border-red-500" : ""}
                                    />
                                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="quantity">Quantity Available</Label>
                                    <Input
                                        id="quantity"
                                        placeholder="e.g., 100 bags, 50kg each"
                                        value={formData.quantity}
                                        onChange={(e) => handleInputChange("quantity", e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Product Images */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Images *</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-600 mb-2">Upload product images (Max 5, up to 5MB each)</p>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="image-upload"
                                        disabled={images.length >= 5}
                                    />
                                    <Label htmlFor="image-upload" className="cursor-pointer">
                                        <Button type="button" variant="outline" disabled={images.length >= 5}>
                                            Choose Images ({images.length}/5)
                                        </Button>
                                    </Label>
                                </div>

                                {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}

                                {imagePreviews.length > 0 && (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {imagePreviews.map((preview, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={preview || "/placeholder.svg"}
                                                    alt={`Product ${index + 1}`}
                                                    className="w-full h-32 object-cover rounded-lg"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    className="absolute -top-2 -right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => removeImage(index)}
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                                {index === 0 && (
                                                    <div className="absolute bottom-2 left-2">
                                                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">Main</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Location & Contact */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Location & Contact</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="city">City *</Label>
                                    <Input
                                        id="city"
                                        placeholder="Enter city"
                                        value={formData.city}
                                        onChange={(e) => handleInputChange("city", e.target.value)}
                                        className={errors.city ? "border-red-500" : ""}
                                    />
                                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="state">State *</Label>
                                    <Select value={formData.state} onValueChange={(value: any) => handleInputChange("state", value)}>
                                        <SelectTrigger className={errors.state ? "border-red-500" : ""}>
                                            <SelectValue placeholder="Select state" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {nigerianStates.map((state) => (
                                                <SelectItem key={state} value={state}>
                                                    {state}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="phone">Phone Number *</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="+234 800 123 4567"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                    className={errors.phone ? "border-red-500" : ""}
                                />
                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="whatsapp"
                                    checked={formData.whatsapp}
                                    onCheckedChange={(checked) => handleInputChange("whatsapp", checked as boolean)}
                                />
                                <Label htmlFor="whatsapp">Available on WhatsApp</Label>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={saveDraft}
                            className="hidden flex-1 bg-transparent"
                            disabled={isSubmitting}
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Save Draft
                        </Button>
                        <Button type="button" variant="outline" className="hidden flex-1 bg-transparent" disabled={isSubmitting}>
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                        </Button>
                        <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Posting...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Post Product
                                </>
                            )}
                        </Button>
                    </div>
                </form>

                {/* Boost Notification */}
                {showBoostNotification && (
                    <Card className="mt-6 border-orange-200 bg-orange-50">
                        <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-orange-800 mb-2">🚀 Boost Your Product!</h3>
                                    <p className="text-orange-700 mb-4">
                                        Get more visibility and reach potential buyers faster. Boost your product to appear in trending
                                        categories and get 3x more views!
                                    </p>
                                    <div className="bg-white p-3 rounded-lg mb-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Boost for 7 days</span>
                                            <span className="font-bold text-green-600">₦2,000</span>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            • Priority placement in search results • Featured in trending section • 3x more visibility
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                                            Boost Now - ₦2,000
                                        </Button>
                                        <Button size="sm" variant="outline" onClick={() => setShowBoostNotification(false)}>
                                            Maybe Later
                                        </Button>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setShowBoostNotification(false)}>
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
