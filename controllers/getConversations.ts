"use server";
import { connectToDB } from "@/lib/connectDB";
import Conversation from "@/models/Conversation";
import { Types } from "mongoose";

interface PopulatedUser {
  _id: Types.ObjectId;
  username: string;
  avatar?: string;
}

interface RawConversation {
  _id: Types.ObjectId;
  participants: PopulatedUser[];
  lastMessage?: string;
  unreadCount?: number;
  productId?: Types.ObjectId;
  updatedAt?: Date;
}

interface MappedConversation {
  id: string;
  users: {
    id: string;
    name: string;
    avatar: string;
    online: boolean;
  }[];
  lastMessage: string;
  unread: number;
  product: string | null;
  timestamp: string;
}

export default async function getConversations(userId: string): Promise<MappedConversation[]> {
  await connectToDB();

  const conversations = await Conversation.find({ participants: userId })
    .populate<{ participants: PopulatedUser[] }>("participants")
    .lean<RawConversation[]>();

  return conversations.map((conv) => ({
    id: conv._id.toString(),
    users: conv.participants.map((u) => ({
      id: u._id.toString(),
      name: u.username || "",
      avatar: u.avatar || "",
      online: true,
    })),
    lastMessage: conv.lastMessage || "",
    unread: conv.unreadCount || 0,
    product: conv.productId ? conv.productId.toString() : null,
    timestamp: conv.updatedAt ? conv.updatedAt.toISOString() : "",
  }));
}
