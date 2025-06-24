import { authOptions } from "@/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Bell } from "lucide-react"
import { getServerSession } from "next-auth"

export default async function HeroSection() {
  const session = await getServerSession(authOptions)
  const username = session?.user?.name || "there"

  return (
    <section className="bg-gradient-to-br from-green-600 to-green-700 text-white">
      <div className="px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <MapPin className="invisible h-5 w-5" />
            <div>
              <p className="invisible text-sm opacity-90">Deliver to</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Bell className="h-5 w-5" />
          </Button>
        </div>

        {/* Welcome Message */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">
            Good Morning, {username}! 👋
          </h1>
          <p className="text-green-100">Find fresh products from local farmers</p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search for products, farmers..."
            className="pl-10 pr-4 bg-white text-gray-900 border-0 h-12 rounded-xl"
          />
        </div>
      </div>
    </section>
  )
}
