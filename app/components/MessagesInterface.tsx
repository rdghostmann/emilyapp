"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Search, ArrowLeft, Phone, Video, MoreVertical, ImageIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface ConversationData {
  sellerId: string
  sellerName: string
  sellerAvatar: string
  productId: string
  productTitle: string
  productImage: string
  productPrice: number
  productUnit: string
}

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
  type: "text" | "image" | "product"
  productData?: {
    title: string
    price: number
    unit: string
    image: string
  }
}

const mockConversations = [
  {
    id: "1",
    user: {
      id: "john-smith",
      name: "John Smith",
      avatar: "/placeholder-user.jpg",
      online: true,
    },
    lastMessage: "Hi, I'm interested in your organic tomatoes. Are they still available?",
    timestamp: "2 min ago",
    unread: 2,
    product: "Organic Tomatoes",
  },
  {
    id: "2",
    user: {
      id: "maria-garcia",
      name: "Maria Garcia",
      avatar: "/placeholder-user.jpg",
      online: false,
    },
    lastMessage: "Thank you for the quick delivery! The wheat quality is excellent.",
    timestamp: "1 hour ago",
    unread: 0,
    product: "Premium Wheat",
  },
  {
    id: "3",
    user: {
      id: "david-johnson",
      name: "David Johnson",
      avatar: "/placeholder-user.jpg",
      online: true,
    },
    lastMessage: "Can we arrange pickup for tomorrow morning?",
    timestamp: "3 hours ago",
    unread: 1,
    product: "Fresh Eggs",
  },
]

export default function MessagesInterface() {
  const searchParams = useSearchParams()
  // String is stable between renders unless URL actually changes
  const conversationParam = searchParams.get("conversation") ?? null
  const router = useRouter()
  const [conversations, setConversations] = useState(mockConversations)
  const [selectedConversation, setSelectedConversation] = useState<any>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [showConversationList, setShowConversationList] = useState(true)

  // Handles deep-link or “Contact Seller” navigation --------------------------
  useEffect(() => {
    if (!conversationParam) return

    try {
      const data: ConversationData = JSON.parse(decodeURIComponent(conversationParam))

      // Does this conversation already exist?
      const existing = conversations.find((c) => c.user.id === data.sellerId)

      if (existing) {
        // only update if it isn’t already selected
        if (selectedConversation?.id !== existing.id) {
          setSelectedConversation(existing)
          loadMessages(existing.id, data)
          setShowConversationList(false)
        }
      } else {
        // create a brand-new conversation
        const newConv = {
          id: Date.now().toString(),
          user: {
            id: data.sellerId,
            name: data.sellerName,
            avatar: data.sellerAvatar,
            online: true,
          },
          lastMessage: `Started a conversation about ${data.productTitle}`,
          timestamp: "now",
          unread: 0,
          product: data.productTitle,
        }

        setConversations((prev) => [newConv, ...prev])
        setSelectedConversation(newConv)
        loadMessages(newConv.id, data)
        setShowConversationList(false)
      }
    } catch (err) {
      console.error("Invalid conversation data:", err)
    }
  }, [conversationParam]) // 🚩 effect fires ONLY when the URL param changes

  // Pick the first conversation on first mount --------------------------------
  useEffect(() => {
    if (!conversationParam && !selectedConversation && conversations.length) {
      const first = conversations[0]
      setSelectedConversation(first)
      loadMessages(first.id)
    }
    //  We include conversations.length (not the array ref) so this runs once when data appears include conversations.length (not the array ref) so this runs once when data appears
  }, [conversationParam, conversations.length, selectedConversation])

  const loadMessages = (conversationId: string, conversationData?: ConversationData) => {
    // Mock messages - in a real app, fetch from API
    const mockMessages: Message[] = [
      {
        id: "1",
        senderId: "buyer",
        senderName: "You",
        content: "Hi, I'm interested in your organic tomatoes. Are they still available?",
        timestamp: "10:30 AM",
        type: "text",
      },
      {
        id: "2",
        senderId: selectedConversation?.user.id || "seller",
        senderName: selectedConversation?.user.name || "Seller",
        content: "Yes, they are! We have about 200kg available. Would you like to place an order?",
        timestamp: "10:32 AM",
        type: "text",
      },
      {
        id: "3",
        senderId: "buyer",
        senderName: "You",
        content: "Great! What's the minimum order quantity?",
        timestamp: "10:35 AM",
        type: "text",
      },
      {
        id: "4",
        senderId: selectedConversation?.user.id || "seller",
        senderName: selectedConversation?.user.name || "Seller",
        content: "Minimum order is 5kg. We offer bulk discounts for orders over 50kg.",
        timestamp: "10:37 AM",
        type: "text",
      },
    ]

    if (conversationData) {
      mockMessages.unshift({
        id: "product-intro",
        senderId: "system",
        senderName: "System",
        content: "Product inquiry started",
        timestamp: new Date().toLocaleTimeString(),
        type: "product",
        productData: {
          title: conversationData.productTitle,
          price: conversationData.productPrice,
          unit: conversationData.productUnit,
          image: conversationData.productImage,
        },
      })
    }

    setMessages(mockMessages)
  }

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: "buyer",
        senderName: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString(),
        type: "text",
      }

      setMessages((prev) => [...prev, message])
      setNewMessage("")

      // Update conversation last message
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation.id ? { ...conv, lastMessage: newMessage, timestamp: "now" } : conv,
        ),
      )

      // Simulate seller response after 2 seconds
      setTimeout(() => {
        const responses = [
          "Thanks for your interest! Let me check the availability.",
          "Sure, I can help you with that.",
          "That sounds good. When would you like to arrange pickup?",
          "I'll prepare your order. What's your preferred delivery time?",
          "Perfect! I'll send you the payment details.",
        ]

        const randomResponse = responses[Math.floor(Math.random() * responses.length)]

        const sellerMessage: Message = {
          id: (Date.now() + 1).toString(),
          senderId: selectedConversation.user.id,
          senderName: selectedConversation.user.name,
          content: randomResponse,
          timestamp: new Date().toLocaleTimeString(),
          type: "text",
        }

        setMessages((prev) => [...prev, sellerMessage])

        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === selectedConversation.id ? { ...conv, lastMessage: randomResponse, timestamp: "now" } : conv,
          ),
        )
      }, 2000)
    }
  }

  const handleBackToList = () => {
    setShowConversationList(true)
    router.push("/messages")
  }

  // Mobile view - show either conversation list or chat
  if (showConversationList) {
    return (
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Messages</h1>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search conversations..." className="pl-10" />
        </div>

        {/* Conversations List */}
        <div className="space-y-3">
          {conversations.map((conversation) => (
            <Card
              key={conversation.id}
              className="border-0 shadow-sm cursor-pointer active:bg-gray-50"
              onClick={() => {
                setSelectedConversation(conversation)
                loadMessages(conversation.id)
                setShowConversationList(false)
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={conversation.user.avatar || "/placeholder.svg"} alt={conversation.user.name} />
                      <AvatarFallback>
                        {conversation.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.user.online && (
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-900 truncate">{conversation.user.name}</p>
                      <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                    </div>
                    <p className="text-xs text-green-600 mb-1">{conversation.product}</p>
                    <p className="text-sm text-gray-600 line-clamp-2">{conversation.lastMessage}</p>
                    {conversation.unread > 0 && (
                      <Badge className="mt-2 bg-green-600 hover:bg-green-700 text-xs">{conversation.unread} new</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Chat view
  if (!selectedConversation) return null

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={handleBackToList} className="lg:hidden">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={selectedConversation.user.avatar || "/placeholder.svg"}
              alt={selectedConversation.user.name}
            />
            <AvatarFallback>
              {selectedConversation.user.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-gray-900">{selectedConversation.user.name}</p>
            <p className="text-sm text-gray-600">
              {selectedConversation.user.online ? "Online" : "Last seen 2 hours ago"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          if (message.type === "product" && message.productData) {
            return (
              <div key={message.id} className="flex justify-center">
                <Card className="max-w-sm border border-green-200 bg-green-50">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={message.productData.image || "/placeholder.svg"}
                        alt={message.productData.title}
                        width={60}
                        height={60}
                        className="w-15 h-15 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-gray-900">{message.productData.title}</h4>
                        <p className="text-green-600 font-bold">
                          ${message.productData.price} {message.productData.unit}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          }

          const isOwnMessage = message.senderId === "buyer"

          return (
            <div key={message.id} className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  isOwnMessage ? "bg-green-600 text-white" : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <span className={`text-xs mt-1 block ${isOwnMessage ? "text-green-100" : "text-gray-500"}`}>
                  {message.timestamp}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <ImageIcon className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} className="bg-green-600 hover:bg-green-700" disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
