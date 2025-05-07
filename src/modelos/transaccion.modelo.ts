import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITransaction extends Document {
  Type: 'hunter' | 'merchant';
  name_transactor: string;
  goods: { good: string; quantity: number }[];
  totalAmount: number;
  date: string;
  hour: string;
}

const TransactionSchema = new Schema<ITransaction>({
  Type: {
    type: String,
    enum: ['hunter', 'merchant'],
    required: true
  },
  name_transactor: { type: String, required: true },
  goods: [
    {
      good: { type: String, required: true, ref: 'Good' },
      quantity: { type: Number, required: true, min: 1 }
    }
  ],
  totalAmount: { type: Number, required: true, min: 0 },
  date: { type: String, required: true },
  hour: { type: String, required: true }
});

export const Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema);
