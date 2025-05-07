// Archivo: src/modelos/bien.modelo.ts
import mongoose, { Schema } from 'mongoose';
/**
 * Esquema de Mongoose para un bien.
 * @type {Schema}
 * @property {string} name - Nombre del bien.
 * @property {string} [description] - Descripción del bien.
 * @property {number} price - Precio del bien.
 * @property {number} stock - Cantidad en stock del bien.
 */
const GoodSchema = new Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 }
});
/**
 * Exporta el modelo de Mongoose para un bien.
 * @type {mongoose.Model<IGood>}
 */
export const Good = mongoose.model('Good', GoodSchema);
