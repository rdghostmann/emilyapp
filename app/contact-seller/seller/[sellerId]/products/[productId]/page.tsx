// app/sellers/[sellerId]/products/[productId]/page.tsx
import { getProductById } from "@/controllers/products";
import ContactSellerPage from "./ContactSellerPage";
import { getSellerById } from "@/controllers/seller";

interface PageProps {
  params: {
    sellerId: string;
    productId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { sellerId, productId } = params;

  // Fetch data from controllers (server-side)
  const seller = await getSellerById(sellerId);
  const product = await getProductById(productId);

  if (!seller || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Not Found</h1>
          <p className="text-gray-600">
            Seller or Product does not exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return <ContactSellerPage seller={seller} product={product} />;
}
