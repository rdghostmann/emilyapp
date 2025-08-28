"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "@/lib/connectDB";
import { getSellerById } from "./seller";
import Message from "@/models/Message";

/**
 * Server action for sending a message to a seller
 */
export async function sendMessage(formData: FormData) {
  await connectToDB();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;
  const productId = formData.get("productId") as string;
  const sellerId = formData.get("sellerId") as string;

  // Debug logs
  console.log("sendMessage called:", {
    name,
    email,
    phone,
    subject,
    message,
    productId,
    sellerId,
  });

  // (Optional) Validate required fields
  if (!name || !phone || !message || !sellerId) {
    throw new Error("Missing required fields.");
  }

  // (Optional) check if seller exists
  const seller = await getSellerById(sellerId);
  if (!seller) {
    throw new Error("Seller not found.");
  }

  // Save message in DB (assuming you have a Message model)
  const newMessage = await Message.create({
    senderName: name,
    senderEmail: email,
    senderPhone: phone,
    subject,
    body: message,
    product: productId,
    seller: sellerId,
    createdAt: new Date(),
  });

  console.log("Message saved:", newMessage);

  // Revalidate the product page so UI updates if necessary
  revalidatePath(`/product/${productId}`);

  return { success: true, message: "Message sent successfully" };
}
