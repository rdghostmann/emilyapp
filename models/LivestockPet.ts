import mongoose from "mongoose";
import { baseProductSchema } from "./baseProduct";

const livestockPetSchema = new mongoose.Schema(
  {
    ...baseProductSchema.obj,
    attributes: {
      species: String,
      breed: String,
      age: String,
      gender: String,
      healthStatus: String,
    },
  },
  { timestamps: true }
);

const LivestockPet =  mongoose.models.LivestockPet || mongoose.model("LivestockPet", livestockPetSchema);

export default LivestockPet;