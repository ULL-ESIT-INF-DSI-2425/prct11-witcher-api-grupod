// File: prct11-witcher-api-grupod/src/modelos/cazador.modelo.ts
import mongoose, { Schema } from 'mongoose';
/**
 * Esquema de Cazador
 * @type {Schema}
 * @description Este esquema define la estructura de un cazador en la base de datos.
 */
const HunterSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
        maxlength: [50, 'El nombre no puede exceder los 50 caracteres']
    },
    level: {
        type: Number,
        required: [true, 'El nivel es obligatorio'],
        min: [1, 'El nivel mínimo es 1'],
        max: [100, 'El nivel máximo es 100']
    },
    specialization: {
        type: String,
        enum: ['espadas', 'arco', 'magia', 'alquimia', 'sigilo'],
        default: 'espadas'
    },
    origin: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
export const Hunter = mongoose.model('Hunter', HunterSchema);
