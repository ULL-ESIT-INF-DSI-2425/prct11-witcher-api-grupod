import mongoose, { Document } from 'mongoose';
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
 * Exporta el modelo de Mongoose para un mercader.
 * @type {Model<IMerchant>}
 */
export declare const Merchant: mongoose.Model<IMerchant, {}, {}, {}, mongoose.Document<unknown, {}, IMerchant, {}> & IMerchant & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
