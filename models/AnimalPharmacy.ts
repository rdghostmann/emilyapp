import mongoose from "mongoose";
import { baseProductSchema } from "./baseProduct";

const animalPharmacySchema = new mongoose.Schema(
  {
    ...baseProductSchema.obj,
    attributes: {
      drugType: String,
      dosageForm: String,
      targetSpecies: [String],
      activeIngredients: [String],
      expiryDate: Date,
      storageConditions: String,
    },
  },
  { timestamps: true }
);

const AnimalPharmacy =  mongoose.models.AnimalPharmacy || mongoose.model("AnimalPharmacy", animalPharmacySchema);

export default AnimalPharmacy;