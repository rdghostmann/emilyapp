// types/seller.ts
import { ProductInterface } from "./product"

export interface SellerProfile {
  _id: string
  username: string
  firstName: string
  lastName: string
  email: string
  avatar: string
  coverImage: string
  verified: boolean
  rating: number
  location: string
  phone: string
  description?: string
  specialties: string[]
  businessHours?: string
  certifications: string[]
  createdAt: Date
  responseTime: string
  stats: {
    followers: number
    following: number
    profileViews: number
    totalSales: number
    totalAds: number
    purchases: number
  }
  products: ProductInterface[]
}
