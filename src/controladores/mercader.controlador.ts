import { Request, Response } from 'express';
import { Merchant } from '../modelos/mercader.modelo.js';

// Controlador para manejar las rutas de los mercaderes
// GET: obtener todos los mercaderes
// GET /merchants
export const getAllMerchants = async (req: Request, res: Response) => {
  try {
    const merchants = await Merchant.find();
    if (!merchants || merchants.length === 0) {
      return res.status(404).json({ message: "No se encontraron mercaderes" });
    }
    res.json(merchants);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los mercaderes" });
  }
};

// POST: crear un mercader nuevo
export const createMerchant = async (req: Request, res: Response) => {
  try {
    const { name, level, specialization } = req.body;
    if (!name || !level) {
      return res.status(400).json({ message: "Nombre y nivel son obligatorios" });
    }
    const newMerchant = new Merchant({ name, level, specialization });
    const savedMerchant = await newMerchant.save();
    res.status(201).json(savedMerchant);
  } catch (error) {
    res.status(500).json({ message: "Error creando mercader" });
  }
};

// GET /merchants/:id
export const getMerchantById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const merchant = await Merchant.findById(id);
    if (!merchant) {
      return res.status(404).json({ message: "Mercader no encontrado" });
    }
    res.json(merchant);
  } catch (error) {
    res.status(500).json({ message: "Error buscando mercader" });
  }
};

// GET /merchants/search/by-name?name=...
export const getMerchantByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    const merchants = await Merchant.find({ name });
    if (!merchants || merchants.length === 0) {
      return res.status(404).json({ message: "Mercader no encontrado" });
    }
    res.json(merchants);
  } catch (error) {
    res.status(500).json({ message: "Error buscando mercader" });
  }
};

// PUT /merchants/:id
export const updateMerchantById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedMerchant = await Merchant.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedMerchant) {
      return res.status(404).json({ message: "Mercader no encontrado" });
    }
    res.json(updatedMerchant);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando mercader" });
  }
};

// PUT /merchants/search/by-name/:name
export const updateMerchantByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ message: "Nombre es obligatorio" });
    }

    const nameString = Array.isArray(name) ? name[0] : name;
    const updatedMerchant = await Merchant.findOneAndUpdate({ name: nameString }, req.body, { new: true });
    if (!updatedMerchant) { 
      return res.status(404).json({ message: "Mercader no encontrado" });
    }
    res.json(updatedMerchant);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando mercader" });
  }
};

// DELETE /merchants/:id
export const deleteMerchantById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedMerchant = await Merchant.findByIdAndDelete(id);
    if (!deletedMerchant) {
      return res.status(404).json({ message: "Mercader no encontrado" });
    }
    res.json({ message: "Mercader eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando mercader" });
  }
};

// DELETE /merchants/search/by-name?name=...
export const deleteMerchantByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ message: "Nombre es obligatorio" });
    }
    // Convertir name a string
    const nameString = Array.isArray(name) ? name[0] : name;
    // Buscar y eliminar el mercader por nombre
    const deletedMerchant = await Merchant.findOneAndDelete({ name: nameString });
    if (!deletedMerchant) {
      return res.status(404).json({ message: "Mercader no encontrado" });
    }
    res.json({ message: "Mercader eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando mercader" });
  }
};
