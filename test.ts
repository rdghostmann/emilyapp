// 🐮 1. Animal Mating Products
const animalMatingData = [
    {
        name: "Proven Boer Goat Stud Service",
        description:
            "Healthy Boer buck available for breeding. Excellent genetics, disease-free, proven offspring.",
        price: 50000,
        location: "Kaduna, Nigeria",
        seller: new mongoose.Types.ObjectId(), // replace with real User ID later
        images: ["/images/goat-stud.jpg"],
        category: "animal-mating",
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
    {
        name: "Kuroiler Chicken Fertile Eggs",
        description:
            "Freshly laid fertile eggs from healthy Kuroiler breed. Guaranteed hatch rate above 85%.",
        price: 250,
        location: "Ogun, Nigeria",
        seller: new mongoose.Types.ObjectId(),
        images: ["/images/kuroiler-eggs.jpg"],
        category: "animal-mating",
        species: "Chicken",
        breed: "Kuroiler",
        eggFertilityRate: 90,
        quantityAvailable: 200,
        collectionDate: new Date("2025-08-10"),
    },
];

// 💊 2. Animal Pharmacy Products
const animalPharmacyData = [
    {
        name: "Oxytetracycline Injection 100ml",
        description:
            "Broad-spectrum antibiotic for treating bacterial infections in livestock.",
        price: 1500,
        location: "Ibadan, Nigeria",
        seller: new mongoose.Types.ObjectId(),
        images: ["/images/oxytet.jpg"],
        category: "animal-pharmacy",
        drugType: "Antibiotic",
        dosageForm: "Injection",
        targetSpecies: ["Cattle", "Goats", "Sheep"],
        activeIngredients: ["Oxytetracycline"],
        expiryDate: new Date("2026-05-20"),
        storageConditions: "Store in a cool, dry place away from sunlight",
    },
    {
        name: "Ivermectin Dewormer 50ml",
        description:
            "Effective against internal and external parasites in livestock and pets.",
        price: 1200,
        location: "Kano, Nigeria",
        seller: new mongoose.Types.ObjectId(),
        images: ["/images/ivermectin.jpg"],
        category: "animal-pharmacy",
        drugType: "Antiparasitic",
        dosageForm: "Injection",
        targetSpecies: ["Cattle", "Goats", "Dogs"],
        activeIngredients: ["Ivermectin"],
        expiryDate: new Date("2027-01-15"),
        storageConditions: "Do not freeze. Store below 30°C.",
    },
];

// 🌾 3. Animal Feed Products
const animalFeedData = [
    {
        name: "Broiler Starter Mash - 25kg",
        description:
            "Balanced feed for broiler chicks from day-old to 4 weeks. Promotes rapid growth.",
        price: 8500,
        location: "Lagos, Nigeria",
        seller: new mongoose.Types.ObjectId(),
        images: ["/images/broiler-starter.jpg"],
        category: "animal-feed",
        feedType: "Poultry Feed",
        species: ["Chicken"],
        weight: "25kg",
        ingredients: ["Maize", "Soybean meal", "Fish meal", "Vitamins", "Minerals"],
        nutritionalContent: {
            protein: "22%",
            fiber: "5%",
            fat: "4%",
        },
        expiryDate: new Date("2025-12-31"),
    },
    {
        name: "Dairy Cattle Concentrate - 50kg",
        description:
            "High-protein concentrate to boost milk production in dairy cattle.",
        price: 18000,
        location: "Jos, Nigeria",
        seller: new mongoose.Types.ObjectId(),
        images: ["/images/dairy-feed.jpg"],
        category: "animal-feed",
        feedType: "Cattle Feed",
        species: ["Cattle"],
        weight: "50kg",
        ingredients: [
            "Maize bran",
            "Groundnut cake",
            "Molasses",
            "Vitamin premix",
        ],
        nutritionalContent: {
            protein: "18%",
            fiber: "8%",
            fat: "3%",
        },
        expiryDate: new Date("2026-02-15"),
    },
];

// 🐕 4. Livestock & Pet Products
const livestockPetData = [
    {
        name: "Purebred German Shepherd Puppy",
        description:
            "Healthy and well-socialized puppy. Fully vaccinated and dewormed. Excellent guard dog potential.",
        price: 150000,
        location: "Abuja, Nigeria",
        seller: new mongoose.Types.ObjectId(),
        images: ["/images/german-shepherd.jpg"],
        category: "livestock-pet",
        species: "Dog",
        breed: "German Shepherd",
        age: "4 months",
        gender: "Male",
        healthStatus: "Fully vaccinated",
    },
    {
        name: "White Fulani Calf",
        description:
            "Strong and healthy Fulani calf. Ideal for breeding or fattening.",
        price: 250000,
        location: "Sokoto, Nigeria",
        seller: new mongoose.Types.ObjectId(),
        images: ["/images/fulani-calf.jpg"],
        category: "livestock-pet",
        species: "Cattle",
        breed: "White Fulani",
        age: "6 months",
        gender: "Female",
        healthStatus: "Vaccinated and dewormed",
    },
];

// 🍎 5. Food, Fruit & Vegetables
const foodFruitVegData = [
    {
        name: "Fresh Tomatoes - 50kg Basket",
        description:
            "Farm-fresh tomatoes harvested this week. Perfect for commercial buyers.",
        price: 12000,
        location: "Kano, Nigeria",
        seller: new mongoose.Types.ObjectId(),
        images: ["/images/tomatoes-basket.jpg"],
        category: "food-fruit-vegetable",
        foodType: "Vegetable",
        variety: "Roma",
        quantity: "50kg basket",
        harvestDate: new Date("2025-08-12"),
        shelfLife: "7 days",
    },
    {
        name: "Organic Pineapples - 10 pieces",
        description:
            "Sweet and juicy organic pineapples grown without synthetic chemicals.",
        price: 5000,
        location: "Benin City, Nigeria",
        seller: new mongoose.Types.ObjectId(),
        images: ["/images/pineapples.jpg"],
        category: "food-fruit-vegetable",
        foodType: "Fruit",
        variety: "Smooth Cayenne",
        quantity: "10 pieces",
        harvestDate: new Date("2025-08-09"),
        shelfLife: "14 days",
    },
];

