import { Request, Response } from 'express';
export declare const getAllHunters: (req: Request, res: Response) => Promise<void>;
export declare const createHunter: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
