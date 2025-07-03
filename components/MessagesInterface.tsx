"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Search, ArrowLeft, Phone, Video, MoreVertical, ImageIcon } from "lucide-react"
import Image from "next/image"
import getConversations from "@/controllers/getConversations"
import getMessages from "@/controllers/getMessages"


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

export default function MessagesInterface() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const conversationParam = searchParams.get("conversation") ?? null
  const [conversations, setConversations] = useState<any[]>([])
  const [selectedConversation, setSelectedConversation] = useState<any>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [showConversationList, setShowConversationList] = useState(true)

  // Replace with actual logged-in user id
  const userId = "68625a0a5933233bed203443"

  // Fetch conversations on mount
  useEffect(() => {
    async function fetchConvs() {
      const data = await getConversations(userId)
      setConversations(data)
      // If a conversation is passed in the URL, select it
      if (conversationParam) {
        const found = data.find((conv: any) => conv.id === conversationParam)
        if (found) setSelectedConversation(found)
        else if (data.length > 0) setSelectedConversation(data[0])
      } else if (data.length > 0 && !selectedConversation) {
        setSelectedConversation(data[0])
      }
    }
    fetchConvs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationParam])

  // Fetch messages when a conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      async function fetchMsgs() {
        const msgs = await getMessages(selectedConversation.id)
        setMessages(msgs)
      }
      fetchMsgs()
    }
  }, [selectedConversation])

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: userId,
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
          {conversations.map((conversation) => {
            // Find the other participant (not the logged-in user)
            const otherUser = conversation.users
              ? conversation.users.find((u: any) => u.id !== userId)
              : conversation.user // fallback for old mock
            return (
              <Card
                key={conversation.id}
                className="border-0 shadow-sm cursor-pointer active:bg-gray-50"
                onClick={() => {
                  setSelectedConversation(conversation)
                  setShowConversationList(false)
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={otherUser?.avatar || "/placeholder.svg"} alt={otherUser?.name || "User"} />
                        <AvatarFallback>
                          {otherUser?.name
                            ? otherUser.name.split(" ").map((n: string) => n[0]).join("")
                            : "?"}
                        </AvatarFallback>
                      </Avatar>
                      {otherUser?.online && (
                        <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-gray-900 truncate">{otherUser?.name || "User"}</p>
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
            )
          })}
        </div>
      </div>
    )
  }

  // Chat view
  if (!selectedConversation) return null

  // Find the other participant for chat header
  const otherUser = selectedConversation.users
    ? selectedConversation.users.find((u: any) => u.id !== userId)
    : selectedConversation.user

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
              src={otherUser?.avatar || "/placeholder.svg"}
              alt={otherUser?.name || "User"}
            />
            <AvatarFallback>
              {otherUser?.name
                ? otherUser.name.split(" ").map((n: string) => n[0]).join("")
                : "?"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-gray-900">{otherUser?.name || "User"}</p>
            <p className="text-sm text-gray-600">
              {otherUser?.online ? "Online" : "Last seen 2 hours ago"}
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

          const isOwnMessage = message.senderId === userId

          return (
            <div key={message.id} className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${isOwnMessage ? "bg-green-600 text-white" : "bg-gray-100 text-gray-900"
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
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
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