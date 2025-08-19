// product/ProductPage.tsx
"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Phone, MessageSquare, Heart, Share2, TrendingUp, Shield, Clock, Eye, ChevronRight, User } from "lucide-react"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { toast } from "sonner"
import { formatDate } from "@/lib/formatDate"
import { ProductInterface } from "@/types/product"
import SimilarProducts from "./SimilarProduct"

interface ProductPageProps {
    product: ProductInterface
    similarProducts?: ProductInterface[]

}

export default function ProductPage({ product, similarProducts = [] }: ProductPageProps) {
    const [selectedImage, setSelectedImage] = useState(0)
    const [isFavorite, setIsFavorite] = useState(false)

    const handleFavorite = () => {
        setIsFavorite(!isFavorite)
        toast(isFavorite ? "Removed from favorites" : "Added to favorites")
    }

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: product.name,
                text: `Check out this product: ${product.name}`,
                url: window.location.href,
            })
        } else {
            navigator.clipboard.writeText(window.location.href)
            toast("Product link copied to clipboard")
        }
    }

    const handleCall = () => {
        window.location.href = `tel:${product.seller.phone}`
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-6">
                {/* Breadcrumb */}
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">EmilyAgros</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator><ChevronRight className="w-4 h-4" /></BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/marketplace">All categories</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator><ChevronRight className="w-4 h-4" /></BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={`/category/${product.category.toLowerCase().replace(/\s+/g, "-")}`}>
                                    {product.category}
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator><ChevronRight className="w-4 h-4" /></BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage>{product.subcategory}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="bg-white rounded-lg shadow-sm mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
                        {/* Product Images */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                                <Image
                                    src={product.images[selectedImage] || "/placeholder.svg"}
                                    alt={product.name}
                                    width={600}
                                    height={500}
                                    className="w-full h-[500px] object-cover"
                                />
                                {product.boosted && (
                                    <Badge className="absolute top-4 left-4 bg-orange-500 hover:bg-orange-600 flex items-center">
                                        <TrendingUp className="w-3 h-3 mr-1" /> Promoted
                                    </Badge>
                                )}
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <Button variant="secondary" size="icon" onClick={handleFavorite} className="bg-white/90 hover:bg-white shadow-sm">
                                        <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                                    </Button>
                                    <Button variant="secondary" size="icon" onClick={handleShare} className="bg-white/90 hover:bg-white shadow-sm">
                                        <Share2 className="w-4 h-4 text-gray-600" />
                                    </Button>
                                </div>
                            </div>

                            {/* Thumbnail Images */}
                            <div className="grid grid-cols-5 gap-2">
                                {product.images.map((img, idx) => (
                                    <button key={idx} onClick={() => setSelectedImage(idx)} className={`relative rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === idx ? "border-green-500" : "border-gray-200 hover:border-gray-300"}`}>
                                        <Image src={img || "/placeholder.svg"} alt={`${product.name} ${idx + 1}`} width={120} height={80} className="w-full h-16 object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-3xl font-bold text-green-600">₦{product.price.toLocaleString()}</span>
                                    {product.price && <span className="text-lg text-gray-500 line-through">₦{product.price.toLocaleString()}</span>}
                                    {product.negotiable && <Badge variant="outline" className="text-green-600 border-green-600">Negotiable</Badge>}
                                </div>
                                <div className="flex items-center text-sm text-gray-600 gap-4">
                                    <div className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{product.location}</div>
                                    <div className="flex items-center"><Clock className="w-4 h-4 mr-1" />{formatDate(product.createdAt)}</div>
                                    <div className="flex items-center"><Eye className="w-4 h-4 mr-1" />{product.stats?.views} views</div>
                                </div>
                            </div>

                            {/* Contact Buttons */}
                            <div className="space-y-3">
                                <Button onClick={handleCall} className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg flex items-center justify-center gap-2">
                                    <Phone className="w-5 h-5" /> Call {product.seller.phone}
                                </Button>
                                <Button asChild variant="outline" className="w-full h-12 text-lg border-green-600 text-green-600 hover:bg-green-50">
                                    <Link href={`/contact-seller/${product._id}`}>
                                        <MessageSquare className="w-5 h-5 mr-2" /> Chat with seller
                                    </Link>
                                </Button>
                            </div>

                            {/* Seller Info */}
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <Avatar className="w-12 h-12">
                                            <AvatarImage src={product.seller.avatar || "/placeholder.svg"} alt={product.seller.username} />
                                            <AvatarFallback>AF</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold text-gray-900">{product.seller.username}</h3>
                                                {product.seller.verified && <Shield className="w-4 h-4 text-green-500" />}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" /> {product.seller.rating} ({product.seller.totalSales} sales)
                                            </div>
                                        </div>
                                    </div>

                                    <Button asChild variant="outline" className="w-full mt-4 bg-transparent">
                                        <Link href={`/seller/${product.seller._id}`}>
                                            <User className="w-4 h-4 mr-2" /> View seller profile
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="border-t p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
                        <p className="text-gray-700 whitespace-pre-line leading-relaxed">{product.description}</p>
                    </div>

                    {/* Similar Products */}
                    <SimilarProducts products={similarProducts} />


                </div>
            </div>
        </div>
    )
}
