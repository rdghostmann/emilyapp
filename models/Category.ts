// models/Category.ts
import mongoose, { Schema, Document } from "mongoose"

export interface ISubcategory extends Document {
  name: string
  description?: string
  image?: string
  productCount?: number
}

export interface ICategory extends Document {
  name: string
  icon?: string // store icon name as string, e.g., "TrendingUp"
  image?: string
  href?: string
  subcategories: ISubcategory[]
}

const SubcategorySchema = new Schema<ISubcategory>({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  productCount: { type: Number, default: 0 },
})

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    icon: { type: String }, // frontend can map string -> Lucide icon
    image: { type: String, default: "" },
    href: { type: String, default: "" },
    subcategories: [SubcategorySchema],
  },
  { timestamps: true }
)

export const Category =  mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema)
