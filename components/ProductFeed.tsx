import ProductCard from "./ProductCard"
import { Button } from "@/components/ui/button"
import getAllProducts from "@/controllers/GetAllProducts"

export default async function ProductFeed() {
    const products = await getAllProducts()
    const displayedProducts = products.slice(0)

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">All Products</h2>
                <p className="hidden text-gray-600">{products.length} products found</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedProducts.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* For server components, pagination or "Load More" should be handled via routing or props */}
            {/* Example: You can add a link to a full products page */}
            {products.length > 4 && (
                <div className="text-center mt-6">
                    <a href="/products">
                        <Button variant="outline" className="w-full sm:w-auto">
                            View All Products
                        </Button>
                    </a>
                </div>
            )}
        </div>
    )
}