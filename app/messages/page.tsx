
import MobileTabNavigation from "@/components/MobileTabNavigation"
import TopNavigation from "@/components/TopNavigation"
import { Suspense } from "react"
import Loading from "../loading"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import MessagesInterface from "@/components/MessagesInterface"
export default async function MessagesPage() {
  const session = await getServerSession(authOptions)
    const username = session?.user?.username || "Guest"
  
  return (
    <>
      <TopNavigation username={username} />
      <div className="min-h-screen bg-gray-50">
        <Suspense fallback={<Loading />}>
          <MessagesInterface />
        </Suspense>
      </div>
      <MobileTabNavigation />
    </>
  )
}