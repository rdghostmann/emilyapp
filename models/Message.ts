import mongoose, { Schema, Document } from "mongoose"

export interface IMessage extends Document {
  conversationId: string
  senderId: string
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
    title: { type: String, required: true },
    price: { type: Number, required: true },
    unit: { type: String, required: true },
    image: { type: String, required: true },
  },
  { _id: false }
)

const MessageSchema = new Schema<IMessage>(
  {
    conversationId: { type: String, required: true },
    senderId: { type: String, required: true },
    senderName: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    type: { type: String, enum: ["text", "image", "product"], default: "text" },
    productData: { type: ProductDataSchema, required: false },
  },
  { timestamps: true }
)

const Message = mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema)
export default Message