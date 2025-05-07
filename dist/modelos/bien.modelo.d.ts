import mongoose, { Document } from 'mongoose';
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
 * Exporta el modelo de Mongoose para un bien.
 * @type {mongoose.Model<IGood>}
 */
export declare const Good: mongoose.Model<IGood, {}, {}, {}, mongoose.Document<unknown, {}, IGood, {}> & IGood & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
