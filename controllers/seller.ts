"use server"

import mongoose from "mongoose"
import User, { IUser } from "@/models/User"
import { mapProductDocToInterface } from "@/controllers/products" // reuse our mapper
import { SellerProfile } from "@/types/seller"
import { Product } from "@/models/Product"
import { connectToDB } from "@/lib/connectDB"

export async function getSellerById(id: string): Promise<SellerProfile | null> {
  await connectToDB()
  if (!mongoose.Types.ObjectId.isValid(id)) return null

  type LeanUser = Omit<IUser, keyof mongoose.Document> & { _id: mongoose.Types.ObjectId }
  const seller = await User.findById(id).lean<LeanUser>()
  if (!seller) return null

  const products = await Product.find({ seller: id })
    .populate("seller", "name rating")
    .sort({ createdAt: -1 })
    .lean()

  return {
    _id: seller._id.toString(),
    username: seller.username,
    firstName: seller.firstName,
    lastName: seller.lastName,
    email: seller.email,
    avatar: seller.avatar || "/placeholder.svg",
    coverImage: (seller as any).coverImage || "/placeholder.svg",
    verified: seller.verified,
    rating: (seller as any).rating || 0,
    location: `${seller.city}, ${seller.state}`,
    phone: seller.phone,
    description: seller.description,
    specialties: (seller as any).specialties || [],
    businessHours: seller.businessHours,
    certifications: (seller as any).certifications || [],
    createdAt: seller.joinedDate,
    responseTime: seller.responseTime,
    stats: {
      followers: seller.followers,
      following: seller.following,
      profileViews: seller.profileViews,
      totalSales: seller.totalSales,
      totalAds: seller.totalAds,
      purchases: seller.purchases,
    },
  products: await Promise.all(products.map(mapProductDocToInterface)), // ✅ fix
  }
}
