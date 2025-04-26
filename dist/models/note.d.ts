import { Document } from 'mongoose';
interface NoteDocumentInterface extends Document {
    title: string;
    body: string;
    color?: 'blue' | 'green' | 'red' | 'yellow' | 'magenta';
}
export declare const Note: import("mongoose").Model<NoteDocumentInterface, {}, {}, {}, Document<unknown, {}, NoteDocumentInterface, {}> & NoteDocumentInterface & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export {};
