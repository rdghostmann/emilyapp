export interface ProductInterface {
  _id: string
  name: string
  description?: string
  price: number
  location?: string
  seller: {
    _id: string
    name: string
    rating?: number
  }
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
