import { Schema } from 'mongoose';
export declare const Hunter: import("mongoose").Model<{
    name: string;
    level: number;
    specialization?: string | null | undefined;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    name: string;
    level: number;
    specialization?: string | null | undefined;
}, {}> & {
    name: string;
    level: number;
    specialization?: string | null | undefined;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
    level: number;
    specialization?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
    level: number;
    specialization?: string | null | undefined;
}>, {}> & import("mongoose").FlatRecord<{
    name: string;
    level: number;
    specialization?: string | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
