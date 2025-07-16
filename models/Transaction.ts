import mongoose, { Schema, Document, models } from "mongoose";

const TransactionSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amountPaid: Number,
  escrowFee: Number, // 10%
  payoutToSeller: Number,
  status: {
    type: String,
    enum: ['pending', 'held', 'released', 'refunded'],
    default: 'pending'
  },
  paymentDate: Date,
  releaseDate: Date,
  dispute: {
    isOpen: Boolean,
    reason: String,
    openedAt: Date
  }
});

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
export default Transaction;
