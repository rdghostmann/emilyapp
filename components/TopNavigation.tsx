"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, Menu, Plus, Bell, MessageSquare, User, Settings, LogOut, Sprout, Heart } from "lucide-react"
import CartIcon from "./CartIcon/CartIcon"
import Image from "next/image"

export default function TopNavigation({ username }: { username: any }) {
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="w-full flex items-center space-x-4 justify-between lg:justify-start px-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
                <Image
                  src="/logo.png"
                  alt="AgroMarket Logo"
                  width={42}
                  height={42}
                  className="h-8 w-8 text-white"
                />
              </div>
              <span className="font-bold text-xl text-green-700 inline-block">EmilyAgros</span>
            </Link>
            <h4 className="h-5 my-auto text-sm font-bold mb-2">
              Hi, <span className="text-green-600">{username?.split(" ")[0]}</span>
            </h4>

          </div>


          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-green-600 transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-sm font-medium hover:text-green-600 transition-colors">
              Products
            </Link>
            <Link href="/categories" className="text-sm font-medium hover:text-green-600 transition-colors">
              Categories
            </Link>
            <Link href="/farmers" className="text-sm font-medium hover:text-green-600 transition-colors">
              Farmers
            </Link>
          </nav>

          {/* Search Bar (always visible on mobile, centered on desktop) */}
          <div className="hidden flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search products, farmers..."
                className="pl-10 pr-4"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/post-product">
                <Plus className="h-4 w-4 mr-2" />
                Post Product
              </Link>
            </Button>

            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/my-products">
                    <Plus className="mr-2 h-4 w-4" />
                    My Products
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Actions: Logo, Search, Cart, Favourites */}
          <div className="flex lg:hidden items-center space-x-2">
            {/* Cart Icon */}
            {/* <CartIcon /> */}
            {/* Favourites Icon */}
            <Link href="/favourites" className="hidden p-2 rounded-full hover:bg-green-50 transition-colors">
              <Heart className="h-5 w-5 text-green-600" />
            </Link>
            {/* Mobile Menu Button */}
            {/* <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder-user.jpg" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-gray-500">Farmer</p>
                    </div>
                  </div>

                  <nav className="flex flex-col space-y-2">
                    <Link href="/" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100">
                      <span>Home</span>
                    </Link>
                    <Link
                      href="/products"
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100"
                    >
                      <span>Products</span>
                    </Link>
                    <Link
                      href="/categories"
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100"
                    >
                      <span>Categories</span>
                    </Link>
                    <Link
                      href="/farmers"
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100"
                    >
                      <span>Farmers</span>
                    </Link>
                    <Link
                      href="/favourites"
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100"
                    >
                      <Heart className="h-4 w-4 mr-2 text-green-600" />
                      <span>Favourites</span>
                    </Link>
                  </nav>

                  <div className="pt-4 border-t">
                    <Button asChild className="w-full bg-green-600 hover:bg-green-700 mb-3">
                      <Link href="/post-product">
                        <Plus className="h-4 w-4 mr-2" />
                        Post Product
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet> */}
          </div>
        </div>
      </div>
    </header>
  )
}
