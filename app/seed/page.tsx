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

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Seeded Users, Conversations, and Messages</h1>
      <ul className="list-disc pl-6">
        {users.map((u) => (
          <li key={u._id}>{u.username}</li>
        ))}
      </ul>
    </div>
  );
}