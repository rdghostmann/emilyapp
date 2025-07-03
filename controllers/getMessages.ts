"use server";
import { connectToDB } from "@/lib/connectDB";
import Message from "@/models/Message";

export default async function getMessages(conversationId: string) {
  await connectToDB();
  const messages = await Message.find({ conversationId }).lean();
  return messages.map((msg: any) => ({
    id: msg._id.toString(),
    senderId: msg.senderId.toString(),
    senderName: msg.senderName,
    content: msg.content,
    timestamp: msg.timestamp,
    type: msg.type,
    productData: msg.productData,
  }));
}