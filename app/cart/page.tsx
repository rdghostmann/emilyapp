import CartInterface from "@/components/CartInterface";
import MobileTabNavigation from "@/components/MobileTabNavigation";
import TopNavigation from "@/components/TopNavigation";

export default function CartPage() {
  return (
    <>
      <TopNavigation />
      <div className="min-h-screen bg-gray-50">
        <CartInterface />
      </div>
      <MobileTabNavigation />
    </>
  )
}
