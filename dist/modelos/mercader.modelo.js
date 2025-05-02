import mongoose, { Schema } from 'mongoose';
const MerchantSchema = new Schema({
    name: { type: String, required: true, trim: true },
    location: { type: String },
    specialty: { type: String },
    createdAt: { type: Date, default: Date.now }
});
export const Merchant = mongoose.model('Merchant', MerchantSchema);
