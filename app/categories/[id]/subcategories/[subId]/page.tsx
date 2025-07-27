import TopNavigation from "@/components/TopNavigation";
import MobileTabNavigation from "@/components/MobileTabNavigation";
import SubcategoryProductList from "./SubcategoryProductList";
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
export default async function SubcategoryPage() {
   const session = await getServerSession(authOptions)
    const username = session?.user?.username || "Guest"
  return (
    <div>
      <TopNavigation username={username} />
      <SubcategoryProductList />
      <MobileTabNavigation />
    </div>
  );
}
