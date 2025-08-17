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

export interface Subcategory {
  id: string
  name: string
  description: string
  productCount: number
  image: string
}

export interface Category {
  id: string
  name: string
  icon: LucideIcon
  subcategories: Subcategory[]
  image: string
  href: string
}

export const categories: Category[] = [
  {
    id: "trending",
    name: "Trending",
    icon: TrendingUp,
    subcategories: [
      { id: "others", name: "Others", description: "Misc trending products", productCount: 45, image: "/icons/0.jpg" },
    ],
    image: "/icons/0.jpg",
    href: "/marketplace?filter=trending",
  },
  {
    id: "livestock",
    name: "Livestock & Pets",
    icon: Cow,
    subcategories: [
      { id: "cattle", name: "Cattle", description: "Beef and dairy cattle", productCount: 78, image: "/farm-animals/cows.png" },
      { id: "poultry", name: "Poultry", description: "Chickens, ducks, and more", productCount: 234, image: "/farm-animals/chickens.png" },
      { id: "goats", name: "Goats", description: "Meat and dairy goats", productCount: 45, image: "/farm-animals/goats.png" },
      { id: "sheep", name: "Sheep", description: "Quality sheep breeds", productCount: 67, image: "/farm-animals/sheeps.png" },
      { id: "turkey", name: "Turkey", description: "Quality turkey breeds", productCount: 67, image: "/farm-animals/turkey.png" },
      { id: "pet", name: "Pets", description: "Fine pets for companionship", productCount: 67, image: "/farm-animals/rabbits.png" },
    ],
    image: "/icons/1.jpg",
    href: "/category/livestock",
  },
  {
    id: "services",
    name: "Services",
    icon: Settings,
    subcategories: [
      { id: "tractor-hiring", name: "Tractor Hiring", description: "Affordable tractor rentals", productCount: 6, image: "/services/tractor.png" },
      { id: "farm-setup", name: "Farm Setup", description: "Complete farm setup services", productCount: 8, image: "/services/farm.png" },
      { id: "veterinary", name: "Veterinary", description: "Animal healthcare services", productCount: 4, image: "/services/vet.png" },
    ],
    image: "/icons/2.jpg",
    href: "/category/services",
  },
  {
    id: "insurance",
    name: "Agro Insurance",
    icon: Shield,
    subcategories: [
      { id: "crop-insurance", name: "Crop Insurance", description: "Protect your crops", productCount: 3, image: "/insurance/crop.png" },
      { id: "livestock-insurance", name: "Livestock Insurance", description: "Protect your livestock", productCount: 2, image: "/insurance/livestock.png" },
      { id: "equipment-insurance", name: "Farm Equipment Insurance", description: "Protect equipment", productCount: 1, image: "/insurance/equipment.png" },
      { id: "weather-insurance", name: "Weather Insurance", description: "Weather risk protection", productCount: 2, image: "/insurance/weather.png" },
    ],
    image: "/icons/3.jpg",
    href: "/category/insurance",
  },
  {
    id: "equipment",
    name: "Tractor / Farm Machines",
    icon: Tractor,
    subcategories: [
      { id: "tractor", name: "Tractor", description: "Farm tractors", productCount: 12, image: "/equipment/tractor.png" },
      { id: "sheller", name: "Sheller", description: "Crop shellers", productCount: 5, image: "/equipment/sheller.png" },
      { id: "sprayer", name: "Sprayer", description: "Crop sprayers", productCount: 7, image: "/equipment/sprayer.png" },
      { id: "knapsack", name: "Knapsack Sprayer", description: "Portable sprayers", productCount: 4, image: "/equipment/knapsack.png" },
      { id: "fish-pond", name: "Fish Pond", description: "Pond equipment", productCount: 3, image: "/equipment/fish-pond.png" },
      { id: "others", name: "Others", description: "Other equipment", productCount: 14, image: "/equipment/others.png" },
    ],
    image: "/icons/4.jpg",
    href: "/category/equipments",
  },
  {
    id: "animalmating",
    name: "Animal Mating",
    icon: Heart,
    subcategories: [
      { id: "dog", name: "Dog", description: "Dog mating services", productCount: 3, image: "/mating/dog.png" },
      { id: "goat", name: "Goat", description: "Goat mating services", productCount: 2, image: "/mating/goat.png" },
      { id: "pig", name: "Pig", description: "Pig mating services", productCount: 2, image: "/mating/pig.png" },
      { id: "ai-service", name: "AI Service", description: "Artificial insemination", productCount: 3, image: "/mating/ai.png" },
      { id: "natural", name: "Natural Mating", description: "Natural mating services", productCount: 2, image: "/mating/natural.png" },
    ],
    image: "/icons/5.jpg",
    href: "/category/animalMating",
  },
  {
    id: "agrochemicals",
    name: "Agro Chemicals / Pesticides",
    icon: Sprout,
    subcategories: [
      { id: "herbicide", name: "Herbicide", description: "Weed control products", productCount: 10, image: "/chemicals/herbicide.png" },
      { id: "pesticide", name: "Pesticide", description: "Pest control products", productCount: 9, image: "/chemicals/pesticide.png" },
      { id: "fungicide", name: "Fungicide", description: "Fungal disease control", productCount: 9, image: "/chemicals/fungicide.png" },
    ],
    image: "/icons/6.jpg",
    href: "/category/agroChemicals",
  },
  {
    id: "foodfruitsvegetables",
    name: "Food / Fruits & Vegetables",
    icon: Apple,
    subcategories: [
      { id: "fresh-fruits", name: "Fresh Fruits", description: "Seasonal fresh fruits", productCount: 89, image: "/fruits/fresh.png" },
      { id: "vegetables", name: "Vegetables", description: "Farm-fresh vegetables", productCount: 156, image: "/fruits/vegetables.png" },
      { id: "herbs", name: "Herbs", description: "Aromatic cooking herbs", productCount: 34, image: "/fruits/herbs.png" },
      { id: "spices", name: "Spices", description: "Traditional spices", productCount: 67, image: "/fruits/spices.png" },
    ],
    image: "/icons/7.jpg",
    href: "/category/fruits",
  },
  {
    id: "seedlings",
    name: "Seedlings",
    icon: Leaf,
    subcategories: [
      { id: "maize", name: "Maize", description: "Maize seedlings", productCount: 20, image: "/seedlings/maize.png" },
      { id: "soybean", name: "Soybean", description: "Soybean seedlings", productCount: 15, image: "/seedlings/soybean.png" },
      { id: "groundnut", name: "Groundnut", description: "Groundnut seedlings", productCount: 10, image: "/seedlings/groundnut.png" },
      { id: "hybrid", name: "Hybrid", description: "Hybrid seedlings", productCount: 8, image: "/seedlings/hybrid.png" },
      { id: "open", name: "Open-pollination", description: "Open-pollinated seedlings", productCount: 7, image: "/seedlings/open.png" },
    ],
    image: "/icons/8.jpg",
    href: "/category/seedlings",
  },
  {
    id: "ornamentals",
    name: "Horticulture / Ornamental Crops",
    icon: Wheat,
    subcategories: [
      { id: "flowers", name: "Flowers", description: "Flowering plants", productCount: 6, image: "/ornamentals/flowers.png" },
      { id: "shrubs", name: "Shrubs", description: "Shrub plants", productCount: 4, image: "/ornamentals/shrubs.png" },
      { id: "indoor-plants", name: "Indoor Plants", description: "Indoor decorative plants", productCount: 5, image: "/ornamentals/indoor.png" },
      { id: "landscaping", name: "Landscaping Plants", description: "Plants for landscaping", productCount: 5, image: "/ornamentals/landscaping.png" },
    ],
    image: "/icons/9.jpg",
    href: "/category/ornamentals",
  },
  {
    id: "animalloan",
    name: "Animal Loan",
    icon: DollarSign,
    subcategories: [
      { id: "veterinary-loan", name: "Veterinary Loan", description: "Loans for veterinary care", productCount: 3, image: "/loans/vet.png" },
      { id: "feed-subsidy", name: "Feed Subsidy", description: "Animal feed subsidy programs", productCount: 2, image: "/loans/feed.png" },
      { id: "equipment-financing", name: "Equipment Financing", description: "Loans for farm equipment", productCount: 2, image: "/loans/equipment.png" },
      { id: "livestock-purchase", name: "Livestock Purchase Support", description: "Finance livestock purchase", productCount: 2, image: "/loans/livestock.png" },
      { id: "insurance", name: "Livestock Insurance", description: "Insurance loan coverage", productCount: 1, image: "/loans/insurance.png" },
    ],
    image: "/icons/10.jpg",
    href: "/category/animalLoan",
  },
  {
    id: "fertilizers",
    name: "Fertilizers",
    icon: Package,
    subcategories: [
      { id: "npk", name: "NPK", description: "NPK fertilizer", productCount: 8, image: "/fertilizers/npk.png" },
      { id: "urea", name: "Urea", description: "Urea fertilizer", productCount: 7, image: "/fertilizers/urea.png" },
      { id: "dap", name: "DAP", description: "DAP fertilizer", productCount: 5, image: "/fertilizers/dap.png" },
      { id: "soil", name: "Soil", description: "Soil conditioners", productCount: 6, image: "/fertilizers/soil.png" },
      { id: "foliar", name: "Foliar", description: "Foliar fertilizers", productCount: 4, image: "/fertilizers/foliar.png" },
    ],
    image: "/icons/11.jpg",
    href: "/category/fertilizers",
  },
  {
    id: "animalfeed",
    name: "Animal Feed",
    icon: Package,
    subcategories: [
      { id: "preventive", name: "Preventive", description: "Preventive feed additives", productCount: 2, image: "/feed/preventive.png" },
      { id: "curative", name: "Curative", description: "Curative feed solutions", productCount: 2, image: "/feed/curative.png" },
      { id: "supplement", name: "Supplement", description: "Feed supplements", productCount: 2, image: "/feed/supplement.png" },
      { id: "powder", name: "Powder", description: "Powdered feed products", productCount: 1, image: "/feed/powder.png" },
      { id: "oral", name: "Oral", description: "Oral feed products", productCount: 2, image: "/feed/oral.png" },
      { id: "injectable", name: "Injectable", description: "Injectable feed products", productCount: 1, image: "/feed/injectable.png" },
    ],
    image: "/icons/12.jpg",
    href: "/category/animalFeed",
  },
  {
    id: "animalpharmacy",
    name: "Animal Pharmacy",
    icon: Pill,
    subcategories: [
      { id: "preventive", name: "Preventive", description: "Preventive medicines", productCount: 2, image: "/pharmacy/preventive.png" },
      { id: "curative", name: "Curative", description: "Curative medicines", productCount: 2, image: "/pharmacy/curative.png" },
      { id: "supplement", name: "Supplement", description: "Animal health supplements", productCount: 2, image: "/pharmacy/supplement.png" },
      { id: "powder", name: "Powder", description: "Powdered drugs", productCount: 1, image: "/pharmacy/powder.png" },
      { id: "oral", name: "Oral", description: "Oral medicines", productCount: 2, image: "/pharmacy/oral.png" },
      { id: "injectable", name: "Injectable", description: "Injectable medicines", productCount: 1, image: "/pharmacy/injectable.png" },
    ],
    image: "/icons/14.jpg",
    href: "/category/animalPharmacy",
  },
  {
    id: "animalaccessories",
    name: "Animal Accessories",
    icon: Gamepad2,
    subcategories: [
      { id: "drinkers", name: "Drinkers", description: "Animal water drinkers", productCount: 3, image: "/accessories/drinkers.png" },
      { id: "cages", name: "Cages", description: "Animal cages", productCount: 4, image: "/accessories/cages.png" },
      { id: "feeding", name: "Feeding", description: "Feeding equipment", productCount: 3, image: "/accessories/feeding.png" },
      { id: "transporting", name: "Transporting", description: "Animal transporting tools", productCount: 2, image: "/accessories/transport.png" },
      { id: "housing", name: "Housing", description: "Animal housing structures", productCount: 3, image: "/accessories/housing.png" },
    ],
    image: "/icons/15.jpg",
    href: "/category/animalAccessories",
  },
]
