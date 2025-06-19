"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Home, MessageSquare, Package } from "lucide-react"

export default function OrderSuccessPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your order. The farmers will be notified and will contact you soon with delivery details.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Order ID</p>
            <p className="font-mono font-semibold">#AGR{Date.now().toString().slice(-6)}</p>
          </div>

          <div className="space-y-3">
            <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => router.push("/")}>
              <Home className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>

            <Button variant="outline" className="w-full" onClick={() => router.push("/messages")}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Message Farmers
            </Button>

            <Button variant="outline" className="w-full" onClick={() => router.push("/orders")}>
              <Package className="h-4 w-4 mr-2" />
              Track Orders
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
