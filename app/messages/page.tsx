"use client"

import MessagesInterface from "@/components/MessagesInterface"
import MobileTabNavigation from "@/components/MobileTabNavigation"
import TopNavigation from "@/components/TopNavigation"
import { Suspense } from "react"
import Loading from "../loading"

export default function MessagesPage() {
  return (
    <>
      <TopNavigation />
      <div className="min-h-screen bg-gray-50">
        <Suspense fallback={<Loading />}>
          <MessagesInterface />
        </Suspense>
      </div>
      <MobileTabNavigation />
    </>
  )
}