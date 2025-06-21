import CheckoutInterface from "@/components/CheckoutInterface";
import MobileTabNavigation from "@/components/MobileTabNavigation";
import TopNavigation from "@/components/TopNavigation";

export default function CheckoutPage() {
  return (
    <>
      <TopNavigation />
      <div className="min-h-screen bg-gray-50">
        <CheckoutInterface />
      </div>
      <MobileTabNavigation />
    </>
  )
}
