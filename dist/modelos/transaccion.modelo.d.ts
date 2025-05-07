import mongoose, { Document } from 'mongoose';
/**
 * Interface para definir la estructura de un objeto transacción.
 * @property {string} Type - Tipo de transacción, puede ser 'hunter' o 'merchant'.
 * @property {string} name_transactor - Nombre del transactor (cazador o comerciante).
 * @property {Array<{ good: string; quantity: number }>} goods - Lista de bienes
 * y cantidades asociados a la transacción.
 * @property {number} totalAmount - Monto total de la transacción.
 * @property {string} date - Fecha de la transacción.
 * @property {string} hour - Hora de la transacción.
 */
export interface ITransaction extends Document {
    Type: 'hunter' | 'merchant';
    name_transactor: string;
    goods: {
        good: string;
        quantity: number;
    }[];
    totalAmount: number;
    date: string;
    hour: string;
}
/**
 * Exporta el modelo de transacción basado en el esquema definido.
 * @type {mongoose.Model<ITransaction>}
 */
export declare const Transaction: mongoose.Model<ITransaction, {}, {}, {}, mongoose.Document<unknown, {}, ITransaction, {}> & ITransaction & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
