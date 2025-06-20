"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, CreditCard, Truck, MapPin, Mail, Lock } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/hooks/useCart"

export default function CheckoutInterface() {
  const router = useRouter()
  const { cartItems, getTotalPrice, getTotalItems, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [deliveryMethod, setDeliveryMethod] = useState("delivery")
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = getTotalPrice()
  const deliveryFee = deliveryMethod === "delivery" ? (subtotal > 50 ? 0 : 5.99) : 0
  const total = subtotal + deliveryFee

  const handlePlaceOrder = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Clear cart and redirect to success page
    clearCart()
    router.push("/order-success")
  }

  if (cartItems.length === 0) {
    return (
      <div className="px-4 py-6">
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No items to checkout</h3>
          <p className="text-gray-600 mb-6">Add some products to your cart first</p>
          <Button className="bg-green-600 hover:bg-green-700" onClick={() => router.push("/")}>
            Browse Products
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 pb-24">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
      </div>

      {/* Order Summary */}
      <Card className="border-0 shadow-sm mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-3">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                width={50}
                height={50}
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-medium text-sm">{item.title}</h4>
                <p className="text-xs text-gray-600">by {item.farmer}</p>
                <p className="text-xs text-green-600">
                  ${item.price} × {item.quantity}
                </p>
              </div>
              <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal ({getTotalItems()} items)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery Fee</span>
              <span className={deliveryFee === 0 ? "text-green-600" : ""}>
                {deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span className="text-green-600">${total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Method */}
      <Card className="border-0 shadow-sm mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Truck className="h-5 w-5" />
            <span>Delivery Method</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="delivery" id="delivery" />
              <Label htmlFor="delivery" className="flex-1">
                <div>
                  <p className="font-medium">Home Delivery</p>
                  <p className="text-sm text-gray-600">Delivered to your doorstep</p>
                </div>
              </Label>
              <span className="text-sm font-medium">{subtotal > 50 ? "FREE" : "$5.99"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pickup" id="pickup" />
              <Label htmlFor="pickup" className="flex-1">
                <div>
                  <p className="font-medium">Farm Pickup</p>
                  <p className="text-sm text-gray-600">Collect from farmer's location</p>
                </div>
              </Label>
              <span className="text-sm font-medium text-green-600">FREE</span>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Delivery Address */}
      {deliveryMethod === "delivery" && (
        <Card className="border-0 shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Delivery Address</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Street Address</Label>
              <Input id="address" placeholder="123 Main Street" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="San Francisco" />
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input id="zipCode" placeholder="94102" />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contact Information */}
      <Card className="border-0 shadow-sm mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Contact Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="john@example.com" />
          </div>
          <div>
            <Label htmlFor="contactPhone">Phone Number</Label>
            <Input id="contactPhone" type="tel" placeholder="+1 (555) 123-4567" />
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card className="border-0 shadow-sm mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Payment Method</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card">Credit/Debit Card</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paypal" id="paypal" />
              <Label htmlFor="paypal">PayPal</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cash" id="cash" />
              <Label htmlFor="cash">Cash on Delivery</Label>
            </div>
          </RadioGroup>

          {paymentMethod === "card" && (
            <div className="mt-4 space-y-4">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" />
                </div>
              </div>
              <div>
                <Label htmlFor="cardName">Name on Card</Label>
                <Input id="cardName" placeholder="John Doe" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card className="border-0 shadow-sm mb-6">
        <CardContent className="p-4">
          <div className="flex items-start space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="text-sm">
              I agree to the <span className="text-green-600 underline">Terms and Conditions</span> and{" "}
              <span className="text-green-600 underline">Privacy Policy</span>
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold">Total: ${total.toFixed(2)}</span>
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <Lock className="h-4 w-4" />
            <span>Secure Payment</span>
          </div>
        </div>
        <Button
          className="w-full bg-green-600 hover:bg-green-700 h-12"
          onClick={handlePlaceOrder}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : `Place Order • $${total.toFixed(2)}`}
        </Button>
      </div>
    </div>
  )
}
