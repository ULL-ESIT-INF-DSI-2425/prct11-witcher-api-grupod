import mongoose, { Schema, Document } from 'mongoose';

export interface IMerchant extends Document {
  name: string;
  location?: string;
  specialty?: string;
  createdAt: Date;
}

const MerchantSchema = new Schema<IMerchant>({
  name: { type: String, required: true, trim: true },
  location: { type: String },
  specialty: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const Merchant = mongoose.model<IMerchant>('Merchant', MerchantSchema);
