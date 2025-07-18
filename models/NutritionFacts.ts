// import mongoose, { Schema } from "mongoose";

// export const NutritionFactsSchema = new Schema(
//   {
//     calories: Number,
//     protein: String,
//     carbs: String,
//     fiber: String,
//     vitaminC: String,
//   },
//   { _id: false }
// );

// const NutritionFacts = mongoose.models.NutritionFacts || mongoose.model('NutritionFacts', NutritionFactsSchema);
// export default NutritionFacts;

import { Schema } from "mongoose";

export const NutritionFactsSchema = new Schema(
  {
    calories: Number,
    protein: String,
    carbs: String,
    fiber: String,
    vitaminC: String,
  },
  { _id: false }
);
