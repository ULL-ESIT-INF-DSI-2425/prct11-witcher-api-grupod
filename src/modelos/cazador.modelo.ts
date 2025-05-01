/**import { Schema, model } from 'mongoose';

const HunterSchema = new Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true },
  specialization: { type: String }
});

export const Hunter = model('Hunter', HunterSchema);
*/

import mongoose, { Schema, Document } from 'mongoose';

export interface IHunter extends Document {
  name: string;
  level: number;
  specialization?: string;
  origin?: string;
  createdAt: Date;
}

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

export const Hunter = mongoose.model<IHunter>('Hunter', HunterSchema);
