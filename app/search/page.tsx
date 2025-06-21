import MobileTabNavigation from "@/components/MobileTabNavigation";
import SearchInterface from "@/components/SearchInterface";
import TopNavigation from "@/components/TopNavigation";

export default function SearchPage() {
  return (
    <>
      <TopNavigation />
      <div className="min-h-screen bg-gray-50">
        <SearchInterface />
      </div>
      <MobileTabNavigation />
    </>
  )
}
