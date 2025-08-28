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
    return <div className="p-4 text-red-600">Seller or Product not found</div>;
  }

  return (
    <ContactSellerPage
      seller={seller}
      product={product}
    />
  );
}
