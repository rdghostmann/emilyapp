import FavouritesList from "@/components/FavouritesList";
import MobileTabNavigation from "@/components/MobileTabNavigation";
import TopNavigation from "@/components/TopNavigation";

export default function FavouritesPage() {
  return (
    <>
      <TopNavigation />
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
