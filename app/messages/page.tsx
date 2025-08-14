"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  Send,
  Search,
  Phone,
  MoreVertical,
  ArrowLeft,
  ImageIcon,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
} from "lucide-react"
import Link from "next/link"

const conversations = [
  {
    id: "1",
    participant: {
      name: "Adebayo Farms",
      avatar: "/placeholder.svg?height=40&width=40&text=AF",
      online: true,
      lastSeen: "Online",
    },
    product: {
      id: "1",
      title: "Premium Organic Rice - 50kg",
      image: "/placeholder.svg?height=40&width=40&text=Rice",
      price: "₦25,000",
    },
    lastMessage: {
      text: "The rice is still available. When do you need delivery?",
      time: "2 min ago",
      unread: 2,
      sender: "other",
    },
    messages: [
      {
        id: "1",
        sender: "me",
        text: "Hello! I'm interested in your Premium Organic Rice. Is it still available?",
        time: "10:30 AM",
        status: "read",
      },
      {
        id: "2",
        sender: "other",
        text: "Yes, it's still available. How many bags do you need?",
        time: "10:32 AM",
        status: "delivered",
      },
      {
        id: "3",
        sender: "me",
        text: "I need about 20 bags. What's your best price for bulk purchase?",
        time: "10:35 AM",
        status: "read",
      },
      {
        id: "4",
        sender: "other",
        text: "For 20 bags, I can offer ₦24,000 per bag instead of ₦25,000. That's ₦480,000 total.",
        time: "10:37 AM",
        status: "delivered",
      },
      {
        id: "5",
        sender: "me",
        text: "That sounds good. Can you arrange delivery to Lagos Island?",
        time: "10:40 AM",
        status: "read",
      },
      {
        id: "6",
        sender: "other",
        text: "Yes, delivery to Lagos Island will be ₦5,000 extra. When do you need it delivered?",
        time: "10:42 AM",
        status: "delivered",
      },
      {
        id: "7",
        sender: "other",
        text: "The rice is still available. When do you need delivery?",
        time: "2 min ago",
        status: "delivered",
      },
    ],
  },
  {
    id: "2",
    participant: {
      name: "Green Valley Seeds",
      avatar: "/placeholder.svg?height=40&width=40&text=GV",
      online: false,
      lastSeen: "Last seen 1 hour ago",
    },
    product: {
      id: "2",
      title: "Hybrid Maize Seeds - 10kg",
      image: "/placeholder.svg?height=40&width=40&text=Seeds",
      price: "₦8,500",
    },
    lastMessage: {
      text: "Thank you for your interest. The seeds are certified.",
      time: "1 hour ago",
      unread: 0,
      sender: "other",
    },
    messages: [
      {
        id: "1",
        sender: "me",
        text: "Hi, are these seeds certified?",
        time: "9:15 AM",
        status: "read",
      },
      {
        id: "2",
        sender: "other",
        text: "Thank you for your interest. The seeds are certified.",
        time: "9:20 AM",
        status: "delivered",
      },
    ],
  },
  {
    id: "3",
    participant: {
      name: "Musa Agriculture",
      avatar: "/placeholder.svg?height=40&width=40&text=MA",
      online: false,
      lastSeen: "Last seen 3 hours ago",
    },
    product: {
      id: "3",
      title: "Fresh Tomatoes - 50kg",
      image: "/placeholder.svg?height=40&width=40&text=Tomatoes",
      price: "₦15,000",
    },
    lastMessage: {
      text: "I can deliver tomorrow morning",
      time: "3 hours ago",
      unread: 0,
      sender: "other",
    },
    messages: [
      {
        id: "1",
        sender: "me",
        text: "When can you deliver the tomatoes?",
        time: "Yesterday",
        status: "read",
      },
      {
        id: "2",
        sender: "other",
        text: "I can deliver tomorrow morning",
        time: "Yesterday",
        status: "delivered",
      },
    ],
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<any>(null)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileView, setIsMobileView] = useState(false)

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const message = {
        id: Date.now().toString(),
        sender: "me",
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "sent",
      }

      // Update the conversation with the new message
      selectedConversation.messages.push(message)
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.product.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const formatTime = (time: string) => {
    if (time.includes("min ago") || time.includes("hour ago") || time.includes("Yesterday")) {
      return time
    }
    return time
  }

  const getMessageStatus = (status: string) => {
    switch (status) {
      case "sent":
        return <Check className="w-4 h-4 text-gray-400" />
      case "delivered":
        return <CheckCheck className="w-4 h-4 text-gray-400" />
      case "read":
        return <CheckCheck className="w-4 h-4 text-green-500" />
      default:
        return null
    }
  }

  // Mobile view when conversation is selected
  if (selectedConversation && window.innerWidth < 768) {
    return (
      <div className="h-screen flex flex-col bg-white">
        {/* Mobile Chat Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={() => setSelectedConversation(null)} className="md:hidden">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Avatar className="w-10 h-10">
              <AvatarImage src={selectedConversation.participant.avatar || "/placeholder.svg"} />
              <AvatarFallback>{selectedConversation.participant.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900">{selectedConversation.participant.name}</h3>
              <p className="text-sm text-gray-500">{selectedConversation.participant.lastSeen}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Product Info Bar */}
        <div className="p-3 bg-green-50 border-b">
          <div className="flex items-center space-x-3">
            <img
              src={selectedConversation.product.image || "/placeholder.svg"}
              alt={selectedConversation.product.title}
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{selectedConversation.product.title}</p>
              <p className="text-sm text-green-600 font-semibold">{selectedConversation.product.price}</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {selectedConversation.messages.map((message: any) => (
            <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] ${message.sender === "me" ? "order-2" : "order-1"}`}>
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    message.sender === "me"
                      ? "bg-green-600 text-white rounded-br-md"
                      : "bg-gray-100 text-gray-900 rounded-bl-md"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                <div
                  className={`flex items-center mt-1 space-x-1 ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <span className="text-xs text-gray-500">{formatTime(message.time)}</span>
                  {message.sender === "me" && getMessageStatus(message.status)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t bg-white">
          <div className="flex items-end space-x-2">
            <Button variant="ghost" size="icon" className="mb-2">
              <Paperclip className="w-5 h-5 text-gray-500" />
            </Button>
            <div className="flex-1 relative">
              <Textarea
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="min-h-[44px] max-h-32 resize-none pr-12 rounded-full border-gray-300"
                rows={1}
              />
              <Button variant="ghost" size="icon" className="absolute right-2 bottom-1">
                <Smile className="w-5 h-5 text-gray-500" />
              </Button>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              size="icon"
              className="bg-green-600 hover:bg-green-700 rounded-full mb-2"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {conversations.reduce((acc, conv) => acc + conv.lastMessage.unread, 0)} unread
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className={`lg:col-span-1 ${selectedConversation ? "hidden lg:block" : ""}`}>
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-50 border-gray-200"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-0">
                <div className="space-y-1">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors border-l-4 ${
                        selectedConversation?.id === conversation.id
                          ? "bg-green-50 border-green-500"
                          : "border-transparent"
                      }`}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={conversation.participant.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{conversation.participant.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          {conversation.participant.online && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-gray-900 truncate">{conversation.participant.name}</h3>
                            <span className="text-xs text-gray-500">{conversation.lastMessage.time}</span>
                          </div>
                          <p className="text-xs text-gray-600 truncate mb-2">{conversation.product.title}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-700 truncate flex-1 mr-2">
                              {conversation.lastMessage.text}
                            </p>
                            {conversation.lastMessage.unread > 0 && (
                              <Badge className="bg-green-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                                {conversation.lastMessage.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className={`lg:col-span-2 ${!selectedConversation ? "hidden lg:block" : ""}`}>
            {selectedConversation ? (
              <Card className="h-full flex flex-col">
                {/* Chat Header */}
                <CardHeader className="pb-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedConversation(null)}
                        className="lg:hidden"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </Button>
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={selectedConversation.participant.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{selectedConversation.participant.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">{selectedConversation.participant.name}</h3>
                        <p className="text-sm text-gray-500">{selectedConversation.participant.lastSeen}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img
                        src={selectedConversation.product.image || "/placeholder.svg"}
                        alt={selectedConversation.product.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{selectedConversation.product.title}</p>
                        <p className="text-green-600 font-semibold">{selectedConversation.product.price}</p>
                      </div>
                      <Button size="sm" variant="outline" className="bg-transparent">
                      <Link href="">  View Product</Link>
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {selectedConversation.messages.map((message: any) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-xs lg:max-w-md ${message.sender === "me" ? "order-2" : "order-1"}`}>
                          <div
                            className={`px-4 py-3 rounded-2xl ${
                              message.sender === "me"
                                ? "bg-green-600 text-white rounded-br-md"
                                : "bg-gray-100 text-gray-900 rounded-bl-md"
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{message.text}</p>
                          </div>
                          <div
                            className={`flex items-center mt-1 space-x-1 ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                          >
                            <span className="text-xs text-gray-500">{formatTime(message.time)}</span>
                            {message.sender === "me" && getMessageStatus(message.status)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* Message Input */}
                <div className="p-4 border-t bg-gray-50">
                  <div className="flex items-end space-x-3 mb-14">
                    <Button variant="ghost" size="icon" className="mb-2">
                      <Paperclip className="w-5 h-5 text-gray-500" />
                    </Button>
                    <Button variant="ghost" size="icon" className="mb-2">
                      <ImageIcon className="w-5 h-5 text-gray-500" />
                    </Button>
                    <div className="flex-1 relative">
                      <Textarea
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="min-h-[48px] max-h-32 resize-none pr-12 bg-white border-gray-300 rounded-2xl"
                        rows={1}
                      />
                      <Button variant="ghost" size="icon" className="absolute right-2 bottom-2">
                        <Smile className="w-5 h-5 text-gray-500" />
                      </Button>
                    </div>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      size="icon"
                      className="bg-green-600 hover:bg-green-700 rounded-full mb-2"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Select a conversation</h3>
                  <p className="text-gray-500">Choose a conversation from the list to start messaging</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
