import FavouritesList from "@/components/FavouritesList";

export default function FavouritesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Favourites</h1>
        <FavouritesList />
      </div>
    </div>
  )
}
