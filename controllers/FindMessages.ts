"use server";

import { connectToDB } from "@/lib/connectDB";
import Message from "@/models/Message";
import { isValidObjectId } from "mongoose";

export default async function FindMessages(conversationId: string) {
  if (!isValidObjectId(conversationId)) {
    throw new Error("Invalid conversation ID");
  }

  await connectToDB();

  try {
    const messages = await Message.find({ conversationId }).lean();

    return messages.map((msg: any) => ({
      id: msg._id.toString(),
      senderId: msg.senderId.toString(),
      senderName: msg.senderName,
      content: msg.content,
      timestamp: msg.timestamp,
      type: msg.type,
      productData: msg.productData ?? null,
    }));
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return [];
  }
}
