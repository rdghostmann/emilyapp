"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Star, MapPin, Phone, TrendingUp, Clock, Eye, ChevronRight, Share2, Heart,
} from "lucide-react"
import {
    Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink,
    BreadcrumbSeparator, BreadcrumbPage
} from "@/components/ui/breadcrumb"
import { ProductInterface } from "@/types/product"
import { toast } from "sonner"
import RelatedProducts from "./RelatedProducts"

interface ProductPageClientProps {
    product: ProductInterface | null
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
    const [loading, setLoading] = useState(true)
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800) // fake delay for skeleton
        return () => clearTimeout(timer)
    }, [])

    const handleFavorite = () => {
        setIsFavorite(!isFavorite)
        toast(isFavorite ? "Removed from favorites" : "Added to favorites")
    }

    const handleShare = () => {
        if (!product) return
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
        if (product?.seller && "phone" in product.seller) {
            // @ts-ignore since phone isn't in interface yet
            window.location.href = `tel:${product.seller.phone}`
        } else {
            toast("Seller phone number not available")
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-6">
                    <div className="animate-pulse">
                        <div className="bg-gray-200 h-6 w-1/2 mb-6 rounded"></div>
                        <div className="bg-white rounded-lg p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="bg-gray-200 h-96 rounded-lg"></div>
                                    <div className="grid grid-cols-5 gap-2">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div key={i} className="bg-gray-200 h-16 rounded"></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-gray-200 h-8 rounded"></div>
                                    <div className="bg-gray-200 h-6 rounded w-1/3"></div>
                                    <div className="bg-gray-200 h-20 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
                    <p className="text-gray-600 mb-8">
                        The product you&apos;re looking for doesn&apos;t exist or has been removed.
                    </p>
                    <Button asChild>
                        <Link href="/marketplace">Back to Marketplace</Link>
                    </Button>
                </div>
            </div>
        )
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
                                <Link href={`/category/${product.category}`}>{product.category}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        {product.subcategory && (
                            <>
                                <BreadcrumbSeparator><ChevronRight className="w-4 h-4" /></BreadcrumbSeparator>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{product.subcategory}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </>
                        )}
                    </BreadcrumbList>
                </Breadcrumb>

                {/* Product content */}
                <div className="bg-white rounded-lg shadow-sm mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
                        {/* Product Images */}
                        <div className="lg:col-span-2 relative">
                            <Image
                                src={product.images?.[0] || "/placeholder.svg"}
                                alt={product.name}
                                width={600}
                                height={500}
                                className="w-full h-[500px] object-cover rounded-lg"
                            />
                            {product.boosted && (
                                <Badge className="absolute top-4 left-4 bg-orange-500">
                                    <TrendingUp className="w-3 h-3 mr-1" /> Promoted
                                </Badge>
                            )}
                        </div>

                        {/* Info */}
                        <div className="space-y-6">
                            <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>
                            <p className="text-3xl font-bold text-green-600">₦{product.price.toLocaleString()}</p>

                            <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4">
                                {product.location && (
                                    <span className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-1" /> {product.location}
                                    </span>
                                )}
                                <span className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" /> {new Date(product.createdAt).toLocaleDateString()}
                                </span>
                                <span className="flex items-center">
                                    <Eye className="w-4 h-4 mr-1" /> {product.stats?.views || 0} views
                                </span>
                            </div>

                            <div className="flex gap-2">
                                <Button className="flex-1 bg-green-600 hover:bg-green-700 h-12 text-lg" onClick={handleCall}>
                                    <Phone className="w-5 h-5 mr-2" /> Call Seller
                                </Button>
                                <Button variant="outline" onClick={handleShare}>
                                    <Share2 className="w-5 h-5" />
                                </Button>
                                <Button variant={isFavorite ? "destructive" : "outline"} onClick={handleFavorite}>
                                    <Heart className={`w-5 h-5 ${isFavorite ? "fill-white text-red-500" : ""}`} />
                                </Button>
                            </div>

                            {/* Seller info */}
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Avatar>
                                            <AvatarImage src="/placeholder.svg" />
                                            <AvatarFallback>SL</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-semibold">{product.seller?.name || "Unknown Seller"}</h3>
                                            {product.seller?.rating !== undefined && (
                                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                    {product.seller.rating}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Product details */}
                            <Card>
                                <CardContent className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-3">Product details</h3>
                                    <div className="text-sm space-y-1">
                                        <p>Condition: {product.condition || "N/A"}</p>
                                        <p>Category: {product.category}</p>
                                        <p>Subcategory: {product.subcategory || "N/A"}</p>
                                        <p>Ad ID: {product.stats?.adId || "N/A"}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="border-t p-6">
                        <h2 className="text-xl font-bold mb-3">Description</h2>
                        <p className="text-gray-700">{product.description}</p>
                    </div>
                </div>



                {/* Description */}
                <div className="border-t p-6">
                    <h2 className="text-xl font-bold mb-3">Description</h2>
                    <p className="text-gray-700">{product.description}</p>
                </div>

                {/* Related products */}
                <RelatedProducts
                    subcategory={product.subcategory}
                    currentProductId={product._id}
                />

            </div>
        </div>
    )
}
