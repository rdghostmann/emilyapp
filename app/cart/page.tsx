import CartInterface from "@/components/CartInterface";
import MobileTabNavigation from "@/components/MobileTabNavigation";
import TopNavigation from "@/components/TopNavigation";
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
export default async function CartPage() {
  const session = await getServerSession(authOptions)
  const username = session?.user?.username || "Guest"

  return (
    <>
      <TopNavigation username={username} />
      <div className="min-h-screen bg-gray-50">
        <CartInterface />
      </div>
      <MobileTabNavigation />
    </>
  )
}
