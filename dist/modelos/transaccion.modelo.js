import mongoose, { Schema } from 'mongoose';
const TransactionSchema = new Schema({
    buyerType: {
        type: String,
        enum: ['hunter', 'merchant'],
        required: true
    },
    buyer: { type: Schema.Types.ObjectId, required: true, refPath: 'buyerType' },
    goods: [
        {
            good: { type: Schema.Types.ObjectId, ref: 'Good', required: true },
            quantity: { type: Number, required: true, min: 1 }
        }
    ],
    totalAmount: { type: Number, required: true, min: 0 },
    date: { type: Date, default: Date.now }
});
export const Transaction = mongoose.model('Transaction', TransactionSchema);
