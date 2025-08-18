// types/product.ts

export interface SellerInterface {
  _id: string
  name: string
  rating?: number
  phone: string
  avatar?: string
  verified?: boolean
  totalSales?: number
  totalAds?: number
  memberSince?: string
}

export interface ProductInterface {
  _id: string
  name: string
  description?: string
  price: number
  location?: string
   seller: SellerInterface
  images: string[]
  category: string
  subcategory?: string
  boosted?: boolean
  condition?: string
  negotiable?: boolean
  stats?: {
    views: number
    favorites: number
    adId: string
  }
  details: Record<string, any>
  createdAt: Date
  updatedAt: Date
}
