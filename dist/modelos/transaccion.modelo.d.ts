import mongoose, { Document, Types } from 'mongoose';
export interface ITransaction extends Document {
    buyerType: 'hunter' | 'merchant';
    buyer: Types.ObjectId;
    goods: {
        good: Types.ObjectId;
        quantity: number;
    }[];
    totalAmount: number;
    date: Date;
}
export declare const Transaction: mongoose.Model<ITransaction, {}, {}, {}, mongoose.Document<unknown, {}, ITransaction, {}> & ITransaction & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
