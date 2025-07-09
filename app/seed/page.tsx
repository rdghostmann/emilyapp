import { connectToDB } from "@/lib/connectDB";
import Product from "@/models/Product";
import User from "@/models/User";
import Conversation from "@/models/Conversation";
import Message from "@/models/Message";

export default async function SeedPage() {
  await connectToDB();

  // Seed users
  const users = [
    {
      _id: "68625a0a5933233bed203443",
      username: "rd47",
      email: "randalchukzwilson@gmail.com",
      password: "randalchukzwilson@gmail.com",
      avatar: "/user/client-1.jpg",
      country: "USA",
      state: "California",
      role: "user",
      status: "active",
      accountType: null,
      balance: null,
      joinDate: "2025-06-30",
      lastLogin: "2025-06-30",
      zipCode: null,
    },
    {
      _id: "68625a0a5933233bed203444",
      username: "maria",
      email: "maria.garcia@gmail.com",
      password: "maria.garcia@gmail.com",
      avatar: "/user/client-2.jpg",
      country: "Nigeria",
      state: "Kano",
      role: "user",
      status: "active",
      accountType: null,
      balance: null,
      joinDate: "2025-06-30",
      lastLogin: "2025-06-30",
      zipCode: null,
    },
    {
      _id: "68625a0a5933233bed203445",
      username: "david",
      email: "david.johnson@gmail.com",
      password: "david.johnson@gmail.com",
      avatar: "/user/client-3.jpg",
      country: "Nigeria",
      state: "Oyo",
      role: "user",
      status: "active",
      accountType: null,
      balance: null,
      joinDate: "2025-06-30",
      lastLogin: "2025-06-30",
      zipCode: null,
    },
  ];

  for (const user of users) {
    await User.updateOne({ _id: user._id }, user, { upsert: true });
  }

  // Optionally, clear old conversations and messages
  await Conversation.deleteMany({});
  await Message.deleteMany({});

  // Seed conversations
  const conversations = [
    {
      participants: [users[0]._id, users[1]._id],
      productId: null,
      lastMessage: "Hi, I'm interested in your organic tomatoes. Are they still available?",
      unreadCount: 2,
    },
    {
      participants: [users[0]._id, users[2]._id],
      productId: null,
      lastMessage: "Can we arrange pickup for tomorrow morning?",
      unreadCount: 1,
    },
  ];

  const conversationDocs = await Conversation.insertMany(conversations);

  // Seed messages for the first conversation
  await Message.insertMany([
    {
      conversationId: conversationDocs[0]._id,
      senderId: users[1]._id,
      senderName: "Maria Garcia",
      content: "Hi, I'm interested in your organic tomatoes. Are they still available?",
      type: "text",
      timestamp: new Date(),
    },
    {
      conversationId: conversationDocs[0]._id,
      senderId: users[0]._id,
      senderName: "rd47",
      content: "Yes, they are! We have about 200kg available.",
      type: "text",
      timestamp: new Date(),
    },
  ]);

  // Seed messages for the second conversation
  await Message.insertMany([
    {
      conversationId: conversationDocs[1]._id,
      senderId: users[2]._id,
      senderName: "David Johnson",
      content: "Can we arrange pickup for tomorrow morning?",
      type: "text",
      timestamp: new Date(),
    },
    {
      conversationId: conversationDocs[1]._id,
      senderId: users[0]._id,
      senderName: "rd47",
      content: "Yes, that works for me.",
      type: "text",
      timestamp: new Date(),
    },
  ]);

  // Seed products for each category
  const categories = [
    "equipment-machines",
    "fertilizers",
    "chemicals-insecticides-pesticides",
    "fruits-vegetables",
    "livestock-pets",
    "animal-mating",
    "ornamental-crops",
    "seedlings",
    "services",
    "animal-pharmacy",
    "animal-accessories",
    "animal-feeds",
    "agro-insurance",
  ];

 const sampleProducts: {
  [key: string]: {
    title: string;
    description: string;
    price: number;
    unit: string;
    images: string[];
    farmer: string;
    category: string;
    inStock: boolean;
    quantity: number;
  }[];
} = {
  "equipment-machines": [
    {
      title: "Tractor X100",
      description: "Powerful new tractor for all farm sizes.",
      price: 12000,
      unit: "unit",
      images: ["/products/tractor1.jpg"],
      farmer: users[0]._id,
      category: "equipment-machines",
      inStock: true,
      quantity: 5,
    },
    {
      title: "Sheller Pro",
      description: "Efficient maize sheller.",
      price: 3500,
      unit: "unit",
      images: ["/products/sheller1.jpg"],
      farmer: users[1]._id,
      category: "equipment-machines",
      inStock: true,
      quantity: 2,
    },
    {
      title: "Sprayer 200L",
      description: "Large capacity farm sprayer.",
      price: 800,
      unit: "unit",
      images: ["/products/sprayer1.jpg"],
      farmer: users[2]._id,
      category: "equipment-machines",
      inStock: true,
      quantity: 10,
    },
  ],
  "fertilizers": [
    {
      title: "NPK 20-10-10",
      description: "Balanced fertilizer for crops.",
      price: 50,
      unit: "bag",
      images: ["/products/npk.jpg"],
      farmer: users[0]._id,
      category: "fertilizers",
      inStock: true,
      quantity: 100,
    },
    {
      title: "Urea Fertilizer",
      description: "High nitrogen content.",
      price: 45,
      unit: "bag",
      images: ["/products/urea.jpg"],
      farmer: users[1]._id,
      category: "fertilizers",
      inStock: true,
      quantity: 80,
    },
    {
      title: "Organic Compost",
      description: "Eco-friendly organic fertilizer.",
      price: 60,
      unit: "bag",
      images: ["/products/compost.jpg"],
      farmer: users[2]._id,
      category: "fertilizers",
      inStock: true,
      quantity: 50,
    },
  ],
  "chemicals-insecticides-pesticides": [
    {
      title: "Herbicide Max",
      description: "Effective weed control for your farm.",
      price: 30,
      unit: "bottle",
      images: ["/products/herbicide.jpg"],
      farmer: users[0]._id,
      category: "chemicals-insecticides-pesticides",
      inStock: true,
      quantity: 40,
    },
    {
      title: "Insecticide Plus",
      description: "Protects crops from insects.",
      price: 25,
      unit: "bottle",
      images: ["/products/insecticide.jpg"],
      farmer: users[1]._id,
      category: "chemicals-insecticides-pesticides",
      inStock: true,
      quantity: 60,
    },
    {
      title: "Fungicide Safe",
      description: "Prevents fungal diseases.",
      price: 35,
      unit: "bottle",
      images: ["/products/fungicide.jpg"],
      farmer: users[2]._id,
      category: "chemicals-insecticides-pesticides",
      inStock: true,
      quantity: 30,
    },
  ],
  "fruits-vegetables": [
    {
      title: "Organic Tomatoes",
      description: "Freshly harvested organic tomatoes.",
      price: 20,
      unit: "kg",
      images: ["/products/tomatoes.jpg"],
      farmer: users[0]._id,
      category: "fruits-vegetables",
      inStock: true,
      quantity: 100,
    },
    {
      title: "Carrots",
      description: "Sweet and crunchy carrots.",
      price: 15,
      unit: "kg",
      images: ["/products/carrots.jpg"],
      farmer: users[1]._id,
      category: "fruits-vegetables",
      inStock: true,
      quantity: 80,
    },
    {
      title: "Bell Peppers",
      description: "Colorful bell peppers for all dishes.",
      price: 25,
      unit: "kg",
      images: ["/products/bell-peppers.jpg"],
      farmer: users[2]._id,
      category: "fruits-vegetables",
      inStock: true,
      quantity: 60,
    },
  ],
  "livestock-pets": [
    {
      title: "Broiler Chickens",
      description: "Healthy broiler chickens ready for sale.",
      price: 10,
      unit: "bird",
      images: ["/products/broiler.jpg"],
      farmer: users[0]._id,
      category: "livestock-pets",
      inStock: true,
      quantity: 300,
    },
    {
      title: "Goats",
      description: "Well-fed farm goats.",
      price: 150,
      unit: "goat",
      images: ["/products/goat.jpg"],
      farmer: users[1]._id,
      category: "livestock-pets",
      inStock: true,
      quantity: 50,
    },
    {
      title: "Rabbits",
      description: "Cute rabbits, great for meat or pets.",
      price: 20,
      unit: "rabbit",
      images: ["/products/rabbit.jpg"],
      farmer: users[2]._id,
      category: "livestock-pets",
      inStock: true,
      quantity: 100,
    },
  ],
  "animal-mating": [
    {
      title: "Bull Mating Service",
      description: "Stud service from a healthy bull.",
      price: 250,
      unit: "session",
      images: ["/products/bull.jpg"],
      farmer: users[0]._id,
      category: "animal-mating",
      inStock: true,
      quantity: 10,
    },
    {
      title: "Goat Mating Service",
      description: "Healthy male goats available for mating.",
      price: 100,
      unit: "session",
      images: ["/products/goat-mating.jpg"],
      farmer: users[1]._id,
      category: "animal-mating",
      inStock: true,
      quantity: 15,
    },
    {
      title: "Pig Mating Service",
      description: "Service for pig breeding.",
      price: 150,
      unit: "session",
      images: ["/products/pig-mating.jpg"],
      farmer: users[2]._id,
      category: "animal-mating",
      inStock: true,
      quantity: 20,
    },
  ],
  "ornamental-crops": [
    {
      title: "Ornamental Roses",
      description: "Bright and beautiful rose plants.",
      price: 30,
      unit: "pot",
      images: ["/products/roses.jpg"],
      farmer: users[0]._id,
      category: "ornamental-crops",
      inStock: true,
      quantity: 40,
    },
    {
      title: "Bonsai Tree",
      description: "Miniature ornamental bonsai trees.",
      price: 70,
      unit: "tree",
      images: ["/products/bonsai.jpg"],
      farmer: users[1]._id,
      category: "ornamental-crops",
      inStock: true,
      quantity: 25,
    },
    {
      title: "Hibiscus",
      description: "Colorful hibiscus flowers.",
      price: 20,
      unit: "pot",
      images: ["/products/hibiscus.jpg"],
      farmer: users[2]._id,
      category: "ornamental-crops",
      inStock: true,
      quantity: 60,
    },
  ],
  "seedlings": [
    {
      title: "Tomato Seedlings",
      description: "Healthy tomato seedlings ready to transplant.",
      price: 5,
      unit: "tray",
      images: ["/products/tomato-seedlings.jpg"],
      farmer: users[0]._id,
      category: "seedlings",
      inStock: true,
      quantity: 100,
    },
    {
      title: "Pepper Seedlings",
      description: "High-yield pepper seedlings.",
      price: 6,
      unit: "tray",
      images: ["/products/pepper-seedlings.jpg"],
      farmer: users[1]._id,
      category: "seedlings",
      inStock: true,
      quantity: 80,
    },
    {
      title: "Cucumber Seedlings",
      description: "Fast-growing cucumber seedlings.",
      price: 4,
      unit: "tray",
      images: ["/products/cucumber-seedlings.jpg"],
      farmer: users[2]._id,
      category: "seedlings",
      inStock: true,
      quantity: 120,
    },
  ],
  "services": [
    {
      title: "Farm Soil Testing",
      description: "Professional soil testing services.",
      price: 50,
      unit: "test",
      images: ["/products/soil-testing.jpg"],
      farmer: users[0]._id,
      category: "services",
      inStock: true,
      quantity: 25,
    },
    {
      title: "Crop Advisory",
      description: "Expert advice for higher yields.",
      price: 30,
      unit: "hour",
      images: ["/products/advisory.jpg"],
      farmer: users[1]._id,
      category: "services",
      inStock: true,
      quantity: 40,
    },
    {
      title: "Irrigation Setup",
      description: "Complete irrigation system installation.",
      price: 200,
      unit: "project",
      images: ["/products/irrigation.jpg"],
      farmer: users[2]._id,
      category: "services",
      inStock: true,
      quantity: 10,
    },
  ],
  "animal-pharmacy": [
    {
      title: "Vitamin Boost",
      description: "Multivitamin supplements for livestock.",
      price: 15,
      unit: "bottle",
      images: ["/products/vitamins.jpg"],
      farmer: users[0]._id,
      category: "animal-pharmacy",
      inStock: true,
      quantity: 70,
    },
    {
      title: "Dewormer Plus",
      description: "Broad spectrum dewormer.",
      price: 20,
      unit: "bottle",
      images: ["/products/dewormer.jpg"],
      farmer: users[1]._id,
      category: "animal-pharmacy",
      inStock: true,
      quantity: 50,
    },
    {
      title: "Antibiotic Shot",
      description: "Effective treatment for bacterial infections.",
      price: 25,
      unit: "dose",
      images: ["/products/antibiotic.jpg"],
      farmer: users[2]._id,
      category: "animal-pharmacy",
      inStock: true,
      quantity: 40,
    },
  ],
  "animal-accessories": [
    {
      title: "Feeding Trough",
      description: "Durable feeding troughs for livestock.",
      price: 35,
      unit: "unit",
      images: ["/products/trough.jpg"],
      farmer: users[0]._id,
      category: "animal-accessories",
      inStock: true,
      quantity: 100,
    },
    {
      title: "Water Dispenser",
      description: "Automatic water dispensers.",
      price: 45,
      unit: "unit",
      images: ["/products/water-dispenser.jpg"],
      farmer: users[1]._id,
      category: "animal-accessories",
      inStock: true,
      quantity: 80,
    },
    {
      title: "Animal Harness",
      description: "Secure and adjustable animal harness.",
      price: 20,
      unit: "unit",
      images: ["/products/harness.jpg"],
      farmer: users[2]._id,
      category: "animal-accessories",
      inStock: true,
      quantity: 60,
    },
  ],
  "animal-feeds": [
    {
      title: "Chicken Feed",
      description: "High-quality feed for poultry.",
      price: 30,
      unit: "bag",
      images: ["/products/chicken-feed.jpg"],
      farmer: users[0]._id,
      category: "animal-feeds",
      inStock: true,
      quantity: 200,
    },
    {
      title: "Goat Feed",
      description: "Nutritional feed mix for goats.",
      price: 28,
      unit: "bag",
      images: ["/products/goat-feed.jpg"],
      farmer: users[1]._id,
      category: "animal-feeds",
      inStock: true,
      quantity: 150,
    },
    {
      title: "Pig Feed",
      description: "Balanced feed for pigs.",
      price: 32,
      unit: "bag",
      images: ["/products/pig-feed.jpg"],
      farmer: users[2]._id,
      category: "animal-feeds",
      inStock: true,
      quantity: 170,
    },
  ],
  "agro-insurance": [
    {
      title: "Crop Insurance Basic",
      description: "Protects crops from loss due to weather or pests.",
      price: 100,
      unit: "policy",
      images: ["/products/insurance-crop.jpg"],
      farmer: users[0]._id,
      category: "agro-insurance",
      inStock: true,
      quantity: 50,
    },
    {
      title: "Livestock Cover",
      description: "Insures livestock against disease and theft.",
      price: 120,
      unit: "policy",
      images: ["/products/insurance-livestock.jpg"],
      farmer: users[1]._id,
      category: "agro-insurance",
      inStock: true,
      quantity: 30,
    },
    {
      title: "Farm Asset Plan",
      description: "Insurance for equipment and infrastructure.",
      price: 150,
      unit: "policy",
      images: ["/products/insurance-asset.jpg"],
      farmer: users[2]._id,
      category: "agro-insurance",
      inStock: true,
      quantity: 20,
    },
  ],
};


  // Fill in 3 mock products for each remaining category if not already present
  categories.forEach((cat, idx) => {
    if (!sampleProducts[cat]) {
      sampleProducts[cat] = [
        {
          title: `${cat.replace(/-/g, " ")} Product 1`,
          description: `Sample product 1 for ${cat}`,
          price: 100 + idx,
          unit: "unit",
          images: ["/products/sample1.jpg"],
          farmer: users[0]._id,
          category: cat,
          inStock: true,
          quantity: 10,
        },
        {
          title: `${cat.replace(/-/g, " ")} Product 2`,
          description: `Sample product 2 for ${cat}`,
          price: 200 + idx,
          unit: "unit",
          images: ["/products/sample2.jpg"],
          farmer: users[1]._id,
          category: cat,
          inStock: true,
          quantity: 20,
        },
        {
          title: `${cat.replace(/-/g, " ")} Product 3`,
          description: `Sample product 3 for ${cat}`,
          price: 300 + idx,
          unit: "unit",
          images: ["/products/sample3.jpg"],
          farmer: users[2]._id,
          category: cat,
          inStock: true,
          quantity: 30,
        },
      ];
    }
  });

  // Flatten all products for all categories
  const allProducts = categories.flatMap((cat) => sampleProducts[cat] || []);

  // Optionally clear old products
  await Product.deleteMany({});
  await Product.insertMany(allProducts);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Seeded Users, Conversations, Messages, and Products</h1>
      <ul className="list-disc pl-6">
        {users.map((u) => (
          <li key={u._id}>{u.username}</li>
        ))}
      </ul>
      <div className="mt-4">
        <h2 className="font-semibold mb-2">Seeded Categories & Products:</h2>
        <ul className="list-disc pl-6">
          {categories.map((cat) => (
            <li key={cat}>
              {cat}: {sampleProducts[cat].length} products
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}