"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Menu, X, Bell, User, Plus, MessageSquare } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-2">
              <span className="text-white font-bold">E</span>
            </div>
            <span className="text-xl font-bold text-gray-800">EmilyAgros</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input type="search" placeholder="Search products, services..." className="pl-10 pr-4" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild variant="ghost">
              <Link href="/marketplace">Marketplace</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/categories">Categories</Link>
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs">3</Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuItem>
                  <div className="flex flex-col">
                    <span className="font-medium">Boost your ad!</span>
                    <span className="text-sm text-gray-500">Your product "Organic Rice" can reach more buyers</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col">
                    <span className="font-medium">New message</span>
                    <span className="text-sm text-gray-500">Buyer interested in your tomatoes</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col">
                    <span className="font-medium">Payment received</span>
                    <span className="text-sm text-gray-500">₦25,000 from Adebayo Farms</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Messages */}
            <Button asChild variant="ghost" size="icon">
              <Link href="/messages">
                <MessageSquare className="w-5 h-5" />
              </Link>
            </Button>

            {/* Post Product */}
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/post-product">
                <Plus className="w-4 h-4 mr-2" />
                Post Product
              </Link>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/my-products">My Products</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/wallet">Wallet</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input type="search" placeholder="Search products, services..." className="pl-10 pr-4" />
              </div>
              <Button asChild variant="ghost" className="justify-start">
                <Link href="/marketplace">Marketplace</Link>
              </Button>
              <Button asChild variant="ghost" className="justify-start">
                <Link href="/categories">Categories</Link>
              </Button>
              <Button asChild variant="ghost" className="justify-start">
                <Link href="/messages">Messages</Link>
              </Button>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/post-product">
                  <Plus className="w-4 h-4 mr-2" />
                  Post Product
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
