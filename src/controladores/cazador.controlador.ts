import { Request, Response } from 'express';
import { Hunter } from '../modelos/cazador.modelo.js';

export const getAllHunters = async (req: Request, res: Response) => {
  try {
    const hunters = await Hunter.find();
    res.json(hunters);
  } catch (error) {
    res.status(500).json({ message: 'Error buscando cazadores' });
  }
};
// POST: crear un cazador nuevo

export const createHunter = async (req: Request, res: Response): Promise<Response | undefined> => {
    try {
      const { name, level, specialization } = req.body;
  
      if (!name || !level) {
        return res.status(400).json({ message: 'Nombre y nivel son obligatorios' });
      }
  
      const newHunter = new Hunter({ name, level, specialization });
      const savedHunter = await newHunter.save();
  
      res.status(201).json(savedHunter);
    } catch (error) {
      res.status(500).json({ message: 'Error creando cazador' });
    }
};

// GET /hunters/:id
export const getHunterById = async (req: Request, res: Response) => {
  // TODO: Obtener cazador por ID
};

// GET /hunters/search/by-name?name=...
export const getHunterByName = async (req: Request, res: Response) => {
  // TODO: Obtener cazador por nombre
};

// PUT /hunters/:id
export const updateHunterById = async (req: Request, res: Response) => {
  // TODO: Actualizar cazador por ID
};

// PUT /hunters/search/by-name?name=...
export const updateHunterByName = async (req: Request, res: Response) => {
  // TODO: Actualizar cazador por nombre
};

// DELETE /hunters/:id
export const deleteHunterById = async (req: Request, res: Response) => {
  // TODO: Borrar cazador por ID
};

// DELETE /hunters/search/by-name?name=...
export const deleteHunterByName = async (req: Request, res: Response) => {
  // TODO: Borrar cazador por nombre
};
