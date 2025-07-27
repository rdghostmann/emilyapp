import CategoryPage from "./CategoryPage";
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
export default async function page (){
 const session = await getServerSession(authOptions)
  const username = session?.user?.username || "Guest"

  return <CategoryPage username={username} />
}