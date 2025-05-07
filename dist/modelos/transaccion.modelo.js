// File: src/modelos/transaccion.modelo.ts
import mongoose, { Schema } from 'mongoose';
/**
 * Esquema de Mongoose para la colección de transacciones.
 * Define la estructura y validaciones de los documentos de transacción.
 * @property {string} Type - Tipo de transacción, puede ser 'hunter' o 'merchant'.
 * @property {string} name_transactor - Nombre del transactor (cazador o comerciante).
 * @property {Array<{ good: string; quantity: number }>} goods - Lista de bienes
 * y cantidades asociados a la transacción.
 * @property {number} totalAmount - Monto total de la transacción.
 * @property {string} date - Fecha de la transacción.
 * @property {string} hour - Hora de la transacción.
 */
const TransactionSchema = new Schema({
    Type: {
        type: String,
        enum: ['hunter', 'merchant'],
        required: true
    },
    name_transactor: { type: String, required: true },
    goods: [
        {
            good: { type: String, required: true, ref: 'Good' },
            quantity: { type: Number, required: true, min: 1 }
        }
    ],
    totalAmount: { type: Number, required: true, min: 0 },
    date: { type: String, required: true },
    hour: { type: String, required: true }
});
/**
 * Exporta el modelo de transacción basado en el esquema definido.
 * @type {mongoose.Model<ITransaction>}
 */
export const Transaction = mongoose.model('Transaction', TransactionSchema);
