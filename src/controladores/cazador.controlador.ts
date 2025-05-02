import { Request, Response } from 'express';
import { Hunter } from '../modelos/cazador.modelo.js';

// GET: obtener todos los cazadores
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
  try {
    const { id } = req.params;
    const hunter = await Hunter.findById(id);
    if (!hunter) {
      return res.status(404).json({ message: 'Cazador no encontrado' });
    }
    res.json(hunter);
  } catch (error) {
    res.status(500).json({ message: 'Error buscando cazador' });
  }
};

// GET /hunters/search/by-name?name=...
export const getHunterByName = async (req: Request, res: Response) => {
  // TODO: Obtener cazador por nombre
  try {
    const { name } = req.query;
    const Hunters = await Hunter.find({ name });
    if (!Hunters || Hunters.length === 0) {
      return res.status(404).json({ message: 'Cazador no encontrado' });
    }
    res.json(Hunters);
  } catch (error) {
    res.status(500).json({ message: 'Error buscando cazador' });
  }
};

// PUT /hunters/:id
export const updateHunterById = async (req: Request, res: Response) => {
  // TODO: Actualizar cazador por ID
  try {
    const { id } = req.params;
    const updatedHunter = await Hunter.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedHunter) {
      return res.status(404).json({ message: 'Cazador no encontrado' });
    }
    res.json(updatedHunter);
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando cazador' });
  }
};

// PUT /hunters/search/by-name?name=...
export const updateHunterByName = async (req: Request, res: Response) => {
  // TODO: Actualizar cazador por nombre
  try {
    const { name } = req.query;
    const updatedHunter = await Hunter.findOneAndUpdate({ name }, req.body, { new: true });
    if (!updatedHunter) {
      return res.status(404).json({ message: 'Cazador no encontrado' });
    }
    res.json(updatedHunter);
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando cazador' });
  }
};

// DELETE /hunters/:id
export const deleteHunterById = async (req: Request, res: Response) => {
  // TODO: Borrar cazador por ID
  try {
    const { id } = req.params;
    const deletedHunter = await Hunter.findByIdAndDelete(id);
    if (!deletedHunter) {
      return res.status(404).json({ message: 'Cazador no encontrado' });
    }
    res.json({ message: 'Cazador eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando cazador' });
  }
};

// DELETE /hunters/search/by-name?name=...
export const deleteHunterByName = async (req: Request, res: Response) => {
  // TODO: Borrar cazador por nombre
  try {
    const { name } = req.query;
    const deletedHunter = await Hunter.findOneAndDelete({ name });
    if (!deletedHunter) {
      return res.status(404).json({ message: 'Cazador no encontrado' });
    }
    res.json({ message: 'Cazador eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando cazador' });
  }
};
