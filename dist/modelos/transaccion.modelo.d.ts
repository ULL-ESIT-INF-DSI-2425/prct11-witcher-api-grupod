import mongoose, { Document } from 'mongoose';
export interface ITransaction extends Document {
    Type: 'hunter' | 'merchant';
    name_transactor: string;
    totalAmount: number;
    date: string;
    hour: string;
}
export declare const Transaction: mongoose.Model<ITransaction, {}, {}, {}, mongoose.Document<unknown, {}, ITransaction, {}> & ITransaction & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
