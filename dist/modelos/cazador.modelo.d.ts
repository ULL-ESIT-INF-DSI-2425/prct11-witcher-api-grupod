/**import { Schema, model } from 'mongoose';

const HunterSchema = new Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true },
  specialization: { type: String }
});

export const Hunter = model('Hunter', HunterSchema);
*/
import mongoose, { Document } from 'mongoose';
export interface IHunter extends Document {
    name: string;
    level: number;
    specialization?: string;
    origin?: string;
    createdAt?: Date;
}
export declare const Hunter: mongoose.Model<IHunter, {}, {}, {}, mongoose.Document<unknown, {}, IHunter, {}> & IHunter & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
