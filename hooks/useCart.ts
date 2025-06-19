"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CartItem {
  id: string
  title: string
  price: number
  unit: string
  image: string
  farmer: string
  quantity: number
  inStock: boolean
}

interface CartStore {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (item) => {
        const existingItem = get().cartItems.find((cartItem) => cartItem.id === item.id)

        if (existingItem) {
          set({
            cartItems: get().cartItems.map((cartItem) =>
              cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem,
            ),
          })
        } else {
          set({ cartItems: [...get().cartItems, item] })
        }
      },

      removeFromCart: (id) => {
        set({ cartItems: get().cartItems.filter((item) => item.id !== id) })
      },

      updateQuantity: (id, quantity) => {
        if (quantity === 0) {
          get().removeFromCart(id)
        } else {
          set({
            cartItems: get().cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
          })
        }
      },

      clearCart: () => {
        set({ cartItems: [] })
      },

      getTotalPrice: () => {
        return get().cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      getTotalItems: () => {
        return get().cartItems.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)
