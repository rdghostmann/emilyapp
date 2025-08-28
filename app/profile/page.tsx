import ProfilePage from "./ProfilePage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { getUserById } from "@/controllers/getUser";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <div className="min-h-screen flex items-center justify-center">Not signed in</div>;
  }

  const user = await getUserById(session.user.id);

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">User not found</div>;
  }

  return <ProfilePage user={user} />;
}