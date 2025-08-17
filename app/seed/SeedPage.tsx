// /seed/page.tsx
// /seed/page.tsx

import mongoose from "mongoose";
import { connectToDB } from "@/lib/connectDB";
import { Product } from "@/models/Product";

export default async function SeedPage() {
  await connectToDB();

  // Replace with your already seeded users
  const farmkingId = new mongoose.Types.ObjectId("689f26f9b9030b5780fd9068");
  const agromamaId = new mongoose.Types.ObjectId("689f26f9b9030b5780fd9069");

  // 🐮 Product Data
  const productData = [
    // Animal Mating
    {
      name: "Proven Boer Goat Stud Service",
      description: "Healthy Boer buck available for breeding...",
      price: 50000,
      location: "Kaduna, Nigeria",
      seller: farmkingId,
      images: ["/images/goat-stud.jpg"],
      category: "animal-mating",
      subcategory: "goat",
      details: {
        species: "Goat",
        breed: "Boer",
        age: 3,
        healthStatus: "Vaccinated and dewormed",
        matingType: "Natural service",
        availabilityDates: {
          start: new Date("2025-08-15"),
          end: new Date("2025-09-15"),
        },
      },
    },
    {
      name: "Kuroiler Chicken Fertile Eggs",
      description: "Freshly laid fertile eggs from healthy Kuroiler breed...",
      price: 250,
      location: "Ogun, Nigeria",
      seller: agromamaId,
      images: ["/images/kuroiler-eggs.jpg"],
      category: "animal-mating",
      subcategory: "ai-service",
      details: {
        species: "Chicken",
        breed: "Kuroiler",
        eggFertilityRate: 90,
        quantityAvailable: 200,
        collectionDate: new Date("2025-08-10"),
      },
    },

    // Animal Pharmacy
    {
      name: "Oxytetracycline Injection 100ml",
      description: "Broad-spectrum antibiotic for livestock...",
      price: 1500,
      location: "Ibadan, Nigeria",
      seller: farmkingId,
      images: ["/images/oxytet.jpg"],
      category: "animal-pharmacy",
      subcategory: "injectable",
      details: {
        drugType: "Antibiotic",
        dosageForm: "Injection",
        targetSpecies: ["Cattle", "Goats", "Sheep"],
        activeIngredients: ["Oxytetracycline"],
        expiryDate: new Date("2026-05-20"),
        storageConditions: "Store in a cool, dry place away from sunlight",
      },
    },
    {
      name: "Ivermectin Dewormer 50ml",
      description: "Effective against internal and external parasites...",
      price: 1200,
      location: "Kano, Nigeria",
      seller: agromamaId,
      images: ["/images/ivermectin.jpg"],
      category: "animal-pharmacy",
      subcategory: "curative",
      details: {
        drugType: "Antiparasitic",
        dosageForm: "Injection",
        targetSpecies: ["Cattle", "Goats", "Dogs"],
        activeIngredients: ["Ivermectin"],
        expiryDate: new Date("2027-01-15"),
        storageConditions: "Do not freeze. Store below 30°C.",
      },
    },

    // Animal Feed
    {
      name: "Broiler Starter Mash - 25kg",
      description: "Balanced feed for broiler chicks from day-old to 4 weeks...",
      price: 8500,
      location: "Lagos, Nigeria",
      seller: farmkingId,
      images: ["/images/broiler-starter.jpg"],
      category: "animal-feed",
      subcategory: "oral",
      details: {
        feedType: "Poultry Feed",
        species: ["Chicken"],
        weight: "25kg",
        ingredients: ["Maize", "Soybean meal", "Fish meal", "Vitamins", "Minerals"],
        nutritionalContent: { protein: "22%", fiber: "5%", fat: "4%" },
        expiryDate: new Date("2025-12-31"),
      },
    },
    {
      name: "Dairy Cattle Concentrate - 50kg",
      description: "High-protein concentrate to boost milk production...",
      price: 18000,
      location: "Jos, Nigeria",
      seller: agromamaId,
      images: ["/images/dairy-feed.jpg"],
      category: "animal-feed",
      subcategory: "supplement",
      details: {
        feedType: "Cattle Feed",
        species: ["Cattle"],
        weight: "50kg",
        ingredients: ["Maize bran", "Groundnut cake", "Molasses", "Vitamin premix"],
        nutritionalContent: { protein: "18%", fiber: "8%", fat: "3%" },
        expiryDate: new Date("2026-02-15"),
      },
    },

    // Livestock & Pet
    {
      name: "Purebred German Shepherd Puppy",
      description: "Healthy and well-socialized puppy. Fully vaccinated...",
      price: 150000,
      location: "Abuja, Nigeria",
      seller: farmkingId,
      images: ["/images/german-shepherd.jpg"],
      category: "livestock-pet",
      subcategory: "pet",
      details: {
        species: "Dog",
        breed: "German Shepherd",
        age: "4 months",
        gender: "Male",
        healthStatus: "Fully vaccinated",
      },
    },
    {
      name: "White Fulani Calf",
      description: "Strong and healthy Fulani calf. Ideal for breeding or fattening.",
      price: 250000,
      location: "Sokoto, Nigeria",
      seller: agromamaId,
      images: ["/images/fulani-calf.jpg"],
      category: "livestock-pet",
      subcategory: "cattle",
      details: {
        species: "Cattle",
        breed: "White Fulani",
        age: "6 months",
        gender: "Female",
        healthStatus: "Vaccinated and dewormed",
      },
    },

    // Food, Fruit & Vegetables
    {
      name: "Fresh Tomatoes - 50kg Basket",
      description: "Farm-fresh tomatoes harvested this week...",
      price: 12000,
      location: "Kano, Nigeria",
      seller: farmkingId,
      images: ["/images/tomatoes-basket.jpg"],
      category: "food-fruit-vegetable",
      subcategory: "vegetables",
      details: {
        foodType: "Vegetable",
        variety: "Roma",
        quantity: "50kg basket",
        harvestDate: new Date("2025-08-12"),
        shelfLife: "7 days",
      },
    },
    {
      name: "Organic Pineapples - 10 pieces",
      description: "Sweet and juicy organic pineapples grown without chemicals...",
      price: 5000,
      location: "Benin City, Nigeria",
      seller: agromamaId,
      images: ["/images/pineapples.jpg"],
      category: "food-fruit-vegetable",
      subcategory: "fresh-fruits",
      details: {
        foodType: "Fruit",
        variety: "Smooth Cayenne",
        quantity: "10 pieces",
        harvestDate: new Date("2025-08-09"),
        shelfLife: "14 days",
      },
    },
  ];

  // Insert into DB
  await Product.insertMany(productData);

  return <div>✅ Product seeding complete. Total: {productData.length}</div>;
}
