// app/subcategory/[id]/page.tsx
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Star, TrendingUp, ChevronRight } from "lucide-react"
import {
    Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink,
    BreadcrumbSeparator, BreadcrumbPage
} from "@/components/ui/breadcrumb"
import { getSubcategoryById } from "@/controllers/categories"
import { ProductInterface } from "@/types/product"
import { getProduct } from "@/controllers/products"

export default async function SubcategoryPage({ params }: { params: { id: string } }) {
 const { id } = params

    const subcategory = await getSubcategoryById(id)
    if (!subcategory) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Subcategory Not Found</h1>
                    <p className="text-gray-600 mb-8">
                        The subcategory you&apos;re looking for doesn&apos;t exist.
                    </p>
                    <Button asChild>
                        <Link href="/marketplace">Back to Marketplace</Link>
                    </Button>
                </div>
            </div>
        )
    }

    const products: ProductInterface[] = await getProduct(
        subcategory.categorySlug,
        subcategory.id
    )

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
                                <Link href={`/category/${subcategory.categorySlug}`} className="hover:text-green-600">
                                    {subcategory.categoryName}
                                </Link>                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {subcategory && (
                            <>
                                <BreadcrumbSeparator><ChevronRight className="w-4 h-4" /></BreadcrumbSeparator>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{subcategory.name}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </>
                        )}
                    </BreadcrumbList>
                </Breadcrumb>


                {/* Subcategory Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        {/* {subcategory.icon && (
                            <span className="text-4xl text-green-600">{subcategory.icon}</span>
                        )} */}
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">{subcategory.name}</h1>
                            <p className="text-gray-600">{subcategory.description}</p>
                        </div>
                    </div>
                </div>

                {/* Products in this subcategory */}
                <h2 className="text-xl font-bold text-gray-800 mb-6">Products</h2>
                {products.length === 0 ? (
                    <p className="text-gray-600">No products available in this subcategory yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((p) => (
                            <Card key={p._id} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-0">
                                    <Link href={`/product/${p._id}`}>
                                        <div className="relative">
                                            <Image
                                                src={p.images?.[0] || "/placeholder.svg"}
                                                alt={p.name}
                                                width={300}
                                                height={200}
                                                className="w-full h-48 object-cover rounded-t-lg"
                                            />
                                            {p.boosted && (
                                                <Badge className="absolute top-2 left-2 bg-orange-500">
                                                    <TrendingUp className="w-3 h-3 mr-1" /> Boosted
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{p.name}</h3>
                                            <p className="text-2xl font-bold text-green-600 mb-2">
                                                ₦{p.price.toLocaleString()}                                                
                                            </p>
                                            <div className="flex items-center text-sm text-gray-600 mb-2">
                                                <MapPin className="w-4 h-4 mr-1" />
                                                {p.location}
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">
                                                    {p.seller?.name || "Seller"}
                                                </span>
                                                <div className="flex items-center">
                                                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                                                    <span className="text-sm">{p.seller?.rating || 0}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
