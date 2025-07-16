import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  permissions: [String], // e.g., ['resolveDispute', 'manageUsers']
});

// Prevent model overwrite issue in dev
const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
export default Admin;

