import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    location: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
      required: true,
      enum: [
        "Animal Mating",
        "Animal Pharmacy",
        "Animal Feed",
        "Livestock / Pet",
        "Fruit & Vegetables",
      ],
    },
    subcategory: {
      type: String,
      required: true,
      enum: [
        // Animal Mating
        "Cattle Mating",
        "Goat Mating",
        "Sheep Mating",
        "Pig Mating",
        "Poultry Mating",
        "Fish Breeding",

        // Animal Pharmacy
        "Veterinary Drugs",
        "Supplements & Vitamins",
        "Vaccines",
        "Animal First Aid",
        "Dewormers",

        // Animal Feed
        "Cattle Feed",
        "Goat Feed",
        "Sheep Feed",
        "Pig Feed",
        "Poultry Feed",
        "Fish Feed",
        "Pet Food",

        // Livestock / Pet and Food
        "Cattle",
        "Goat",
        "Sheep",
        "Pig",
        "Poultry",
        "Fish",
        "Dogs",
        "Cats",
        "Rabbits",

        // Fruit & Vegetables
        "Fresh Fruits",
        "Fresh Vegetables",
        "Seeds & Seedlings",
      ],
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    boosted: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },

    // Flexible field for category/subcategory-specific attributes
    attributes: Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
);

const Product =  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
