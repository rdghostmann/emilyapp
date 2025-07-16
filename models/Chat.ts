import mongoose, { Schema, Document, Types } from "mongoose";

const ChatSchema = new mongoose.Schema({
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  ],
  messages: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      content: String,
      timestamp: { type: Date, default: Date.now }
    }
  ],
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  createdAt: { type: Date, default: Date.now }
});

const Chat = mongoose.models.Chat || mongoose.model('Chat', ChatSchema);
export default Chat
