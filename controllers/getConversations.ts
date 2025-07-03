"use server";
import { connectToDB } from "@/lib/connectDB";
import Conversation from "@/models/Conversation";

export default async function getConversations(userId: string) {
  await connectToDB();
  // Find conversations where user is a participant and populate user info
  const conversations = await Conversation.find({ participants: userId })
    .populate("participants")
    .lean();

  return conversations.map((conv: any) => ({
    id: conv._id.toString(),
    users: Array.isArray(conv.participants)
      ? conv.participants.map((u: any) => ({
          id: u?._id?.toString() || "",
          name: u?.username || "",
          avatar: u?.avatar || "",
          online: true, // You can implement real online status if needed
        }))
      : [],
    lastMessage: conv.lastMessage || "",
    unread: conv.unreadCount || 0,
    product: conv.productId ? conv.productId.toString() : null,
    timestamp: conv.updatedAt ? new Date(conv.updatedAt).toISOString() : "",
  }));
}