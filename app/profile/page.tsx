import { authOptions } from "@/auth";
import MobileTabNavigation from "@/components/MobileTabNavigation";
import TopNavigation from "@/components/TopNavigation";
import UserProfile from "@/components/UserProfile";
import { getServerSession } from "next-auth";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user || null;
  console.log("User session:", user);

  return (
    <>
      <TopNavigation />
      <div className="container mx-auto px-4 pt-8 pb-12">
        <UserProfile user={user} />
      </div>
      <MobileTabNavigation />
    </>
  );
}