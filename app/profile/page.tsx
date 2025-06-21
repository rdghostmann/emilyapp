import MobileTabNavigation from "@/components/MobileTabNavigation";
import TopNavigation from "@/components/TopNavigation";
import UserProfile from "@/components/UserProfile";

export default function ProfilePage() {
  return (
    <>
      <TopNavigation />
      <div className="container mx-auto px-4 py-8">
        <UserProfile />
      </div>
      <MobileTabNavigation />
    </>
  )
}
