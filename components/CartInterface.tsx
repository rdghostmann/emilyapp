"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, Truck, Tag } from "lucide-react"
import { useCart } from "../hooks/useCart"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function CartInterface() {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const router = useRouter()

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setDiscount(10)
    }
  }

  const subtotal = getTotalPrice()
  const deliveryFee = subtotal > 50 ? 0 : 5.99
  const discountAmount = (subtotal * discount) / 100
  const total = subtotal + deliveryFee - discountAmount

  if (cartItems.length === 0) {
    return (
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-600 mb-6">Add some products to get started</p>
          <Link href="/products">
          <Button className="bg-green-600 hover:bg-green-700">
            Browse Products
          </Button></Link>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <Card key={item.id} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex space-x-4">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">by {item.farmer}</p>
                      <p className="text-sm text-green-600">
                        ${item.price} {item.unit}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:bg-red-50"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      <Badge variant="default" className="bg-green-100 text-green-800 text-xs">
                        In Stock
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Promo Code */}
      <Card className="border-0 shadow-sm mb-6">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Tag className="h-5 w-5 text-gray-400" />
            <Input
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline" onClick={applyPromoCode}>
              Apply
            </Button>
          </div>
          {discount > 0 && <p className="text-sm text-green-600 mt-2">Promo code applied! {discount}% discount</p>}
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card className="border-0 shadow-sm mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>Subtotal ({getTotalItems()} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="flex items-center space-x-1">
              <Truck className="h-4 w-4" />
              <span>Delivery Fee</span>
            </span>
            <span className={deliveryFee === 0 ? "text-green-600" : ""}>
              {deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}
            </span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount ({discount}%)</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}

          {subtotal < 50 && (
            <p className="text-sm text-gray-600">Add ${(50 - subtotal).toFixed(2)} more for free delivery</p>
          )}

          <Separator />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-green-600">${total.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Checkout Button */}
      <div className="space-y-3">
        <Button className="w-full bg-green-600 hover:bg-green-700 h-12" onClick={() => router.push("/checkout")}>
          <CreditCard className="h-5 w-5 mr-2" />
          Proceed to Checkout
        </Button>

        <Button variant="outline" className="w-full h-12" onClick={() => router.push("/")}>
          Continue Shopping
        </Button>
      </div>
    </div>
  )
}
