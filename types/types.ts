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
