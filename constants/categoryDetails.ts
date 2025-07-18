import {
  Wrench,
  Leaf,
  SprayCan,
  Apple,
  Beef,
  HeartHandshake,
  Flower,
  TreePine,
  Handshake,
  Pill,
  PawPrint,
  Drumstick,
  ShieldCheck
} from "lucide-react"

export type CategoryProperty = {
  label: string;
  values: string[];
};

export type CategoryDetail = {
  title: string;
  description: string;
  properties: CategoryProperty[];
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  color: string;
  count: number;
};

export type CategoryDetailsMap = {
  [key: string]: CategoryDetail;
};

// 👇 Category configuration object
export const categoryDetails: CategoryDetailsMap = {
  "trending": {
    title: "Trending",
    description: "Find new and used tractors, shellers, sprayers, and more.",
    properties: [
      { label: "Machine Type", values: ["Tractor", "Sheller", "Sprayer", "Otibaco Shredder"] },
    ],
    icon: Wrench,
    image: "/icons/0.jpg",
    color: "bg-gray-100 text-gray-600",
    count: 45,
  },
  "livestock-pets": {
    title: "Livestock & Pets",
    description: "Find poultry, cattle, and other animals.",
    properties: [
      { label: "livestock-Pets", values: ["Poultry", "Cattle", "Goat", "Other"] },
      { label: "Breed", values: [] },
      { label: "Age Range", values: [] },
      { label: "Health Status / Vaccination", values: [] },
    ],
    icon: Beef,
    image: "/icons/1.jpg",
    color: "bg-purple-100 text-purple-600",
    count: 80,
  },
  "services": {
    title: "Services",
    description: "Find agricultural services.",
    properties: [
      { label: "Services", values: ["Tractor Hiring", "Farm Setup", "Veterinary"] },
      { label: "Area Coverage", values: ["Local", "State Wide", "National Wide"] },
      { label: "Availability", values: ["On-demand", "Booking"] },
    ],
    icon: Handshake,
    image: "/icons/2.jpg",
    color: "bg-blue-100 text-blue-600",
    count: 18,
  },
  "agro-insurance": {
    title: "Agro Insurance",
    description: "Insurance products for agriculture.",
    properties: [
      { label: "Animal-Insurance", values: [] },
    ],
    icon: ShieldCheck,
    image: "/icons/3.jpg",
    color: "bg-teal-100 text-teal-600",
    count: 5,
  },
  "tractor-farm-equipment": {
    title: "Tractor/Farm Machine",
    description: "Find new and used tractors, shellers, sprayers, and more.",
    properties: [
      { label: "Machine Type", values: ["Tractor", "Sheller", "Sprayer", "Otibaco Shredder"] },
      { label: "Condition", values: ["New", "Used"] },
      { label: "Fuel Type", values: ["Diesel", "Petrol", "Manual"] },
      { label: "Brand", values: [] },
    ],
    icon: Wrench,
    image: "/icons/4.jpg",
    color: "bg-gray-100 text-gray-600",
    count: 45,
  },
  "animal-mating": {
    title: "Animal Mating",
    description: "Animal mating and insemination services.",
    properties: [
      { label: "Animal-Mating", values: ["Dog", "Goat", "Pig"] },
      { label: "Insemination Services", values: ["Mobile AI Service"] },
      { label: "Breed Type", values: [] },
      { label: "Age", values: [] },
      { label: "Service Type", values: ["Natural", "Artificial"] },
    ],
    icon: HeartHandshake,
    image: "/icons/5.jpg",
    color: "bg-pink-100 text-pink-600",
    count: 12,
  },
  "agro-chemicals-insecticides-pesticides": {
    title: "Agro Chemicals / Insecticides & Pesticides",
    description: "Find herbicides, insecticides, fungicides and more.",
    properties: [
      { label: "Chemical Type", values: ["Herbicides", "Insecticides", "Fungicides"] },
      { label: "Application Type", values: [] },
    ],
    icon: SprayCan,
    image: "/icons/6.jpg",
    color: "bg-yellow-100 text-yellow-600",
    count: 28,
  },
  "food-fruits-vegetables": {
    title: "Food/Fruits & Vegetables",
    description: "Fresh and dried fruits and vegetables.",
    properties: [
      { label: "Fruits Vegetables", values: ["Fruit", "Vegetable"] },
      { label: "Form", values: ["Fresh", "Dried", "Packaged"] },
      { label: "Harvest Date", values: [] },
    ],
    icon: Apple,
    image: "/icons/7.jpg",
    color: "bg-red-100 text-red-600",
    count: 320,
  },
  "seedlings": {
    title: "Seedlings",
    description: "Browse a variety of seedlings for your farm.",
    properties: [
      { label: "Seedlings", values: ["Maize", "Tomatoes", "Cocoa", "Other"] },
      { label: "Seedlings Age", values: ["1 week", "2 weeks", "3 weeks"] },
      { label: "Type", values: ["Hybrid", "Open-pollination"] },
    ],
    icon: TreePine,
    image: "/icons/8.jpg",
    color: "bg-green-50 text-green-500",
    count: 60,
  },
  "ornamental-crops": {
    title: "Horticulture/Ornamental Crops",
    description: "Browse ornamental crops and flowers.",
    properties: [
      { label: "Ornamental-Crops", values: ["Maize", "Tomatoes", "Cocoa", "Other"] },
    ],
    icon: Flower,
    image: "/icons/9.jpg",
    color: "bg-pink-50 text-pink-400",
    count: 20,
  },
  "animal-loan": {
    title: "Animal Loan",
    description: "Loan products for animal health.",
    properties: [
      { label: "Animal-Loan", values: [] },
      { label: "Use", values: ["Preventive", "Curative", "Supplement"] },
      { label: "Product Form", values: ["Powder", "Injectable", "Oral"] },
    ],
    icon: Pill,
    image: "/icons/10.jpg",
    color: "bg-indigo-100 text-indigo-600",
    count: 10,
  },
  "fertilizers": {
    title: "Fertilizers",
    description: "Browse a variety of fertilizers for your crops.",
    properties: [
      { label: "Fertilizer Type", values: ["NPK", "Urea", "Organic"] },
      { label: "Application Use", values: ["Soil", "Foliar"] },
      { label: "Pack Size", values: [] },
    ],
    icon: Leaf,
    image: "/icons/11.jpg",
    color: "bg-green-100 text-green-600",
    count: 30,
  },
  "animal-feed": {
    title: "Animal Feed",
    description: "Animal health and pharmacy products.",
    properties: [
      { label: "Animal-Pharmacy", values: [] },
      { label: "Use", values: ["Preventive", "Curative", "Supplement"] },
      { label: "Product Form", values: ["Powder", "Injectable", "Oral"] },
    ],
    icon: Pill,
    image: "/icons/12.jpg",
    color: "bg-indigo-100 text-indigo-600",
    count: 10,
  },
  "animal-pharmacy": {
    title: "Animal Pharmacy",
    description: "Animal health and pharmacy products.",
    properties: [
      { label: "Animal-Pharmacy", values: [] },
      { label: "Use", values: ["Preventive", "Curative", "Supplement"] },
      { label: "Product Form", values: ["Powder", "Injectable", "Oral"] },
    ],
    icon: Pill,
    image: "/icons/14.jpg",
    color: "bg-indigo-100 text-indigo-600",
    count: 10,
  },
  "animal-accessories": {
    title: "Animal Accessories",
    description: "Accessories for animals and pets.",
    properties: [
      { label: "Animal-Accessories", values: ["Poultry Drinkers", "Bird Cage", "Other"] },
      { label: "Animal Type", values: ["Dog", "Pig", "Other"] },
      { label: "Use", values: ["Feeding", "Transporting", "Housing"] },
    ],
    icon: PawPrint,
    image: "/icons/15.jpg",
    color: "bg-orange-100 text-orange-600",
    count: 15,
  },

};

// Helper type for the simplified category array items
export type CategoryItem = {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  color: string;
  count: number;
};

// Export the categories as an array
export const categories: CategoryItem[] = Object.entries(categoryDetails).map(([id, detail]) => ({
  id,
  name: detail.title,
  icon: detail.icon,
  image: detail.image,
  color: detail.color,
  count: detail.count,
}));