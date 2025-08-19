// /agro-chemicals/page.tsx
import React from "react"
import Link from "next/link"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { ChevronRight } from "lucide-react"
import { getCategoryBySlug, getSubcategoriesByCategory } from "@/controllers/categories"
import AgroChemicalPage from "./AgroChemicalPage"

export default async function Page() {
    // Fetch category details
    const category = await getCategoryBySlug("animal-chemicals")
    if (!category) return <p>Category not found</p>

    // Fetch subcategories
    const subcategories = await getSubcategoriesByCategory(category.slug)

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-6">
                {/* Breadcrumb */}
                <Breadcrumb className="mb-6">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/" className="hover:text-green-600">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator><ChevronRight className="w-4 h-4" /></BreadcrumbSeparator>

                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/categories" className="hover:text-green-600">All Categories</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator><ChevronRight className="w-4 h-4" /></BreadcrumbSeparator>

                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <span className="text-gray-800">{category.name}</span>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* Category Header */}
                <div className="mb-8 flex items-center gap-3">
                    {category.icon && <span className="text-4xl"><category.icon /></span>}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{category.name}</h1>
                        <p className="text-gray-600">{category.description}</p>
                    </div>
                </div>

                <AgroChemicalPage subcategories={subcategories} />

            </div>
        </div>
    )
}
