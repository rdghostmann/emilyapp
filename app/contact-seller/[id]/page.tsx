// app/contact-seller/[sellerId]/[productId]/page.tsx
import { getSellerById } from "@/controllers/seller"
import { getProductById } from "@/controllers/products"
import ContactSellerPage from "./ContactSellerPage";

interface PageProps {
  params: { sellerId: string; productId: string }
}

export default async function ContactSellerServer({ params }: PageProps) {
  const seller = await getSellerById(params.sellerId)
  const product = await getProductById(params.productId)

  if (!seller || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold">Seller or Product not found</h1>
      </div>
    )
  }

  return <ContactSellerPage seller={seller} product={product} />
}
