import { Schema, model } from 'mongoose';

const HunterSchema = new Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true },
  specialization: { type: String }
});

export const Hunter = model('Hunter', HunterSchema);
