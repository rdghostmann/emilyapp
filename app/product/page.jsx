import TopNavigation from "@/components/TopNavigation"
import MobileTabNavigation from "@/components/MobileTabNavigation";
import ProductFeed from "@/components/ProductFeed"

export default function ProductListPage() {
  return (
    <>
      <TopNavigation />
      <div className="min-h-screen bg-gray-50 p-4">
        <ProductFeed />
      </div>
      <MobileTabNavigation />
    </>
  );
}