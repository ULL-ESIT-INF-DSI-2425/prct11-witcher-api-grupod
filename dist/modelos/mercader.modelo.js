// File: src/modelos/mercader.modelo.ts
import mongoose, { Schema } from 'mongoose';
/**
 * Esquema de Mongoose para un mercader.
 * @type {Schema}
 * @property {string} name - Nombre del mercader.
 * @property {string} [location] - Ubicación del mercader.
 * @property {string} [specialty] - Especialidad del mercader.
 * @property {Date} createdAt - Fecha de creación del mercader.
  */
const MerchantSchema = new Schema({
    name: { type: String, required: true, trim: true },
    location: { type: String },
    specialty: { type: String },
    createdAt: { type: Date, default: Date.now }
});
/**
 * Exporta el modelo de Mongoose para un mercader.
 * @type {Model<IMerchant>}
 */
export const Merchant = mongoose.model('Merchant', MerchantSchema);
