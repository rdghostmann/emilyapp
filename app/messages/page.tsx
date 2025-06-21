"use client"

import MessagesInterface from "@/components/MessagesInterface"
import MobileTabNavigation from "@/components/MobileTabNavigation"
import TopNavigation from "@/components/TopNavigation"
import { Suspense } from "react"

export default function MessagesPage() {
  return (
    <>
      <TopNavigation />
      <div className="min-h-screen bg-gray-50">
        <Suspense fallback={<div className="p-4">Loading messages...</div>}>
          <MessagesInterface />
        </Suspense>
      </div>
      <MobileTabNavigation />
    </>
  )
}
