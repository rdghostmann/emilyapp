"use client"

import MessagesInterface from "@/components/MessagesInterface"
import { Suspense } from "react"

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div className="p-4">Loading messages...</div>}>
        <MessagesInterface />
      </Suspense>
    </div>
  )
}
