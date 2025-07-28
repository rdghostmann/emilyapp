'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ShoppingCart, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from 'sonner'

export default function BottomActions({ product, quantity, handleAddToCart, handleContactSeller }: any) {
  const [showOffers, setShowOffers] = useState(false)

  const offerPercentages = [10, 12.5, 15, 20]
  const discountedPrices = offerPercentages.map(percent => ({
    percent,
    price: (product.price * (1 - percent / 100)).toFixed(0),
  }))

  const handleOfferClick = (price: string, percent: number) => {
    toast.success(`Offer sent: ₦${price}`, {
      description: `${percent}% discount on ₦${product.price}`,
      duration: 3000,
    })
    setShowOffers(false)
  }

  return (
    <>
      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 z-50">
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="flex-1 bg-green-600 text-white border-green-600 hover:bg-green-700"
            onClick={() => setShowOffers(true)}
          >
            Make an offer
          </Button>
          <Button
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            ₦{(product.price * quantity).toFixed(0)}
          </Button>
        </div>
      </div>

      {/* Offer Overlay Modal */}
      <Dialog open={showOffers} onOpenChange={setShowOffers}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Choose an Offer</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {discountedPrices.map(({ price, percent }) => (
              <Button
                key={percent}
                variant="outline"
                className="w-full border-green-600 text-green-700 hover:bg-green-100"
                onClick={() => handleOfferClick(price, percent)}
              >
                ₦{price} <span className="ml-2 text-xs text-gray-500">({percent}% off)</span>
              </Button>
            ))}
          </div>
          <Button
            variant="ghost"
            className="w-full mt-6 text-red-500 hover:bg-red-50"
            onClick={() => setShowOffers(false)}
          >
            <X className="h-4 w-4 mr-1" /> Cancel
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
