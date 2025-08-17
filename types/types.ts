import { LucideIcon } from "lucide-react"


export interface Category {
  id: string
  name: string
  icon: LucideIcon
  subcategories: string[]
  color: string
  bgColor: string
  image: string
  count: number
  href: string
}

export interface Product {
  _id: string
  title: string
  description: string
  price: number
  location: string
  seller: string
  rating: number
  image: string
  boosted?: boolean
  categorySlug: string
  subcategoryId: string
  createdAt: Date
}