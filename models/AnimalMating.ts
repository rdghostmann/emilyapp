import mongoose from "mongoose";
import { baseProductSchema } from "./baseProduct";

const animalMatingSchema = new mongoose.Schema(
  {
    ...baseProductSchema.obj,
    attributes: {
      species: { type: String, required: true },
      breed: String,
      age: Number,
      healthStatus: String,
      matingType: { type: String, enum: ["Natural service", "Artificial insemination"] },
      availabilityDates: {
        start: Date,
        end: Date,
      },
      eggFertilityRate: Number,
      quantityAvailable: Number,
      collectionDate: Date,
    },
  },
  { timestamps: true }
);

const AnimalMating =  mongoose.models.AnimalMating || mongoose.model("AnimalMating", animalMatingSchema);

export default AnimalMating;
