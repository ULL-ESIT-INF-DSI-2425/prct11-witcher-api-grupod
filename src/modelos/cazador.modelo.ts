// File: prct11-witcher-api-grupod/src/modelos/cazador.modelo.ts
import mongoose, { Schema, Document } from 'mongoose';

/**
 * Modelo de Cazador
 * @interface IHunter
 * @property {string} name - Nombre del cazador
 * @property {number} level - Nivel del cazador
 * @property {string} [specialization] - Especialización del cazador
 * @property {string} [origin] - Origen del cazador
 * @property {Date} createdAt - Fecha de creación del cazador
 * @description Este modelo representa a un cazador en el juego, incluyendo su nombre, nivel, especialización y origen.
 */
export interface IHunter extends Document {
  name: string;
  level: number;
  specialization?: string;
  origin?: string;
  createdAt: Date;
}

/**
 * Esquema de Cazador
 * @type {Schema}
 * @description Este esquema define la estructura de un cazador en la base de datos.
 */
const HunterSchema: Schema = new Schema<IHunter>({
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

/**
 * Exporta el modelo de Cazador
 * @type {Model<IHunter>}
 * @description Este modelo se utiliza para interactuar con la colección de cazadores en la base de datos.
 */
export const Hunter = mongoose.model<IHunter>('Hunter', HunterSchema);
