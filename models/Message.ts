import mongoose, { Schema, Document, Types } from "mongoose"

export interface IMessage extends Document {
  conversationId: Types.ObjectId
  senderId: Types.ObjectId
  senderName: string
  content: string
  timestamp: Date
  type: "text" | "image" | "product"
  productData?: {
    title: string
    price: number
    unit: string
    image: string
  }
}

const ProductDataSchema = new Schema(
  {
    title: String,
    price: Number,
    unit: String,
    image: String,
  },
  { _id: false }
);

const MessageSchema = new Schema<IMessage>(
  {
    conversationId: { type: Schema.Types.ObjectId, ref: "Conversation", required: true },
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    senderName: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    type: { type: String, enum: ["text", "image", "product"], default: "text" },
    productData: { type: ProductDataSchema, required: false },
  },
  { timestamps: true }
);

// Fix the model export
const Message = mongoose.models?.Message || mongoose.model<IMessage>("Message", MessageSchema);
export default Message;