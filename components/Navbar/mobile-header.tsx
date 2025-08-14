"use client"

import Link from "next/link"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function MobileHeader() {
  return (
    <div className="md:hidden">
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-green-400 via-green-500 to-purple-400 px-4 py-6 text-white">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold">EmilyAgros</h1>
            </div>
          </Link>

          <div className="flex items-center space-x-2">
            <span className="text-lg font-medium">Hi, Alfred</span>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-xs bg-red-500 border-0">
                3
              </Badge>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
