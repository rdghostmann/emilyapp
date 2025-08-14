"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Search, Plus, User, MessageSquare } from "lucide-react"

const tabs = [
  { name: "Home", href: "/", icon: Home },
  { name: "Search", href: "/search", icon: Search },
  { name: "Post", href: "/post-product", icon: Plus },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Profile", href: "/profile", icon: User },
]

export default function MobileTabNavigation() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t lg:hidden">
      <nav className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = pathname === tab.href

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-2 px-1 text-xs",
                isActive ? "text-green-600 bg-green-50" : "text-gray-600 hover:text-green-600",
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 mb-1",
                  tab.name === "Post" && "bg-green-600 text-white rounded-full p-1 h-8 w-8",
                )}
              />
              <span className={cn("text-xs", tab.name === "Post" && "text-green-600 font-medium")}>{tab.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
