// constants/categories.ts

export type Category = {
  name: string
  subcategories: string[]
}

export const categories: Record<string, Category> = {
  trending: {
    name: "Trending",
    subcategories: ["Others"],
  },
  livestock: {
    name: "Livestock & Pets",
    subcategories: ["Cattle", "Poultry", "Goats", "Sheep", "Turkey", "Pets"],
  },
  services: {
    name: "Services",
    subcategories: ["Tractor Hiring", "Farm Setup", "Veterinary"],
  },
  insurance: {
    name: "Agro Insurance",
    subcategories: [
      "Crop Insurance",
      "Livestock Insurance",
      "Farm Equipment Insurance",
      "Weather Insurance",
    ],
  },
  equipment: {
    name: "Tractor / Farm Machines",
    subcategories: [
      "Tractor",
      "Sheller",
      "Sprayer",
      "Knapsack Sprayer",
      "Fish Pond",
      "Others",
    ],
  },
  "animal mating": {
    name: "Animal Mating",
    subcategories: [
      "Dog",
      "Goat",
      "Pig",
      "AI Service",
      "Natural Mating",
    ],
  },
  "agro chemicals": {
    name: "Agro Chemicals / Pesticides",
    subcategories: ["Herbicide", "Pesticide", "Fungicide"],
  },
  food: {
    name: "Food / Fruits & Vegetables",
    subcategories: ["Fresh Fruits", "Vegetables", "Herbs", "Spices"],
  },
  seedlings: {
    name: "Seedlings",
    subcategories: ["Maize", "Soybean", "Groundnut", "Hybrid", "Open-pollination"],
  },
  ornamentals: {
    name: "Horticulture / Ornamental Crops",
    subcategories: ["Flowers", "Shrubs", "Indoor Plants", "Landscaping"],
  },
  animalLoan: {
    name: "Animal Loan",
    subcategories: [
      "Veterinary Loan",
      "Feed Subsidy",
      "Equipment Financing",
      "Livestock Purchase Support",
      "Insurance",
    ],
  },
  fertilizers: {
    name: "Fertilizers",
    subcategories: ["NPK", "Urea", "DAP", "Soil", "Foliar"],
  },
  "animal feed": {
    name: "Animal Feed",
    subcategories: [
      "Preventive",
      "Curative",
      "Supplement",
      "Powder",
      "Oral",
      "Injectable",
    ],
  },
  animalPharmacy: {
    name: "Animal Pharmacy",
    subcategories: [
      "Preventive",
      "Curative",
      "Supplement",
      "Powder",
      "Oral",
      "Injectable",
    ],
  },
  animalAccessories: {
    name: "Animal Accessories",
    subcategories: ["Drinkers", "Cages", "Feeding", "Transporting", "Housing"],
  },
}
