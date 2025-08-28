"use server"
import User, { IUser } from "@/models/User";
import { connectToDB } from "@/lib/connectDB";

export async function getUserById(id: string) {
  await connectToDB();
  if (!id) return null;

  // Use findById to get a single user document
  const userDoc = await User.findById(id).lean<IUser>();

  if (!userDoc) return null;

  // Map to a clean user object for your profile page
  return {
    id: userDoc._id.toString(),
    username: userDoc.username,
    email: userDoc.email,
    phone: userDoc.phone || "",
    location: [userDoc.city, userDoc.state, userDoc.country].filter(Boolean).join(", "),
    avatar: userDoc.avatar || "/placeholder.svg",
    verified: userDoc.verified || false,
    rating: 0,
    totalSales: userDoc.totalSales || 0,
    totalPurchases: userDoc.purchases || 0,
    memberSince: userDoc.joinedDate
      ? new Date(userDoc.joinedDate).toLocaleString("default", { month: "long", year: "numeric" })
      : "",
    favoriteCount: 0,
    activeAds: Array.isArray(userDoc.listedProducts) ? userDoc.listedProducts.length : 0,
  };
}