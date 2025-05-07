// File: src/modelos/mercader.modelo.ts
import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interfaz que define la estructura de un mercader.
 * @interface IMerchant
 * @property {string} name - Nombre del mercader.
 * @property {string} [location] - Ubicación del mercader.
 * @property {string} [specialty] - Especialidad del mercader.
 * @property {Date} createdAt - Fecha de creación del mercader.
 */
export interface IMerchant extends Document {
  name: string;
  location?: string;
  specialty?: string;
  createdAt: Date;
}

/**
 * Esquema de Mongoose para un mercader.
 * @type {Schema}
 * @property {string} name - Nombre del mercader.
 * @property {string} [location] - Ubicación del mercader.
 * @property {string} [specialty] - Especialidad del mercader.
 * @property {Date} createdAt - Fecha de creación del mercader.
  */
const MerchantSchema = new Schema<IMerchant>({
  name: { type: String, required: true, trim: true },
  location: { type: String },
  specialty: { type: String },
  createdAt: { type: Date, default: Date.now }
});

/**
 * Exporta el modelo de Mongoose para un mercader.
 * @type {Model<IMerchant>}
 */
export const Merchant = mongoose.model<IMerchant>('Merchant', MerchantSchema);
