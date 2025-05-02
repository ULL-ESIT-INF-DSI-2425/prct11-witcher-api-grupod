import mongoose, { Schema } from 'mongoose';
const GoodSchema = new Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 }
});
export const Good = mongoose.model('Good', GoodSchema);
