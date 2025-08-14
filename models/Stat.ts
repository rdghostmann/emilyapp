import mongoose, { Schema, Document, models } from "mongoose";

export interface IStat extends Document {
  views: number;
  favorites: number;
  adId: mongoose.Types.ObjectId;
}

const StatSchema = new Schema<IStat>(
  {
    views: {
      type: Number,
      default: 0,
    },
    favorites: {
      type: Number,
      default: 0,
    },
    adId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Stat = models?.Stat || mongoose.model<IStat>("Stat", StatSchema);
export default Stat;
