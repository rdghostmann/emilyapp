import mongoose, { Schema, Document, model } from "mongoose";

export interface IMessage extends Document {
  senderName: string;
  senderEmail?: string;
  senderPhone: string;
  subject?: string;
  body: string;
  product: mongoose.Types.ObjectId;
  seller: mongoose.Types.ObjectId;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    senderName: { type: String, required: true },
    senderEmail: { type: String },
    senderPhone: { type: String, required: true },
    subject: { type: String },
    body: { type: String, required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Message = mongoose.models.Message || model<IMessage>("Message", MessageSchema);

export default Message;
