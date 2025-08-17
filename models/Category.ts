// models/Category.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ISubcategory extends Document {
  name: string;
  description?: string;
  image?: string;
  productCount?: number;
  categoryName: string;
  subcategorySlug: string; // updated
}

export interface ICategory extends Document {
  name: string;
  slug: string;
  icon?: string;
  image?: string;
  href?: string;
  subcategories: ISubcategory[];
}

const SubcategorySchema = new Schema<ISubcategory>({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  productCount: { type: Number, default: 0 },
  categoryName: { type: String, required: true },
  subcategorySlug: { type: String, required: true }, // updated
});

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    icon: { type: String },
    image: { type: String, default: "" },
    href: { type: String, default: "" },
    subcategories: [SubcategorySchema],
  },
  { timestamps: true }
);

export const Category = mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);
