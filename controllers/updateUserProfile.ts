"use server"
import User from "@/models/User";
import { connectToDB } from "@/lib/connectDB";

// Server Action to update user profile
export async function updateUser(id: string, data: {
  firstName?: string;
  lastName?: string;
  description?: string;
  businessHours?: string;
  responseTime?: string;
  phone?: string;
  country?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}) {
  await connectToDB();
  if (!id) return { success: false, message: "No user ID provided" };

  try {
    const user = await User.findById(id);
    if (!user) return { success: false, message: "User not found" };

    // Update fields
    if (data.firstName !== undefined) user.firstName = data.firstName;
    if (data.lastName !== undefined) user.lastName = data.lastName;
    if (data.description !== undefined) user.description = data.description;
    if (data.businessHours !== undefined) user.businessHours = data.businessHours;
    if (data.responseTime !== undefined) user.responseTime = data.responseTime;
    if (data.phone !== undefined) user.phone = data.phone;
    if (data.country !== undefined) user.country = data.country;
    if (data.city !== undefined) user.city = data.city;
    if (data.state !== undefined) user.state = data.state;
    if (data.zipCode !== undefined) user.zipCode = data.zipCode;

    await user.save();

    return { success: true, message: "Profile updated" };
  } catch (error) {
    return { success: false, message: "Update failed", error: error instanceof Error ? error.message : error };
  }
}