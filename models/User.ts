import mongoose, { Schema, Document, models } from "mongoose";

export interface IUser extends Document {
  userID: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  description?: string;
  businessHours?: string;
  avatar: string;
  verified: boolean;
  role: "user" | "admin";
  status: "active" | "inactive";
  listedProducts: mongoose.Types.ObjectId[];
  walletBalance: number;
  reviews: mongoose.Types.ObjectId[]; // replaced single seller ref
  joinedDate: Date;
  totalSales: number;
  totalAds: number;
  purchases: number;
  profileViews: number;
  followers: number;
  following: number;
  responseTime: string;
  phone: string;
  country: string;
  city: string;
  state: string;
  zipCode: string;
}

const UserSchema = new Schema<IUser>(
  {
    userID: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: { type: String, required: [true, "Password is required"] },
    description: { type: String, default: "" },
    businessHours: { type: String, default: "" },
    avatar: { type: String, default: "" },
    verified: { type: Boolean, default: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    listedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    walletBalance: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    joinedDate: { type: Date, default: Date.now },
    totalSales: { type: Number, default: 0 },
    totalAds: { type: Number, default: 0 },
    purchases: { type: Number, default: 0 },
    profileViews: { type: Number, default: 0 },
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
    responseTime: { type: String, default: "" },
    phone: { type: String, default: "" },
    country: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    zipCode: { type: String, default: "" },
  },
  { timestamps: true }
);

// Prevent model overwrite in dev
const User = models?.User || mongoose.model<IUser>("User", UserSchema);
export default User;
