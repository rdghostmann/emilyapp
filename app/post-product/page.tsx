import MobileTabNavigation from "@/components/MobileTabNavigation";
import PostProductForm from "@/components/PostProductForm";
import TopNavigation from "@/components/TopNavigation";
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
export default async function PostProductPage() {
   const session = await getServerSession(authOptions)
    const username = session?.user?.username || "Guest"
  
  return (
    <>
      <TopNavigation username={username} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Post Your Product</h1>
            <p className="text-gray-600">Share your agricultural products with thousands of potential buyers</p>
          </div>
          <PostProductForm />
        </div>
      </div>
      <MobileTabNavigation />
    </>
  )
}
