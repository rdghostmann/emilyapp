import mongoose from "mongoose";
import { baseProductSchema } from "./baseProduct";

const foodFruitVegSchema = new mongoose.Schema(
  {
    ...baseProductSchema.obj,
    attributes: {
      foodType: String,
      variety: String,
      quantity: String,
      harvestDate: Date,
      shelfLife: String,
    },
  },
  { timestamps: true }
);

const FoodFruitVegetable =  mongoose.models.FoodFruitVegetable || mongoose.model("FoodFruitVegetable", foodFruitVegSchema);

export default FoodFruitVegetable;