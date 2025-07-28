import mongoose, { Schema, Document, Types } from "mongoose";

export interface IConversation extends Document {
  participants: Types.ObjectId[]; // Array of User IDs
  productId?: Types.ObjectId;     // Optional: reference to Product
  lastMessage?: string;
  unreadCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const ConversationSchema = new Schema<IConversation>(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    lastMessage: {
      type: String,
    },
    unreadCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Optional: index for faster querying by participant
ConversationSchema.index({ participants: 1, updatedAt: -1 });

const Conversation =
  mongoose.models.Conversation ||
  mongoose.model<IConversation>("Conversation", ConversationSchema);

export default Conversation;
