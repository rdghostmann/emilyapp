"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Search, Plus, MessageSquare, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Search",
    href: "/marketplace",
    icon: Search,
  },
  {
    name: "Post",
    href: "/post-product",
    icon: Plus,
    isSpecial: true,
  },
  {
    name: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
]

export default function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href === "/marketplace" && pathname.startsWith("/category"))

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 transition-colors",
                isActive ? "text-green-600" : "text-gray-600",
              )}
            >
              {item.isSpecial ? (
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center -mt-2 shadow-lg">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              ) : (
                <Icon className={cn("w-6 h-6", isActive && "text-green-600")} />
              )}
              <span
                className={cn(
                  "text-xs font-medium",
                  item.isSpecial ? "text-green-600" : "",
                  isActive && !item.isSpecial ? "text-green-600" : "",
                )}
              >
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
      {/* Safe area for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-white"></div>
    </div>
  )
}
