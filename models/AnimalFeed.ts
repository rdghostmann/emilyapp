import mongoose from "mongoose";
import { baseProductSchema } from "./baseProduct";

const animalFeedSchema = new mongoose.Schema(
  {
    ...baseProductSchema.obj,
    attributes: {
      feedType: String,
      species: [String],
      weight: String,
      ingredients: [String],
      nutritionalContent: {
        protein: String,
        fiber: String,
        fat: String,
      },
      expiryDate: Date,
    },
  },
  { timestamps: true }
);

const AnimalFeed =  mongoose.models.AnimalFeed || mongoose.model("AnimalFeed", animalFeedSchema);

export default AnimalFeed;