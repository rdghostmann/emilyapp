// @constants/categories.ts
// @constants/categories.ts
import {
  TrendingUp,
  MilkIcon as Cow,
  Settings,
  Shield,
  Tractor,
  Heart,
  Sprout,
  Apple,
  Leaf,
  Wheat,
  DollarSign,
  Package,
  Pill,
  Gamepad2,
} from "lucide-react"
import { LucideIcon } from "lucide-react"
import { ProductInterface } from "@/types/product"

export interface Subcategory {
  id: string
  name: string
  description: string
  productCount: number
  image: string
  categoryName: string
  categorySlug: string
  products?: ProductInterface[]
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: LucideIcon
  subcategories: Subcategory[]
  image: string
  href: string
}

export const categories: Category[] = [
  {
    id: "trending",
    slug: "trending",
    name: "Trending",
    icon: TrendingUp,
    subcategories: [
      {
        id: "others",
        name: "Others",
        description: "Misc trending products",
        productCount: 45,
        image: "/icons/0.jpg",
        categoryName: "Trending",
        categorySlug: "others",
      },
    ],
    image: "/icons/0.jpg",
    href: "/marketplace?filter=trending",
  },
  {
    id: "livestock",
    name: "Livestock & Pets",
    slug: "livestock-pets",
    icon: Cow,
    subcategories: [
      { id: "cattle", name: "Cattle", description: "Beef and dairy cattle", productCount: 78, image: "/farm-animals/cows.png", categoryName: "Livestock & Pets", categorySlug: "cattle" },
      { id: "poultry", name: "Poultry", description: "Chickens, ducks, and more", productCount: 234, image: "/farm-animals/chickens.png", categoryName: "Livestock & Pets", categorySlug: "poultry" },
      { id: "goats", name: "Goats", description: "Meat and dairy goats", productCount: 45, image: "/farm-animals/goats.png", categoryName: "Livestock & Pets", categorySlug: "goats" },
      { id: "sheep", name: "Sheep", description: "Quality sheep breeds", productCount: 67, image: "/farm-animals/sheeps.png", categoryName: "Livestock & Pets", categorySlug: "sheep" },
      { id: "turkey", name: "Turkey", description: "Quality turkey breeds", productCount: 67, image: "/farm-animals/turkey.png", categoryName: "Livestock & Pets", categorySlug: "turkey" },
      { id: "pet", name: "Pets", description: "Fine pets for companionship", productCount: 67, image: "/farm-animals/rabbits.png", categoryName: "Livestock & Pets", categorySlug: "pet" },
    ],
    image: "/icons/1.jpg",
    href: "/category/livestock-pets",
  },
  {
    id: "services",
    name: "Services",
    slug: "agro-services",
    icon: Settings,
    subcategories: [
      { id: "tractor-hiring", name: "Tractor Hiring", description: "Affordable tractor rentals", productCount: 6, image: "/services/tractor.png", categoryName: "Services", categorySlug: "tractor-hiring" },
      { id: "farm-setup", name: "Farm Setup", description: "Complete farm setup services", productCount: 8, image: "/services/farm.png", categoryName: "Services", categorySlug: "farm-setup" },
      { id: "veterinary", name: "Veterinary", description: "Animal healthcare services", productCount: 4, image: "/services/vet.png", categoryName: "Services", categorySlug: "veterinary" },
    ],
    image: "/icons/2.jpg",
    href: "/category/agroservices",
  },
  {
    id: "insurance",
    name: "Agro Insurance",
    slug: "agro-insurance",
    icon: Shield,
    subcategories: [
      { id: "crop-insurance", name: "Crop Insurance", description: "Protect your crops", productCount: 3, image: "/insurance/crop.png", categoryName: "Agro Insurance", categorySlug: "crop-insurance" },
      { id: "livestock-insurance", name: "Livestock Insurance", description: "Protect your livestock", productCount: 2, image: "/insurance/livestock.png", categoryName: "Agro Insurance", categorySlug: "livestock-insurance" },
      { id: "equipment-insurance", name: "Farm Equipment Insurance", description: "Protect equipment", productCount: 1, image: "/insurance/equipment.png", categoryName: "Agro Insurance", categorySlug: "equipment-insurance" },
      { id: "weather-insurance", name: "Weather Insurance", description: "Weather risk protection", productCount: 2, image: "/insurance/weather.png", categoryName: "Agro Insurance", categorySlug: "weather-insurance" },
    ],
    image: "/icons/3.jpg",
    href: "/category/agro-insurance",
  },
  {
    id: "equipment",
    name: "Tractor / Farm Machines",
    slug: "equipments",
    icon: Tractor,
    subcategories: [
      { id: "tractor", name: "Tractor", description: "Farm tractors", productCount: 12, image: "/equipment/tractor.png", categoryName: "Tractor / Farm Machines", categorySlug: "tractor" },
      { id: "sheller", name: "Sheller", description: "Crop shellers", productCount: 5, image: "/equipment/sheller.png", categoryName: "Tractor / Farm Machines", categorySlug: "sheller" },
      { id: "sprayer", name: "Sprayer", description: "Crop sprayers", productCount: 7, image: "/equipment/sprayer.png", categoryName: "Tractor / Farm Machines", categorySlug: "sprayer" },
      { id: "knapsack", name: "Knapsack Sprayer", description: "Portable sprayers", productCount: 4, image: "/equipment/knapsack.png", categoryName: "Tractor / Farm Machines", categorySlug: "knapsack" },
      { id: "fish-pond", name: "Fish Pond", description: "Pond equipment", productCount: 3, image: "/equipment/fish-pond.png", categoryName: "Tractor / Farm Machines", categorySlug: "fish-pond" },
      { id: "others", name: "Others", description: "Other equipment", productCount: 14, image: "/equipment/others.png", categoryName: "Tractor / Farm Machines", categorySlug: "others" },
    ],
    image: "/icons/4.jpg",
    href: "/category/equipments",
  },
  {
    id: "animalmating",
    name: "Animal Mating",
    slug: "animal-mating",
    icon: Heart,
    subcategories: [
      { id: "dog", name: "Dog", description: "Dog mating services", productCount: 3, image: "/mating/dog.png", categoryName: "Animal Mating", categorySlug: "dog" },
      { id: "goat", name: "Goat", description: "Goat mating services", productCount: 2, image: "/mating/goat.png", categoryName: "Animal Mating", categorySlug: "goat" },
      { id: "pig", name: "Pig", description: "Pig mating services", productCount: 2, image: "/mating/pig.png", categoryName: "Animal Mating", categorySlug: "pig" },
      { id: "ai-service", name: "AI Service", description: "Artificial insemination", productCount: 3, image: "/mating/ai.png", categoryName: "Animal Mating", categorySlug: "ai-service" },
      { id: "natural", name: "Natural Mating", description: "Natural mating services", productCount: 2, image: "/mating/natural.png", categoryName: "Animal Mating", categorySlug: "natural" },
    ],
    image: "/icons/5.jpg",
    href: "/category/animal-mating",
  },
  {
    id: "agrochemicals",
    name: "Agro Chemicals / Pesticides",
    slug: "agro-chemicals",
    icon: Sprout,
    subcategories: [
      { id: "herbicide", name: "Herbicide", description: "Weed control products", productCount: 10, image: "/chemicals/herbicide.png", categoryName: "Agro Chemicals / Pesticides", categorySlug: "herbicide" },
      { id: "pesticide", name: "Pesticide", description: "Pest control products", productCount: 9, image: "/chemicals/pesticide.png", categoryName: "Agro Chemicals / Pesticides", categorySlug: "pesticide" },
      { id: "fungicide", name: "Fungicide", description: "Fungal disease control", productCount: 9, image: "/chemicals/fungicide.png", categoryName: "Agro Chemicals / Pesticides", categorySlug: "fungicide" },
    ],
    image: "/icons/6.jpg",
    href: "/category/agro-chemicals",
  },
  {
    id: "foodfruitsvegetables",
    name: "Food / Fruits & Vegetables",
    slug: "food-fruits-vegetable",
    icon: Apple,
    subcategories: [
      { id: "fresh-fruits", name: "Fresh Fruits", description: "Seasonal fresh fruits", productCount: 89, image: "/fruits/fresh.png", categoryName: "Food / Fruits & Vegetables", categorySlug: "fresh-fruits" },
      { id: "vegetables", name: "Vegetables", description: "Farm-fresh vegetables", productCount: 156, image: "/fruits/vegetables.png", categoryName: "Food / Fruits & Vegetables", categorySlug: "vegetables" },
      { id: "herbs", name: "Herbs", description: "Aromatic cooking herbs", productCount: 34, image: "/fruits/herbs.png", categoryName: "Food / Fruits & Vegetables", categorySlug: "herbs" },
      { id: "spices", name: "Spices", description: "Traditional spices", productCount: 67, image: "/fruits/spices.png", categoryName: "Food / Fruits & Vegetables", categorySlug: "spices" },
    ],
    image: "/icons/7.jpg",
    href: "/category/food-fruits-vegetables",
  },
  {
    id: "seedlings",
    name: "Seedlings",
    slug: "seedlings",
    icon: Leaf,
    subcategories: [
      { id: "maize", name: "Maize", description: "Maize seedlings", productCount: 20, image: "/seedlings/maize.png", categoryName: "Seedlings", categorySlug: "maize" },
      { id: "soybean", name: "Soybean", description: "Soybean seedlings", productCount: 15, image: "/seedlings/soybean.png", categoryName: "Seedlings", categorySlug: "soybean" },
      { id: "groundnut", name: "Groundnut", description: "Groundnut seedlings", productCount: 10, image: "/seedlings/groundnut.png", categoryName: "Seedlings", categorySlug: "groundnut" },
      { id: "hybrid", name: "Hybrid", description: "Hybrid seedlings", productCount: 8, image: "/seedlings/hybrid.png", categoryName: "Seedlings", categorySlug: "hybrid" },
      { id: "open", name: "Open-pollination", description: "Open-pollinated seedlings", productCount: 7, image: "/seedlings/open.png", categoryName: "Seedlings", categorySlug: "open" },
    ],
    image: "/icons/8.jpg",
    href: "/category/seedlings",
  },
  {
    id: "ornamentals",
    name: "Horticulture / Ornamental Crops",
    slug: "ornamentals",
    icon: Wheat,
    subcategories: [
      { id: "flowers", name: "Flowers", description: "Flowering plants", productCount: 6, image: "/ornamentals/flowers.png", categoryName: "Horticulture / Ornamental Crops", categorySlug: "flowers" },
      { id: "shrubs", name: "Shrubs", description: "Shrub plants", productCount: 4, image: "/ornamentals/shrubs.png", categoryName: "Horticulture / Ornamental Crops", categorySlug: "shrubs" },
      { id: "indoor-plants", name: "Indoor Plants", description: "Indoor decorative plants", productCount: 5, image: "/ornamentals/indoor.png", categoryName: "Horticulture / Ornamental Crops", categorySlug: "indoor-plants" },
      { id: "landscaping", name: "Landscaping Plants", description: "Plants for landscaping", productCount: 5, image: "/ornamentals/landscaping.png", categoryName: "Horticulture / Ornamental Crops", categorySlug: "landscaping" },
    ],
    image: "/icons/9.jpg",
    href: "/category/ornamentals",
  },
  {
    id: "animalloan",
    name: "Animal Loan",
    slug: "animal-loan",
    icon: DollarSign,
    subcategories: [
      { id: "veterinary-loan", name: "Veterinary Loan", description: "Loans for veterinary care", productCount: 3, image: "/loans/vet.png", categoryName: "Animal Loan", categorySlug: "veterinary-loan" },
      { id: "feed-subsidy", name: "Feed Subsidy", description: "Animal feed subsidy programs", productCount: 2, image: "/loans/feed.png", categoryName: "Animal Loan", categorySlug: "feed-subsidy" },
      { id: "equipment-financing", name: "Equipment Financing", description: "Loans for farm equipment", productCount: 2, image: "/loans/equipment.png", categoryName: "Animal Loan", categorySlug: "equipment-financing" },
      { id: "livestock-purchase", name: "Livestock Purchase Support", description: "Finance livestock purchase", productCount: 2, image: "/loans/livestock.png", categoryName: "Animal Loan", categorySlug: "livestock-purchase" },
      { id: "insurance", name: "Livestock Insurance", description: "Insurance loan coverage", productCount: 1, image: "/loans/insurance.png", categoryName: "Animal Loan", categorySlug: "insurance" },
    ],
    image: "/icons/10.jpg",
    href: "/category/animal-loan",
  },
  {
    id: "fertilizers",
    name: "Fertilizers",
    slug: "fertilizers",
    icon: Package,
    subcategories: [
      { id: "npk", name: "NPK", description: "NPK fertilizer", productCount: 8, image: "/fertilizers/npk.png", categoryName: "Fertilizers", categorySlug: "npk" },
      { id: "urea", name: "Urea", description: "Urea fertilizer", productCount: 7, image: "/fertilizers/urea.png", categoryName: "Fertilizers", categorySlug: "urea" },
      { id: "dap", name: "DAP", description: "DAP fertilizer", productCount: 5, image: "/fertilizers/dap.png", categoryName: "Fertilizers", categorySlug: "dap" },
      { id: "soil", name: "Soil", description: "Soil conditioners", productCount: 6, image: "/fertilizers/soil.png", categoryName: "Fertilizers", categorySlug: "soil" },
      { id: "foliar", name: "Foliar", description: "Foliar fertilizers", productCount: 4, image: "/fertilizers/foliar.png", categoryName: "Fertilizers", categorySlug: "foliar" },
    ],
    image: "/icons/11.jpg",
    href: "/category/fertilizers",
  },
  {
    id: "animalfeed",
    name: "Animal Feed",
    slug: "animal-feed",
    icon: Package,
    subcategories: [
      { id: "preventive", name: "Preventive", description: "Preventive feed additives", productCount: 2, image: "/feed/preventive.png", categoryName: "Animal Feed", categorySlug: "preventive" },
      { id: "curative", name: "Curative", description: "Curative feed solutions", productCount: 2, image: "/feed/curative.png", categoryName: "Animal Feed", categorySlug: "curative" },
      { id: "supplement", name: "Supplement", description: "Feed supplements", productCount: 2, image: "/feed/supplement.png", categoryName: "Animal Feed", categorySlug: "supplement" },
      { id: "powder", name: "Powder", description: "Powdered feed products", productCount: 1, image: "/feed/powder.png", categoryName: "Animal Feed", categorySlug: "powder" },
      { id: "oral", name: "Oral", description: "Oral feed products", productCount: 2, image: "/feed/oral.png", categoryName: "Animal Feed", categorySlug: "oral" },
      { id: "injectable", name: "Injectable", description: "Injectable feed products", productCount: 1, image: "/feed/injectable.png", categoryName: "Animal Feed", categorySlug: "injectable" },
    ],
    image: "/icons/12.jpg",
    href: "/category/animal-feed",
  },
  {
    id: "animalpharmacy",
    name: "Animal Pharmacy",
    slug: "animal-pharmacy",
    icon: Pill,
    subcategories: [
      { id: "preventive", name: "Preventive", description: "Preventive medicines", productCount: 2, image: "/pharmacy/preventive.png", categoryName: "Animal Pharmacy", categorySlug: "preventive" },
      { id: "curative", name: "Curative", description: "Curative medicines", productCount: 2, image: "/pharmacy/curative.png", categoryName: "Animal Pharmacy", categorySlug: "curative" },
      { id: "supplement", name: "Supplement", description: "Animal health supplements", productCount: 2, image: "/pharmacy/supplement.png", categoryName: "Animal Pharmacy", categorySlug: "supplement" },
      { id: "powder", name: "Powder", description: "Powdered drugs", productCount: 1, image: "/pharmacy/powder.png", categoryName: "Animal Pharmacy", categorySlug: "powder" },
      { id: "oral", name: "Oral", description: "Oral medicines", productCount: 2, image: "/pharmacy/oral.png", categoryName: "Animal Pharmacy", categorySlug: "oral" },
      { id: "injectable", name: "Injectable", description: "Injectable medicines", productCount: 1, image: "/pharmacy/injectable.png", categoryName: "Animal Pharmacy", categorySlug: "injectable" },
    ],
    image: "/icons/14.jpg",
    href: "/category/animal-pharmacy",
  },
  {
    id: "animalaccessories",
    name: "Animal Accessories",
    slug: "animal-accessories",
    icon: Gamepad2,
    subcategories: [
      { id: "drinkers", name: "Drinkers", description: "Animal water drinkers", productCount: 3, image: "/accessories/drinkers.png", categoryName: "Animal Accessories", categorySlug: "drinkers" },
      { id: "cages", name: "Cages", description: "Animal cages", productCount: 4, image: "/accessories/cages.png", categoryName: "Animal Accessories", categorySlug: "cages" },
      { id: "feeding", name: "Feeding", description: "Feeding equipment", productCount: 3, image: "/accessories/feeding.png", categoryName: "Animal Accessories", categorySlug: "feeding" },
      { id: "transporting", name: "Transporting", description: "Animal transporting tools", productCount: 2, image: "/accessories/transport.png", categoryName: "Animal Accessories", categorySlug: "transporting" },
      { id: "housing", name: "Housing", description: "Animal housing structures", productCount: 3, image: "/accessories/housing.png", categoryName: "Animal Accessories", categorySlug: "housing" },
    ],
    image: "/icons/15.jpg",
    href: "/category/animal-accessories",
  }
]