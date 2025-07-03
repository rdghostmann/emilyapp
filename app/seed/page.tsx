import { connectToDB } from "@/lib/connectDB";
import Product from "@/models/Product";
import User from "@/models/User";

export default async function SeedPage() {
  await connectToDB();

  // Example user(s)
  const users = [
    {
      _id: "68625a0a5933233bed203443",
      username: "rd47",
      email: "randalchukzwilson@gmail.com",
      password: "randalchukzwilson@gmail.com", // hash in real usage!
    },
  ];

  // Upsert user(s)
  for (const user of users) {
    await User.updateOne({ _id: user._id }, user, { upsert: true });
  }

  // Remove all products first
  await Product.deleteMany({});

  // Helper for detailed description
  const tomatoLongDesc = `
Our organic tomatoes are carefully cultivated in nutrient-rich soil and harvested at peak ripeness to ensure maximum flavor and nutritional value.

Key Features:
• 100% Organic - No pesticides or chemicals
• Vine-ripened for optimal taste
• Rich in vitamins A, C, and K
• Perfect for salads, cooking, and sauces
• Freshly harvested daily
• Sustainable farming practices

Storage Instructions:
Store at room temperature for best flavor. Refrigerate only when fully ripe to extend shelf life.
`;

  const wheatLongDesc = `
Our premium wheat grain is grown using sustainable methods, ensuring high nutritional value and purity.

Key Features:
• High protein content
• Ideal for flour production and baking
• Carefully cleaned and sorted
• Grown without harmful chemicals

Storage Instructions:
Store in a cool, dry place. Keep sealed to maintain freshness.
`;

  const eggsLongDesc = `
Our free-range eggs come from happy, healthy chickens raised on open pastures.

Key Features:
• Free-range, ethically raised hens
• Rich in nutrients and flavor
• No antibiotics or hormones
• Perfect for breakfast, baking, and more

Storage Instructions:
Keep refrigerated for maximum freshness.
`;

  const applesLongDesc = `
Our organic apples are sweet, crispy, and grown without pesticides.

Key Features:
• 100% organic
• Crisp and juicy
• Great for eating fresh or juicing
• Packed with vitamins and fiber

Storage Instructions:
Store in a cool, dry place or refrigerate for longer shelf life.
`;

  const milkLongDesc = `
Our fresh milk is sourced from grass-fed cows and is rich in calcium and nutrients.

Key Features:
• Pure and fresh
• No additives or preservatives
• Rich in calcium and protein
• Perfect for the whole family

Storage Instructions:
Keep refrigerated and consume within 3 days of opening.
`;

  const carrotsLongDesc = `
Our organic carrots are crunchy, sweet, and perfect for snacking or cooking.

Key Features:
• 100% organic
• Crunchy and sweet
• Great for juicing, salads, and cooking
• Rich in beta-carotene and fiber

Storage Instructions:
Store in the refrigerator for best freshness.
`;

  // Seed products, referencing the user as farmer
  const mockProducts = [
    {
      title: "Fresh Organic Tomatoes",
      description: "Premium quality organic tomatoes, freshly harvested from our farm. Perfect for cooking and salads.",
      longDescription: tomatoLongDesc,
      price: 4.99,
      originalPrice: 6.99,
      unit: "per kg",
      images: ["/product/fresh-organic-tomatoes.jpg"],
      farmer: users[0]._id,
      category: "fruits-vegetables",
      inStock: true,
      quantity: 500,
      minOrder: 1,
      maxOrder: 100,
      postedAt: "2 hours ago",
      discount: 30,
      features: ["Organic", "Fresh", "Local", "Pesticide-free"],
      nutritionFacts: {
        calories: 18,
        protein: "0.9g",
        carbs: "3.9g",
        fiber: "1.2g",
        vitaminC: "28% DV",
      },
      reviews: [
        {
          user: "Maria Garcia",
          avatar: "/user/client-4.jpg",
          rating: 5,
          comment: "Excellent quality tomatoes! Very fresh and tasty. Will definitely order again.",
          date: "2 days ago",
          verified: true,
        },
        {
          user: "David Wilson",
          avatar: "/user/client-2.jpg",
          rating: 4,
          comment: "Good quality, delivered on time. Slightly expensive but worth it for organic produce.",
          date: "1 week ago",
          verified: true,
        },
        {
          user: "Dan Johnson",
          avatar: "/user/client-5.jpg",
          rating: 5,
          comment: "Amazing tomatoes! Perfect for my restaurant. John is very professional and reliable.",
          date: "2 weeks ago",
          verified: true,
        },
      ],
    },
    {
      title: "Premium Wheat Grain",
      description: "High-quality wheat grain, perfect for flour production. Grown using sustainable farming practices.",
      longDescription: wheatLongDesc,
      price: 2.5,
      unit: "per kg",
      images: ["/product/premium-wheat-grain.jpg"],
      farmer: users[0]._id,
      category: "seedlings",
      inStock: true,
      quantity: 2000,
      postedAt: "5 hours ago",
      features: ["High Protein", "Cleaned", "Sustainable"],
      nutritionFacts: {
        calories: 340,
        protein: "13g",
        carbs: "72g",
        fiber: "12g",
        vitaminC: "0%",
      },
      reviews: [
        {
          user: "Aisha Bello",
          avatar: "/user/client-2.jpg",
          rating: 5,
          comment: "Great quality wheat, perfect for my bakery.",
          date: "3 days ago",
          verified: true,
        },
      ],
    },
    {
      title: "Fresh Farm Eggs",
      description: "Free-range chicken eggs from happy, healthy chickens. Rich in nutrients and perfect for any meal.",
      longDescription: eggsLongDesc,
      price: 6.99,
      unit: "per dozen",
      images: ["/product/fresh-farm-eggs.jpg"],
      farmer: users[0]._id,
      category: "livestock-pets",
      inStock: true,
      quantity: 200,
      postedAt: "1 day ago",
      features: ["Free-range", "Nutrient-rich", "No antibiotics"],
      nutritionFacts: {
        calories: 155,
        protein: "13g",
        carbs: "1.1g",
        fiber: "0g",
        vitaminC: "0%",
      },
      reviews: [
        {
          user: "Samuel Okoro",
          avatar: "/user/client-3.jpg",
          rating: 5,
          comment: "Eggs are always fresh and delicious.",
          date: "5 days ago",
          verified: true,
        },
      ],
    },
    {
      title: "Organic Apples",
      description: "Sweet and crispy organic apples. No pesticides used. Great for eating fresh or making juice.",
      longDescription: applesLongDesc,
      price: 5.99,
      unit: "per kg",
      images: ["/product/organic-apples.jpg"],
      farmer: users[0]._id,
      category: "fruits-vegetables",
      inStock: true,
      quantity: 800,
      postedAt: "3 hours ago",
      features: ["Organic", "Crispy", "Juicy"],
      nutritionFacts: {
        calories: 52,
        protein: "0.3g",
        carbs: "14g",
        fiber: "2.4g",
        vitaminC: "7% DV",
      },
      reviews: [
        {
          user: "Fatima Musa",
          avatar: "/user/client-4.jpg",
          rating: 4,
          comment: "Very tasty apples, my kids love them.",
          date: "2 days ago",
          verified: true,
        },
      ],
    },
    {
      title: "Fresh Milk",
      description: "Pure, fresh milk from grass-fed cows. Rich in calcium and perfect for the whole family.",
      longDescription: milkLongDesc,
      price: 3.99,
      unit: "per liter",
      images: ["/product/fresh-milk.jpg"],
      farmer: users[0]._id,
      category: "livestock-pets",
      inStock: true,
      quantity: 500,
      postedAt: "4 hours ago",
      features: ["Grass-fed", "Calcium-rich", "Pure"],
      nutritionFacts: {
        calories: 42,
        protein: "3.4g",
        carbs: "5g",
        fiber: "0g",
        vitaminC: "0%",
      },
      reviews: [
        {
          user: "Grace Eze",
          avatar: "/user/client-5.jpg",
          rating: 5,
          comment: "Best milk I've tasted, very fresh.",
          date: "1 day ago",
          verified: true,
        },
      ],
    },
    {
      title: "Organic Carrots",
      description: "Fresh, crunchy organic carrots. Perfect for cooking, juicing, or eating raw as a healthy snack.",
      longDescription: carrotsLongDesc,
      price: 3.49,
      unit: "per kg",
      images: ["/product/organic-carrots.jpg"],
      farmer: users[0]._id,
      category: "fruits-vegetables",
      inStock: true,
      quantity: 300,
      postedAt: "6 hours ago",
      features: ["Organic", "Crunchy", "Sweet"],
      nutritionFacts: {
        calories: 41,
        protein: "0.9g",
        carbs: "10g",
        fiber: "2.8g",
        vitaminC: "9% DV",
      },
      reviews: [
        {
          user: "Ahmed Bello",
          avatar: "/user/client-2.jpg",
          rating: 5,
          comment: "Carrots are always fresh and sweet.",
          date: "2 days ago",
          verified: true,
        },
      ],
    },
  ];

  // Insert products
  await Product.insertMany(mockProducts);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Seeded Products</h1>
      <ul className="list-disc pl-6">
        {mockProducts.map((p, i) => (
          <li key={i}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}