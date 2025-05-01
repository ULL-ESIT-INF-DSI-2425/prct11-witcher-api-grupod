import mongoose, { Schema, Document } from 'mongoose';

export interface IGood extends Document {
  name: string;
  description?: string;
  price: number;
  stock: number;
}

const GoodSchema = new Schema<IGood>({
  name: { type: String, required: true, trim: true },
  description: { type: String },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 }
});

export const Good = mongoose.model<IGood>('Good', GoodSchema);
