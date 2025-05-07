import mongoose, { Document } from 'mongoose';
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
export declare const Hunter: mongoose.Model<IHunter, {}, {}, {}, mongoose.Document<unknown, {}, IHunter, {}> & IHunter & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
