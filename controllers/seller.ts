// /controllers/seller.ts
"use server";

import mongoose from "mongoose";
import User, { IUser } from "@/models/User";
import { mapProductDocToInterface } from "@/controllers/products";
import { SellerProfile } from "@/types/seller";
import { Product } from "@/models/Product";
import { connectToDB } from "@/lib/connectDB";

export async function getSellerById(id: string): Promise<SellerProfile | null> {
  await connectToDB();

  if (!mongoose.Types.ObjectId.isValid(id)) return null;

  // Select only fields needed for SellerProfile
  const seller = await User.findById(id)
    .select(
      "_id username firstName lastName email avatar coverImage verified city state phone description specialties businessHours certifications joinedDate responseTime followers following profileViews totalSales totalAds purchases rating"
    )
    .lean<IUser & { _id: mongoose.Types.ObjectId }>();
    
  console.log("Seller:", seller);

  if (!seller) return null;

  // Fetch only 20 most recent products for this seller
  const products = await Product.find({ seller: id })
    .populate("seller", "_id name rating avatar verified totalSales totalAds")
    .sort({ createdAt: -1 })
    .limit(20)
    .lean();

  return {
    _id: seller._id.toString(),
    username: seller.username,
    firstName: seller.firstName,
    lastName: seller.lastName,
    email: seller.email,
    avatar: seller.avatar || "/placeholder.svg",
    coverImage: (seller as any).coverImage || "/placeholder.svg",
    verified: seller.verified || false,
    rating: (seller as any).rating || 0,
    location: `${seller.city || "N/A"}, ${seller.state || "N/A"}`,
    phone: seller.phone || "N/A",
    description: seller.description || "",
    specialties: (seller as any).specialties || [],
    businessHours: seller.businessHours || "",
    certifications: (seller as any).certifications || [],
    createdAt: seller.joinedDate || new Date(),
    responseTime: seller.responseTime || "N/A",
    stats: {
      followers: seller.followers || 0,
      following: seller.following || 0,
      profileViews: seller.profileViews || 0,
      totalSales: seller.totalSales || 0,
      totalAds: seller.totalAds || 0,
      purchases: seller.purchases || 0,
    },
    products: await Promise.all(products.map(mapProductDocToInterface)),
  };
}
