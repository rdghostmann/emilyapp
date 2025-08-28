// /seller/[id]/page.tsx (Server Component)
import { getSellerById } from "@/controllers/seller";
import SellerPage from "./SellerPage";

// interface PageProps {
//   params: { id: string } | Promise<{ id: string }>;
// }
// type Params = Promise<{ id: string }>;

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const seller = await getSellerById(id);

  return <SellerPage seller={seller} />;
}
