import mongoose, { Document } from 'mongoose';
export interface IGood extends Document {
    name: string;
    description?: string;
    price: number;
    stock: number;
}
export declare const Good: mongoose.Model<IGood, {}, {}, {}, mongoose.Document<unknown, {}, IGood, {}> & IGood & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
