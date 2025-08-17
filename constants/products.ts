import { Product } from "@/types/types";

export const allProducts: Product[] = [
  {
    _id: "1",
    title: "Fresh Tomatoes",
    description: "Organic red tomatoes, freshly harvested.",
    price: 2500,
    location: "Lagos, Nigeria",
    seller: "Farm Fresh",
    rating: 4.5,
    image: "/placeholder.svg",
    boosted: true,
    categorySlug: "vegetables",
    subcategoryId: "tomatoes",
    createdAt: new Date(),
  },
  // ...
]
