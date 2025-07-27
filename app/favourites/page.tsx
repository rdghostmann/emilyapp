import FavouritesList from "@/components/FavouritesList";
import MobileTabNavigation from "@/components/MobileTabNavigation";
import TopNavigation from "@/components/TopNavigation";
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
export default async function FavouritesPage() {
   const session = await getServerSession(authOptions)
    const username = session?.user?.username || "Guest"
  
  return (
    <>
      <TopNavigation username={username} />
      <div className="min-h-screen bg-gray-50">
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">My Favourites</h1>
          <FavouritesList />
        </div>
      </div>
      <MobileTabNavigation />
    </>
  )
}
