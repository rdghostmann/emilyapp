import mongoose, { Schema, Document, models } from "mongoose";

const UserSchema = new Schema(
  {
    userID: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isVerified: { type: Boolean, default: false },
    kycDocuments: {
      type: Map,
      of: String
    },
    role: {
      type: String,
      enum: ["user", "buyer", "seller", "farmer", "superAdmin", "admin", "buyer", "seller"],
      default: "farmer",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    listedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    walletBalance: { type: Number, default: 0 },
  avatar: {
  type: String,
  default: "", // not false
},
    joinDate: {
      type: Date,
      default: Date.now,
    },
 phone: {
  type: String,
  default: "",
},
  country: {
  type: String,
  default: "",
},
  state: {
  type: String,
  default: "",
},
  zipCode: {
  type: String,
  default: "",
},
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite issue in dev
const User = models?.User || mongoose.model("User", UserSchema);
export default User;
