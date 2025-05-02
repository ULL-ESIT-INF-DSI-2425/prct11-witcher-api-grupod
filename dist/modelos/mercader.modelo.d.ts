import mongoose, { Document } from 'mongoose';
export interface IMerchant extends Document {
    name: string;
    location?: string;
    specialty?: string;
    createdAt: Date;
}
export declare const Merchant: mongoose.Model<IMerchant, {}, {}, {}, mongoose.Document<unknown, {}, IMerchant, {}> & IMerchant & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
