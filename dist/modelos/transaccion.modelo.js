import mongoose, { Schema } from 'mongoose';
const TransactionSchema = new Schema({
    Type: {
        type: String,
        enum: ['hunter', 'merchant'],
        required: true
    },
    name_transactor: { type: String, required: true },
    //goods: [
    //  {
    //    good: { type: Schema.Types.ObjectId, required: true, ref: 'Good' },
    //    quantity: { type: Number, required: true, min: 1 }
    //  }
    //],
    totalAmount: { type: Number, required: true, min: 0 },
    date: { type: String, required: true },
    hour: { type: String, required: true }
});
export const Transaction = mongoose.model('Transaction', TransactionSchema);
