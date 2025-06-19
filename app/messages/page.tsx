"use client"

import { Suspense } from "react"
import MessagesInterface from "../components/MessagesInterface"

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div className="p-4">Loading messages...</div>}>
        <MessagesInterface />
      </Suspense>
    </div>
  )
}
