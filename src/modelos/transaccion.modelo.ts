import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITransaction extends Document {
  buyerType: 'hunter' | 'merchant';
  buyer: Types.ObjectId;
  goods: { good: Types.ObjectId; quantity: number }[];
  totalAmount: number;
  date: Date;
}

const TransactionSchema = new Schema<ITransaction>({
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

export const Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema);
