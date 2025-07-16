import mongoose, { Schema, Document, Types } from "mongoose";

const OrderSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    totalAmount: Number,
    escrowAmount: Number, // 10% to Escrow
    sellerPayout: Number, // 90%
    status: {
        type: String,
        enum: ['pending', 'paid', 'delivered', 'disputed', 'resolved'],
        default: 'pending'
    },
    paymentProof: String, // transaction ID or receipt
    confirmedDelivery: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
});

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
export default Order;
