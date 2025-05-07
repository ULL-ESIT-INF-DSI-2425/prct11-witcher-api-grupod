// Archivo: src/modelos/bien.modelo.ts
import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interfaz que representa un bien.
 * @interface IGood
 * @property {string} name - Nombre del bien.
 * @property {string} [description] - Descripción del bien.
 * @property {number} price - Precio del bien.
 * @property {number} stock - Cantidad en stock del bien.
 */
export interface IGood extends Document {
  name: string;
  description?: string;
  price: number;
  stock: number;
}

/**
 * Esquema de Mongoose para un bien.
 * @type {Schema}
 * @property {string} name - Nombre del bien.
 * @property {string} [description] - Descripción del bien.
 * @property {number} price - Precio del bien.
 * @property {number} stock - Cantidad en stock del bien.
 */
const GoodSchema = new Schema<IGood>({
  name: { type: String, required: true, trim: true },
  description: { type: String },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 }
});

/**
 * Exporta el modelo de Mongoose para un bien.
 * @type {mongoose.Model<IGood>}
 */
export const Good = mongoose.model<IGood>('Good', GoodSchema);
