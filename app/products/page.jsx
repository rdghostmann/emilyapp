// "use client"
import TopNavigation from "@/components/TopNavigation"
import MobileTabNavigation from "@/components/MobileTabNavigation";
import ProductFeed from "@/components/ProductFeed"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
export default async function ProductListPage() {
   const session = await getServerSession(authOptions)
    const username = session?.user?.username || "Guest"
  
  return (
    <>
      <TopNavigation username={username} />
      <div className="min-h-screen bg-gray-50 p-4">
        <ProductFeed />
      </div>
      <MobileTabNavigation />
    </>
  );
}