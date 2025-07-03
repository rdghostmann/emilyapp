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

  const sampleProducts = {
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
    // Add 3 products for each remaining category as needed...
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