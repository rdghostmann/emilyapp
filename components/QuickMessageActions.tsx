"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Phone } from "lucide-react"

interface QuickMessageActionsProps {
  productTitle: string
  sellerName: string
  price: number
  unit: string
  onSendMessage: (message: string) => void
}

const quickMessages = [
  "Is this product still available?",
  "What's the minimum order quantity?",
  "Can you deliver to my location?",
  "Do you offer bulk discounts?",
  "When was this harvested?",
  "Can I visit your farm?",
]

export default function QuickMessageActions({
  productTitle,
  sellerName,
  price,
  unit,
  onSendMessage,
}: QuickMessageActionsProps) {
  return (
    <Card className="border-0 shadow-sm mb-4">
      <CardContent className="p-4">
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Quick Messages</h4>
          <p className="text-sm text-gray-600">
            Start a conversation about {productTitle} with {sellerName}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {quickMessages.map((message, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-start text-left h-auto p-3 text-sm"
              onClick={() => onSendMessage(message)}
            >
              {message}
            </Button>
          ))}
        </div>

        <div className="flex space-x-2 mt-4">
          <Button className="flex-1 bg-green-600 hover:bg-green-700">
            <MessageCircle className="h-4 w-4 mr-2" />
            Start Chat
          </Button>
          <Button variant="outline" className="flex-1">
            <Phone className="h-4 w-4 mr-2" />
            Call Seller
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
