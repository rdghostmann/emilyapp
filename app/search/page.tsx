import MobileTabNavigation from "@/components/MobileTabNavigation";
import SearchInterface from "@/components/SearchInterface";
import TopNavigation from "@/components/TopNavigation";
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
export default async function SearchPage() {
   const session = await getServerSession(authOptions)
    const username = session?.user?.username || "Guest"
  
  return (
    <>
      <TopNavigation username={username} />
      <div className="min-h-screen bg-gray-50">
        <SearchInterface />
      </div>
      <MobileTabNavigation />
    </>
  )
}
