import MobileTabNavigation from "@/components/MobileTabNavigation";
import TopNavigation from "@/components/TopNavigation";
import UserProfile from "@/components/UserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user || null;
    const username = session?.user?.username || "Guest"


  return (
    <>
      <TopNavigation username={username} />
      <div className="container mx-auto px-4 pt-8 pb-12">
        <UserProfile user={user} />
      </div>
      <MobileTabNavigation />
    </>
  );
}