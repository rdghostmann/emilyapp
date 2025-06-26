import mongoose from "mongoose";

const CategoryPropertySchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    values: { type: [String], default: [] },
  },
  { _id: false }
);

const CategoryDetailSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    properties: { type: [CategoryPropertySchema], default: [] },
  },
  { timestamps: true }
);

const CategoryDetail =
  mongoose.models?.CategoryDetail || mongoose.model("CategoryDetail", CategoryDetailSchema);

export default CategoryDetail;